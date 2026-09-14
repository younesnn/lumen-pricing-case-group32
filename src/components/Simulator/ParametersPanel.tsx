import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle, Layers, DollarSign, Calendar, TrendingUp, Megaphone, Check } from 'lucide-react';
import { Scenario, ValueKind, ChannelTerms } from '../../types/simulator';

interface ParametersPanelProps {
  scenario: Scenario;
  onUpdateScenario: (updated: Scenario) => void;
  onInspectVariable?: (name: string, kind: ValueKind, source: string, value: any, unit: string) => void;
}

export const ParametersPanel: React.FC<ParametersPanelProps> = ({
  scenario,
  onUpdateScenario,
  onInspectVariable
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    strategy: true,
    commercial: true,
    pricing: true,
    economics: false,
    marketing: false
  });

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const updateScenarioField = (mutator: (draft: Scenario) => void) => {
    const updated = JSON.parse(JSON.stringify(scenario)) as Scenario;
    mutator(updated);
    updated.status = 'stale'; // immediately marks results stale
    onUpdateScenario(updated);
  };

  const renderBadge = (kind: ValueKind, source: string, label: string, val: any, unit: string) => {
    const colorMap: Record<ValueKind, string> = {
      DATA: 'bg-blue-50 text-blue-700 border-blue-200',
      ASSUMPTION: 'bg-amber-50 text-amber-700 border-amber-200',
      MODEL: 'bg-purple-50 text-purple-700 border-purple-200',
      EXTERNAL: 'bg-slate-100 text-slate-700 border-slate-200'
    };

    return (
      <button
        type="button"
        onClick={() => onInspectVariable?.(label, kind, source, val, unit)}
        className={`inline-flex items-center gap-1 text-3xs font-semibold px-1.5 py-0.5 rounded-sm border cursor-pointer transition-all hover:scale-105 ${colorMap[kind]}`}
        title={`Origine: ${kind} — Cliquer pour inspecter`}
      >
        <span>{kind}</span>
        <HelpCircle className="w-2.5 h-2.5 opacity-60" />
      </button>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden divide-y divide-slate-100 text-xs">
      <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-700" />
          <h2 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
            Paramètres & Hypothèses
          </h2>
        </div>
        <span className="text-2xs text-slate-500 font-medium">Modifiables</span>
      </div>

      {/* 1. Stratégie & Calendrier */}
      <div>
        <button
          onClick={() => toggleSection('strategy')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>1. Stratégie & Calendrier de Lancement</span>
          </div>
          {openSections.strategy ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.strategy && (
          <div className="p-3.5 pt-1 space-y-3 bg-white">
            <div>
              <label className="block text-2xs font-semibold text-slate-600 mb-1">
                Nom de l'option stratégique
              </label>
              <input
                type="text"
                value={scenario.name ?? ''}
                onChange={e => updateScenarioField(d => { d.name = e.target.value; })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  Pays cible
                </label>
                <div className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700">
                  DE (Allemagne)
                </div>
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  Date de lancement
                </label>
                <input
                  type="date"
                  value={scenario.launchDate ?? ''}
                  onChange={e => updateScenarioField(d => { d.launchDate = e.target.value; })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-semibold text-slate-600 mb-1">
                Description & Justification du positionnement
              </label>
              <textarea
                rows={2}
                value={scenario.description ?? ''}
                onChange={e => updateScenarioField(d => { d.description = e.target.value; })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-emerald-600 text-slate-700"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Mode Commercial (A vs B) */}
      <div>
        <button
          onClick={() => toggleSection('commercial')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>2. Mode Commercial (Demande & Volume)</span>
          </div>
          {openSections.commercial ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.commercial && (
          <div className="p-3.5 pt-1 space-y-3 bg-white">
            {/* Mode Selector */}
            <div className="flex rounded-md p-0.5 bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => updateScenarioField(d => { d.mode = 'A'; })}
                className={`flex-1 py-1 px-2 rounded text-2xs font-medium transition-all ${
                  scenario.mode === 'A'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mode A : Demande totale sous hypothèses
              </button>
              <button
                type="button"
                onClick={() => updateScenarioField(d => { d.mode = 'B'; })}
                className={`flex-1 py-1 px-2 rounded text-2xs font-medium transition-all ${
                  scenario.mode === 'B'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mode B : Base organique + Acquisition
              </button>
            </div>

            {scenario.mode === 'A' ? (
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-2xs font-semibold text-slate-700">
                      Niveau mensuel à maturité
                    </label>
                    {renderBadge(
                      scenario.commercialA.level.kind,
                      scenario.commercialA.level.source,
                      'Niveau mensuel à maturité',
                      scenario.commercialA.level.value,
                      'canettes/mois'
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      key="commercial-a-level-input"
                      type="number"
                      min={1000}
                      step={500}
                      value={scenario.commercialA?.level?.value ?? 0}
                      onChange={e => updateScenarioField(d => {
                        if (d.commercialA?.level) {
                          d.commercialA.level.value = Number(e.target.value) || 0;
                        }
                      })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs font-semibold text-slate-900"
                    />
                    <span className="text-2xs text-slate-500 shrink-0 font-medium">canettes/mois</span>
                  </div>
                </div>

                {/* Channel Mix Ratios */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-2xs font-semibold text-slate-700">
                      Répartition Mix Canaux
                    </label>
                    <span className="text-3xs text-emerald-700 font-bold">
                      Somme : {Math.round((Object.values(scenario.commercialA.mix) as Array<{ value: number }>).reduce((a, b) => a + (b?.value ?? 0), 0) * 100)}%
                    </span>
                  </div>

                  <div className="space-y-2 p-2 bg-slate-50 rounded-md border border-slate-200">
                    {(Object.entries(scenario.commercialA.mix) as Array<[string, { value: number }]>).map(([chName, chData]) => (
                      <div key={chName} className="flex items-center justify-between gap-2">
                        <span className="text-2xs text-slate-700 font-medium">{chName}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            key={`mix-input-${chName}`}
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={chData?.value !== undefined ? Math.round(chData.value * 100) : 0}
                            onChange={e => {
                              const newPct = Number(e.target.value) / 100;
                              updateScenarioField(d => {
                                if (d.commercialA?.mix?.[chName]) {
                                  d.commercialA.mix[chName].value = Math.max(0, Math.min(1, newPct));
                                }
                              });
                            }}
                            className="w-14 px-1.5 py-1 border border-slate-300 rounded text-center text-xs font-semibold"
                          />
                          <span className="text-2xs text-slate-500">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-2xs font-semibold text-slate-700 mb-1">
                    Base organique mensuelle (hors paid)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      key="commercial-b-organic-input"
                      type="number"
                      min={0}
                      step={250}
                      value={scenario.commercialB?.organicBaseMonthly?.value ?? 1500}
                      onChange={e => {
                        const val = Number(e.target.value) || 0;
                        updateScenarioField(d => {
                          if (!d.commercialB) {
                            d.commercialB = {
                              organicBaseMonthly: {
                                value: val,
                                unit: 'canettes/mois',
                                kind: 'ASSUMPTION',
                                source: 'Base organique mensuelle estimée',
                                accepted: true
                              },
                              marketingChannels: {},
                              channelSalesAllocation: {
                                'DTC Online': 0.6,
                                'Retail/Grocery': 0.4
                              }
                            };
                          } else {
                            d.commercialB.organicBaseMonthly.value = val;
                          }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs font-semibold"
                    />
                    <span className="text-2xs text-slate-500 shrink-0">canettes/mois</span>
                  </div>
                </div>
                <div className="p-2 bg-blue-50 text-blue-800 rounded text-2xs">
                  En Mode B, les volumes dépendent directement du budget marketing divisé par le CAC avec facteur d'incrémentalité.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Prix & Économie unitaire par canal */}
      <div>
        <button
          onClick={() => toggleSection('pricing')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>3. Prix de Vente & Conditions par Canal</span>
          </div>
          {openSections.pricing ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.pricing && (
          <div className="p-3.5 pt-1 space-y-3 bg-white">
            {(Object.entries(scenario.economics.channels) as Array<[string, ChannelTerms]>).map(([chName, terms]) => (
              <div key={chName} className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-semibold text-slate-900 text-xs">{chName}</span>
                  {renderBadge(terms.price.kind, terms.price.source, `Prix ${chName}`, terms.price.value, 'EUR/canette')}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-3xs font-medium text-slate-500 mb-0.5">
                      Prix brut consommateur (TTC)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step={0.10}
                        min={0.5}
                        value={terms.price?.value ?? 0}
                        onChange={e => updateScenarioField(d => {
                          if (d.economics.channels[chName]?.price) {
                            d.economics.channels[chName].price.value = Number(e.target.value) || 0;
                          }
                        })}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-semibold text-xs text-slate-900"
                      />
                      <span className="text-3xs text-slate-500">€</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-3xs font-medium text-slate-500 mb-0.5">
                      COGS unitaire (can + liquide)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step={0.01}
                        min={0.1}
                        value={terms.cogs?.value ?? 0}
                        onChange={e => updateScenarioField(d => {
                          if (d.economics.channels[chName]?.cogs) {
                            d.economics.channels[chName].cogs.value = Number(e.target.value) || 0;
                          }
                        })}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-semibold text-xs text-slate-900"
                      />
                      <span className="text-3xs text-slate-500">€</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1 text-3xs text-slate-600">
                  <div>
                    <span className="block text-slate-400">Marge distributeur :</span>
                    <input
                      type="number"
                      step={1}
                      value={terms.retailerCut?.value !== undefined ? Math.round(terms.retailerCut.value * 100) : 0}
                      onChange={e => updateScenarioField(d => {
                        if (d.economics.channels[chName]?.retailerCut) {
                          d.economics.channels[chName].retailerCut.value = (Number(e.target.value) || 0) / 100;
                        }
                      })}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-center text-2xs font-semibold"
                    />
                    <span className="text-center block text-slate-400">%</span>
                  </div>

                  <div>
                    <span className="block text-slate-400">Frais de port/3PL :</span>
                    <input
                      type="number"
                      step={0.05}
                      value={terms.fulfillment?.value ?? 0}
                      onChange={e => updateScenarioField(d => {
                        if (d.economics.channels[chName]?.fulfillment) {
                          d.economics.channels[chName].fulfillment.value = Number(e.target.value) || 0;
                        }
                      })}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-center text-2xs font-semibold"
                    />
                    <span className="text-center block text-slate-400">€/u</span>
                  </div>

                  <div>
                    <span className="block text-slate-400">Frais paiement :</span>
                    <input
                      type="number"
                      step={0.1}
                      value={terms.paymentFee?.value !== undefined ? (terms.paymentFee.value * 100).toFixed(1) : '0'}
                      onChange={e => updateScenarioField(d => {
                        if (d.economics.channels[chName]?.paymentFee) {
                          d.economics.channels[chName].paymentFee.value = (Number(e.target.value) || 0) / 100;
                        }
                      })}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-center text-2xs font-semibold"
                    />
                    <span className="text-center block text-slate-400">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Conventions Fiscales & Coûts Fixes */}
      <div>
        <button
          onClick={() => toggleSection('economics')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
            <span>4. Coûts Fixes & Conventions Légales DE</span>
          </div>
          {openSections.economics ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.economics && (
          <div className="p-3.5 pt-1 space-y-2.5 bg-white">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-3xs font-medium text-slate-600 mb-0.5">
                  TVA Allemagne (MwSt)
                </label>
                <div className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-800 border border-slate-200">
                  19.0% (Légal DE)
                </div>
              </div>

              <div>
                <label className="block text-3xs font-medium text-slate-600 mb-0.5">
                  Consigne DPG (Pfand)
                </label>
                <div className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-800 border border-slate-200">
                  0.25 € / canette
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-3xs font-medium text-slate-600">
                  Coûts fixes mensuels affectés DE
                </label>
                {renderBadge(
                  scenario.economics.fixedCostsMonthly.kind,
                  scenario.economics.fixedCostsMonthly.source,
                  'Coûts fixes mensuels',
                  scenario.economics.fixedCostsMonthly.value,
                  'EUR/mois'
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step={500}
                  value={scenario.economics.fixedCostsMonthly?.value ?? 0}
                  onChange={e => updateScenarioField(d => {
                    if (d.economics.fixedCostsMonthly) {
                      d.economics.fixedCostsMonthly.value = Number(e.target.value) || 0;
                    }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold text-slate-900"
                />
                <span className="text-2xs text-slate-500">€/mois</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-3xs font-medium text-slate-600">
                  Investissement initial de pré-lancement
                </label>
                {renderBadge(
                  scenario.economics.prelaunchInvestment.kind,
                  scenario.economics.prelaunchInvestment.source,
                  'Investissement pré-lancement',
                  scenario.economics.prelaunchInvestment.value,
                  'EUR'
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step={2000}
                  value={scenario.economics.prelaunchInvestment?.value ?? 0}
                  onChange={e => updateScenarioField(d => {
                    if (d.economics.prelaunchInvestment) {
                      d.economics.prelaunchInvestment.value = Number(e.target.value) || 0;
                    }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold text-slate-900"
                />
                <span className="text-2xs text-slate-500">€</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Budgets Marketing */}
      <div>
        <button
          onClick={() => toggleSection('marketing')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Megaphone className="w-3.5 h-3.5 text-purple-600" />
            <span>5. Budgets Marketing Mensuels</span>
          </div>
          {openSections.marketing ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.marketing && (
          <div className="p-3.5 pt-1 space-y-2 bg-white">
            <p className="text-3xs text-slate-500 leading-tight">
              Budgets d'acquisition et de notoriété par poste (Mois 1 à 12).
            </p>
            <div className="space-y-2 pt-1">
              {(Object.entries(scenario.marketingBudgets) as Array<[string, number[]]>).map(([channel, budgetArr]) => {
                const totalChannelSpend = budgetArr.reduce((a, b) => a + b, 0);
                return (
                  <div key={channel} className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between text-2xs font-medium text-slate-800 mb-1">
                      <span>{channel}</span>
                      <span className="font-bold text-purple-700">{totalChannelSpend.toLocaleString('fr-FR')} €/an</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xs text-slate-500">M1 (Lancement) :</span>
                      <input
                        type="number"
                        step={500}
                        value={budgetArr?.[0] ?? 0}
                        onChange={e => {
                          const val = Number(e.target.value) || 0;
                          updateScenarioField(d => {
                            if (d.marketingBudgets[channel]) {
                              d.marketingBudgets[channel][0] = val;
                            }
                          });
                        }}
                        className="w-20 px-1.5 py-0.5 border border-slate-300 rounded text-center text-xs font-semibold"
                      />
                      <span className="text-3xs text-slate-500">€</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
