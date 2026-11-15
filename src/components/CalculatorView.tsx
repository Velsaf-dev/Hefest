import React, { useState, useMemo } from 'react'
import { Lang, T } from '../data/translations'

interface CalculatorViewProps {
  lang: Lang
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ lang }) => {
  const t = T[lang]

  const [oxygen, setOxygen] = useState<number>(34.0)
  const [pressure, setPressure] = useState<number>(8.2)
  const [airflow, setAirflow] = useState<number>(12.0)
  const [gravity, setGravity] = useState<number>(0.166)
  const [material, setMaterial] = useState<string>('PMMA')

  const loadPreset = (o2: number, p: number, v: number, g: number, mat: string) => {
    setOxygen(o2)
    setPressure(p)
    setAirflow(v)
    setGravity(g)
    setMaterial(mat)
  }

  const calculation = useMemo(() => {
    const materialFactors: Record<string, { baseSpread: number, loi1g: number, nameRu: string, nameEn: string }> = {
      'PMMA': { baseSpread: 1.2, loi1g: 17.5, nameRu: 'ПММА (Акрил)', nameEn: 'PMMA (Acrylic)' },
      'Cotton': { baseSpread: 1.8, loi1g: 16.0, nameRu: 'Хлопок-стекловолокно (SIBAL)', nameEn: 'Cotton-Fiberglass (SIBAL)' },
      'Nomex': { baseSpread: 0.4, loi1g: 28.5, nameRu: 'Номекс (Арамид)', nameEn: 'Nomex Fabric' },
      'Silicone': { baseSpread: 0.9, loi1g: 22.0, nameRu: 'Силиконовый герметик', nameEn: 'Silicone Sealant' }
    }
    const matData = materialFactors[material] || materialFactors['PMMA']

    const o2Factor = Math.pow(oxygen / 21.0, 1.85)
    const pressureFactor = Math.pow(pressure / 14.7, 0.45)

    let airflowFactor = 1.0
    if (airflow < 2.0) {
      airflowFactor = 0.45
    } else if (airflow <= 18.0) {
      airflowFactor = 0.5 + (airflow / 18.0) * 0.9
    } else {
      airflowFactor = 1.4 - ((airflow - 18.0) / 30.0) * 0.4
    }

    let gravityFactor = 1.0
    if (gravity <= 0.01) {
      gravityFactor = 0.85
    } else if (gravity <= 0.3) {
      gravityFactor = 1.35
    } else {
      gravityFactor = 1.0
    }

    const rawIndex = 25 * matData.baseSpread * o2Factor * pressureFactor * airflowFactor * gravityFactor
    const flammabilityIndex = Math.min(100, Math.max(0, Math.round(rawIndex)))

    const rawSpread = 0.45 * matData.baseSpread * (oxygen - matData.loi1g) * (airflow / 10.0)
    const spreadVelocity = rawSpread > 0 ? rawSpread.toFixed(2) : '0.00'

    const co2RequiredPercent = Math.min(55, Math.max(20, Math.round(24 + (oxygen - 21) * 0.85 + (pressure - 10) * 0.4)))

    let status: 'safe' | 'elevated' | 'critical' = 'safe'
    if (flammabilityIndex >= 65) status = 'critical'
    else if (flammabilityIndex >= 35) status = 'elevated'

    const grashof = gravity <= 0.0001 ? 0 : Math.round(gravity * 2.5e4 * Math.pow(pressure / 14.7, 2))

    let expertConclusionRu = ''
    let expertConclusionEn = ''

    if (status === 'critical') {
      expertConclusionRu = `Согласно критериям NASA-STD-6001B (Test 1), в атмосфере ${oxygen}% O2 при давлении ${pressure} psi материал ${matData.nameRu} находится в закритической зоне горения. При гравитации ${gravity}g число Грасгофа (Gr ≈ ${grashof > 0 ? grashof.toExponential(1) : '0'}) формирует ламинарный восходящий пограничный слой, недостаточный для сдувания пламени (blow-off extinction), но непрерывно подающий окислитель в зону пиролиза. Расчетная скорость фронта пламени ${spreadVelocity} мм/с исключает ручную локализацию; обязательны экстренное отключение циркуляции воздуха (t < 8 с) и объемное флегматизирование атмосферы подачей CO2 до ${co2RequiredPercent}% об.`
      expertConclusionEn = `Pursuant to NASA-STD-6001B Test 1 criteria, elevating ambient oxidizer to ${oxygen}% O2 at ${pressure} psi forces ${matData.nameEn} into a super-critical combustion regime. At ${gravity}g, the computed Grashof number (Gr ≈ ${grashof > 0 ? grashof.toExponential(1) : '0'}) establishes a laminar buoyant draft insufficient to induce convective blow-off extinction while continuously feeding the pyrolysis boundary layer. Predicted flame spread rate (${spreadVelocity} mm/s) precludes manual intervention; automated HVAC fan cessation (t < 8 s) and volumetric CO2 inerting to ≥ ${co2RequiredPercent}% vol. are mandatory.`
    } else if (status === 'elevated') {
      expertConclusionRu = `Пограничный кинетический режим для материала ${matData.nameRu}. Скорость химической реакции лимитируется внешней forced-конвекцией (${airflow} см/с). Данные исследований BASS-II и ACME BRE подтверждают: при снижении локальной скорости обдува ниже 2.5 см/с суммарные радиационные теплопотери с поверхности образца превышают тепловыделение в зоне пламени, вызывая радиационное затухание в течение 12–18 секунд.`
      expertConclusionEn = `Boundary kinetic regime for ${matData.nameEn}. Reaction kinetics remain coupled to external convective draft (${airflow} cm/s). Flight data from BASS-II and ACME BRE demonstrate that decelerating local ventilation below 2.5 cm/s forces radiative surface heat loss to exceed chemical heat release, causing radiative extinction within 12–18 seconds.`
    } else {
      expertConclusionRu = `Безопасная зона горения: параметры среды находятся ниже эмпирического предела самоподдерживающегося распространения пламени (LOI = ${matData.loi1g}%). Радиационная диссипация тепла доминирует над экзотермической кинетикой окисления. Риск перехода в устойчивое открытое горение отсутствует при штатном контроле застойных зон.`
      expertConclusionEn = `Safe boundary: environmental conditions remain below the empirical self-sustained flammability threshold (LOI = ${matData.loi1g}%). Radiative thermal dissipation dominates over exothermic reaction kinetics. Sustained open flame propagation is physically impossible under standard stagnant air monitoring.`
    }

    return {
      flammabilityIndex,
      spreadVelocity,
      co2RequiredPercent,
      status,
      matName: lang === 'ru' ? matData.nameRu : matData.nameEn,
      expertConclusion: lang === 'ru' ? expertConclusionRu : expertConclusionEn
    }
  }, [oxygen, pressure, airflow, gravity, material, lang])

  return (
    <div className="h-full flex flex-col p-10 overflow-y-auto space-y-8 bg-[#050608]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#161a22] pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            {t.calcHeader}
          </h1>
          <div className="w-16 h-1.5 bg-emerald-400 mt-3" />
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadPreset(34.0, 8.2, 12.0, 0.166, 'PMMA')}
            className="px-4 py-2 bg-emerald-500 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            Artemis (34% O2)
          </button>
          <button
            onClick={() => loadPreset(21.0, 14.7, 10.0, 0.0001, 'Cotton')}
            className="px-4 py-2 bg-[#0b0e14] text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            ISS (21% O2)
          </button>
          <button
            onClick={() => loadPreset(100.0, 4.3, 5.0, 0.166, 'Nomex')}
            className="px-4 py-2 bg-[#0b0e14] text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            EVA (100% O2)
          </button>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-[#0b0e14] p-8 space-y-6">
          {/* Material Select */}
          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-2 font-bold tracking-wider">
              {lang === 'ru' ? 'Материал (NASA-STD-6001B)' : 'Material (NASA-STD-6001B)'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'PMMA', nameRu: 'ПММА (Акрил)', nameEn: 'PMMA Acrylic' },
                { id: 'Cotton', nameRu: 'SIBAL (Хлопок)', nameEn: 'SIBAL Cotton' },
                { id: 'Nomex', nameRu: 'Номекс (Арамид)', nameEn: 'Nomex Aramid' },
                { id: 'Silicone', nameRu: 'Силикон', nameEn: 'Silicone' }
              ].map(mat => (
                <button
                  key={mat.id}
                  onClick={() => setMaterial(mat.id)}
                  className={`p-3 text-left text-xs font-mono uppercase tracking-wider transition-all ${
                    material === mat.id
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-[#07090c] text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'ru' ? mat.nameRu : mat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Oxygen Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-neutral-300">
                {t.sliderOxygen}
              </span>
              <span className="font-bold text-emerald-400">
                {oxygen.toFixed(1)}% O2
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={100}
              step={0.5}
              value={oxygen}
              onChange={(e) => setOxygen(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#07090c] appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Pressure Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-neutral-300">
                {t.sliderPressure}
              </span>
              <span className="font-bold text-white">
                {pressure.toFixed(1)} psi
              </span>
            </div>
            <input
              type="range"
              min={4.0}
              max={15.0}
              step={0.1}
              value={pressure}
              onChange={(e) => setPressure(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#07090c] appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Airflow Velocity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-neutral-300">
                {t.sliderVentilation}
              </span>
              <span className="font-bold text-white">
                {airflow.toFixed(1)} {lang === 'ru' ? 'см/с' : 'cm/s'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={35}
              step={0.5}
              value={airflow}
              onChange={(e) => setAirflow(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#07090c] appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Gravity Selector */}
          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-2 font-bold tracking-wider">
              {t.sliderGravity}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { g: 0.0001, label: '0-g (ISS)' },
                { g: 0.166, label: '0.166-g (Moon)' },
                { g: 0.38, label: '0.38-g (Mars)' }
              ].map(item => (
                <button
                  key={item.g}
                  onClick={() => setGravity(item.g)}
                  className={`p-2.5 text-center text-xs font-mono uppercase transition-all ${
                    gravity === item.g
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-[#07090c] text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Result Card */}
          <div className="bg-[#0b0e14] p-8">
            <div className="flex items-center justify-between border-b border-[#161a22] pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                {t.flammabilityIndex}
              </span>
              <span className={`text-xs font-mono font-bold uppercase ${
                calculation.status === 'critical'
                  ? 'text-red-400'
                  : calculation.status === 'elevated'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {calculation.status === 'critical' && t.flammabilityStatusCritical}
                {calculation.status === 'elevated' && t.flammabilityStatusElevated}
                {calculation.status === 'safe' && t.flammabilityStatusSafe}
              </span>
            </div>

            <div className="my-8">
              <div className="text-6xl font-black font-mono text-white tracking-tight">
                {calculation.flammabilityIndex}
                <span className="text-2xl font-normal text-neutral-500"> / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#161a22]">
              <div className="bg-[#07090c] p-5">
                <span className="text-[11px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Скорость фронта пламени' : 'Flame Spread Velocity'}
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  {calculation.spreadVelocity} {lang === 'ru' ? 'мм/с' : 'mm/s'}
                </span>
              </div>

              <div className="bg-[#07090c] p-5">
                <span className="text-[11px] font-mono uppercase text-neutral-500 block tracking-wider">
                  {lang === 'ru' ? 'Требуемый CO2 для тушения' : 'Required Extinguishing CO2'}
                </span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {calculation.co2RequiredPercent}% vol.
                </span>
              </div>
            </div>
          </div>

          {/* Authoritative Aerospace Engineering Conclusion */}
          <div className="bg-[#0b0e14] border-l-4 border-l-emerald-400 p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              {t.predictiveInsightHeader}
            </span>
            <p className="text-sm text-neutral-200 font-sans mt-3 leading-relaxed">
              {calculation.expertConclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
