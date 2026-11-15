import React, { useState } from 'react'
import { PSI_INVESTIGATIONS, PSISurveyItem } from '../data/psiData'
import { Lang, T } from '../data/translations'

interface ExplorerViewProps {
  lang: Lang
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({ lang }) => {
  const t = T[lang]
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeItem, setActiveItem] = useState<PSISurveyItem>(PSI_INVESTIGATIONS[0])

  const filteredItems = PSI_INVESTIGATIONS.filter(item => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.fuelType === selectedCategory ||
      (selectedCategory === 'Dust' && item.fuelType === 'Aerosol/Dust')
    
    const query = searchQuery.toLowerCase()
    const matchesQuery = 
      item.name.toLowerCase().includes(query) ||
      item.fullNameEn.toLowerCase().includes(query) ||
      item.fullNameRu.toLowerCase().includes(query) ||
      item.apparatusEn.toLowerCase().includes(query) ||
      item.apparatusRu.toLowerCase().includes(query) ||
      item.fuelsEn.some(f => f.toLowerCase().includes(query)) ||
      item.fuelsRu.some(f => f.toLowerCase().includes(query))

    return matchesCategory && matchesQuery
  })

  return (
    <div className="h-full flex flex-col p-10 overflow-hidden space-y-6 bg-[#050608]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#161a22] pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            {t.explorerHeader}
          </h1>
          <div className="w-16 h-1.5 bg-emerald-400 mt-3" />
        </div>

        <a
          href="https://psi.nasa.gov/physci/repo/search?q=combustion"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-[#0e1117] hover:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase text-white transition-all"
        >
          NASA PSI Database &rarr;
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'ru' ? 'Поиск: BASS, Saffire, PMMA, кислород...' : 'Search: BASS, Saffire, PMMA, oxygen...'}
          className="w-full sm:w-96 px-4 py-3 bg-[#0b0e14] text-sm text-white placeholder-neutral-500 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'All', label: t.filterAll },
            { id: 'Solid', label: t.filterSolid },
            { id: 'Liquid', label: t.filterLiquid },
            { id: 'Gas', label: t.filterGas },
            { id: 'Aerosol/Dust', label: t.filterDust },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#0b0e14] text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Explorer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left List of Experiments (5 cols) */}
        <div className="lg:col-span-5 bg-[#0b0e14] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#161a22] bg-[#07090c] flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
            <span>{lang === 'ru' ? 'Исследования' : 'Index'} ({filteredItems.length})</span>
            <span>{t.relevanceRank}</span>
          </div>

          <div className="overflow-y-auto divide-y divide-[#131720] p-3 space-y-1">
            {filteredItems.map(item => {
              const isSelected = item.id === activeItem.id
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#141b26] text-white'
                      : 'bg-[#080a0f] hover:bg-[#0f141d] text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-white uppercase tracking-wide">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {item.relevanceScore}%
                    </span>
                  </div>

                  <div className="text-xs text-neutral-400 mt-1 font-sans line-clamp-1">
                    {lang === 'ru' ? item.fullNameRu : item.fullNameEn}
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-neutral-500 uppercase">
                    <span className="text-neutral-300 font-semibold">{item.fuelType}</span>
                    <span>&bull;</span>
                    <span className="truncate">{lang === 'ru' ? item.facilityRu : item.facilityEn}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0e14] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-[#161a22] bg-[#080a0f] flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wide">
                  {activeItem.name}
                </h2>
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  ({lang === 'ru' ? activeItem.facilityRu : activeItem.facilityEn})
                </span>
              </div>
              <p className="text-sm text-neutral-400 mt-1 font-sans">
                {lang === 'ru' ? activeItem.fullNameRu : activeItem.fullNameEn}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block tracking-wider">
                {t.relevanceRank}
              </span>
              <span className="text-3xl font-black font-mono text-emerald-400">
                {activeItem.relevanceScore}
              </span>
            </div>
          </div>

          {/* Details Scrollable Body */}
          <div className="overflow-y-auto p-8 space-y-6">
            {/* Parameters Matrix Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#07090c] p-4">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Установка' : 'Facility'}
                </span>
                <span className="text-xs font-mono font-bold text-white mt-1 block truncate">
                  {lang === 'ru' ? activeItem.apparatusRu.split('/')[0] : activeItem.apparatusEn.split('/')[0]}
                </span>
              </div>
              <div className="bg-[#07090c] p-4">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Диапазон O2' : 'Oxygen Range'}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 mt-1 block truncate">
                  {lang === 'ru' ? activeItem.oxygenRangeRu : activeItem.oxygenRangeEn}
                </span>
              </div>
              <div className="bg-[#07090c] p-4">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Скорость обдува' : 'Airflow Speed'}
                </span>
                <span className="text-xs font-mono font-bold text-white mt-1 block truncate">
                  {lang === 'ru' ? activeItem.airflowSpeedRu : activeItem.airflowSpeedEn}
                </span>
              </div>
              <div className="bg-[#07090c] p-4">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Давление' : 'Pressure Range'}
                </span>
                <span className="text-xs font-mono font-bold text-white mt-1 block truncate">
                  {lang === 'ru' ? activeItem.pressureRangeRu : activeItem.pressureRangeEn}
                </span>
              </div>
            </div>

            {/* Fuel List */}
            <div className="bg-[#07090c] p-5">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
                {t.fuelSamples}:
              </span>
              <div className="flex flex-wrap gap-2">
                {(lang === 'ru' ? activeItem.fuelsRu : activeItem.fuelsEn).map((fuel, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#12161f] text-xs font-mono text-neutral-200"
                  >
                    {fuel}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-[#07090c] border-l-4 border-l-emerald-400 p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                {t.findingsLabel}
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                {lang === 'ru' ? activeItem.keyFindingsRu : activeItem.keyFindingsEn}
              </p>
            </div>

            {/* Fire Safety Impact */}
            <div className="bg-[#07090c] border-l-4 border-l-white p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-white font-bold block mb-2">
                {t.impactLabel}
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                {lang === 'ru' ? activeItem.fireSafetyImpactRu : activeItem.fireSafetyImpactEn}
              </p>
            </div>

            {/* Earth Spinoff */}
            <div className="bg-[#07090c] p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-2">
                {t.spinoffLabel}
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {lang === 'ru' ? activeItem.earthSpinoffRu : activeItem.earthSpinoffEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
