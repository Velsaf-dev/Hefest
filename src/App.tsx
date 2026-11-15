import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { OverviewView } from './components/OverviewView'
import { ExplorerView } from './components/ExplorerView'
import { CalculatorView } from './components/CalculatorView'
import { PhysicsView } from './components/PhysicsView'
import { SpinoffsView } from './components/SpinoffsView'
import { Lang } from './data/translations'
import { HabitatEnvironment } from './data/psiData'

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview')
  // English is the default primary language for NASA judging
  const [lang, setLang] = useState<Lang>('en')

  const handleSelectForSimulation = (_habitat: HabitatEnvironment) => {
    setActiveTab('calculator')
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050608] text-neutral-100 font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-1 h-screen overflow-hidden bg-[#050608] flex flex-col">
        {activeTab === 'overview' && (
          <OverviewView lang={lang} onSelectForSimulation={handleSelectForSimulation} />
        )}
        {activeTab === 'explorer' && (
          <ExplorerView lang={lang} />
        )}
        {activeTab === 'calculator' && (
          <CalculatorView lang={lang} />
        )}
        {activeTab === 'physics' && (
          <PhysicsView lang={lang} />
        )}
        {activeTab === 'spinoffs' && (
          <SpinoffsView lang={lang} />
        )}
      </main>
    </div>
  )
}

export default App
