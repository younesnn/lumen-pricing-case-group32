import React from 'react';
import { EvaluationResult, Scenario, SensitivityVariant } from '../../types/simulator';
import { computeSensitivityVariants } from '../../engine/calculator';
import { ShieldCheck, ArrowUpRight, ArrowDownRight, Sliders, AlertTriangle } from 'lucide-react';

interface SensitivityViewProps {
  scenario: Scenario;
  evaluation: EvaluationResult;
}

export const SensitivityView: React.FC<SensitivityViewProps> = ({
  scenario,
  evaluation
}) => {
  const variants: SensitivityVariant[] = computeSensitivityVariants(scenario, evaluation);

  // Tornado sensitivity variables
  const baseProfit = evaluation.checkpoints.m12.operatingProfit;
  const baseVolume = evaluation.checkpoints.m12.volumeTotal;
  const netMarginPerCan = evaluation.weightedMarginPerCan;

  // Sensitivities on Annual Operating Profit
  const sensitivities = [
    {
      variable: 'Volume de vente (+20% / −20%)',
      downDelta: Math.round(-0.20 * baseVolume * netMarginPerCan),
      upDelta: Math.round(0.20 * baseVolume * netMarginPerCan),
      unit: '€',
      criticality: 'Élevée'
    },
    {
      variable: 'Prix de vente moyen (+10% / −10%)',
      downDelta: Math.round(-0.10 * evaluation.checkpoints.m12.grossTurnover * 0.75),
      upDelta: Math.round(0.10 * evaluation.checkpoints.m12.grossTurnover * 0.75),
      unit: '€',
      criticality: 'Très Élevée'
    },
    {
      variable: 'Coût matières COGS (+10% / −10%)',
      downDelta: Math.round(-0.10 * evaluation.checkpoints.m12.cogsTotal),
      upDelta: Math.round(0.10 * evaluation.checkpoints.m12.cogsTotal),
      unit: '€',
      criticality: 'Moyenne'
    },
    {
      variable: 'Dépenses marketing acquisition (+20% / −20%)',
      downDelta: Math.round(-0.20 * evaluation.checkpoints.m12.marketingSpend),
      upDelta: Math.round(0.20 * evaluation.checkpoints.m12.marketingSpend),
      unit: '€',
      criticality: 'Moyenne'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            Analyse de Sensibilité & Robustesse de la Décision
          </h3>
        </div>
        <p className="text-2xs text-slate-500 leading-relaxed">
          Conformément au cadrage F06, les résultats ne sont pas qualifiés de probabilités statistiques.
          Ils testent la résistance de l’option face à des chocs de volume, de prix ou de coûts d’acquisition.
        </p>
      </div>

      {/* 3 Scenarios: Prudent, Central, Favorable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map(v => {
          const isCentral = v.name === 'central';
          const isPessimistic = v.name === 'pessimistic';

          return (
            <div
              key={v.name}
              className={`p-4 rounded-xl border transition-all ${
                isCentral
                  ? 'bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-sm'
                  : isPessimistic
                  ? 'bg-rose-50/40 border-rose-200'
                  : 'bg-emerald-50/40 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${isCentral ? 'text-slate-900' : isPessimistic ? 'text-rose-900' : 'text-emerald-900'}`}>
                  {v.label}
                </span>
                <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                  isCentral ? 'bg-slate-100 text-slate-700' : isPessimistic ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {v.deltaPercent === 0 ? 'Référence' : `${v.deltaPercent > 0 ? '+' : ''}${v.deltaPercent}%`}
                </span>
              </div>

              <p className="text-3xs text-slate-500 mb-3 min-h-7 leading-normal">
                {v.description}
              </p>

              <div className="space-y-2 border-t border-slate-200/60 pt-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Volume Annuel :</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {v.annualVolume.toLocaleString('fr-FR')} u
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Revenu Net :</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {Math.round(v.annualRevenue).toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contribution Nette :</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {Math.round(v.annualContribution).toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                  <span className="text-slate-700">Résultat Net :</span>
                  <span className={`font-mono ${v.annualOperatingProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {Math.round(v.annualOperatingProfit).toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tornado / Sensitivity Impact Bars */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs">
        <h4 className="text-xs font-semibold text-slate-900 mb-1">
          Barres d'Impact sur le Résultat d'Exploitation Annuel
        </h4>
        <p className="text-2xs text-slate-500 mb-4">
          Variation absolue du résultat net (en €) en cas d'écart défavorable (rouge) ou favorable (vert).
        </p>

        <div className="space-y-4">
          {sensitivities.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-800">{s.variable}</span>
                <span className="text-3xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  Sensibilité {s.criticality}
                </span>
              </div>

              <div className="flex items-center gap-2 text-2xs font-mono">
                <span className="w-16 text-right text-rose-700 font-semibold">
                  {s.downDelta.toLocaleString('fr-FR')} €
                </span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-sm flex overflow-hidden">
                  <div className="w-1/2 flex justify-end">
                    <div
                      className="bg-rose-500 h-full rounded-l-xs"
                      style={{ width: `${Math.min(100, Math.abs(s.downDelta) / 250)}%` }}
                    />
                  </div>
                  <div className="w-px bg-slate-400" />
                  <div className="w-1/2 flex justify-start">
                    <div
                      className="bg-emerald-600 h-full rounded-r-xs"
                      style={{ width: `${Math.min(100, Math.abs(s.upDelta) / 250)}%` }}
                    />
                  </div>
                </div>
                <span className="w-16 text-left text-emerald-700 font-semibold">
                  +{s.upDelta.toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tipping Point / Valeur de Bascule */}
      <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Point de Bascule Critique (Seuil de Défaillance)</span>
        </div>
        <p className="text-amber-800 text-2xs leading-relaxed">
          Le seuil de volume annuel nécessaire pour couvrir l'ensemble des charges fixes ({evaluation.checkpoints.m12.fixedCosts.toLocaleString('fr-FR')} €) et du marketing ({evaluation.checkpoints.m12.marketingSpend.toLocaleString('fr-FR')} €) s'établit à <strong>{evaluation.breakevenVolumeAnnual.toLocaleString('fr-FR')} canettes</strong>.
          Si le volume réel tombe en-dessous de ce niveau, la stratégie entre en perte d'exploitation sans possibilité de récupération sur 12 mois.
        </p>
      </div>
    </div>
  );
};
