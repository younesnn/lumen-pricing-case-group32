import { Scenario } from '../types/simulator';

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 'demo-dtc',
    name: 'Option A : Lancement DTC Prioritaire',
    revision: 'v1.2',
    description: 'Stratégie axée sur le digital avec marge unitaire élevée, apprentissage direct des consommateurs urbains allemands avant montée en grande distribution.',
    country: 'DE',
    launchDate: '2026-07-01',
    horizonMonths: 12,
    status: 'evaluated',
    mode: 'A',
    commercialA: {
      level: {
        value: 12000,
        unit: 'canettes/mois',
        kind: 'ASSUMPTION',
        source: 'Hypothèse transfert NL ajustée population urbaine cible',
        accepted: true
      },
      mix: {
        'DTC Online': {
          value: 0.60,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Choix stratégique comité Freya - Focus marge initiale',
          accepted: true
        },
        'Retail/Grocery': {
          value: 0.40,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Partenariat pilote 50 magasins bio/urbains Berlin & Munich',
          accepted: true
        }
      },
      ramp: {
        'DTC Online': [0.4, 0.6, 0.75, 0.85, 0.95, 1.0, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25],
        'Retail/Grocery': [0.2, 0.35, 0.5, 0.7, 0.85, 1.0, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2]
      },
      // 12 monthly factors for German season (peak in summer months Jul-Aug, dip in Jan)
      seasonProfile: [1.25, 1.30, 1.10, 0.95, 0.85, 0.80, 0.75, 0.85, 1.00, 1.10, 1.20, 1.25]
    },
    marketingBudgets: {
      'Digital Ads (Meta/TikTok)': [4500, 4000, 3500, 3000, 2500, 2500, 2000, 2000, 2500, 2500, 3000, 3000],
      'Influence & Créateurs DE': [3000, 2500, 2000, 1500, 1000, 1000, 800, 800, 1200, 1500, 1800, 2000],
      'Événements & Échantillonnage': [2500, 1500, 1000, 500, 500, 500, 400, 400, 800, 1000, 1200, 1500]
    },
    economics: {
      convention: 'gross_with_vat_and_deposit',
      vatRate: {
        value: 0.19,
        unit: 'ratio',
        kind: 'DATA',
        source: 'Code fiscal allemand (MwSt 19% sur boissons rafraîchissantes)',
        accepted: true
      },
      depositPfand: {
        value: 0.25,
        unit: 'EUR/canette',
        kind: 'DATA',
        source: 'Législation fédérale Einwegpfand obligatoire',
        accepted: true
      },
      fixedCostsMonthly: {
        value: 4500,
        unit: 'EUR/mois',
        kind: 'ASSUMPTION',
        source: 'Quote-part logistique Allemagne, service client DE et conformité légale',
        accepted: true
      },
      prelaunchInvestment: {
        value: 35000,
        unit: 'EUR',
        kind: 'ASSUMPTION',
        source: 'Packaging spécifique DPG Pfand, traductions DE et campagnes pré-lancement',
        accepted: true
      },
      channels: {
        'DTC Online': {
          price: {
            value: 2.49,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Enquête Van Westendorp DE - Prix acceptable optimal',
            accepted: true
          },
          retailerCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Modèle direct-to-consumer (pas de distributeur)',
            accepted: true
          },
          distributorCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Modèle direct-to-consumer',
            accepted: true
          },
          paymentFee: {
            value: 0.025,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Contrat Stripe / PayPal Europe 2.5%',
            accepted: true
          },
          fulfillment: {
            value: 0.45,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: '3PL logistique Cologne (pack 12 unitaire ramené à la canette)',
            accepted: true
          },
          cogs: {
            value: 0.62,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Fiche de coût unitaire LUMEN (ingrédients adaptogènes + canette aluminium)',
            accepted: true
          }
        },
        'Retail/Grocery': {
          price: {
            value: 2.19,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Benchmark concurrentiel face aux energy drinks premium en Allemagne',
            accepted: true
          },
          retailerCut: {
            value: 0.28,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Négociation cible enseignes bio / supermarchés premium 28%',
            accepted: true
          },
          distributorCut: {
            value: 0.08,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Grossiste boissons DE (8% sur prix de cession grossiste)',
            accepted: true
          },
          paymentFee: {
            value: 0.005,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Frais bancaires virement B2B',
            accepted: true
          },
          fulfillment: {
            value: 0.15,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Transport palette vers entrepôt central distributeur',
            accepted: true
          },
          cogs: {
            value: 0.62,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Fiche de coût unitaire LUMEN',
            accepted: true
          }
        }
      }
    },
    createdAt: '2026-09-10T14:30:00Z',
    updatedAt: '2026-09-14T12:00:00Z'
  },
  {
    id: 'demo-retail',
    name: 'Option B : Volume & Pénétration Retail',
    revision: 'v1.0',
    description: 'Stratégie de volume avec référencement agressif en supermarchés et pricing compétitif (2.09 €), absorption rapide des coûts fixes mais marge unitaire plus faible.',
    country: 'DE',
    launchDate: '2026-07-01',
    horizonMonths: 12,
    status: 'evaluated',
    mode: 'A',
    commercialA: {
      level: {
        value: 22000,
        unit: 'canettes/mois',
        kind: 'ASSUMPTION',
        source: 'Hypothèse présence 250 points de vente Rewe/Edeka',
        accepted: true
      },
      mix: {
        'DTC Online': {
          value: 0.25,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Vente directe en support de notoriété',
          accepted: true
        },
        'Retail/Grocery': {
          value: 0.75,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Dominance retail physique',
          accepted: true
        }
      },
      ramp: {
        'DTC Online': [0.3, 0.5, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.05, 1.1, 1.15, 1.2],
        'Retail/Grocery': [0.3, 0.5, 0.7, 0.85, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35]
      },
      seasonProfile: [1.25, 1.30, 1.10, 0.95, 0.85, 0.80, 0.75, 0.85, 1.00, 1.10, 1.20, 1.25]
    },
    marketingBudgets: {
      'Trade Marketing (Tête de gondole)': [5000, 4500, 3500, 2500, 2000, 2000, 1500, 1500, 2000, 2500, 3000, 3000],
      'Digital & Influence Ciblée': [3000, 2500, 2000, 1500, 1200, 1000, 1000, 1000, 1200, 1500, 1800, 2000],
      'Sampling en magasins': [4000, 3000, 2000, 1000, 800, 800, 600, 600, 1000, 1200, 1500, 1800]
    },
    economics: {
      convention: 'gross_with_vat_and_deposit',
      vatRate: {
        value: 0.19,
        unit: 'ratio',
        kind: 'DATA',
        source: 'MwSt 19%',
        accepted: true
      },
      depositPfand: {
        value: 0.25,
        unit: 'EUR/canette',
        kind: 'DATA',
        source: 'Einwegpfand 0.25€',
        accepted: true
      },
      fixedCostsMonthly: {
        value: 5800,
        unit: 'EUR/mois',
        kind: 'ASSUMPTION',
        source: 'Gestion grands comptes GMS et audit logistique',
        accepted: true
      },
      prelaunchInvestment: {
        value: 50000,
        unit: 'EUR',
        kind: 'ASSUMPTION',
        source: 'Frais de référencement (listing fees) et stocks de consignation',
        accepted: true
      },
      channels: {
        'DTC Online': {
          price: {
            value: 2.29,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Alignement proche retail pour éviter le conflit de canal',
            accepted: true
          },
          retailerCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Vente directe',
            accepted: true
          },
          distributorCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Vente directe',
            accepted: true
          },
          paymentFee: {
            value: 0.025,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Stripe 2.5%',
            accepted: true
          },
          fulfillment: {
            value: 0.45,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: '3PL Cologne',
            accepted: true
          },
          cogs: {
            value: 0.60,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Économies d’échelle sur lots de production',
            accepted: true
          }
        },
        'Retail/Grocery': {
          price: {
            value: 2.09,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Prix de combat face aux sodas fonctionnels concurrents',
            accepted: true
          },
          retailerCut: {
            value: 0.32,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Marge distributeur négociée avec centrale d’achat 32%',
            accepted: true
          },
          distributorCut: {
            value: 0.08,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Grossiste logistique 8%',
            accepted: true
          },
          paymentFee: {
            value: 0.005,
            unit: 'ratio',
            kind: 'DATA',
            source: 'B2B 0.5%',
            accepted: true
          },
          fulfillment: {
            value: 0.12,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Logistique palettes mutualisées',
            accepted: true
          },
          cogs: {
            value: 0.60,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'COGS optimisé volume',
            accepted: true
          }
        }
      }
    },
    createdAt: '2026-09-11T09:15:00Z',
    updatedAt: '2026-09-13T17:45:00Z'
  },
  {
    id: 'demo-premium',
    name: 'Option C : Niche Premium & Santé',
    revision: 'v1.0',
    description: 'Positionnement résolument haut de gamme (2.79 €) ciblant les salles de sport boutique, studios de yoga et épiceries fines, avec une marge unitaire maximale.',
    country: 'DE',
    launchDate: '2026-07-01',
    horizonMonths: 12,
    status: 'evaluated',
    mode: 'A',
    commercialA: {
      level: {
        value: 7500,
        unit: 'canettes/mois',
        kind: 'ASSUMPTION',
        source: 'Hypothèse volume sélectif et exclusif',
        accepted: true
      },
      mix: {
        'DTC Online': {
          value: 0.50,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Abonnements récurrents DTC',
          accepted: true
        },
        'Retail/Grocery': {
          value: 0.50,
          unit: 'ratio',
          kind: 'ASSUMPTION',
          source: 'Canal spécialisé fitness / épicerie bio',
          accepted: true
        }
      },
      ramp: {
        'DTC Online': [0.5, 0.65, 0.8, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3],
        'Retail/Grocery': [0.4, 0.55, 0.7, 0.85, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3]
      },
      seasonProfile: [1.20, 1.25, 1.10, 0.95, 0.85, 0.80, 0.75, 0.85, 1.00, 1.10, 1.20, 1.25]
    },
    marketingBudgets: {
      'Partenariats Coachs & Studios': [3000, 2500, 2000, 1500, 1200, 1000, 1000, 1000, 1200, 1500, 1800, 2000],
      'Événements Hyrox & Bien-être': [3500, 2500, 1500, 800, 600, 600, 500, 500, 800, 1200, 1500, 2000],
      'Brand Content & Presse': [2000, 1500, 1000, 800, 600, 600, 500, 500, 600, 800, 1000, 1200]
    },
    economics: {
      convention: 'gross_with_vat_and_deposit',
      vatRate: {
        value: 0.19,
        unit: 'ratio',
        kind: 'DATA',
        source: 'MwSt 19%',
        accepted: true
      },
      depositPfand: {
        value: 0.25,
        unit: 'EUR/canette',
        kind: 'DATA',
        source: 'Einwegpfand 0.25€',
        accepted: true
      },
      fixedCostsMonthly: {
        value: 3800,
        unit: 'EUR/mois',
        kind: 'ASSUMPTION',
        source: 'Structure légère et ciblée',
        accepted: true
      },
      prelaunchInvestment: {
        value: 28000,
        unit: 'EUR',
        kind: 'ASSUMPTION',
        source: 'Packaging premium texturé et relations presse',
        accepted: true
      },
      channels: {
        'DTC Online': {
          price: {
            value: 2.79,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Plafond d’acceptabilité Van Westendorp pour profil bio/santé',
            accepted: true
          },
          retailerCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Vente directe',
            accepted: true
          },
          distributorCut: {
            value: 0.0,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Vente directe',
            accepted: true
          },
          paymentFee: {
            value: 0.025,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Stripe 2.5%',
            accepted: true
          },
          fulfillment: {
            value: 0.45,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: '3PL Cologne',
            accepted: true
          },
          cogs: {
            value: 0.65,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Certification biologique et canette imprimée mate',
            accepted: true
          }
        },
        'Retail/Grocery': {
          price: {
            value: 2.59,
            unit: 'EUR/canette',
            kind: 'ASSUMPTION',
            source: 'Prix de vente sélectif en boutique bio et fitness',
            accepted: true
          },
          retailerCut: {
            value: 0.30,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Marge boutique spécialisée 30%',
            accepted: true
          },
          distributorCut: {
            value: 0.07,
            unit: 'ratio',
            kind: 'DATA',
            source: 'Grossiste bio 7%',
            accepted: true
          },
          paymentFee: {
            value: 0.005,
            unit: 'ratio',
            kind: 'DATA',
            source: 'B2B 0.5%',
            accepted: true
          },
          fulfillment: {
            value: 0.18,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'Livraisons urbaines ciblées',
            accepted: true
          },
          cogs: {
            value: 0.65,
            unit: 'EUR/canette',
            kind: 'DATA',
            source: 'COGS premium',
            accepted: true
          }
        }
      }
    },
    createdAt: '2026-09-12T11:00:00Z',
    updatedAt: '2026-09-14T08:30:00Z'
  }
];
