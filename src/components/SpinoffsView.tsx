import React, { useState } from 'react'
import { EARTH_SPINOFFS } from '../data/psiData'
import { Lang, T } from '../data/translations'

interface SpinoffsViewProps {
  lang: Lang
}

export const SpinoffsView: React.FC<SpinoffsViewProps> = ({ lang }) => {
  const t = T[lang]
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="h-full flex flex-col p-10 overflow-y-auto space-y-8 bg-[#050608]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#161a22] pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            {t.spinoffsHeader}
          </h1>
          <div className="w-16 h-1.5 bg-emerald-400 mt-3" />
        </div>

        <a
          href="https://spinoff.nasa.gov/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-[#0e1117] hover:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase text-white transition-all"
        >
          NASA Spinoff Repository &rarr;
        </a>
      </div>

      {/* Grid of 6 Expandable Spinoff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EARTH_SPINOFFS.map((spinoff) => {
          const isExpanded = expandedId === spinoff.id
          return (
            <div
              key={spinoff.id}
              className={`bg-[#0b0e14] p-8 flex flex-col justify-between transition-all ${
                isExpanded ? 'ring-1 ring-emerald-400' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="text-5xl font-black font-mono text-emerald-400 tracking-tight">
                    {spinoff.metric}
                  </div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {lang === 'ru' ? spinoff.domainRu : spinoff.domainEn}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-3">
                  {lang === 'ru' ? spinoff.titleRu : spinoff.titleEn}
                </h3>

                <div className="text-xs font-mono text-neutral-400 uppercase mt-1 tracking-wider">
                  {spinoff.source}
                </div>

                <p className="text-sm text-neutral-300 mt-4 leading-relaxed font-sans">
                  {lang === 'ru' ? spinoff.descRu : spinoff.descEn}
                </p>

                {/* Expanded In-Depth Section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#161a22] space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                        {lang === 'ru' ? 'Техническое досье' : 'Technical Dossier'}
                      </span>
                      <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                        {lang === 'ru' ? spinoff.detailedRu : spinoff.detailedEn}
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={spinoff.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
                      >
                        <span>{lang === 'ru' ? 'Первоисточник отчета NASA' : 'Official NASA Report Source'}</span> &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Expand Toggle Button */}
              <div className="mt-6 pt-4 border-t border-[#161a22] flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(spinoff.id)}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  {isExpanded 
                    ? (lang === 'ru' ? 'Свернуть' : 'Collapse') 
                    : (lang === 'ru' ? 'Подробнее' : 'Read Study')} &darr;
                </button>
                <span className="text-xs font-mono text-neutral-500">
                  NASA Spinoff
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
