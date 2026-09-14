import React from 'react';
import { EvaluationResult, Scenario } from '../../types/simulator';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { DollarSign, Percent, TrendingDown, ArrowDownRight, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

interface EconomicsViewProps {
  evaluation: EvaluationResult;
  scenario: Scenario;
  horizon: 3 | 6 | 12;
}

export const EconomicsView: React.FC<EconomicsViewProps> = ({
  evaluation,
  scenario,
  horizon
}) => {
  const currentCheckpoint = horizon === 3
    ? evaluation.checkpoints.m3
    : horizon === 6
    ? evaluation.checkpoints.m6
    : evaluation.checkpoints.m12;

  const displayMonths = evaluation.months.slice(0, horizon);

  // Recovery chart data
  const recoveryData = evaluation.cumulativeRecoveryCurve.slice(0, horizon + 1).map((val, idx) => ({
    name: idx === 0 ? 'Pré-lancement' : `M${idx}`,
    SoldeCumule: Math.round(val),
    zero: 0
  }));

  const isProfitable = currentCheckpoint.operatingProfit >= 0;
  const isContributionPositive = currentCheckpoint.contributionAfterMarketing >= 0;

  return (
    <div className="space-y-6">
      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            CA Consommateur (TTC)
          </span>
          <div className="text-base font-bold text-slate-900 font-mono">
            {Math.round(currentCheckpoint.grossTurnover).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-slate-500 mt-0.5">Prix étiquette x canettes</p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Revenu Net Retenu
          </span>
          <div className="text-base font-bold text-emerald-800 font-mono">
            {Math.round(currentCheckpoint.netRevenue).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-slate-500 mt-0.5">Après TVA, Pfand & marges distrib</p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Marge Brute
          </span>
          <div className="text-base font-bold text-slate-900 font-mono">
            {Math.round(currentCheckpoint.grossMargin).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-emerald-700 font-semibold mt-0.5">
            {(currentCheckpoint.grossMarginRate * 100).toFixed(1)}% du net
          </p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Dépenses Marketing
          </span>
          <div className="text-base font-bold text-purple-700 font-mono">
            {Math.round(currentCheckpoint.marketingSpend).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-slate-500 mt-0.5">Acquisition & Notoriété</p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Contribution Nette
          </span>
          <div className={`text-base font-bold font-mono ${isContributionPositive ? 'text-emerald-700' : 'text-rose-600'}`}>
            {Math.round(currentCheckpoint.contributionAfterMarketing).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-slate-500 mt-0.5">Marge brute moins marketing</p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="block text-3xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Résultat d'Exploitation
          </span>
          <div className={`text-base font-bold font-mono ${isProfitable ? 'text-emerald-700' : 'text-rose-600'}`}>
            {Math.round(currentCheckpoint.operatingProfit).toLocaleString('fr-FR')} €
          </div>
          <p className="text-3xs text-slate-500 mt-0.5">Après frais fixes ({currentCheckpoint.fixedCosts} €)</p>
        </div>
      </div>

      {/* Pont Économique / Waterfall Breakdown */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs">
        <h3 className="text-xs font-semibold text-slate-900 mb-1">
          Pont Économique Unitaire & Déductions Réglementaires DE
        </h3>
        <p className="text-2xs text-slate-500 mb-3">
          Passage déterministe du prix étiquette moyen au résultat net par canette (selon contrat MD-05).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-700 font-medium">
              <span>1. Prix moyen pondéré consommateur (TTC)</span>
              <span className="font-bold text-slate-900 font-mono">
                {(currentCheckpoint.grossTurnover / (currentCheckpoint.volumeTotal || 1)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center text-rose-700 pl-3 text-2xs">
              <span>− Déduction TVA Allemagne (MwSt 19%)</span>
              <span className="font-mono">
                −{(displayMonths.reduce((a, b) => a + b.vatPaid, 0) / (currentCheckpoint.volumeTotal || 1)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center text-rose-700 pl-3 text-2xs">
              <span>− Consigne légale obligatoire (Einwegpfand)</span>
              <span className="font-mono">−0.25 €</span>
            </div>
            <div className="flex justify-between items-center text-rose-700 pl-3 text-2xs">
              <span>− Marge distributeurs & commissions plateforme</span>
              <span className="font-mono">
                −{((displayMonths.reduce((a, b) => a + b.retailerDeductionTotal + b.distributorDeductionTotal + b.paymentFeeTotal, 0)) / (currentCheckpoint.volumeTotal || 1)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center text-emerald-900 font-bold border-t border-slate-200 pt-1">
              <span>2. Revenu Net Encaissé LUMEN par canette</span>
              <span className="font-mono">{evaluation.weightedNetPrice.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 pl-3 text-2xs">
              <span>− COGS matières directes (formule + canette)</span>
              <span className="font-mono">
                −{(displayMonths.reduce((a, b) => a + b.cogsTotal, 0) / (currentCheckpoint.volumeTotal || 1)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 pl-3 text-2xs">
              <span>− Logistique & transport unitaire (3PL)</span>
              <span className="font-mono">
                −{(displayMonths.reduce((a, b) => a + b.fulfillmentTotal, 0) / (currentCheckpoint.volumeTotal || 1)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center text-blue-900 font-bold border-t border-slate-200 pt-1">
              <span>3. Marge Brute Unitaire</span>
              <span className="font-mono">{evaluation.weightedMarginPerCan.toFixed(2)} € / canette</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-800 text-2xs uppercase tracking-wider">
              Analyse du Point Mort & Récupération du Cash
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600">Investissement pré-lancement engagé :</span>
                <span className="font-bold text-slate-900 font-mono">
                  {scenario.economics.prelaunchInvestment.value.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Frais fixes totaux ({horizon} mois) :</span>
                <span className="font-bold text-slate-900 font-mono">
                  {currentCheckpoint.fixedCosts.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Budget marketing cumulé ({horizon} mois) :</span>
                <span className="font-bold text-purple-700 font-mono">
                  {currentCheckpoint.marketingSpend.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between">
                <span className="font-semibold text-slate-800">Volume Annuel au Point Mort :</span>
                <span className="font-bold text-emerald-800 font-mono">
                  {evaluation.breakevenVolumeAnnual.toLocaleString('fr-FR')} canettes
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-md bg-white border border-slate-200 flex items-center gap-2">
              {evaluation.paybackCrossingMonth ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-2xs text-slate-700">
                    <strong>Récupération économique atteinte au Mois {evaluation.paybackCrossingMonth}</strong> : le cumul des contributions couvre intégralement l'investissement initial.
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-2xs text-slate-700">
                    <strong>Récupération non atteinte sur l'horizon {horizon} mois</strong> : le solde cumulé reste négatif ({Math.round(evaluation.cumulativeRecoveryCurve[horizon]).toLocaleString('fr-FR')} €).
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative Cash & Recovery Curve */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Courbe de Couverture & Récupération Économique Cumulée
            </h3>
            <p className="text-2xs text-slate-500">
              Évolution du solde cumulé (Contribution cumulée − Dépense initiale). Traçage du franchissement de la ligne zéro.
            </p>
          </div>
          {evaluation.paybackCrossingMonth && (
            <span className="text-2xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Payback : Mois {evaluation.paybackCrossingMonth}
            </span>
          )}
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={recoveryData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val: number) => `${Math.round(val / 1000)}k€`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                formatter={(val: any) => [`${Number(val).toLocaleString('fr-FR')} €`, 'Solde Net']}
              />
              <ReferenceLine y={0} stroke="#dc2626" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: 'Seuil Zéro', fill: '#dc2626', fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="SoldeCumule"
                name="Solde Cumulé (€)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#059669' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
