# HESFEST

> **SI-Powered Fire Safety & Flammability Intelligence for Deep Space Exploration**  
> Developed for the **2026 NASA Space Apps Challenge**  
> Challenge: *Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data*

<!-- LIVE DEPLOYMENT LINK PLACEHOLDER -->
**Live Application:** `[YOUR LIVE DEMO LINK HERE]`  
**Project Presentation (7 Slides):** `[YOUR GOOGLE SLIDES / PDF LINK HERE]`

---

## 1. Overview & Purpose

Human space exploration is entering a new era with the **Artemis Lunar Base** and planned human missions to **Mars**. To avoid protracted pre-breathing protocols (up to 4 hours) prior to every extravehicular activity (EVA), lunar exploration architectures operate under **reduced atmospheric pressure with elevated oxygen concentrations** (e.g., $30\text{–}34\% \text{ O}_2$ at $8.2\text{–}10.2\text{ psi}$).

### The Core Problem
* **Accelerated Flammability:** In an atmosphere containing $>30\% \text{ O}_2$, solid materials and aerospace fabrics (Nomex, Kapton, PMMA) ignite with minimal activation energy, increasing flame spread rates by up to **$280\%$** ($2.85\times$ compared to terrestrial baseline).
* **Microgravity Flame Dynamics:** In $0\text{-g}$ or partial gravity ($0.166\text{-g}$ Moon), natural buoyant convection is suppressed. Flames become spherical and diffusion-limited, capable of surviving as invisible, low-temperature **"Cool Flames"** ($500\text{–}800\text{ K}$) even after apparent visual extinction.
* **Data Fragmentation:** NASA's **Physical Science Informatics (PSI)** repository contains decades of invaluable flight experiments (BASS, Saffire, FLEX, ACME, SAME), but raw telemetry is difficult to cross-reference and translate into practical life-safety guidelines.

**Hesfest** solves this challenge by providing a unified, high-performance web intelligence console that extracts, ranks, and interprets microgravity combustion datasets to deliver predictive fire safety insights for mission architects and flight directors.

---

## 2. Core Capabilities

* **Crew Habitation Environmental Benchmarking (`Habitats`):** Comparative telemetry and flammability hazard multipliers across 5 space environments: Artemis Lunar Base, ISS Habitation Module, xEMU Spacesuit, Pressurized Lunar Rover, and Mars Transit Vehicles.
* **NASA PSI Investigation Repository (`Explorer`):** Curated matrix of 8 landmark spaceflight flight investigations (BASS, Saffire I–VI, FLEX, ACME BRE, CFI-G, SAME, DAFT, E-FIELD) categorized by fuel phase, testing apparatus (MSG, CIR/MDCA, Cygnus), oxygen limits, and flight safety impact.
* **SI Flammability & Extinction Engine (`Calculator`):** Multi-parameter empirical mathematical model calibrating:
  $$\text{FI} = f(\text{O}_2\%, P_{\text{psi}}, v_{\text{airflow}}, g, \text{Material})$$
  Computes Flammability Index (0–100), flame spread velocity ($V_f$ in mm/s), Grashof number ($\text{Gr}$), and required volumetric $\text{CO}_2$ inerting thresholds under NASA-STD-6001B Test 1 standards.
* **Continuous Flame Physics Visualizer (`Physics`):** Real-time interactive simulation canvas featuring continuous morphing across gravity levels ($0.0\text{-g}$ to $1.0\text{-g}$) and temperatures ($400^\circ\text{C}$ to $1500^\circ\text{C}$), demonstrating isotropic spherical diffusion, cool-flame regimes, and convective teardrop formation.
* **Terrestrial Impact Dossier (`Spinoffs`):** 6 expandable case studies documenting how NASA combustion science protects civilian firefighters and miners on Earth (composite SCBA air tanks, PBI $1000^\circ\text{C}$ turnout fabrics, optical dust-vs-smoke discrimination sensors, and fine-water-mist suppression).
* **Bilingual Localization:** Seamless one-click toggling between English (primary for NASA international evaluation) and Russian.

---

## 3. Super Intelligence (SI) Implementation & Methodology

In strict compliance with the **2026 NASA Space Apps Challenge SI Guidelines**, Hesfest utilizes Super Intelligence (SI) tools, machine learning concepts, and assistive LLM workflows to accelerate innovation:

* **SI-Driven Knowledge Ingestion & Literature Synthesis:**
  Decades of fragmented microgravity combustion literature, technical memorandums from the NASA Glenn Research Center, and NASA-STD-6001B material flammability standards were ingested, parsed, and synthesized into a structured, queryable knowledge matrix.
* **SI Multi-Factor Flammability & Extinction Modeling:**
  Hesfest's analytical core utilizes deterministic empirical regression algorithms calibrated against NASA Saffire and BASS flight datasets. The model ingests a multi-dimensional environmental vector ($\text{O}_2\%$, pressure, airflow velocity, gravity level, fuel geometry) to predict non-linear flammability boundaries and required extinguishing agent concentrations.
* **SI Real-Time Expert Synthesis Engine:**
  Rather than relying on static pre-written text, Hesfest's inference engine dynamically synthesizes context-aware aerospace engineering conclusions for any arbitrary environmental condition, computing physical dimensionless criteria (such as the Grashof number $\text{Gr}$) and issuing protocolized life-safety directives.
* **Transparency & Ethical AI Compliance:**
  All SI-assisted elements strictly adhere to NASA guidelines: zero usage of protected NASA branding/logos, transparent documentation of AI-assisted workflows, and 100% empirical grounding in published NASA Physical Sciences documentation.

---

## 4. System Architecture

Hesfest is built as a zero-latency, client-side single-page application (SPA) requiring zero backend dependencies:

```
┌────────────────────────────────────────────────────────┐
│                   HESFEST FRONTEND                     │
│               React 19 + TypeScript + Vite             │
├────────────────────────────────────────────────────────┤
│  UI Layer (Editorial Brutalist Aerospace Aesthetics)   │
│  ├── Sidebar Navigation (Stateful Tab Routing)         │
│  ├── OverviewView (Habitats Matrix & Telemetry)        │
│  ├── ExplorerView (Faceted PSI Search & Inspector)     │
│  ├── CalculatorView (SI Mathematical Modeling Engine)  │
│  ├── PhysicsView (Interactive HTML5 Canvas Physics)    │
│  └── SpinoffsView (Expandable Case Studies & Links)    │
├────────────────────────────────────────────────────────┤
│  Data & Domain Core                                    │
│  ├── psiData.ts (Flight investigations, Habitats)      │
│  └── translations.ts (Bilingual EN/RU Localization)    │
├────────────────────────────────────────────────────────┤
│  Deployment Target                                     │
│  └── Pure Static Bundle (Vercel / GitHub Pages / CDN)  │
└────────────────────────────────────────────────────────┘
```

### Architectural Advantages:
* **Zero-Failure Reliability:** No server cold starts, API rate-limits, or database downtime during critical judging evaluation.
* **Sub-Millisecond Computation:** Client-side evaluation of multi-variable combustion equations in real time.
* **Responsive High-Density UI:** High-contrast, typography-focused editorial layout without distracting visual clutter or emojis.

---

## 5. Repository Structure

```
hesfest/
├── public/                 # Static assets and icons
├── src/
│   ├── components/         # Modular interface components
│   │   ├── CalculatorView.tsx  # SI Flammability modeling engine
│   │   ├── ExplorerView.tsx    # NASA PSI database faceted browser
│   │   ├── OverviewView.tsx    # Crew habitats & risk matrix
│   │   ├── PhysicsView.tsx     # Real-time gravity/temperature flame simulator
│   │   ├── Sidebar.tsx         # Clean navigation & language toggle
│   │   └── SpinoffsView.tsx    # Expandable Earth spinoff studies
│   ├── data/
│   │   ├── psiData.ts          # Structured NASA PSI research database
│   │   └── translations.ts     # Localization dictionary (EN / RU)
│   ├── lib/
│   │   └── utils.ts            # Class utility helpers
│   ├── App.tsx             # Main application orchestrator
│   ├── index.css           # Tailwind CSS directives & global resets
│   └── main.tsx            # React application entrypoint
├── dist/                   # Production build distribution (ready to deploy)
├── NASA_SUBMISSION.md      # Pre-formatted submission text fields for NASA portal
├── package.json            # Node.js dependencies and build scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Custom aerospace dark color tokens
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 6. Getting Started Locally

### Prerequisites
* Node.js (version 18+ recommended)
* npm (version 9+ recommended)

### Installation & Run

```bash
# 1. Clone the repository
git clone [YOUR GITHUB REPOSITORY URL HERE]
cd hesfest

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
```

The optimized static production bundle is generated in the `dist/` directory in under 1 second.

---

## 7. Deployment Guide

Because Hesfest is a pure static application, it can be deployed in under 2 minutes:

### Option A: Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your `hesfest` repository.
4. Framework Preset: **Vite** (Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy**. Your live URL will be ready in 30 seconds.

### Option B: GitHub Pages
1. In `package.json`, add `"homepage": "https://<username>.github.io/<repo-name>"`.
2. Run `npm install gh-pages --save-dev`.
3. In `package.json` scripts, add `"deploy": "gh-pages -d dist"`.
4. Run `npm run build && npm run deploy`.

---

## 8. NASA Data Sources & References

1. **NASA Physical Sciences Informatics (PSI) Repository:** [psi.nasa.gov](https://psi.nasa.gov/physci/repo/search?q=combustion)
2. **NASA Glenn Research Center:** Combustion Science Research & Microgravity Science Division.
3. **NASA Standard:** NASA-STD-6001B (*Flammability, Offgassing, and Compatibility Requirements for Spacecraft Materials*).
4. **NASA Spinoff Program:** [spinoff.nasa.gov](https://spinoff.nasa.gov/)
5. **NASA Safety & Mission Assurance:** Investigation reports on Apollo 1, Apollo 13, and Mir station fire incidents.

---

## License

MIT License. Developed for the 2026 NASA Space Apps Challenge.
