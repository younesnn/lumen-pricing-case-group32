import React from 'react';
import { Play, Save, Copy, BarChart2, ShieldAlert, Sparkles, SlidersHorizontal, Database, GitCompare, CheckCircle2 } from 'lucide-react';
import { Scenario, EvaluationResult } from '../types/simulator';

interface HeaderProps {
  currentTab: 'simulator' | 'scenarios' | 'evidence' | 'comparison' | 'decision';
  onSelectTab: (tab: 'simulator' | 'scenarios' | 'evidence' | 'comparison' | 'decision') => void;
  activeScenario: Scenario;
  activeEvaluation: EvaluationResult;
  horizon: 3 | 6 | 12;
  onChangeHorizon: (horizon: 3 | 6 | 12) => void;
  onCalculate: () => void;
  onSaveDraft: () => void;
  onDuplicate: () => void;
  onGoToCompare: () => void;
  isCalculating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  activeScenario,
  activeEvaluation,
  horizon,
  onChangeHorizon,
  onCalculate,
  onSaveDraft,
  onDuplicate,
  onGoToCompare,
  isCalculating
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Banner: Mandatory Regulatory / Caveat notice */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-xs text-amber-900 font-medium">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Methodological Notice:</strong> Zero observed LUMEN sales in Germany; conditional simulation results based on explicit assumptions.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-amber-800/80">
          <span>Target Market: <strong>Germany (DE)</strong></span>
          <span>•</span>
          <span>Launch: <strong>{activeScenario.launchDate}</strong></span>
          <span>•</span>
          <span>Convention: <strong>VAT 19% + Pfand €0.25</strong></span>
        </div>
      </div>

      {/* Main navigation & scenario status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Active Scenario Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-slate-900 leading-none tracking-tight">
                  LUMEN Strategy Simulator
                </h1>
                <span className="text-2xs font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                  DE MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pricing & Go-to-Market Germany • Certified Decision Engine
              </p>
            </div>
          </div>

          <div className="hidden lg:block h-6 w-px bg-slate-200" />

          {/* Scenario Name & Status */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Active Scenario:</span>
            <span className="font-semibold text-slate-900 px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">
              {activeScenario.name}
            </span>
            <span className="text-2xs px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-700 font-mono font-medium">
              {activeScenario.revision}
            </span>
            {activeEvaluation.isStale ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-2xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Modified (Needs recalculation)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-2xs font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Up to Date
              </span>
            )}
          </div>
        </div>

        {/* Action Controls & Horizon Picker */}
        <div className="flex items-center gap-2.5">
          {/* Horizon Selection */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <span className="px-2 text-slate-500 text-2xs hidden sm:inline">Horizon:</span>
            <button
              onClick={() => onChangeHorizon(3)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                horizon === 3
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 mo
            </button>
            <button
              onClick={() => onChangeHorizon(6)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                horizon === 6
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6 mo
            </button>
            <button
              onClick={() => onChangeHorizon(12)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                horizon === 12
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12 mo
            </button>
          </div>

          {/* Core Action: Calculate */}
          <button
            onClick={onCalculate}
            disabled={isCalculating}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs shadow-xs transition-all ${
              activeEvaluation.isStale
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-500/30 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isCalculating ? 'Computing...' : 'Recalculate'}</span>
          </button>

          {/* Save Draft */}
          <button
            onClick={onSaveDraft}
            title="Save draft"
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>

          {/* Duplicate */}
          <button
            onClick={onDuplicate}
            title="Duplicate scenario"
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 border-t border-slate-100 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => onSelectTab('simulator')}
          className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            currentTab === 'simulator'
              ? 'border-emerald-700 text-emerald-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Strategy Simulator</span>
        </button>

        <button
          onClick={() => onSelectTab('scenarios')}
          className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            currentTab === 'scenarios'
              ? 'border-emerald-700 text-emerald-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Scenarios & Options</span>
        </button>

        <button
          onClick={() => onSelectTab('evidence')}
          className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            currentTab === 'evidence'
              ? 'border-emerald-700 text-emerald-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Data & Evidence (12 Exhibits)</span>
        </button>

        <button
          onClick={() => onSelectTab('comparison')}
          className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            currentTab === 'comparison'
              ? 'border-emerald-700 text-emerald-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>Comparison (F06–F07)</span>
        </button>

        <button
          onClick={() => onSelectTab('decision')}
          className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            currentTab === 'decision'
              ? 'border-emerald-700 text-emerald-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Recommendation & Decision (F08)</span>
        </button>
      </nav>
    </header>
  );
};
