
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  instructorName: string;
  coverImage: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number; // 0-100
  estimatedHours: number;
  week: number;
  prerequisites: string[];
  resourceCount: number;
  quizCount: number;
  adaptedDifficulty: 'easy' | 'medium' | 'hard';
  learningStyle: string[];
}

export interface RoadmapModule extends Module {
  resources: Resource[];
  quizzes: QuizSummary[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise';
  duration: number; // minutes
  completed: boolean;
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  timeLimit: number; // minutes
  completed: boolean;
  score?: number;
}

export interface ActivityItem {
  id: string;
  type: 'module_completion' | 'quiz_attempt' | 'resource_view' | 'ai_interaction';
  title: string;
  timestamp: string;
  details: string;
  icon: string;
}

export interface QuizSession {
  id: string;
  title: string;
  courseId: string;
  totalQuestions: number;
  timeLimit: number; // minutes
  currentQuestion: number;
  adaptiveLevel: number; // 0.0 - 1.0
  securityEnabled: boolean;
  webcamRequired: boolean;
  questions: AdaptiveQuestion[];
  studentAnswers: Answer[];
  sessionStartTime: Date;
}

export interface AdaptiveQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'drag_drop';
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  difficulty: number; // 0.0 - 1.0
  topic: string;
  explanation?: string;
}

export interface Answer {
  questionId: string;
  studentResponse: string | string[];
  isCorrect?: boolean;
  timeSpent: number; // seconds
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  relatedModules?: string[];
}
