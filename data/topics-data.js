// ── Topics / Sub-chapter structure ───────────────────────────────────────
// Each course → sub-topics → flashcard tags + description
// Used by the Topics screen to browse thematic study units

window.TOPICS_DATA = {

  Statistik: {
    emoji: "📊",
    color: "#2563eb",
    bgGradient: "linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)",
    topics: [
      {
        id: "stat-ki",
        title: "Schätztheorie & Konfidenzintervalle",
        short: "KI",
        emoji: "🎯",
        tags: ["KI","z-Verteilung","t-Verteilung","Formel","Anteilswert","Stichprobenumfang"],
        desc: "z-KI, t-KI, Anteilswert-KI, Stichprobenumfangsberechnung",
        priority: "high"
      },
      {
        id: "stat-ht",
        title: "Hypothesentests",
        short: "H-Tests",
        emoji: "⚗️",
        tags: ["z-Test","t-Test","Prüfgrösse","p-Wert","Entscheidungsregel","Fehlertypen","Power"],
        desc: "z-/t-Test, p-Wert, α/β-Fehler, Entscheidungsregeln",
        priority: "high"
      },
      {
        id: "stat-anova",
        title: "ANOVA",
        short: "ANOVA",
        emoji: "📉",
        tags: ["ANOVA","F-Test","Quadratsummen","Voraussetzungen"],
        desc: "F-Test, SST/SSTR/SSE, Varianzhomogenität",
        priority: "medium"
      },
      {
        id: "stat-reg",
        title: "Lineare Regression",
        short: "Regression",
        emoji: "📈",
        tags: ["Regression","β-Koeffizienten","R²","Interpretation","Kausalität"],
        desc: "KQ-Schätzung, R², Signifikanztests für Koeffizienten",
        priority: "high"
      },
      {
        id: "stat-zgv",
        title: "Stichprobenverteilungen & ZGS",
        short: "ZGS",
        emoji: "🔔",
        tags: ["ZGS","Normalverteilung","Standardfehler","SE","Konzept"],
        desc: "Zentraler Grenzwertsatz, Standardfehler vs. SD",
        priority: "medium"
      },
      {
        id: "stat-2s",
        title: "Zweistichproben-Tests",
        short: "2-Stichprobe",
        emoji: "⚖️",
        tags: ["Zweistichproben","t-Test","gepaart","ungepaart","Freiheitsgrade","Stichprobenvarianz"],
        desc: "Gepaart vs. ungepaart, Bessel-Korrektur, df",
        priority: "medium"
      }
    ]
  },

  MakroII: {
    emoji: "📈",
    color: "#059669",
    bgGradient: "linear-gradient(135deg,#064e3b 0%,#065f46 100%)",
    topics: [
      {
        id: "makro-geld",
        title: "Finanzmärkte & Geldpolitik",
        short: "Geldpolitik",
        emoji: "🏦",
        tags: ["Geldpolitik","ZLB","QE","Geldmenge","EZB","SNB"],
        desc: "Zinssatz, QE, Zero Lower Bound, Transmissionskanäle",
        priority: "high"
      },
      {
        id: "makro-islm",
        title: "IS-LM Modell",
        short: "IS-LM",
        emoji: "⚙️",
        tags: ["IS-LM","Gleichgewicht","Multiplikator","Fiskalpolitik","Geldpolitik"],
        desc: "Gütermarkt (IS), Geldmarkt (LM), Gleichgewicht & Policy",
        priority: "high"
      },
      {
        id: "makro-offen",
        title: "Offene Volkswirtschaft",
        short: "Offen",
        emoji: "💱",
        tags: ["Wechselkurs","PPP","UIP","Mundell-Fleming","Export","Import"],
        desc: "PPP, UIP, Mundell-Fleming IS-LM-BP, Wechselkurspolitik",
        priority: "high"
      },
      {
        id: "makro-wachstum",
        title: "Wachstumstheorie",
        short: "Wachstum",
        emoji: "🌱",
        tags: ["Solow","Kapitalakkumulation","Steady-State","TFP","BIP-Wachstum"],
        desc: "Solow-Modell, Steady State, technischer Fortschritt",
        priority: "medium"
      },
      {
        id: "makro-fiskal",
        title: "Fiskalpolitik & Staatsschuld",
        short: "Fiskalpolitik",
        emoji: "🏛️",
        tags: ["Fiskalpolitik","Staatsschuld","Deficit","Schuldenbremse","crowding-out"],
        desc: "Staatsausgaben-Multiplikator, automatische Stabilisatoren, Schuldenbremse",
        priority: "medium"
      }
    ]
  },

  ESF: {
    emoji: "🔬",
    color: "#7c3aed",
    bgGradient: "linear-gradient(135deg,#4c1d95 0%,#5b21b6 100%)",
    sessions: {
      1: "Forschungsprozess & Grundlagen",
      2: "Forschungsfrage & Hypothesen",
      3: "Quantitative Methoden",
      4: "Qualitative Methoden",
      5: "Gütekriterien & Open Science",
      6: "Akademisches Schreiben",
    },
    topics: [
      {
        id: "esf-wiss",
        title: "Wissenschaftstheorie & Forschungslogik",
        short: "Wiss.theorie",
        emoji: "🧠",
        session: 1,
        tags: ["Forschungsprozess","Hypothesen","Theorie","Deduktion","Induktion"],
        desc: "Forschungsprozess, Forschungsdesigns, Hypothesenbildung",
        priority: "medium"
      },
      {
        id: "esf-quant",
        title: "Quantitative Methoden",
        short: "Quantitativ",
        emoji: "🧪",
        session: 3,
        tags: ["Experiment","Randomisierung","Umfrage","Survey","Kausalität"],
        desc: "Experiment, Survey, Kausalität vs. Korrelation",
        priority: "high"
      },
      {
        id: "esf-mess",
        title: "Skalierung & Messung",
        short: "Messung",
        emoji: "📏",
        session: 3,
        tags: ["Skalenniveau","Nominal","Ordinal","Intervall","Ratio","Likert","Cronbach"],
        desc: "Skalenniveaus, Likert-Skalen, Cronbach's Alpha",
        priority: "high"
      },
      {
        id: "esf-qual",
        title: "Qualitative Methoden",
        short: "Qualitativ",
        emoji: "🎤",
        session: 4,
        tags: ["Interview","Grounded-Theory","Ethnographie","Inhaltsanalyse","Fallstudie"],
        desc: "Interview-Typen, Sampling-Strategien, Grounded Theory",
        priority: "high"
      },
      {
        id: "esf-gute",
        title: "Gütekriterien & Forschungsethik",
        short: "Gütekriterien",
        emoji: "🎯",
        session: 5,
        tags: ["Reliabilität","Validität","Objektivität","Replikation","Open-Science"],
        desc: "Reliabilität, Validität, Objektivität, Replikationskrise",
        priority: "high"
      }
    ]
  },

  OM: {
    emoji: "⚙️",
    color: "#ea580c",
    bgGradient: "linear-gradient(135deg,#7c2d12 0%,#9a3412 100%)",
    topics: [
      {
        id: "om-forecast",
        title: "Forecasting",
        short: "Forecasting",
        emoji: "📉",
        tags: ["Forecasting","Exponential-Smoothing","Gleitender-Durchschnitt","MAD","MSE","MAPE","Trend","Saisonalität"],
        desc: "Moving Average, Exp. Smoothing, Fehlermaße (MAD/MSE/MAPE)",
        priority: "high"
      },
      {
        id: "om-inv",
        title: "Inventory Management",
        short: "Inventar",
        emoji: "📦",
        tags: ["EOQ","ROP","Safety-Stock","Servicegrad","Lagerkosten","Bestellkosten"],
        desc: "EOQ-Formel, Reorder Point, Safety Stock, Servicegrad",
        priority: "high"
      },
      {
        id: "om-agg",
        title: "Aggregate Planning & S&OP",
        short: "Agg. Planning",
        emoji: "📅",
        tags: ["Aggregate-Planning","S&OP","Chase-Strategy","Level-Strategy","Kapazität"],
        desc: "Chase vs. Level, Kapazitätsoptionen, S&OP-Prozess",
        priority: "medium"
      },
      {
        id: "om-mrp",
        title: "MRP & Scheduling",
        short: "MRP",
        emoji: "🔧",
        tags: ["MRP","BOM","Master-Schedule","Lead-Time","Scheduling","Critical-Path"],
        desc: "MRP-Logik, BOM, Master Production Schedule",
        priority: "medium"
      },
      {
        id: "om-quality",
        title: "Quality Management",
        short: "Qualität",
        emoji: "✅",
        tags: ["TQM","Six-Sigma","Control-Chart","Cpk","Defects","Lean"],
        desc: "TQM, Six Sigma (DMAIC), Control Charts, Cpk",
        priority: "medium"
      }
    ]
  }
};
