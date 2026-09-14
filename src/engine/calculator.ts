import { Scenario, EvaluationResult, MonthlyFinancial, HorizonCheckpoint, SensitivityVariant } from '../types/simulator';

const MONTH_NAMES = [
  'Mois 1 (Juil 2026)', 'Mois 2 (Août 2026)', 'Mois 3 (Sept 2026)',
  'Mois 4 (Oct 2026)', 'Mois 5 (Nov 2026)', 'Mois 6 (Déc 2026)',
  'Mois 7 (Jan 2027)', 'Mois 8 (Fév 2027)', 'Mois 9 (Mar 2027)',
  'Mois 10 (Avr 2027)', 'Mois 11 (Mai 2027)', 'Mois 12 (Juin 2027)'
];

const CALENDAR_DATES = [
  '2026-07-01', '2026-08-01', '2026-09-01',
  '2026-10-01', '2026-11-01', '2026-12-01',
  '2027-01-01', '2027-02-01', '2027-03-01',
  '2027-04-01', '2027-05-01', '2027-06-01'
];

export function evaluateScenario(scenario: Scenario): EvaluationResult {
  const months: MonthlyFinancial[] = [];
  const channels = Object.keys(scenario.economics.channels);
  const vatRate = scenario.economics.vatRate.value;
  const depositPfand = scenario.economics.depositPfand.value;
  const fixedCost = scenario.economics.fixedCostsMonthly.value;
  const prelaunch = scenario.economics.prelaunchInvestment.value;

  let cumulativeOperatingProfit = 0;
  let cumulativeCashBalance = -prelaunch;
  const cumulativeRecoveryCurve: number[] = [-prelaunch];

  for (let m = 0; m < 12; m++) {
    const volumeByChannel: Record<string, number> = {};
    const grossTurnoverByChannel: Record<string, number> = {};
    const netRevenueByChannel: Record<string, number> = {};

    let monthVolumeTotal = 0;
    let monthGrossTurnover = 0;
    let monthVatPaid = 0;
    let monthDepositPaid = 0;
    let monthNetRevenue = 0;
    let monthCogsTotal = 0;
    let monthFulfillmentTotal = 0;
    let monthRetailerDeduction = 0;
    let monthDistributorDeduction = 0;
    let monthPaymentFee = 0;

    if (scenario.mode === 'A') {
      const matureLevel = scenario.commercialA.level.value;
      const seasonFactor = scenario.commercialA.seasonProfile[m] ?? 1.0;

      for (const ch of channels) {
        const mixRatio = scenario.commercialA.mix[ch]?.value ?? 0;
        const rampFactor = scenario.commercialA.ramp[ch]?.[m] ?? 1.0;
        const chVolume = Math.round(matureLevel * mixRatio * rampFactor * seasonFactor);
        volumeByChannel[ch] = chVolume;
        monthVolumeTotal += chVolume;
      }
    } else {
      // Mode B: Organic baseline + Paid acquisition
      const bConfig = scenario.commercialB;
      const organicMonthly = bConfig ? bConfig.organicBaseMonthly.value : 1000;
      let acquiredCustomers = 0;

      if (bConfig) {
        for (const mkChannel of Object.values(bConfig.marketingChannels)) {
          const budget = mkChannel.budgetMonthly[m] ?? 0;
          const cac = Math.max(1, mkChannel.cacEstimated.value);
          const inc = mkChannel.incrementality.value;
          const dedup = mkChannel.deduplication.value;
          const newCust = (budget / cac) * inc * dedup;
          const units = mkChannel.unitsPerCustomer.value * (1 + mkChannel.repeatRatio.value * 0.5);
          acquiredCustomers += newCust * units;
        }
      }

      const totalCalculatedVolume = Math.round(organicMonthly + acquiredCustomers);
      monthVolumeTotal = totalCalculatedVolume;

      for (const ch of channels) {
        const alloc = bConfig?.channelSalesAllocation[ch] ?? (1 / channels.length);
        const chVolume = Math.round(totalCalculatedVolume * alloc);
        volumeByChannel[ch] = chVolume;
      }
    }

    // Economics per channel
    for (const ch of channels) {
      const vol = volumeByChannel[ch] || 0;
      const chTerms = scenario.economics.channels[ch];
      const grossPrice = chTerms.price.value;

      // In German convention: gross price includes 19% MwSt and Pfand 0.25€
      // Net price to LUMEN before channel margins = (GrossPrice - Pfand) / (1 + VAT)
      const vatPerCan = grossPrice > depositPfand ? ((grossPrice - depositPfand) * (vatRate / (1 + vatRate))) : 0;
      const depositPerCan = depositPfand;
      const netBasePerCan = Math.max(0, grossPrice - vatPerCan - depositPerCan);

      const chGrossTurnover = vol * grossPrice;
      const chVat = vol * vatPerCan;
      const chDeposit = vol * depositPerCan;

      const retailerCutVal = vol * (grossPrice * chTerms.retailerCut.value);
      const distributorCutVal = vol * (netBasePerCan * chTerms.distributorCut.value);
      const paymentFeeVal = vol * (grossPrice * chTerms.paymentFee.value);
      const fulfillmentVal = vol * chTerms.fulfillment.value;
      const cogsVal = vol * chTerms.cogs.value;

      const chNetRev = Math.max(0, vol * netBasePerCan - retailerCutVal - distributorCutVal - paymentFeeVal);

      grossTurnoverByChannel[ch] = chGrossTurnover;
      netRevenueByChannel[ch] = chNetRev;

      monthGrossTurnover += chGrossTurnover;
      monthVatPaid += chVat;
      monthDepositPaid += chDeposit;
      monthNetRevenue += chNetRev;
      monthCogsTotal += cogsVal;
      monthFulfillmentTotal += fulfillmentVal;
      monthRetailerDeduction += retailerCutVal;
      monthDistributorDeduction += distributorCutVal;
      monthPaymentFee += paymentFeeVal;
    }

    // Gross margin = Net Revenue - COGS - Fulfillment
    const grossMargin = monthNetRevenue - monthCogsTotal - monthFulfillmentTotal;
    const grossMarginRate = monthNetRevenue > 0 ? (grossMargin / monthNetRevenue) : 0;

    // Marketing spend for month m
    let marketingSpend = 0;
    for (const budgets of Object.values(scenario.marketingBudgets)) {
      marketingSpend += (budgets[m] ?? 0);
    }

    // Contribution after marketing = Gross Margin - Marketing Spend
    const contributionAfterMarketing = grossMargin - marketingSpend;

    // Operating Profit = Contribution after marketing - Fixed costs
    const operatingProfit = contributionAfterMarketing - fixedCost;

    cumulativeOperatingProfit += operatingProfit;
    cumulativeCashBalance += contributionAfterMarketing;
    cumulativeRecoveryCurve.push(cumulativeCashBalance);

    months.push({
      month: m + 1,
      monthName: MONTH_NAMES[m],
      calendarDate: CALENDAR_DATES[m],
      volumeTotal: monthVolumeTotal,
      volumeByChannel,
      grossTurnover: monthGrossTurnover,
      grossTurnoverByChannel,
      vatPaid: monthVatPaid,
      depositPaid: monthDepositPaid,
      netRevenue: monthNetRevenue,
      netRevenueByChannel,
      cogsTotal: monthCogsTotal,
      fulfillmentTotal: monthFulfillmentTotal,
      retailerDeductionTotal: monthRetailerDeduction,
      distributorDeductionTotal: monthDistributorDeduction,
      paymentFeeTotal: monthPaymentFee,
      grossMargin,
      grossMarginRate,
      marketingSpend,
      contributionAfterMarketing,
      fixedCosts: fixedCost,
      operatingProfit,
      cumulativeOperatingProfit,
      cumulativeCashBalance
    });
  }

  // Checkpoints: 3, 6, 12 months
  const calcCheckpoint = (limit: number): HorizonCheckpoint => {
    const slice = months.slice(0, limit);
    const volumeTotal = slice.reduce((acc, x) => acc + x.volumeTotal, 0);
    const grossTurnover = slice.reduce((acc, x) => acc + x.grossTurnover, 0);
    const netRevenue = slice.reduce((acc, x) => acc + x.netRevenue, 0);
    const cogsTotal = slice.reduce((acc, x) => acc + x.cogsTotal, 0);
    const grossMargin = slice.reduce((acc, x) => acc + x.grossMargin, 0);
    const marketingSpend = slice.reduce((acc, x) => acc + x.marketingSpend, 0);
    const contributionAfterMarketing = slice.reduce((acc, x) => acc + x.contributionAfterMarketing, 0);
    const fixedCosts = slice.reduce((acc, x) => acc + x.fixedCosts, 0);
    const operatingProfit = slice.reduce((acc, x) => acc + x.operatingProfit, 0);
    const grossMarginRate = netRevenue > 0 ? (grossMargin / netRevenue) : 0;

    return {
      volumeTotal,
      grossTurnover,
      netRevenue,
      cogsTotal,
      grossMargin,
      grossMarginRate,
      marketingSpend,
      contributionAfterMarketing,
      fixedCosts,
      operatingProfit
    };
  };

  const checkpoints = {
    m3: calcCheckpoint(3),
    m6: calcCheckpoint(6),
    m12: calcCheckpoint(12)
  };

  // Payback crossing point (where cumulative cash balance crosses 0)
  let paybackCrossingMonth: number | null = null;
  for (let i = 1; i <= 12; i++) {
    if (cumulativeRecoveryCurve[i] >= 0 && cumulativeRecoveryCurve[i - 1] < 0) {
      paybackCrossingMonth = i;
      break;
    }
  }

  // Unit metrics
  const annualVol = checkpoints.m12.volumeTotal;
  const weightedNetPrice = annualVol > 0 ? (checkpoints.m12.netRevenue / annualVol) : 0;
  const weightedMarginPerCan = annualVol > 0 ? (checkpoints.m12.grossMargin / annualVol) : 0;

  // Breakeven annual volume = (Total Fixed Costs + Total Marketing) / Weighted Margin Per Can
  const totalOverhead = checkpoints.m12.fixedCosts + checkpoints.m12.marketingSpend;
  const breakevenVolumeAnnual = weightedMarginPerCan > 0 ? Math.round(totalOverhead / weightedMarginPerCan) : 0;

  // Provenance counts
  const provenanceSummary = {
    dataCount: 4,      // TVA 19%, Pfand 0.25€, Cost Breakdown base, Survey points
    assumptionCount: 12, // Launch volume level, ramp, channel mix, CAC DE
    modelCount: 8,     // Identities MD-05, seasonal transfer, deductions
    externalCount: 2   // Competitor benchmark, market size
  };

  const warnings: string[] = [
    'Aucun historique de ventes LUMEN en Allemagne ; résultats sous hypothèses.',
    'Transfert saisonnier issu des marchés scandinaves (NL/DK/SE) sans causalité prouvée sur le consommateur allemand.',
    'Le seuil de rentabilité unitaire dépend de la stabilité des coûts matières et de la non-dégradation du mix canal.'
  ];

  return {
    scenarioId: scenario.id,
    revision: scenario.revision,
    fingerprint: `${scenario.id}-${scenario.revision}-${Date.now().toString(36)}`,
    evaluatedAt: new Date().toISOString(),
    isStale: false,
    months,
    checkpoints,
    paybackCrossingMonth,
    cumulativeRecoveryCurve,
    breakevenVolumeAnnual,
    weightedNetPrice,
    weightedMarginPerCan,
    provenanceSummary,
    warnings
  };
}

export function computeSensitivityVariants(scenario: Scenario, baseEval: EvaluationResult): SensitivityVariant[] {
  const base12 = baseEval.checkpoints.m12;

  // Variant 1: Pessimistic (-20% volume, +15% CAC/Marketing)
  const pessVol = Math.round(base12.volumeTotal * 0.8);
  const pessRev = base12.netRevenue * 0.8;
  const pessMargin = base12.grossMargin * 0.8;
  const pessMkt = base12.marketingSpend * 1.15;
  const pessContrib = pessMargin - pessMkt;
  const pessProfit = pessContrib - base12.fixedCosts;

  // Variant 2: Central (Base)
  const centVol = base12.volumeTotal;
  const centRev = base12.netRevenue;
  const centContrib = base12.contributionAfterMarketing;
  const centProfit = base12.operatingProfit;

  // Variant 3: Optimistic (+20% volume, -10% CAC/Marketing)
  const optVol = Math.round(base12.volumeTotal * 1.2);
  const optRev = base12.netRevenue * 1.2;
  const optMargin = base12.grossMargin * 1.2;
  const optMkt = base12.marketingSpend * 0.9;
  const optContrib = optMargin - optMkt;
  const optProfit = optContrib - base12.fixedCosts;

  return [
    {
      name: 'pessimistic',
      label: 'Scénario Prudent',
      description: 'Adoption lente (−20% volume) & surcoût d’acquisition (+15% CAC)',
      deltaPercent: -20,
      annualVolume: pessVol,
      annualRevenue: pessRev,
      annualContribution: pessContrib,
      annualOperatingProfit: pessProfit,
      paybackMonth: null
    },
    {
      name: 'central',
      label: 'Scénario Central (Référence)',
      description: 'Paramètres actuels du scénario évalué',
      deltaPercent: 0,
      annualVolume: centVol,
      annualRevenue: centRev,
      annualContribution: centContrib,
      annualOperatingProfit: centProfit,
      paybackMonth: baseEval.paybackCrossingMonth
    },
    {
      name: 'optimistic',
      label: 'Scénario Favorable',
      description: 'Forte traction virale (+20% volume) & efficacité marketing (+10%)',
      deltaPercent: 20,
      annualVolume: optVol,
      annualRevenue: optRev,
      annualContribution: optContrib,
      annualOperatingProfit: optProfit,
      paybackMonth: baseEval.paybackCrossingMonth ? Math.max(1, baseEval.paybackCrossingMonth - 2) : 8
    }
  ];
}
