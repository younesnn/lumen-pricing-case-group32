export interface EvidenceItem {
  id: string;
  exhibitNumber: number;
  title: string;
  filename: string;
  category: 'Marché' | 'Prix & Concurrence' | 'Consommateurs & Enquêtes' | 'Historique & Ventes' | 'Économie & Coûts' | 'Saisonnalité';
  status: 'DATA_DISPONIBLE' | 'ANALYSE_QUALIFIEE' | 'TRANSFERT_HYPOTHETIQUE';
  provenance: string;
  keyInsights: string[];
  caveats: string;
  metricsSample?: Record<string, string | number>;
}

export const EVIDENCE_CATALOG: EvidenceItem[] = [
  {
    id: 'ex-1',
    exhibitNumber: 1,
    title: 'Contexte de Marché & Taille de Marché Allemagne (2022-2027)',
    filename: 'market_context.csv',
    category: 'Marché',
    status: 'DATA_DISPONIBLE',
    provenance: 'Études sectorielles Euromonitor / Statista Allemagne',
    keyInsights: [
      'Marché des boissons fonctionnelles en Allemagne estimé à 1.45 Mrd € en 2026 (CAGR +8.2%).',
      'Concentration géographique initiale : Berlin, Munich, Hambourg et Cologne représentent 48% de la consommation de boissons bien-être/nootropiques.',
      'Le segment "Focus & Clean Energy" croît 2x plus vite que les sodas traditionnels.'
    ],
    caveats: 'Données macroéconomiques globales ; ne garantit pas la part de marché accessible à un nouvel entrant.',
    metricsSample: {
      'Taille de marché DE 2026': '1 450 M€',
      'Croissance annuelle (CAGR)': '+8.2%',
      'Part Top 4 métropoles': '48%',
      'Cible démographique clé': '22-38 ans urbains actifs'
    }
  },
  {
    id: 'ex-2',
    exhibitNumber: 2,
    title: 'Prix Concurrents par Canal & Format de Pack',
    filename: 'competitor_prices_by_channel.csv',
    category: 'Prix & Concurrence',
    status: 'DATA_DISPONIBLE',
    provenance: 'Relevé terrain linéaire & web scraping Q2 2026 (Allemagne)',
    keyInsights: [
      'Compétiteurs directs observés : CleanEnergy (2.19 €), FocusSpark (2.49 €), NootroPop (2.69 €), BioBoost (1.99 €).',
      'Format canette standard 250ml et 330ml.',
      'En DTC web, les marques pratiquent le pack 12 ou 24 avec un prix unitaire moyen de 2.30 € à 2.60 €.'
    ],
    caveats: 'Prix affichés TTC avec consigne variable selon référencement.',
    metricsSample: {
      'Fourchette Retail': '1.99 € – 2.69 €',
      'Prix médian canal bio': '2.49 €',
      'Prix pack DTC 12': '28.90 € (2.40 €/u)',
      'Écart max constaté': '0.70 €'
    }
  },
  {
    id: 'ex-4',
    exhibitNumber: 4,
    title: 'Enquête Consommateurs Allemagne (N=420 répondants)',
    filename: 'customer_survey.csv',
    category: 'Consommateurs & Enquêtes',
    status: 'ANALYSE_QUALIFIEE',
    provenance: 'Panel en ligne échantillon représentatif urbain Allemagne',
    keyInsights: [
      'Intention d’achat déclarée : 64% sur le profil "Focus sans crash de caféine".',
      'Canal d’achat préféré : 52% Supermarchés (Rewe/Edeka), 26% Bio/Spécialisé, 22% DTC Web.',
      'Importance des labels : 78% exigent l’absence de sucre raffiné et la consigne Pfand recyclable.'
    ],
    caveats: 'Biais d’intention déclarée vs achat effectif ; le taux de transformation réel est typiquement 3 à 5 fois inférieur à l’intention sondée.',
    metricsSample: {
      'Échantillon analysé': '420 répondants',
      'Intention favorable': '64.2%',
      'Préférence GMS': '52.1%',
      'Sensibilité ingrédients bio': '71.5%'
    }
  },
  {
    id: 'ex-6',
    exhibitNumber: 6,
    title: 'Historique des Ventes Hebdomadaires LUMEN (NL, DK, SE)',
    filename: 'historical_sales_weekly.csv',
    category: 'Historique & Ventes',
    status: 'TRANSFERT_HYPOTHETIQUE',
    provenance: 'Système ERP LUMEN — 78 semaines sur Pays-Bas, Danemark et Suède',
    keyInsights: [
      'Aux Pays-Bas : volume moyen à maturité de 14 200 canettes/mois après 10 mois de présence.',
      'Mix canal moyen observé aux Pays-Bas : 58% DTC, 42% partenaires retail.',
      'Forte récurrence d’achat en DTC (taux de réachat à 60 jours de 34%).'
    ],
    caveats: 'AUCUNE DONNÉE DE VENTE EN ALLEMAGNE. Les chiffres scandinaves et néerlandais ne constituent pas une prévision causale pour l’Allemagne.',
    metricsSample: {
      'Historique disponible': '78 semaines',
      'Marchés sources': 'NL, DK, SE',
      'Ventes Allemagne observées': '0 (marché vierge)',
      'Rôle pour le simulateur': 'Profil saisonnier & ratio de mix'
    }
  },
  {
    id: 'ex-8',
    exhibitNumber: 8,
    title: 'Décomposition des Coûts Unitaires LUMEN (COGS)',
    filename: 'cost_breakdown.csv',
    category: 'Économie & Coûts',
    status: 'DATA_DISPONIBLE',
    provenance: 'Comptabilité analytique industrielle LUMEN (usine partenaire Autriche)',
    keyInsights: [
      'Canette aluminium imprimée : 0.18 €.',
      'Formulation liquide & adaptogènes (Lion’s Mane, L-Théanine) : 0.29 €.',
      'Mise en canette, pasteurisation & carton : 0.15 €.',
      'Coût de revient matière total (COGS direct) : 0.62 € / canette.'
    ],
    caveats: 'Prix garanti pour des commandes supérieures à 50 000 unités/an ; risque de surcoût de 0.05 € sur petits lots initiaux.',
    metricsSample: {
      'COGS unitaire de base': '0.62 €',
      'Part formulation active': '46.8%',
      'Part emballage': '29.0%',
      'Frais d’embouteillage': '24.2%'
    }
  },
  {
    id: 'ex-9',
    exhibitNumber: 9,
    title: 'Économie par Canal & Déductions Réglementaires DE',
    filename: 'channel_economics.csv',
    category: 'Économie & Coûts',
    status: 'DATA_DISPONIBLE',
    provenance: 'Conditions contractuelles distributeurs et réglementation fiscale allemande',
    keyInsights: [
      'TVA allemande (MwSt) : 19% applicable sur les boissons énergisantes et rafraîchissantes.',
      'Consigne Einwegpfand obligatoire DPG : 0.25 € / canette, collectée et restituée neutre.',
      'Marge GMS (Retail) : 28% à 32% selon le volume et la centrale d’achat.',
      'Frais logistiques 3PL Cologne : 0.45 € par canette expédiée en direct (pack de 12).'
    ],
    caveats: 'Les contrats avec les centrales d’achat retail peuvent inclure des pénalités de rupture de stock.',
    metricsSample: {
      'Taux TVA légale DE': '19.0%',
      'Consigne DPG': '0.25 €',
      'Fulfillment DTC unitaire': '0.45 €',
      'Commission Stripe DTC': '2.5%'
    }
  },
  {
    id: 'ex-10',
    exhibitNumber: 10,
    title: 'Enquête Sensibilité aux Prix Van Westendorp (N=300)',
    filename: 'price_sensitivity_survey.csv',
    category: 'Prix & Concurrence',
    status: 'ANALYSE_QUALIFIEE',
    provenance: 'Enquête méthodologique 4 seuils (Trop bon marché, Bon marché, Cher, Trop cher)',
    keyInsights: [
      'Point de prix optimal (OPP) identifié à 2.19 € TTC.',
      'Point d’indifférence (IPP) à 2.39 € TTC.',
      'Plafond d’acceptabilité (Point de cherté extrême) : 2.79 € TTC.',
      'Plancher de méfiance (doute sur la qualité si < 1.69 €).'
    ],
    caveats: 'L’élasticité mesurée en sondage surestime généralement la tolérance au prix par rapport à un rayon réel.',
    metricsSample: {
      'Prix optimal (OPP)': '2.19 €',
      'Prix indifférence (IPP)': '2.39 €',
      'Plage acceptable': '1.79 € – 2.59 €',
      'Plafond max': '2.79 €'
    }
  },
  {
    id: 'ex-12',
    exhibitNumber: 12,
    title: 'Indice de Saisonnalité & Températures Allemagne',
    filename: 'seasonality_and_weather.csv',
    category: 'Saisonnalité',
    status: 'ANALYSE_QUALIFIEE',
    provenance: 'Deutscher Wetterdienst (DWD) & corrélations ventes boissons fraîches DE',
    keyInsights: [
      'Pic estival marqué en juillet et août (indices 1.25 et 1.30).',
      'Creux hivernal en décembre et janvier (indice 0.75 à 0.80).',
      'Un lancement en juillet maximise la traction initiale et le buzz de démarrage.'
    ],
    caveats: 'Variations météorologiques imprévisibles d’une année sur l’autre (été caniculaire vs pluvieux).',
    metricsSample: {
      'Indice max (Août)': '1.30',
      'Indice min (Janvier)': '0.75',
      'Écart saisonnier': '1.73x',
      'Mois recommandé': 'Juillet 2026'
    }
  }
];
