export interface EvidenceItem {
  id: string;
  exhibitNumber: number;
  title: string;
  filename: string;
  category: 'Market' | 'Pricing & Competition' | 'Consumers & Surveys' | 'Sales History' | 'Economics & Costs' | 'Seasonality';
  status: 'DATA_AVAILABLE' | 'QUALIFIED_ANALYSIS' | 'HYPOTHETICAL_TRANSFER';
  provenance: string;
  keyInsights: string[];
  caveats: string;
  metricsSample?: Record<string, string | number>;
}

export const EVIDENCE_CATALOG: EvidenceItem[] = [
  {
    id: 'ex-1',
    exhibitNumber: 1,
    title: 'Market Context & German Market Size (2022-2027)',
    filename: 'market_context.csv',
    category: 'Market',
    status: 'DATA_AVAILABLE',
    provenance: 'Sector studies from Euromonitor / Statista Germany',
    keyInsights: [
      'German functional beverage market estimated at €1.45B in 2026 (CAGR +8.2%).',
      'Initial geographic concentration: Berlin, Munich, Hamburg, and Cologne represent 48% of wellness/nootropic beverage consumption.',
      'The "Focus & Clean Energy" segment grows 2x faster than traditional sodas.'
    ],
    caveats: 'Macroeconomic market data; does not guarantee the accessible market share for a new entrant.',
    metricsSample: {
      'DE Market Size 2026': '€1,450M',
      'Annual Growth (CAGR)': '+8.2%',
      'Top 4 Metro Share': '48%',
      'Key Demographic': '22-38 year old active urbanites'
    }
  },
  {
    id: 'ex-2',
    exhibitNumber: 2,
    title: 'Competitor Pricing by Channel & Pack Format',
    filename: 'competitor_prices_by_channel.csv',
    category: 'Pricing & Competition',
    status: 'DATA_AVAILABLE',
    provenance: 'Retail shelf audits & web scraping Q2 2026 (Germany)',
    keyInsights: [
      'Direct competitors observed: CleanEnergy (€2.19), FocusSpark (€2.49), NootroPop (€2.69), BioBoost (€1.99).',
      'Standard formats: 250ml and 330ml cans.',
      'In DTC online, brands typically offer 12-packs or 24-packs at an average unit price of €2.30 to €2.60.'
    ],
    caveats: 'Prices displayed include VAT; deposit (Pfand) handling varies by retailer and listing.',
    metricsSample: {
      'Retail Range': '€1.99 – €2.69',
      'Median Organic Channel Price': '€2.49',
      'DTC 12-Pack Price': '€28.90 (€2.40/can)',
      'Max Price Spread': '€0.70'
    }
  },
  {
    id: 'ex-4',
    exhibitNumber: 4,
    title: 'German Consumer Survey (N=420 respondents)',
    filename: 'customer_survey.csv',
    category: 'Consumers & Surveys',
    status: 'QUALIFIED_ANALYSIS',
    provenance: 'Representative urban German online survey panel',
    keyInsights: [
      'Stated purchase intent: 64% for the "Focus without caffeine crash" benefit profile.',
      'Preferred purchase channel: 52% Supermarkets (Rewe/Edeka), 26% Organic/Specialty, 22% DTC Web.',
      'Importance of product claims: 78% demand no refined sugar and recyclable Pfand deposit return.'
    ],
    caveats: 'Stated purchase intent bias vs actual checkout; real conversion is typically 3-5x lower than surveyed intent.',
    metricsSample: {
      'Sample Size': '420 respondents',
      'Favorable Intent': '64.2%',
      'Supermarket Preference': '52.1%',
      'Organic Ingredient Sensitivity': '71.5%'
    }
  },
  {
    id: 'ex-6',
    exhibitNumber: 6,
    title: 'LUMEN Historical Weekly Sales (NL, DK, SE)',
    filename: 'historical_sales_weekly.csv',
    category: 'Sales History',
    status: 'HYPOTHETICAL_TRANSFER',
    provenance: 'LUMEN ERP system — 78 weeks across Netherlands, Denmark, and Sweden',
    keyInsights: [
      'In Netherlands: average mature monthly volume of 14,200 cans after 10 months of operations.',
      'Observed average channel mix in NL: 58% DTC, 42% retail partners.',
      'High repeat purchase rate in DTC (60-day repeat rate of 34%).'
    ],
    caveats: 'ZERO OBSERVED SALES IN GERMANY. Scandinavian and Dutch metrics do not constitute causal forecasts for Germany.',
    metricsSample: {
      'Available History': '78 weeks',
      'Source Markets': 'NL, DK, SE',
      'German Sales Recorded': '0 (new territory)',
      'Role in Simulator': 'Seasonality curve & baseline channel mix'
    }
  },
  {
    id: 'ex-8',
    exhibitNumber: 8,
    title: 'LUMEN Unit Cost Breakdown (COGS)',
    filename: 'cost_breakdown.csv',
    category: 'Economics & Costs',
    status: 'DATA_AVAILABLE',
    provenance: 'LUMEN analytical manufacturing accounting (contract manufacturer in Austria)',
    keyInsights: [
      'Printed aluminum slim can: €0.18.',
      'Liquid formulation & adaptogens (Lion’s Mane, L-Theanine): €0.29.',
      'Canning, pasteurization & tray packaging: €0.15.',
      'Total direct manufacturing cost (direct COGS): €0.62 / can.'
    ],
    caveats: 'Guaranteed pricing for production batches > 50,000 units/year; risk of €0.05 surcharge on smaller trial runs.',
    metricsSample: {
      'Base Unit COGS': '€0.62',
      'Active Ingredients Share': '46.8%',
      'Packaging Share': '29.0%',
      'Bottling & Canning': '24.2%'
    }
  },
  {
    id: 'ex-9',
    exhibitNumber: 9,
    title: 'Channel Economics & Regulatory Deductions (DE)',
    filename: 'channel_economics.csv',
    category: 'Economics & Costs',
    status: 'DATA_AVAILABLE',
    provenance: 'Distributor contractual terms and German tax regulations',
    keyInsights: [
      'German VAT (MwSt): 19% applicable on energy and functional soft drinks.',
      'Mandatory DPG deposit (Einwegpfand): €0.25 / can, collected and returned (P&L neutral).',
      'Supermarket (Retail) margin: 28% to 32% depending on volume tier and central buying group.',
      '3PL Fulfillment Cologne: €0.45 per can shipped direct-to-consumer (12-pack basis).'
    ],
    caveats: 'Contracts with supermarket central purchasing groups may impose out-of-stock penalties.',
    metricsSample: {
      'German VAT Rate': '19.0%',
      'DPG Deposit (Pfand)': '€0.25',
      'DTC Unit Fulfillment': '€0.45',
      'Stripe DTC Fee': '2.5%'
    }
  },
  {
    id: 'ex-10',
    exhibitNumber: 10,
    title: 'Van Westendorp Price Sensitivity Survey (N=300)',
    filename: 'price_sensitivity_survey.csv',
    category: 'Pricing & Competition',
    status: 'QUALIFIED_ANALYSIS',
    provenance: '4-threshold pricing methodology (Too cheap, Cheap/Bargain, Expensive, Too expensive)',
    keyInsights: [
      'Optimal Price Point (OPP) identified at €2.19 gross consumer price.',
      'Indifference Price Point (IPP) at €2.39 gross consumer price.',
      'Point of Marginal Expensiveness (PME ceiling): €2.79 gross price.',
      'Point of Marginal Cheapness (PMC floor): below €1.69 (consumers question quality/authenticity).'
    ],
    caveats: 'Survey-based price sensitivity typically overstates real-world willingness to pay compared to physical store shelves.',
    metricsSample: {
      'Optimal Price (OPP)': '€2.19',
      'Indifference Price (IPP)': '€2.39',
      'Acceptable Range': '€1.79 – €2.59',
      'Max Ceiling': '€2.79'
    }
  },
  {
    id: 'ex-12',
    exhibitNumber: 12,
    title: 'Seasonality Index & Temperature Trends in Germany',
    filename: 'seasonality_and_weather.csv',
    category: 'Seasonality',
    status: 'QUALIFIED_ANALYSIS',
    provenance: 'Deutscher Wetterdienst (DWD) & German beverage category sales correlation',
    keyInsights: [
      'Pronounced summer peak in July and August (index factors 1.25 and 1.30).',
      'Winter dip in December and January (index factors 0.75 to 0.80).',
      'A July launch maximizes initial trial velocity and organic summer buzz.'
    ],
    caveats: 'Unpredictable inter-annual weather shifts (heatwave vs rainy summer).',
    metricsSample: {
      'Peak Index (August)': '1.30',
      'Trough Index (January)': '0.75',
      'Seasonal Swing': '1.73x',
      'Recommended Launch': 'July 2026'
    }
  }
];
