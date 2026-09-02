export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Category =
  | 'General Knowledge'
  | 'Science'
  | 'Math'
  | 'History'
  | 'Geography'
  | 'Technology'
  | 'Sports'
  | 'Entertainment';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: Category;
  questionCount: number;
  difficulty: Difficulty;
  durationMinutes: number;
  image: string;
  questions: Question[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export const CATEGORIES: Category[] = [
  'General Knowledge',
  'Science',
  'Math',
  'History',
  'Geography',
  'Technology',
  'Sports',
  'Entertainment',
];

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
