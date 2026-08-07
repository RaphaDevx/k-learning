export interface ExamChoice {
  key: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  text: string;
  type: 'single_choice' | 'multiple_choice' | 'open';
  points: number;
  expectedDuration?: number;
  choices: ExamChoice[];
  correct: string[];
  explanation?: string | null;
  imageHtml?: string | null;
  imageAsset?: string | null;
}

export interface ExamSection {
  id: string;
  title: string;
  description?: string;
  context?: string | null;
  points: number;
  question_type: string;
  questions: ExamQuestion[];
}

export interface ScoringRules {
  single_choice: { correct: number; wrong: number; blank: number };
  multiple_choice: { allCorrect: number; anyWrong: number; blank: number };
}

export interface ExamData {
  id: string;
  title: string;
  course: string;
  courseColor?: string;
  durationMinutes: number;
  totalPoints: number;
  scoringRules: ScoringRules;
  examInfo?: {
    date?: string;
    duration?: string;
    format?: string;
    allowedAids?: string;
    grading?: string;
  };
  sections: ExamSection[];
}

export interface ExamMeta {
  id: string;
  title: string;
  course: string;
  courseColor: string;
  durationMinutes: number;
  totalPoints: number;
  available: boolean;
  bundled: boolean;
}

export type AnswerMap = Record<string, string[]>;

export interface ExamResult {
  examId: string;
  title: string;
  course: string;
  scorePct: number;
  pointsEarned: number;
  totalPoints: number;
  grade: string;
  answers: AnswerMap;
  takenAt: string;
  durationSeconds: number;
}
