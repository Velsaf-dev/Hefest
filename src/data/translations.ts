export type Lang = 'ru' | 'en'

export const T = {
  ru: {
    appName: 'HESFEST',
    
    // Sidebar Tabs (5 core tabs, no dossier tab on website)
    tabOverview: 'Среды и миссии',
    tabExplorer: 'Каталог исследований',
    tabCalculator: 'Калькулятор рисков',
    tabPhysics: 'Физика пламени',
    tabSpinoffs: 'Земные технологии',
    
    // Mission Habitats
    habitatsHeader: 'Среды обитания и миссии',
    oxygenLabel: 'Кислород',
    pressureLabel: 'Давление',
    gravityLabel: 'Гравитация',
    ventilationLabel: 'Вентиляция',
    riskMultiplier: 'Множитель риска',
    criticalRisksHeader: 'Критические факторы опасности',
    recommendedSuppressionHeader: 'Рекомендованные методы тушения',
    
    // PSI Explorer
    explorerHeader: 'Каталог исследований NASA PSI',
    filterAll: 'Все типы',
    filterSolid: 'Твердые (BASS, Saffire)',
    filterLiquid: 'Жидкие (FLEX)',
    filterGas: 'Газовые (ACME, BRE)',
    filterDust: 'Дым и пыль (SAME, DAFT)',
    relevanceRank: 'Индекс релевантности',
    hardwareFacility: 'Установка',
    fuelSamples: 'Исследуемые материалы',
    findingsLabel: 'Ключевые результаты',
    impactLabel: 'Влияние на безопасность полетов',
    spinoffLabel: 'Трансфер на Землю',
    
    // SI Calculator
    calcHeader: 'Калькулятор риска воспламенения',
    sliderOxygen: 'Концентрация кислорода',
    sliderPressure: 'Давление в отсеке',
    sliderVentilation: 'Скорость обдува',
    sliderGravity: 'Гравитация',
    flammabilityIndex: 'Индекс воспламеняемости',
    flammabilityStatusSafe: 'БЕЗОПАСНАЯ ЗОНА',
    flammabilityStatusElevated: 'ПОВЫШЕННЫЙ РИСК',
    flammabilityStatusCritical: 'КРИТИЧЕСКИЙ РИСК',
    predictiveInsightHeader: 'Заключение экспертной модели',
    
    // Physics
    physicsHeader: 'Симулятор горения в невесомости',
    physicsGravitySlider: 'Гравитация (g)',
    physicsTempSlider: 'Температура очага (°C)',
    earthFlameTitle: 'Конвекционный режим (1-g)',
    spaceFlameTitle: 'Диффузионный сферический режим (0-g)',
    
    // Spinoffs
    spinoffsHeader: 'Земные технологии безопасности',
  },
  en: {
    appName: 'HESFEST',
    
    // Sidebar Tabs
    tabOverview: 'Habitats & Missions',
    tabExplorer: 'PSI Investigations',
    tabCalculator: 'Flammability Calculator',
    tabPhysics: 'Combustion Physics',
    tabSpinoffs: 'Terrestrial Spinoffs',
    
    // Mission Habitats
    habitatsHeader: 'Habitats & Missions',
    oxygenLabel: 'Oxygen',
    pressureLabel: 'Pressure',
    gravityLabel: 'Gravity',
    ventilationLabel: 'Ventilation',
    riskMultiplier: 'Risk Factor',
    criticalRisksHeader: 'Critical Hazard Factors',
    recommendedSuppressionHeader: 'Recommended Extinguishing Strategies',
    
    // PSI Explorer
    explorerHeader: 'NASA PSI Investigations',
    filterAll: 'All Types',
    filterSolid: 'Solids (BASS, Saffire)',
    filterLiquid: 'Liquids (FLEX)',
    filterGas: 'Gases (ACME, BRE)',
    filterDust: 'Smoke & Dust (SAME, DAFT)',
    relevanceRank: 'Relevance Index',
    hardwareFacility: 'Facility',
    fuelSamples: 'Tested Materials',
    findingsLabel: 'Key Findings',
    impactLabel: 'Flight Safety Impact',
    spinoffLabel: 'Terrestrial Transfer',
    
    // SI Calculator
    calcHeader: 'Flammability Risk Calculator',
    sliderOxygen: 'Oxygen Fraction',
    sliderPressure: 'Cabin Pressure',
    sliderVentilation: 'Airflow Speed',
    sliderGravity: 'Gravity Level',
    flammabilityIndex: 'Flammability Index',
    flammabilityStatusSafe: 'SAFE BOUNDARY',
    flammabilityStatusElevated: 'ELEVATED RISK',
    flammabilityStatusCritical: 'CRITICAL PROPAGATION RISK',
    predictiveInsightHeader: 'Expert Model Conclusion',
    
    // Physics
    physicsHeader: 'Microgravity Combustion Simulator',
    physicsGravitySlider: 'Gravity (g)',
    physicsTempSlider: 'Flame Temperature (°C)',
    earthFlameTitle: 'Buoyant Convective Regime (1-g)',
    spaceFlameTitle: 'Diffusion Spherical Regime (0-g)',
    
    // Spinoffs
    spinoffsHeader: 'Terrestrial Life-Safety Spinoffs',
  }
}
