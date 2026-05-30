// ── Feed Data ─────────────────────────────────────────────────────────────
// Fallback für unauthentifizierte Nutzer (DB-Version via get_user_feed())

window.FEED_CARDS = [
  {
    id: "esf-sv-04",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🔬",
    title: "Das Laborexperiment",
    subtitle: "Kausalität beweisen — UV, AV & Kontrollgruppe",
    description: "Was macht ein Laborexperiment so mächtig? UV manipulieren, AV messen, interne Validität sichern.",
    topics: ["Laborexperiment", "Kausalität", "UV", "AV", "Kontrollgruppe"],
    duration: "1:00",
    level: "Prüfungsrelevant ⚡",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/laborexperiment_reel.mp4",
    thumbnail_emoji: "🔬",
    block: "Forschungsdesigns & Experimente"
  },
];
