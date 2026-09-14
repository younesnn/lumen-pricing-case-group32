import React, { useState } from 'react';
import { Scenario, EvaluationResult } from '../types/simulator';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Printer, Download, Users, FileSignature } from 'lucide-react';

interface DecisionViewProps {
  scenarios: Scenario[];
  evaluations: Record<string, EvaluationResult>;
  activeScenario: Scenario;
}

export const DecisionView: React.FC<DecisionViewProps> = ({
  scenarios,
  evaluations,
  activeScenario
}) => {
  const [signerName, setSignerName] = useState('Elena Vance & Jonas Richter');
  const [signerRole, setSignerRole] = useState('Comité de Direction (CFO & CMO)');
  const [decisionStatus, setDecisionStatus] = useState<'APPROVED' | 'CONDITIONAL' | 'REJECTED'>('APPROVED');
  const [decisionRationale, setDecisionRationale] = useState(
    "Nous validons l'Option A (DTC Premium Focus) à 2.49 € TTC en phase 1. Cette option protège la marge brute unitaire (1.08 €/canette) et permet d'atteindre le point mort dès le mois 8 sans dilution de marque en grande distribution avant d'avoir prouvé l'attachement communautaire."
  );
  const [isSigned, setIsSigned] = useState(false);
  const [signedDate, setSignedDate] = useState<string | null>(null);

  const evalResult = evaluations[activeScenario.id];
  const kpi12 = evalResult?.checkpoints.m12;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigned(true);
    setSignedDate(new Date().toLocaleString('fr-FR'));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header & Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Étape F08
            </span>
            <h2 className="text-lg font-bold text-slate-900">Dossier d'Arbitrage & Signature Décisionnelle</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synthèse exécutive formalisée pour le Board de LUMEN Beverage Co.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer le Dossier</span>
          </button>
        </div>
      </div>

      {/* Synthesis Card: Recommended Strategy */}
      <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Recommandation Stratégique Retenue
          </span>
          <span className="text-2xs font-mono text-slate-400">Marché : Allemagne (DE)</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">{activeScenario.name}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {activeScenario.description}
          </p>
        </div>

        {/* Snapshot Metrics */}
        {kpi12 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-3xs font-semibold text-slate-500 uppercase">Volume Annuel Visé</span>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {kpi12.volumeTotal.toLocaleString('fr-FR')} u
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-3xs font-semibold text-slate-500 uppercase">Revenu Net Retenu</span>
              <div className="text-base font-bold text-emerald-800 font-mono mt-0.5">
                {Math.round(kpi12.netRevenue).toLocaleString('fr-FR')} €
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-3xs font-semibold text-slate-500 uppercase">Contribution Nette</span>
              <div className="text-base font-bold text-emerald-800 font-mono mt-0.5">
                {Math.round(kpi12.contributionAfterMarketing).toLocaleString('fr-FR')} €
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-3xs font-semibold text-slate-500 uppercase">Récupération Cash</span>
              <div className="text-base font-bold text-purple-700 font-mono mt-0.5">
                {evalResult?.paybackCrossingMonth ? `Mois ${evalResult.paybackCrossingMonth}` : 'Non atteint'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stakeholder Perspectives Grid (Freya, Jonas, Elena) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">F</div>
            <div>
              <div>Freya Lindqvist</div>
              <div className="text-3xs font-normal text-slate-400">CEO & Fondatrice</div>
            </div>
          </div>
          <p className="text-2xs text-slate-600 leading-relaxed">
            « Préserver l'aura premium et l'ADN nootropique de LUMEN. Éviter le piège du discount qui détruirait notre valorisation de marque en Europe. »
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">J</div>
            <div>
              <div>Jonas Richter</div>
              <div className="text-3xs font-normal text-slate-400">CFO & Trésorier</div>
            </div>
          </div>
          <p className="text-2xs text-slate-600 leading-relaxed">
            « Exigence stricte d'un retour sur trésorerie inférieur à 10 mois. Aucun contrat d'engagement retail avec pénalités de rupture sans test préalable. »
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">E</div>
            <div>
              <div>Elena Vance</div>
              <div className="text-3xs font-normal text-slate-400">CMO & Go-to-Market</div>
            </div>
          </div>
          <p className="text-2xs text-slate-600 leading-relaxed">
            « Concentrer le budget d'acquisition sur Berlin et Munich avec des créateurs tech/focus pour tester le CAC réel avant d'arroser l'Allemagne entière. »
          </p>
        </div>
      </div>

      {/* Trade-offs & Reverse Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Sacrifices Assumés (Arbitrages Délibérés)</span>
          </h4>
          <ul className="text-2xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>Volume absolu initial inférieur à un référencement agressif en hypermarchés Edeka/Rewe.</li>
            <li>Dépendance initiale à la maîtrise des coûts d'acquisition paid social (Meta / TikTok Ads).</li>
            <li>Frais logistiques 3PL plus élevés par canette en direct consommateur (0.45 € vs 0.15 € en palette retail).</li>
          </ul>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Conditions de Bascule (Reverse Conditions)</span>
          </h4>
          <ul className="text-2xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>Si le CAC effectif à Berlin dépasse 38 € par commande initiale, basculer le budget vers le sampling direct en espace coworking.</li>
            <li>Si le taux de réachat à 60 jours est inférieur à 20%, ajuster le pricing pack ou lancer un abonnement mensuel avec 10% de remise.</li>
            <li>Si le volume mensuel dépasse 20 000 canettes en M6, engager les négociations de référencement sélectif (Alnatura / Denn's Bio).</li>
          </ul>
        </div>
      </div>

      {/* Formal Sign-off Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <FileSignature className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Engagement & Signature Managériale
            </h3>
            <p className="text-3xs text-slate-500">
              Conformément à la gouvernance, une décision stratégique requiert un arbitrage humain explicite.
            </p>
          </div>
        </div>

        {isSigned ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dossier Stratégique Formellement Validé & Signé</span>
            </div>
            <div className="text-2xs text-emerald-800 space-y-1">
              <div>Signataire : <strong>{signerName}</strong> ({signerRole})</div>
              <div>Statut décisionnel : <strong>{decisionStatus}</strong></div>
              <div>Horodatage officiel : <strong>{signedDate}</strong></div>
              <div className="italic pt-1">« {decisionRationale} »</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSign} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-2xs font-semibold text-slate-700 mb-1">
                  Nom des décideurs
                </label>
                <input
                  type="text"
                  value={signerName ?? ''}
                  onChange={e => setSignerName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-700 mb-1">
                  Rôle ou Instance de validation
                </label>
                <input
                  type="text"
                  value={signerRole ?? ''}
                  onChange={e => setSignerRole(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-semibold text-slate-700 mb-1">
                Avis formel
              </label>
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={decisionStatus === 'APPROVED'}
                    onChange={() => setDecisionStatus('APPROVED')}
                    className="text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="font-semibold text-emerald-800">Option Validée</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={decisionStatus === 'CONDITIONAL'}
                    onChange={() => setDecisionStatus('CONDITIONAL')}
                    className="text-amber-700 focus:ring-amber-600"
                  />
                  <span className="font-semibold text-amber-800">Sous réserve de test</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-2xs font-semibold text-slate-700 mb-1">
                Justification & Rationale Stratégique
              </label>
              <textarea
                rows={3}
                value={decisionRationale ?? ''}
                onChange={e => setDecisionRationale(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
              >
                Signer et Enregistrer la Décision
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
