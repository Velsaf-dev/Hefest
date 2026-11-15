import React, { useState } from 'react'
import { HABITATS, HabitatEnvironment } from '../data/psiData'
import { Lang, T } from '../data/translations'

interface OverviewViewProps {
  lang: Lang
  onSelectForSimulation?: (habitat: HabitatEnvironment) => void
}

export const OverviewView: React.FC<OverviewViewProps> = ({ lang, onSelectForSimulation }) => {
  const t = T[lang]
  const [selectedHabId, setSelectedHabId] = useState<string>(HABITATS[0].id)
  const currentHab = HABITATS.find(h => h.id === selectedHabId) || HABITATS[0]

  const criticalRisks = lang === 'ru' ? currentHab.criticalRisksRu : currentHab.criticalRisksEn
  const recommendedSuppression = lang === 'ru' ? currentHab.recommendedSuppressionRu : currentHab.recommendedSuppressionEn

  return (
    <div className="h-full flex flex-col p-10 overflow-y-auto space-y-8 bg-[#050608]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#161a22] pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            {t.habitatsHeader}
          </h1>
          <div className="w-16 h-1.5 bg-emerald-400 mt-3" />
        </div>

        {/* Mission Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {HABITATS.map(hab => {
            const isSelected = hab.id === selectedHabId
            return (
              <button
                key={hab.id}
                onClick={() => setSelectedHabId(hab.id)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#0e1117] text-neutral-400 hover:text-white'
                }`}
              >
                {lang === 'ru' ? hab.nameRu : hab.nameEn}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Focus: Description + Big Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Description Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0e14] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">
              {lang === 'ru' ? currentHab.nameRu : currentHab.nameEn}
            </h2>

            <p className="text-base text-neutral-300 mt-4 leading-relaxed font-sans">
              {lang === 'ru' ? currentHab.descriptionRu : currentHab.descriptionEn}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#161a22] flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              {lang === 'ru' ? 'Гравитационный режим' : 'Gravity Regime'}: {currentHab.gravityG === 0.0001 ? '0-g' : `${currentHab.gravityG}g`}
            </span>
            {onSelectForSimulation && (
              <button
                onClick={() => onSelectForSimulation(currentHab)}
                className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
              >
                {lang === 'ru' ? 'Запустить расчет' : 'Simulate in Calculator'} &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Big Metrics (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <div className="bg-[#0b0e14] p-6 flex flex-col justify-center">
            <div className="text-4xl lg:text-5xl font-black font-mono text-emerald-400 tracking-tight">
              {currentHab.flammabilityMultiplier}x
            </div>
            <div className="text-sm font-semibold text-white uppercase tracking-wider mt-1">
              {lang === 'ru' ? 'Множитель пожароопасности' : 'Flammability Multiplier'}
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-2">
              {lang === 'ru'
                ? 'Относительно нормальной земной атмосферы'
                : 'Compared to baseline Earth sea-level atmosphere'}
            </p>
          </div>

          <div className="bg-[#0b0e14] p-6 grid grid-cols-3 gap-3 text-center">
            <div className="border-r border-[#161a22] pr-2">
              <div className="text-2xl font-bold font-mono text-white">
                {currentHab.oxygenPercent}%
              </div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase mt-1">
                {lang === 'ru' ? 'Кислород' : 'Oxygen'}
              </div>
            </div>
            <div className="border-r border-[#161a22] pr-2">
              <div className="text-2xl font-bold font-mono text-white">
                {currentHab.pressurePsi}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase mt-1">
                {lang === 'ru' ? 'Давление (psi)' : 'Pressure (psi)'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">
                {currentHab.ventilationMs * 100}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase mt-1">
                {lang === 'ru' ? 'Обдув (см/с)' : 'Flow (cm/s)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Risks vs Recommended Suppression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0b0e14] p-8">
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">
            {t.criticalRisksHeader}
          </h3>
          <div className="w-10 h-1 bg-red-500 mt-2 mb-6" />

          <ul className="space-y-4">
            {criticalRisks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-sm font-mono text-red-400 font-bold mt-0.5">
                  &bull;
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {risk}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0b0e14] border-l-4 border-l-emerald-400 p-8">
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">
            {t.recommendedSuppressionHeader}
          </h3>
          <div className="w-10 h-1 bg-emerald-400 mt-2 mb-6" />

          <div className="space-y-3">
            {recommendedSuppression.map((method, idx) => (
              <div
                key={idx}
                className="bg-[#10141d] p-4 flex items-center"
              >
                <span className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  {method}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#0b0e14] p-6">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4">
          {lang === 'ru' ? 'Сравнительный реестр сред обитания' : 'Comparative Mission Habitats Register'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#191e28] text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-4">{lang === 'ru' ? 'Среда обитания' : 'Habitat'}</th>
                <th className="py-3 px-4">{lang === 'ru' ? 'Кислород' : 'Oxygen'}</th>
                <th className="py-3 px-4">{lang === 'ru' ? 'Давление (psi)' : 'Pressure (psi)'}</th>
                <th className="py-3 px-4">{lang === 'ru' ? 'Гравитация' : 'Gravity'}</th>
                <th className="py-3 px-4">{lang === 'ru' ? 'Вентиляция (м/с)' : 'Ventilation (m/s)'}</th>
                <th className="py-3 px-4 text-right">{lang === 'ru' ? 'Индекс риска' : 'Risk Factor'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131720]">
              {HABITATS.map(h => (
                <tr
                  key={h.id}
                  onClick={() => setSelectedHabId(h.id)}
                  className={`cursor-pointer transition-colors ${
                    h.id === selectedHabId
                      ? 'bg-[#151c27] text-white font-bold'
                      : 'hover:bg-[#0e1219] text-neutral-300'
                  }`}
                >
                  <td className="py-3 px-4 uppercase">
                    {lang === 'ru' ? h.nameRu : h.nameEn}
                  </td>
                  <td className="py-3 px-4">{h.oxygenPercent}%</td>
                  <td className="py-3 px-4">{h.pressurePsi} psi</td>
                  <td className="py-3 px-4">{h.gravityG === 0.0001 ? '0-g' : `${h.gravityG}g`}</td>
                  <td className="py-3 px-4">{h.ventilationMs} м/с</td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                    {h.flammabilityMultiplier}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
