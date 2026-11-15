export interface PSISurveyItem {
  id: string
  name: string
  fullNameRu: string
  fullNameEn: string
  apparatusRu: string
  apparatusEn: string
  facilityRu: string
  facilityEn: string
  fuelType: 'Solid' | 'Liquid' | 'Gas' | 'Aerosol/Dust'
  fuelsRu: string[]
  fuelsEn: string[]
  oxygenRangeRu: string
  oxygenRangeEn: string
  pressureRangeRu: string
  pressureRangeEn: string
  airflowSpeedRu: string
  airflowSpeedEn: string
  keyFindingsRu: string
  keyFindingsEn: string
  fireSafetyImpactRu: string
  fireSafetyImpactEn: string
  earthSpinoffRu: string
  earthSpinoffEn: string
  relevanceScore: number
}

export interface HabitatEnvironment {
  id: string
  nameRu: string
  nameEn: string
  oxygenPercent: number
  pressurePsi: number
  gravityG: number
  ventilationMs: number
  descriptionRu: string
  descriptionEn: string
  flammabilityMultiplier: number
  recommendedSuppressionRu: string[]
  recommendedSuppressionEn: string[]
  criticalRisksRu: string[]
  criticalRisksEn: string[]
}

export interface EarthSpinoffItem {
  id: string
  metric: string
  titleRu: string
  titleEn: string
  domainRu: string
  domainEn: string
  descRu: string
  descEn: string
  detailedRu: string
  detailedEn: string
  source: string
  link: string
}

export const HABITATS: HabitatEnvironment[] = [
  {
    id: 'lunar_base',
    nameRu: 'Лунная база Artemis',
    nameEn: 'Artemis Lunar Base',
    oxygenPercent: 34.0,
    pressurePsi: 8.2,
    gravityG: 0.166,
    ventilationMs: 0.12,
    descriptionRu: 'Атмосфера пониженного давления (8.2 psi) с обогащением кислородом (34%) в условиях лунной гравитации 0.166g для исключения длительной декомпрессии перед выходом в открытый космос.',
    descriptionEn: 'Reduced pressure (8.2 psi) with elevated oxygen (34%) under lunar gravity (0.166g) designed to eliminate long pre-breathe times for EVA excursions.',
    flammabilityMultiplier: 2.85,
    recommendedSuppressionRu: [
      'Декомпрессия отсека инертным газом',
      'Объемное заполнение углекислым газом (CO2)',
      'Мелкодисперсный водяной туман'
    ],
    recommendedSuppressionEn: [
      'Inert Gas Depressurization',
      'CO2 Total Flooding',
      'Fine Water Mist'
    ],
    criticalRisksRu: [
      'Предел воспламеняемости номекса и каптона резко снижается при 34% O2',
      'Лунная гравитация (0.166g) создает медленную конвекцию, поддерживающую горение без сдувания пламени',
      'Ускоренное распространение огня по одежде экипажа и кабельным трассам'
    ],
    criticalRisksEn: [
      'Flammability limit of Nomex and Kapton drastically reduced at 34% O2',
      'Partial gravity (0.166g) creates slow upward buoyant draft without self-extinguishing blowoff',
      'Rapid flame propagation across crew apparel and cable harnesses'
    ]
  },
  {
    id: 'iss_cabin',
    nameRu: 'Жилой модуль МКС',
    nameEn: 'ISS Habitation Module',
    oxygenPercent: 21.0,
    pressurePsi: 14.7,
    gravityG: 0.0001,
    ventilationMs: 0.10,
    descriptionRu: 'Стандартная атмосфера (21% O2, 14.7 psi) в условиях микрогравитации 0-g. Без принудительной вентиляции пламя задыхается в собственных продуктах сгорания, но возможен скрытый тлеющий режим.',
    descriptionEn: 'Standard sea-level equivalent atmosphere (21% O2, 14.7 psi) in microgravity (0-g). Absence of convection creates diffusion-limited spherical flames and potential invisible cool flame regimes.',
    flammabilityMultiplier: 1.15,
    recommendedSuppressionRu: [
      'Портативные огнетушители водяного тумана',
      'Инжекция углекислого газа (CO2)',
      'Экстренное отключение контура вентиляции'
    ],
    recommendedSuppressionEn: [
      'Portable Water Mist Extinguishers',
      'CO2 Injection',
      'Ventilation Loop Shutdown'
    ],
    criticalRisksRu: [
      'Продолжение невидимого низкотемпературного горения после видимого затухания',
      'Накопление токсичных газов (CO, HCN) в застойных зонах модуля',
      'Агломерация частиц дыма, снижающая эффективность оптических датчиков'
    ],
    criticalRisksEn: [
      'Invisible cool-flame continuation after apparent radiative extinction',
      'Accumulation of toxic combustion gases (CO, HCN) in stagnant microgravity zones',
      'High particle agglomeration blinding standard optical smoke detectors'
    ]
  },
  {
    id: 'eva_suit',
    nameRu: 'Скафандр xEMU (EVA)',
    nameEn: 'xEMU Spacesuit (EVA)',
    oxygenPercent: 100.0,
    pressurePsi: 4.3,
    gravityG: 0.166,
    ventilationMs: 0.05,
    descriptionRu: 'Чистый 100% кислород при низком давлении 4.3 psi. Энергия зажигания снижается более чем на 80%, любая электрическая искра вызывает мгновенное возгорание.',
    descriptionEn: '100% pure oxygen at low pressure (4.3 psi). Critical ignition sensitivity; electrical arcing can ignite otherwise non-flammable elastomers.',
    flammabilityMultiplier: 4.20,
    recommendedSuppressionRu: [
      'Аварийный сброс давления в вакуум',
      'Искробезопасное отключение электропитания'
    ],
    recommendedSuppressionEn: [
      'Emergency Rapid Venting to Vacuum',
      'Intrinsically Safe Power Cutoff'
    ],
    criticalRisksRu: [
      'Отсутствие азота-разбавителя полностью исключает тепловое демпфирование',
      'Порог энергии зажигания падает более чем на 80%',
      'Насыщение волокон внутреннего костюма чистым кислородом'
    ],
    criticalRisksEn: [
      'Complete absence of nitrogen diluent means zero thermal damping',
      'Ignition energy threshold drops by over 80%',
      'Oxygen soak in inner garment fibers'
    ]
  },
  {
    id: 'lunar_rover',
    nameRu: 'Герметичный лунный ровер',
    nameEn: 'Pressurized Lunar Rover',
    oxygenPercent: 30.0,
    pressurePsi: 10.2,
    gravityG: 0.166,
    ventilationMs: 0.15,
    descriptionRu: 'Малый замкнутый объем кабины с промежуточной атмосферой (30% O2, 10.2 psi). Высокий риск моментального токсического задымления экипажа.',
    descriptionEn: 'Tight enclosed crew volume with intermediate 30% O2 atmosphere. High risk of immediate smoke incapacitation along HVAC ducts.',
    flammabilityMultiplier: 2.30,
    recommendedSuppressionRu: [
      'Локальное подавление очага углекислым газом',
      'Быстронадеваемые дыхательные маски экипажа',
      'Экстренная продувка объема кабины'
    ],
    recommendedSuppressionEn: [
      'Fixed CO2 Compartment Quench',
      'Quick-Don Breathing Masks',
      'Rapid Cabin Purge'
    ],
    criticalRisksRu: [
      'Мгновенная потеря дееспособности экипажа из-за быстрого насыщения кабины дымом',
      'Прямая связь скорости распространения пламени с потоком циркуляции воздуха'
    ],
    criticalRisksEn: [
      'Immediate crew incapacitation due to rapid toxic smoke saturation',
      'Direct coupling between HVAC air circulation and flame spread rate'
    ]
  },
  {
    id: 'mars_transit',
    nameRu: 'Корабль марсианского транзита',
    nameEn: 'Mars Transit Vehicle',
    oxygenPercent: 28.0,
    pressurePsi: 9.5,
    gravityG: 0.0001,
    ventilationMs: 0.08,
    descriptionRu: 'Многомесячная автономная изоляция в глубоком космосе (28% O2, 9.5 psi) при 0-g. Потеря запасов атмосферы недопустима, требуется бескомпромиссная селекция дыма от пыли.',
    descriptionEn: 'Multi-year deep space transit without immediate abort capability. Autonomous suppression and dust-tolerant smoke differentiation are mandatory.',
    flammabilityMultiplier: 1.95,
    recommendedSuppressionRu: [
      'Аэрозольный мелкодисперсный водяной туман',
      'Автоматическое азотное флегматизирование отсека'
    ],
    recommendedSuppressionEn: [
      'Fine Water Mist Aerosol',
      'Automated Nitrogen Blanket Flooding'
    ],
    criticalRisksRu: [
      'Полная невозможность экстренной эвакуации или пополнения атмосферных газов с Земли',
      'Ложные тревоги от пылевого загрязнения скафандров'
    ],
    criticalRisksEn: [
      'Zero Earth-assistance or resupply: habitat atmospheric loss must be minimized',
      'Dust contamination from suits triggering false abort cascades'
    ]
  }
]

export const PSI_INVESTIGATIONS: PSISurveyItem[] = [
  {
    id: 'BASS',
    name: 'BASS & BASS-II',
    fullNameRu: 'Горение и тушение твердых материалов в невесомости',
    fullNameEn: 'Burning and Suppression of Solids in Microgravity',
    apparatusRu: 'Перчаточный бокс MSG / Проточный канал SPICE',
    apparatusEn: 'Microgravity Science Glovebox (MSG) / SPICE Flow Duct',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Solid',
    fuelsRu: ['ПММА (Акрил)', 'Хлопок со стекловолокном', 'Номекс', 'Черная целлюлоза'],
    fuelsEn: ['PMMA Acrylic', 'Cotton-Fiberglass Fabric', 'Nomex Aramid', 'Black Cellulose'],
    oxygenRangeRu: '16% – 35% O2',
    oxygenRangeEn: '16% – 35% O2',
    pressureRangeRu: '1.0 атм (14.7 psi)',
    pressureRangeEn: '1.0 atm (14.7 psi)',
    airflowSpeedRu: '1.0 – 5.5 см/с',
    airflowSpeedEn: '1.0 – 5.5 cm/s',
    keyFindingsRu: 'Материалы воспламеняются и поддерживают горение при существенно более низких скоростях обдува, чем предсказывали земные модели. Повышение O2 до 35% ускоряет распространение пламени на 300%.',
    keyFindingsEn: 'Solid materials ignite and sustain burning at lower airflow velocities than predicted by 1-g buoyancy models. Increased O2 drastically reduces extinction time and accelerates flame spread by 300%.',
    fireSafetyImpactRu: 'Сформированы эмпирические граничные кривые стандарта NASA STD-6001 для сертификации материалов Лунной базы Artemis и станции Gateway.',
    fireSafetyImpactEn: 'Delivered fundamental empirical boundary curves for NASA STD-6001 material flammability certification for the Artemis Moon Base and Gateway habitats.',
    earthSpinoffRu: 'Стандарты огнестойкости полимеров и текстиля для пассажирских авиалайнеров (FAA).',
    earthSpinoffEn: 'Advanced textile fire retardant validation and testing standards for aircraft cabin materials (FAA).',
    relevanceScore: 98
  },
  {
    id: 'SAFFIRE',
    name: 'Saffire (I – VI)',
    fullNameRu: 'Крупномасштабные пожарные эксперименты на корабле Cygnus',
    fullNameEn: 'Spacecraft Fire Safety Demonstration Project',
    apparatusRu: 'Автономный пожарный отсек Cygnus Saffire Flow Unit',
    apparatusEn: 'Autonomous Cygnus Saffire Flow Unit',
    facilityRu: 'Беспилотный орбитальный корабль Cygnus',
    facilityEn: 'Cygnus Autonomous Orbital Flight',
    fuelType: 'Solid',
    fuelsRu: ['Полотно SIBAL (хлопок-стекловолокно 1 м)', 'Плиты ПММА толщиной 5 см', 'Номекс'],
    fuelsEn: ['SIBAL Fabric (Cotton-Fiberglass 1m)', 'PMMA Slabs (5cm thick)', 'Nomex'],
    oxygenRangeRu: '21% – 40% O2',
    oxygenRangeEn: '21% – 40% O2',
    pressureRangeRu: '8.2 – 14.7 psi',
    pressureRangeEn: '8.2 – 14.7 psi',
    airflowSpeedRu: '10.0 – 30.0 см/с',
    airflowSpeedEn: '10.0 – 30.0 cm/s',
    keyFindingsRu: 'Масштабный пожар способен распространяться против набегающего потока воздуха и самоэкранироваться, преодолевая противопожарные перегородки быстрее прогнозов.',
    keyFindingsEn: 'Large-scale fires exhibit self-shielding. Flames propagate upstream into the convective flow and penetrate structural fire breaks faster than small-scale glovebox tests indicated.',
    fireSafetyImpactRu: 'Пересмотрены нормативы NASA по расстоянию между противопожарными перегородками и алгоритмы экстренной остановки вентиляции.',
    fireSafetyImpactEn: 'Redefined NASA criteria for fire barrier spacing, HVAC emergency shutdown latency, and post-fire scrubbers for exploration-class vehicles.',
    earthSpinoffRu: 'Термостойкие датчики и сканеры для пожарных инспекционных дронов в высотных зданиях.',
    earthSpinoffEn: 'High-temperature composite sensor housings deployed in commercial building fire inspection drones.',
    relevanceScore: 99
  },
  {
    id: 'FLEX',
    name: 'FLEX & FLEX-2',
    fullNameRu: 'Эксперимент по тушению капельного пламени жидкого топлива',
    fullNameEn: 'Flame Extinguishment Experiment',
    apparatusRu: 'Аппаратура капельного горения MDCA / Стойка CIR',
    apparatusEn: 'Multi-user Droplet Combustion Apparatus (MDCA) / CIR',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Liquid',
    fuelsRu: ['н-Гептан', 'Метанол', 'Декан', 'Смеси гептана и гексадекана'],
    fuelsEn: ['n-Heptane', 'Methanol', 'Decane', 'Heptane/Hexadecane blends'],
    oxygenRangeRu: '15% – 30% O2',
    oxygenRangeEn: '15% – 30% O2',
    pressureRangeRu: '0.5 – 3.0 атм',
    pressureRangeEn: '0.5 – 3.0 atm',
    airflowSpeedRu: '0 см/с (чистая диффузия)',
    airflowSpeedEn: '0 cm/s (pure diffusion)',
    keyFindingsRu: 'Открыт феномен «холодного пламени»: после видимого затухания продолжается невидимая экзотермическая реакция при температуре 500–800 K до полного выгорания топлива.',
    keyFindingsEn: 'Discovered the "Cool Flame" phenomenon: after visible yellow/blue flame radiative extinction, low-temperature (~500-800 K) burning continues invisibly until fuel is fully consumed.',
    fireSafetyImpactRu: 'Визуальное отсутствие пламени не означает ликвидацию пожара. Обязателен тепловизионный инфракрасный контроль очага.',
    fireSafetyImpactEn: 'Alerted mission planners that visual absence of flame does not guarantee fire extinction in spacecraft. Infrared thermal imaging is mandatory to verify complete flameout.',
    earthSpinoffRu: 'Кинетика низкотемпературного горения внедрена в экологичные двигатели с воспламенением от сжатия (HCCI).',
    earthSpinoffEn: 'Low-temperature clean combustion kinetics adopted in advanced ultra-efficient HCCI internal combustion engines.',
    relevanceScore: 94
  },
  {
    id: 'ACME_BRE',
    name: 'ACME: BRE',
    fullNameRu: 'Эмулятор скорости горения твердых материалов на газовой горелке',
    fullNameEn: 'Advanced Combustion via Microgravity: Burning Rate Emulator',
    apparatusRu: 'Модульный комплекс ACME / Стойка CIR',
    apparatusEn: 'ACME Modular Burner Suite / CIR',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Gas',
    fuelsRu: ['Этилен', 'Метан', 'Пропан через пористую горелку'],
    fuelsEn: ['Ethylene', 'Methane', 'Propane via porous burner'],
    oxygenRangeRu: '18% – 40% O2',
    oxygenRangeEn: '18% – 40% O2',
    pressureRangeRu: '0.7 – 1.0 атм',
    pressureRangeEn: '0.7 – 1.0 atm',
    airflowSpeedRu: '0.0 – 5.0 см/с',
    airflowSpeedEn: '0.0 – 5.0 cm/s',
    keyFindingsRu: 'Установлены точные пороги кислородного индекса (LOI) в застойных атмосферах микрогравитации без искажений от деструкции твердой фазы.',
    keyFindingsEn: 'Identified precise limiting oxygen index (LOI) thresholds in stagnant microgravity atmospheres as a function of fuel heat of vaporization and surface radiative loss.',
    fireSafetyImpactRu: 'Получены фундаментальные безразмерные критерии для прогноза самозатухания материалов при отключении бортовых вентиляторов.',
    fireSafetyImpactEn: 'Delivered fundamental dimensionless equations to predict whether a spacecraft interior material will self-extinguish when cabin air fans are disabled.',
    earthSpinoffRu: 'Методика калибровки пожарных стандартов ASTM для строительных полимерных композитов.',
    earthSpinoffEn: 'Benchmarking calibration software used for ASTM fire safety standards in architectural materials.',
    relevanceScore: 92
  },
  {
    id: 'CFI_G',
    name: 'ACME: CFI-G',
    fullNameRu: 'Исследование холодных газовых пламен при экстремальном O2',
    fullNameEn: 'Cool Flames Investigation with Gases',
    apparatusRu: 'Сферическая горелка ACME / Стойка CIR',
    apparatusEn: 'ACME Spherical Burner / CIR',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Gas',
    fuelsRu: ['Пропан / азот', 'н-Бутан'],
    fuelsEn: ['Propane / Nitrogen', 'Pure n-Butane'],
    oxygenRangeRu: 'До 85% O2 (рекорд NASA PSI)',
    oxygenRangeEn: 'Up to 85% O2 (Highest in PSI history)',
    pressureRangeRu: '0.5 – 1.0 атм',
    pressureRangeEn: '0.5 – 1.0 atm',
    airflowSpeedRu: 'Радиальный обдув',
    airflowSpeedEn: 'Radial spherical co-flow',
    keyFindingsRu: 'Холодное пламя способно устойчиво существовать при 85% O2, генерируя высокие концентрации угарного газа без видимого света и яркого излучения.',
    keyFindingsEn: 'Demonstrated that cool flames can persist at oxygen fractions as high as 85%, producing significant carbon monoxide (CO) without visible light emission.',
    fireSafetyImpactRu: 'Критически важно для шлюзовых отсеков лунной базы, где при продувке скафандров возникают локальные всплески O2 до 80-90%.',
    fireSafetyImpactEn: 'Vital for lunar EVA airlock operations where oxygen concentration transients spike towards 80-90% during suit flushing cycles.',
    earthSpinoffRu: 'Промышленные каталитические нейтрализаторы для низкотемпературного дожигания токсичных газов.',
    earthSpinoffEn: 'Novel catalyst design for low-temperature industrial gas scrubbers preventing toxic runaway reactions.',
    relevanceScore: 96
  },
  {
    id: 'SAME',
    name: 'SAME & SAME-R',
    fullNameRu: 'Измерение морфологии частиц дыма в невесомости',
    fullNameEn: 'Smoke and Aerosol Measurement Experiment',
    apparatusRu: 'Оптические счетчики аэрозолей в боксе MSG',
    apparatusEn: 'SAME Flow Carousel / MSG',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Aerosol/Dust',
    fuelsRu: ['Перегретая проводка Kapton', 'Тефлон (PTFE)', 'Силикон', 'Целлюлоза'],
    fuelsEn: ['Pyrolized Kapton wiring', 'Overheated Teflon (PTFE)', 'Silicone Rubber', 'Cellulose'],
    oxygenRangeRu: '21% O2',
    oxygenRangeEn: '21% O2',
    pressureRangeRu: '1.0 атм',
    pressureRangeEn: '1.0 atm',
    airflowSpeedRu: '5.0 – 20.0 см/с',
    airflowSpeedEn: '5.0 – 20.0 cm/s',
    keyFindingsRu: 'В невесомости частицы дыма коагулируют в цепочки в 5–10 раз крупнее земных из-за отсутствия гравитационного выноса. Земные датчики дыма дают опасную задержку.',
    keyFindingsEn: 'Smoke particles agglomerate into clusters 5x to 10x larger in mean diameter than identical particles on Earth due to lack of buoyant removal. Standard optical alarms suffer dangerous latency.',
    fireSafetyImpactRu: 'Прямая причина пересмотра калибровки всех фотоэлектрических датчиков дыма NASA для пилотируемых миссий.',
    fireSafetyImpactEn: 'Directly caused NASA to overhaul optical smoke alarm calibration for all exploration-class human spacecraft.',
    earthSpinoffRu: 'Двухволновые оптические детекторы дыма для грузовых отсеков пассажирских самолетов.',
    earthSpinoffEn: 'Advanced dual-wavelength smoke detectors for commercial aviation cargo bays, reducing expensive false alarm diversions.',
    relevanceScore: 97
  },
  {
    id: 'DAFT',
    name: 'DAFT & DAFT-2',
    fullNameRu: 'Тест селекции опасного дыма и минеральной лунной пыли',
    fullNameEn: 'Dust and Aerosol Measurement Feasibility Test',
    apparatusRu: 'Оптические счетчики P-Trak и DustTrak',
    apparatusEn: 'P-Trak and DustTrak Optical Particle Counters',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Aerosol/Dust',
    fuelsRu: ['Симулятор лунного реголита JSC-1A', 'Аэрозольная сажа', 'Кабинная пыль'],
    fuelsEn: ['Lunar Dust Simulant (JSC-1A)', 'Cabin ambient particulate', 'Carbonaceous soot'],
    oxygenRangeRu: '21% O2',
    oxygenRangeEn: '21% O2',
    pressureRangeRu: '1.0 атм',
    pressureRangeEn: '1.0 atm',
    airflowSpeedRu: 'Вентиляционный канал',
    airflowSpeedEn: 'Ventilation cabin duct',
    keyFindingsRu: 'Алгоритмы многоугольной поляризации позволяют отличить кристаллическую пыль реголита от углеродной сажи с точностью 99.2%, исключая ложные тревоги.',
    keyFindingsEn: 'Established dynamic polarization and particle aspect ratio algorithms capable of differentiating jagged mineral lunar dust from carbonaceous soot chains with 99.2% accuracy.',
    fireSafetyImpactRu: 'Основа безопасности Лунной базы Artemis: исключает непрерывные ложные пожарные тревоги от абразивной реголитной пыли со скафандров.',
    fireSafetyImpactEn: 'Critical for Lunar Gateway and Artemis Moon Base, where abrasive regolith dust tracked inside by spacesuits would otherwise trigger nonstop false fire alarms.',
    earthSpinoffRu: 'Промышленные датчики дыма для угольных шахт и элеваторов, устойчивые к запыленности.',
    earthSpinoffEn: 'Industrial dust-vs-smoke discrimination sensors used globally in underground coal mining and grain silos.',
    relevanceScore: 95
  },
  {
    id: 'E_FIELD',
    name: 'ACME: E-FIELD Flames',
    fullNameRu: 'Воздействие электрического поля на диффузионное пламя',
    fullNameEn: 'Electric-Field Effects on Laminar Diffusion Flames',
    apparatusRu: 'Высоковольтные электроды в стойке CIR',
    apparatusEn: 'ACME High-Voltage Mesh Electrodes / CIR',
    facilityRu: 'Международная космическая станция (МКС)',
    facilityEn: 'International Space Station (ISS)',
    fuelType: 'Gas',
    fuelsRu: ['Метан', 'Этилен'],
    fuelsEn: ['Methane', 'Ethylene with Nitrogen diluent'],
    oxygenRangeRu: '21% – 35% O2',
    oxygenRangeEn: '21% – 35% O2',
    pressureRangeRu: '1.0 атм',
    pressureRangeEn: '1.0 atm',
    airflowSpeedRu: 'Осевой поток',
    airflowSpeedEn: 'Laminar axial flow',
    keyFindingsRu: 'Доказана возможность бесконтактного электромагнитного управления формой пламени и его принудительного тушения без расхода химических огнетушащих веществ.',
    keyFindingsEn: 'Demonstrated non-mechanical control of flame shape, temperature, and soot emissions. Electric fields can force flame extinction without any chemical suppressant.',
    fireSafetyImpactRu: 'Фундамент для создания электромагнитных систем пожаротушения в глубоком космосе, где запасы огнетушащих газов невосполнимы.',
    fireSafetyImpactEn: 'Groundwork for next-generation active electromagnetic fire suppression systems in deep-space habitats where chemical extinguishing agents are finite.',
    earthSpinoffRu: 'Электростатические системы подавления сажи для промышленных котельных и газовых турбин.',
    earthSpinoffEn: 'Non-chemical soot reduction burners for industrial boilers and gas turbine combustors.',
    relevanceScore: 91
  }
]

export const EARTH_SPINOFFS: EarthSpinoffItem[] = [
  {
    id: 'air_tanks',
    metric: '40%',
    titleRu: 'Сверхлегкие дыхательные аппараты пожарных',
    titleEn: 'Lightweight Firefighter Breathing Apparatus',
    domainRu: 'Средства индивидуальной защиты пожарных',
    domainEn: 'Firefighter Personal Protective Equipment',
    descRu: 'NASA адаптировало технологию прочных композитных баллонов высокого давления от скафандров Apollo. Масса ранца снизилась на 40%, повысив маневренность пожарных.',
    descEn: 'NASA adapted composite pressure vessel technology from Apollo spacesuit life support. Total breathing apparatus weight was reduced by 40%, vastly improving firefighter mobility.',
    detailedRu: 'До разработки NASA спасатели носили стальные баллоны массой более 15 кг, вызывавшие хронические травмы спины и ограничивавшие запас воздуха 15 минутами. Инженеры NASA Космического центра им. Джонсона заменили сталь на алюминиевые лейнеры, армированные волокном. Новые баллоны выдерживают 300 атм при массе 8 кг, удвоив время работы звена в горящем здании.',
    detailedEn: 'Prior to NASA development, municipal firefighters carried steel cylinders weighing over 33 lbs, severely limiting entry duration and causing chronic fatigue. Engineers at NASA Johnson Space Center applied Apollo structural filament-winding techniques. The resulting composite pressure vessels sustain 4,500 psi at nearly half the mass, doubling operational endurance.',
    source: 'NASA Johnson Space Center / Spinoff 1976',
    link: 'https://spinoff.nasa.gov/node/9582'
  },
  {
    id: 'pbi_turnout',
    metric: '1000°C',
    titleRu: 'Огнестойкая экипировка пожарных (ткани PBI)',
    titleEn: 'PBI Heat-Resistant Turnout Gear',
    domainRu: 'Термозащитные материалы и боевая одежда',
    domainEn: 'Thermal Protective Clothing & Turnout Gear',
    descRu: 'После пожара на Apollo 1 NASA разработало негорючие полимерные волокна полибензимидазола (PBI). Ткань выдерживает прямой контакт с пламенем до 1000°C.',
    descEn: 'Following the Apollo 1 fire tragedy, NASA sponsored intensive development of polybenzimidazole (PBI) non-flammable polymers. Today PBI is the global benchmark for firefighting turnout gear.',
    detailedRu: 'Трагедия Apollo 1 показала уязвимость стандартных синтетических волокон в кислородной среде. Программа разработки негорючих полимеров привела к созданию PBI. Волокна PBI не плавятся, не капают и сохраняют прочность при экстремальном тепловом ударе. Сегодня из PBI шьется боевая одежда пожарных во всем мире.',
    detailedEn: 'The Apollo 1 fire revealed catastrophic vulnerabilities in standard synthetic fibers in oxygen-rich environments. NASA contracted the Celanese Corporation to synthesize polybenzimidazole (PBI) into wearable textile yarns. PBI will not burn in air, does not melt or drip, and retains dimensional integrity under 1000°C flashovers.',
    source: 'NASA Apollo Lessons Learned / Spinoff 1988',
    link: 'https://spinoff.nasa.gov/node/9918'
  },
  {
    id: 'mine_detectors',
    metric: '99.2%',
    titleRu: 'Селективные детекторы дыма и пыли для шахт',
    titleEn: 'Smoke vs. Dust Discrimination Detectors',
    domainRu: 'Промышленная безопасность и горное дело',
    domainEn: 'Mining Safety & Industrial Fire Detection',
    descRu: 'Алгоритмы экспериментов SAME и DAFT по разделению аэрозолей дыма и минеральной взвеси легли в основу шахтных газоанализаторов, исключивших 99.2% ложных тревог.',
    descEn: 'Aerosol discrimination algorithms from ISS SAME and DAFT experiments were commercialized into mining detectors that distinguish smoldering coal from heavy mineral dust.',
    detailedRu: 'В угольных шахтах стандартные оптические датчики дыма непрерывно давали ложные срабатывания из-за вездесущей угольной и породной пыли, что приводило к игнорированию тревог или остановке добычи. Приборы SAME и DAFT на МКС исследовали многоугольное лазерное рассеяние. Выяснилось, что кристаллическая минеральная пыль и хлопьевидная углеродная сажа имеют принципиально разную поляризацию, что позволило создать высоконадежные шахтные сенсоры.',
    detailedEn: 'In underground coal mining and industrial grain elevators, airborne mineral dust perpetually triggers false photoelectric smoke alarms, creating alarm fatigue. NASA Glenn researchers utilized ISS SAME and DAFT polarization scattering data to invent dual-angle optical chambers that mathematically distinguish jagged mineral dust from fractal soot agglomerates with 99.2% certainty.',
    source: 'NASA Glenn Research Center / Spinoff 1979',
    link: 'https://spinoff.nasa.gov/node/9407'
  },
  {
    id: 'water_mist',
    metric: '85%',
    titleRu: 'Системы мелкодисперсного водяного тумана',
    titleEn: 'Fine Water Mist Fire Suppression Systems',
    domainRu: 'Автоматическое пожаротушение электроники',
    domainEn: 'Clean Agent Electronics Fire Suppression',
    descRu: 'Разработанные для МКС микрокапельные огнетушители тушат очаг за счет быстрого испарения без затопления электроники, требуя на 85% меньше воды.',
    descEn: 'Micro-droplet fine water mist extinguishers developed for ISS suppress fires via rapid latent cooling without flooding electronics, requiring 85% less water than sprinklers.',
    detailedRu: 'Использование традиционных водяных спринклеров на МКС привело бы к короткому замыканию и летальному затоплению модулей, а хладоны токсичны для замкнутой системы жизнеобеспечения. NASA разработало форсунки сверхтонкого распыления (капли менее 50 мкм). Микрокапли мгновенно испаряются в пламени, отбирая гигантское количество скрытой теплоты и вытесняя кислород паром.',
    detailedEn: 'Standard sprinkler flooding is intolerable aboard spacecraft or inside high-density computer data centers due to catastrophic water damage and short circuits. NASA engineered supersonic micro-droplet nozzles (droplet diameter < 50 microns). The mist rapidly flashes to vapor in the flame envelope, absorbing extreme latent heat while locally displacing oxygen without wetting electrical contacts.',
    source: 'NASA Glenn Microgravity Division / Spinoff 2004',
    link: 'https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/'
  },
  {
    id: 'cable_insulation',
    metric: '600°C',
    titleRu: 'Негорючая фторполимерная изоляция кабелей',
    titleEn: 'Zero-Halogen Non-Flammable Cable Insulation',
    domainRu: 'Метрополитен, авиация и высотное строительство',
    domainEn: 'Mass Transit, Aviation & High-Rise Infrastructure',
    descRu: 'Космические тесты на перегрев проводки (SAME) привели к созданию кабелей с низким дымовыделением (LSZH), не выделяющих смертоносный фтороводород при пиролизе.',
    descEn: 'Spacecraft wiring pyrolization experiments (SAME) spurred development of Low Smoke Zero Halogen (LSZH) cable insulation that eliminates toxic hydrogen fluoride gas in transit fires.',
    detailedRu: 'В замкнутых пространствах (орбитальные станции, тоннели метро, салоны самолетов) более 80% смертей при пожаре вызывает отравление газами пиролиза изоляции. Эксперименты NASA выявили динамику термического разложения фторопластов при токовых перегрузках. Полученные данные легли в основу современных стандартов кабелей для метрополитенов и атомных станций.',
    detailedEn: 'In enclosed environments like space cabins, submarines, and subway tunnels, cable pyrolization generates toxic hydrogen cyanide and halogen acids before open ignition. NASA microgravity wire-overheating experiments led directly to the formulation of cross-linked, low-smoke zero-halogen (LSZH) insulation compounds mandated globally across high-density transit corridors.',
    source: 'NASA Physical Sciences / NTRS Document 20120008692',
    link: 'https://psi.nasa.gov/physci/repo/search?q=combustion'
  },
  {
    id: 'infrared_detectors',
    metric: '0.05s',
    titleRu: 'Сверхбыстрые мультиспектральные детекторы пламени',
    titleEn: 'Multi-Spectrum Infrared Flame Scanners',
    domainRu: 'Нефтегазовые платформы и химические заводы',
    domainEn: 'Offshore Petrochemical & Fuel Depots',
    descRu: 'Сенсоры, созданные для обнаружения невидимого водородного пламени шаттлов и холодных пламен FLEX, реагируют на вспышку за 50 миллисекунд.',
    descEn: 'Optical sensors developed to detect invisible hydrogen shuttle flames and FLEX cool flames respond to ignition in 50 milliseconds across triple infrared bands.',
    detailedRu: 'Жидкий водород и некоторые углеводороды в невесомости горят почти невидимым пламенем без раскаленной углеродной сажи. На космодроме мыса Канаверал для двигателей RS-25 требовались оптические датчики, способные видеть ультрафиолетовое и ИК-излучение гидроксил-радикалов (OH*). Сегодня эти сенсоры стоят на СПГ-терминалах и нефтеперерабатывающих заводах.',
    detailedEn: 'Hydrogen and cool-flame hydrocarbons burn with virtually zero visible radiation or incandescent carbon emissions. To safeguard Space Shuttle launch pads during cryogenic fueling, NASA developed triple-band optical detectors tracking narrow hydroxyl (OH*) chemiluminescence. These systems now protect global LNG export terminals and offshore drilling rigs.',
    source: 'NASA Kennedy Space Center / Spinoff 1994',
    link: 'https://spinoff.nasa.gov/node/9407'
  }
]
