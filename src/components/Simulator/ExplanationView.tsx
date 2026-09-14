import React from 'react';
import { EvaluationResult, Scenario } from '../../types/simulator';
import { FileText, ShieldAlert, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface ExplanationViewProps {
  scenario: Scenario;
  evaluation: EvaluationResult;
}

export const ExplanationView: React.FC<ExplanationViewProps> = ({
  scenario,
  evaluation
}) => {
  return (
    <div className="space-y-6 text-xs text-slate-800">
      {/* Methodological Integrity Card */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <h3>Traçabilité Méthodologique & Contrat du Moteur (CADRAGE MD-01 à MD-09)</h3>
        </div>
        <p className="text-2xs text-slate-600 leading-relaxed">
          Le simulateur garantit une traçabilité totale entre données empiriques, identités comptables et hypothèses stratégiques. Chaque résultat provient d’une formule déterministe certifiée sans boîte noire.
        </p>

        {/* Provenance breakdown cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
            <span className="text-3xs font-bold uppercase tracking-wider block">1. Données Observées (DATA)</span>
            <div className="text-lg font-bold font-mono mt-0.5">{evaluation.provenanceSummary.dataCount}</div>
            <p className="text-3xs text-blue-700/80 mt-0.5">TVA 19%, Pfand 0.25€, COGS usine</p>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900">
            <span className="text-3xs font-bold uppercase tracking-wider block">2. Identités & Règles (MODEL)</span>
            <div className="text-lg font-bold font-mono mt-0.5">{evaluation.provenanceSummary.modelCount}</div>
            <p className="text-3xs text-purple-700/80 mt-0.5">Identités MD-05, cascade de marge</p>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
            <span className="text-3xs font-bold uppercase tracking-wider block">3. Hypothèses Posées (ASSUMPTION)</span>
            <div className="text-lg font-bold font-mono mt-0.5">{evaluation.provenanceSummary.assumptionCount}</div>
            <p className="text-3xs text-amber-700/80 mt-0.5">Niveau de demande, mix canaux, CAC</p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-900">
            <span className="text-3xs font-bold uppercase tracking-wider block">4. Repères Externes (EXTERNAL)</span>
            <div className="text-lg font-bold font-mono mt-0.5">{evaluation.provenanceSummary.externalCount}</div>
            <p className="text-3xs text-slate-600 mt-0.5">Benchmarks prix concurrents DE</p>
          </div>
        </div>
      </div>

      {/* Accounting & Financial Formulas */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
          Formules Explicites & Règles de Calcul
        </h4>

        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1 flex items-center justify-between">
              <span>CA Consommateur Brut (TTC) & Base Hors Consigne</span>
              <span className="text-3xs font-mono bg-slate-200 px-1.5 py-0.5 rounded">MD-05</span>
            </div>
            <code className="block bg-white p-2 rounded border border-slate-200 text-slate-800 font-mono text-2xs mb-1">
              Base_HT = (Prix_TTC − Pfand_0.25€) / (1 + Taux_TVA_19%)
            </code>
            <p className="text-3xs text-slate-500">
              La consigne de 0.25 € est neutre pour le compte de résultat de LUMEN (collectée puis reversée à l'organisme DPG). La TVA de 19% ne s'applique que sur la boisson.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1 flex items-center justify-between">
              <span>Revenu Net Encaissé & Marge Brute par Canal</span>
              <span className="text-3xs font-mono bg-slate-200 px-1.5 py-0.5 rounded">MD-05</span>
            </div>
            <code className="block bg-white p-2 rounded border border-slate-200 text-slate-800 font-mono text-2xs mb-1">
              Revenu_Net = Base_HT − (Marge_Retailer + Marge_Distributeur + Frais_Paiement)
              <br />
              Marge_Brute = Revenu_Net − (COGS_Matière + Frais_Fulfillment_3PL)
            </code>
            <p className="text-3xs text-slate-500">
              Les déductions sont calculées strictement sans double compte.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1 flex items-center justify-between">
              <span>Contribution Nette & Récupération Économique (Payback)</span>
              <span className="text-3xs font-mono bg-slate-200 px-1.5 py-0.5 rounded">MD-06</span>
            </div>
            <code className="block bg-white p-2 rounded border border-slate-200 text-slate-800 font-mono text-2xs mb-1">
              Contribution = Marge_Brute − Dépenses_Marketing
              <br />
              Solde_Cumulé(M) = −Investissement_Initial + ∑[Contribution(1..M)]
            </code>
            <p className="text-3xs text-slate-500">
              Le mois de récupération correspond au premier mois M où le solde cumulé devient positif (franchissement de zéro).
            </p>
          </div>
        </div>
      </div>

      {/* Warnings & Limits Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <h4>Réserves Méthodologiques Majeures</h4>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-2xs text-amber-900/90 leading-relaxed">
          <li>
            <strong>Absence de ventes allemandes observées :</strong> LUMEN n'a jamais commercialisé ses produits en Allemagne. Toutes les courbes de vente reposent sur des hypothèses transférées des Pays-Bas et de Scandinavie.
          </li>
          <li>
            <strong>Non-causalité du POC de prévision :</strong> Le modèle Ridge issu du POC mesure des corrélations historiques sur les marchés existants. Il ne doit en aucun cas être interprété comme une mesure causale de l’élasticité prix ou de l’effet marketing en Allemagne.
          </li>
          <li>
            <strong>Refus des faux intervalles statistiques :</strong> Le simulateur refuse d'afficher des bandes de confiance artificielles (type "± WAPE"). L'incertitude est représentée par des scénarios discrets (Prudent, Central, Favorable).
          </li>
        </ul>
      </div>
    </div>
  );
};
