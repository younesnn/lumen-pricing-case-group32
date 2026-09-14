import React, { useState } from 'react';
import { Scenario, EvaluationResult, ChannelTerms } from '../types/simulator';
import { Plus, Copy, Trash2, ArrowRight, CheckCircle2, GitCompare, Calendar, Check } from 'lucide-react';

interface ScenariosViewProps {
  scenarios: Scenario[];
  evaluations: Record<string, EvaluationResult>;
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
  onDuplicateScenario: (id: string) => void;
  onCreateScenario: (name: string, description: string) => void;
  onDeleteScenario: (id: string) => void;
  selectedForCompare: string[];
  onToggleCompare: (id: string) => void;
  onOpenSimulator: () => void;
  onGoToCompare: () => void;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({
  scenarios,
  evaluations,
  activeScenarioId,
  onSelectScenario,
  onDuplicateScenario,
  onCreateScenario,
  onDeleteScenario,
  selectedForCompare,
  onToggleCompare,
  onOpenSimulator,
  onGoToCompare
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateScenario(newName.trim(), newDesc.trim());
    setNewName('');
    setNewDesc('');
    setShowNewModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Catalogue des Scénarios de Lancement (F03)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez, versionnez et comparez différentes stratégies d'entrée pour le marché allemand (DE).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedForCompare.length >= 2 && (
            <button
              onClick={onGoToCompare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <GitCompare className="w-4 h-4" />
              <span>Comparer les {selectedForCompare.length} options</span>
            </button>
          )}

          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Scénario</span>
          </button>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {scenarios.map(sc => {
          const evalResult = evaluations[sc.id];
          const isActive = sc.id === activeScenarioId;
          const isSelectedCompare = selectedForCompare.includes(sc.id);
          const kpi12 = evalResult?.checkpoints.m12;

          return (
            <div
              key={sc.id}
              className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {sc.revision}
                    </span>
                    {isActive && (
                      <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Actif
                      </span>
                    )}
                  </div>

                  <label className="flex items-center gap-1.5 text-2xs text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelectedCompare}
                      onChange={() => onToggleCompare(sc.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Comparer</span>
                  </label>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{sc.name}</h3>
                  <p className="text-2xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {sc.description || 'Aucune description fournie.'}
                  </p>
                </div>

                {/* Channel pricing snapshot */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-3xs space-y-1">
                  <div className="font-semibold text-slate-700 uppercase tracking-wider text-3xs">
                    Prix & Mix Canaux :
                  </div>
                  {(Object.entries(sc.economics.channels) as Array<[string, ChannelTerms]>).map(([ch, terms]) => (
                    <div key={ch} className="flex justify-between text-slate-600">
                      <span>{ch}</span>
                      <span className="font-bold font-mono text-slate-800">{terms.price.value.toFixed(2)} €</span>
                    </div>
                  ))}
                </div>

                {/* Evaluated KPI Summary (12 months) */}
                {kpi12 && (
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs">
                    <div>
                      <span className="block text-3xs text-slate-400">Volume Annuel :</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {kpi12.volumeTotal.toLocaleString('fr-FR')} u
                      </span>
                    </div>
                    <div>
                      <span className="block text-3xs text-slate-400">Revenu Net :</span>
                      <span className="font-bold text-emerald-800 font-mono">
                        {Math.round(kpi12.netRevenue).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div>
                      <span className="block text-3xs text-slate-400">Contribution Nette :</span>
                      <span className={`font-bold font-mono ${kpi12.contributionAfterMarketing >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {Math.round(kpi12.contributionAfterMarketing).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div>
                      <span className="block text-3xs text-slate-400">Payback :</span>
                      <span className="font-semibold text-slate-700 text-2xs">
                        {evalResult.paybackCrossingMonth ? `Mois ${evalResult.paybackCrossingMonth}` : 'Non atteint'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDuplicateScenario(sc.id)}
                    title="Dupliquer"
                    className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {scenarios.length > 1 && (
                    <button
                      onClick={() => onDeleteScenario(sc.id)}
                      title="Supprimer"
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    onSelectScenario(sc.id);
                    onOpenSimulator();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs transition-colors"
                >
                  <span>Ouvrir dans le Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Scenario Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Créer un nouveau scénario</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nom du scénario
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Option D : Hybride Bio & Fitness"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description & Justification
                </label>
                <textarea
                  rows={3}
                  placeholder="Expliquez la logique de ciblage, le mix canal envisagé..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs"
                >
                  Créer et Configurer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
