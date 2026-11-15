import React from 'react'
import { Lang, T } from '../data/translations'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  lang: Lang
  setLang: (lang: Lang) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const t = T[lang]

  const navItems = [
    { id: 'overview', label: t.tabOverview },
    { id: 'explorer', label: t.tabExplorer },
    { id: 'calculator', label: t.tabCalculator },
    { id: 'physics', label: t.tabPhysics },
    { id: 'spinoffs', label: t.tabSpinoffs },
  ]

  return (
    <aside className="w-72 bg-[#080a0d] border-r border-[#161a22] flex flex-col justify-between shrink-0 h-screen select-none">
      {/* Brand Header */}
      <div>
        <div className="p-8 pb-6 border-b border-[#161a22]">
          <span className="text-xl font-black tracking-widest text-white uppercase block">
            HESFEST
          </span>
          <div className="w-8 h-1 bg-emerald-400 mt-2" />
        </div>

        {/* Navigation List - Clean without numbers */}
        <nav className="p-4 pt-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-4 py-3 rounded text-left text-sm tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#12161f] text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-[#0c0f15] font-normal'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Clean Language Switcher (EN default) */}
      <div className="p-6 border-t border-[#161a22] bg-[#06080a] flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
          Language
        </span>
        <div className="flex items-center bg-[#10131a] p-0.5 rounded">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              lang === 'en'
                ? 'bg-emerald-500 text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ru')}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              lang === 'ru'
                ? 'bg-emerald-500 text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            RU
          </button>
        </div>
      </div>
    </aside>
  )
}
