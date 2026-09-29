window.EXAM_DATA_BWL_HS22 = {
  id: 'bwl-hs22',
  title: 'BWL — Prüfung HS 2022',
  course: 'BWL',
  courseColor: '#0d9488',
  duration_minutes: 90,
  total_points: 60,
  exam_info: {
    date: 'HS 2022',
    duration: '90 Minuten',
    format: 'Single Choice + offene Fragen',
    allowed_aids: 'Keine',
    grading: 'Notenschlüssel HS22',
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 },
  },
  sections: [
    {
      id: 'teil1',
      title: 'Teil I: Grundlagen & Unternehmensführung',
      description: 'Grundbegriffe der Betriebswirtschaftslehre',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'bwl-hs22-01',
          number: 1,
          points: 2,
          text: '[PLACEHOLDER — Frage 1 hier einfügen]',
          choices: [
            { key: 'A', text: '[Antwort A]' },
            { key: 'B', text: '[Antwort B]' },
            { key: 'C', text: '[Antwort C]' },
            { key: 'D', text: '[Antwort D]' },
          ],
          correct: ['A'],
          explanation: '[Erklärung hier]',
          topics: ['Grundlagen'],
        },
      ],
    },
  ],
};
