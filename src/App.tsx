import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ParametersPanel } from './components/Simulator/ParametersPanel';
import { CommercialView } from './components/Simulator/CommercialView';
import { EconomicsView } from './components/Simulator/EconomicsView';
import { SensitivityView } from './components/Simulator/SensitivityView';
import { ExplanationView } from './components/Simulator/ExplanationView';
import { SourcesDrawer } from './components/Simulator/SourcesDrawer';
import { ScenariosView } from './components/ScenariosView';
import { EvidenceView } from './components/EvidenceView';
import { ComparisonView } from './components/ComparisonView';
import { DecisionView } from './components/DecisionView';
import { DEFAULT_SCENARIOS } from './data/defaultScenarios';
import { Scenario, EvaluationResult, ValueKind } from './types/simulator';
import { evaluateScenario } from './engine/calculator';
import { TrendingUp, DollarSign, Sliders, BookOpen, AlertTriangle } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'simulator' | 'scenarios' | 'evidence' | 'comparison' | 'decision'>('simulator');
  const [simulatorSubTab, setSimulatorSubTab] = useState<'commercial' | 'economics' | 'sensitivity' | 'explanation'>('economics');
  const [horizon, setHorizon] = useState<3 | 6 | 12>(12);
  const [isCalculating, setIsCalculating] = useState(false);

  // Scenarios and evaluations
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    try {
      const saved = localStorage.getItem('lumen_scenarios_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load scenarios from localStorage', e);
    }
    return DEFAULT_SCENARIOS;
  });

  const [activeScenarioId, setActiveScenarioId] = useState<string>(DEFAULT_SCENARIOS[0].id);

  // Inspected variable drawer state
  const [inspectedVariable, setInspectedVariable] = useState<{
    name: string;
    kind: ValueKind;
    source: string;
    value: any;
    unit: string;
  } | null>(null);

  // Comparison selection
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([
    'demo-dtc',
    'demo-retail'
  ]);

  // Save to local storage whenever scenarios change
  useEffect(() => {
    try {
      localStorage.setItem('lumen_scenarios_v1', JSON.stringify(scenarios));
    } catch (e) {
      console.warn('Failed to save scenarios to localStorage', e);
    }
  }, [scenarios]);

  // Active scenario object
  const activeScenario = useMemo(() => {
    return scenarios.find(s => s.id === activeScenarioId) || scenarios[0] || DEFAULT_SCENARIOS[0];
  }, [scenarios, activeScenarioId]);

  // Computed evaluations for all scenarios
  const evaluations = useMemo(() => {
    const results: Record<string, EvaluationResult> = {};
    for (const sc of scenarios) {
      results[sc.id] = evaluateScenario(sc);
    }
    return results;
  }, [scenarios]);

  const activeEvaluation = useMemo(() => {
    return evaluations[activeScenario.id] || evaluateScenario(activeScenario);
  }, [evaluations, activeScenario]);

  // Handlers
  const handleUpdateScenario = (updated: Scenario) => {
    setScenarios(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setScenarios(prev => prev.map(s => {
        if (s.id === activeScenario.id) {
          // bump revision, mark evaluated
          const revMatch = s.revision.match(/rev-(\d+)/);
          const nextRev = revMatch ? `rev-${Number(revMatch[1]) + 1}` : 'rev-2';
          return {
            ...s,
            revision: nextRev,
            status: 'evaluated',
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      }));
      setIsCalculating(false);
    }, 250);
  };

  const handleSaveDraft = () => {
    alert(`Scénario "${activeScenario.name}" enregistré avec succès.`);
  };

  const handleDuplicate = (idToDuplicate?: string) => {
    const targetId = idToDuplicate || activeScenario.id;
    const target = scenarios.find(s => s.id === targetId);
    if (!target) return;

    const newId = `${target.id}-copie-${Date.now().toString().slice(-4)}`;
    const duplicated: Scenario = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      name: `${target.name} (Copie)`,
      revision: 'rev-1',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setScenarios(prev => [...prev, duplicated]);
    setActiveScenarioId(newId);
    setCurrentTab('simulator');
  };

  const handleCreateScenario = (name: string, description: string) => {
    const base = scenarios[0] || DEFAULT_SCENARIOS[0];
    const newId = `option-custom-${Date.now().toString().slice(-4)}`;
    const fresh: Scenario = {
      ...JSON.parse(JSON.stringify(base)),
      id: newId,
      name,
      description,
      revision: 'rev-1',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setScenarios(prev => [...prev, fresh]);
    setActiveScenarioId(newId);
    setCurrentTab('simulator');
  };

  const handleDeleteScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios(prev => prev.filter(s => s.id !== id));
    if (activeScenarioId === id) {
      const remaining = scenarios.filter(s => s.id !== id);
      setActiveScenarioId(remaining[0]?.id || DEFAULT_SCENARIOS[0].id);
    }
  };

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id].slice(-3); // max 3
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeScenario={activeScenario}
        activeEvaluation={activeEvaluation}
        horizon={horizon}
        onChangeHorizon={setHorizon}
        onCalculate={handleCalculate}
        onSaveDraft={handleSaveDraft}
        onDuplicate={() => handleDuplicate()}
        onGoToCompare={() => setCurrentTab('comparison')}
        isCalculating={isCalculating}
      />

      {/* Main Workspace */}
      <main className="flex-1 pb-16">
        {currentTab === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            {/* Stale Warning Banner if parameters modified */}
            {activeEvaluation.isStale && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Attention :</strong> Des paramètres ont été modifiés. Les résultats affichés ci-dessous sont obsolètes par rapport aux nouvelles hypothèses.
                  </span>
                </div>
                <button
                  onClick={handleCalculate}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-xs transition-colors shrink-0"
                >
                  Recalculer maintenant
                </button>
              </div>
            )}

            {/* Two-Column Responsive Layout: Left = Parameters, Right = Simulation Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Interactive Parameters Panel (4 cols) */}
              <div className="lg:col-span-4 sticky top-24 space-y-4">
                <ParametersPanel
                  scenario={activeScenario}
                  onUpdateScenario={handleUpdateScenario}
                  onInspectVariable={(name, kind, source, value, unit) => {
                    setInspectedVariable({ name, kind, source, value, unit });
                  }}
                />
              </div>

              {/* Right Column: Simulation Results & Analytics (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Simulator Subtabs */}
                <div className="bg-white p-1.5 border border-slate-200 rounded-xl shadow-xs flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setSimulatorSubTab('economics')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                      simulatorSubTab === 'economics'
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Vue Économique (MD-05/06)</span>
                  </button>

                  <button
                    onClick={() => setSimulatorSubTab('commercial')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                      simulatorSubTab === 'commercial'
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Vue Commerciale (Volume)</span>
                  </button>

                  <button
                    onClick={() => setSimulatorSubTab('sensitivity')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                      simulatorSubTab === 'sensitivity'
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Sensibilité (F06–F07)</span>
                  </button>

                  <button
                    onClick={() => setSimulatorSubTab('explanation')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                      simulatorSubTab === 'explanation'
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Audit & Formules (F04)</span>
                  </button>
                </div>

                {/* Subtab Content Panels */}
                {simulatorSubTab === 'economics' && (
                  <EconomicsView
                    evaluation={activeEvaluation}
                    scenario={activeScenario}
                    horizon={horizon}
                  />
                )}

                {simulatorSubTab === 'commercial' && (
                  <CommercialView
                    evaluation={activeEvaluation}
                    scenario={activeScenario}
                    horizon={horizon}
                  />
                )}

                {simulatorSubTab === 'sensitivity' && (
                  <SensitivityView
                    scenario={activeScenario}
                    evaluation={activeEvaluation}
                  />
                )}

                {simulatorSubTab === 'explanation' && (
                  <ExplanationView
                    scenario={activeScenario}
                    evaluation={activeEvaluation}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'scenarios' && (
          <ScenariosView
            scenarios={scenarios}
            evaluations={evaluations}
            activeScenarioId={activeScenarioId}
            onSelectScenario={setActiveScenarioId}
            onDuplicateScenario={handleDuplicate}
            onCreateScenario={handleCreateScenario}
            onDeleteScenario={handleDeleteScenario}
            selectedForCompare={selectedForCompare}
            onToggleCompare={handleToggleCompare}
            onOpenSimulator={() => setCurrentTab('simulator')}
            onGoToCompare={() => setCurrentTab('comparison')}
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceView />
        )}

        {currentTab === 'comparison' && (
          <ComparisonView
            scenarios={scenarios}
            evaluations={evaluations}
            selectedIds={selectedForCompare}
            onToggleCompare={handleToggleCompare}
            onSelectActiveScenario={id => {
              setActiveScenarioId(id);
              setCurrentTab('simulator');
            }}
          />
        )}

        {currentTab === 'decision' && (
          <DecisionView
            scenarios={scenarios}
            evaluations={evaluations}
            activeScenario={activeScenario}
          />
        )}
      </main>

      {/* Slide-out Drawer for Parameter Origin Inspection */}
      <SourcesDrawer
        variable={inspectedVariable}
        onClose={() => setInspectedVariable(null)}
      />
    </div>
  );
}
export default App;
