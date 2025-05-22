
import { User, Course, Notification, StatCard, Module, ActivityItem, Message, QuizSession } from '@/types';

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'student',
  avatar: 'https://i.pravatar.cc/150?img=11',
};

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning algorithms and applications.',
    progress: 68,
    instructorName: 'Dr. Sarah Chen',
    coverImage: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Advanced Data Structures',
    description: 'In-depth exploration of complex data structures and algorithms.',
    progress: 32,
    instructorName: 'Prof. James Wilson',
    coverImage: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Web Development Fundamentals',
    description: 'Master the core concepts of modern web development.',
    progress: 85,
    instructorName: 'Michael Rodriguez',
    coverImage: '/placeholder.svg',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    message: 'Quiz #3 graded - You scored 92%!',
    timestamp: '2025-05-22T14:30:00Z',
    isRead: false,
    link: '/quizzes/results/3',
  },
  {
    id: '2',
    type: 'info',
    message: 'New module unlocked: Neural Networks',
    timestamp: '2025-05-22T10:15:00Z',
    isRead: false,
    link: '/roadmap/module/12',
  },
  {
    id: '3',
    type: 'warning',
    message: 'Assignment #4 due in 48 hours',
    timestamp: '2025-05-21T16:45:00Z',
    isRead: true,
    link: '/assignments/4',
  },
];

// Mock Stat Cards
export const mockStatCards: StatCard[] = [
  {
    id: '1',
    title: 'Course Progress',
    value: '68%',
    icon: 'chart',
    change: 5,
    trend: 'up',
    color: 'edu-blue',
  },
  {
    id: '2',
    title: 'Quiz Score Average',
    value: '85%',
    icon: 'target',
    change: -2,
    trend: 'down',
    color: 'edu-amber',
  },
  {
    id: '3',
    title: 'Study Streak',
    value: '7 days',
    icon: 'flame',
    change: 3,
    trend: 'up',
    color: 'edu-green',
  },
  {
    id: '4',
    title: 'Upcoming Deadlines',
    value: '3',
    icon: 'calendar',
    change: 0,
    trend: 'neutral',
    color: 'edu-amber',
  },
];

// Mock Modules
export const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Neural Networks',
    description: 'Fundamentals of neural networks and their applications in machine learning.',
    status: 'completed',
    progress: 100,
    estimatedHours: 8,
    week: 1,
    prerequisites: [],
    resourceCount: 5,
    quizCount: 2,
    adaptedDifficulty: 'medium',
    learningStyle: ['visual', 'reading'],
  },
  {
    id: '2',
    title: 'Supervised Learning Algorithms',
    description: 'Classification and regression techniques with practical examples.',
    status: 'in_progress',
    progress: 65,
    estimatedHours: 10,
    week: 2,
    prerequisites: ['1'],
    resourceCount: 7,
    quizCount: 2,
    adaptedDifficulty: 'medium',
    learningStyle: ['visual', 'interactive'],
  },
  {
    id: '3',
    title: 'Unsupervised Learning',
    description: 'Clustering, dimensionality reduction, and other unsupervised techniques.',
    status: 'available',
    progress: 0,
    estimatedHours: 9,
    week: 3,
    prerequisites: ['1', '2'],
    resourceCount: 6,
    quizCount: 1,
    adaptedDifficulty: 'hard',
    learningStyle: ['reading', 'interactive'],
  },
  {
    id: '4',
    title: 'Reinforcement Learning',
    description: 'Fundamentals of reinforcement learning and decision processes.',
    status: 'locked',
    progress: 0,
    estimatedHours: 12,
    week: 4,
    prerequisites: ['1', '2', '3'],
    resourceCount: 8,
    quizCount: 2,
    adaptedDifficulty: 'hard',
    learningStyle: ['visual', 'interactive'],
  },
  {
    id: '5',
    title: 'Deep Learning Architectures',
    description: 'Advanced neural network architectures for complex problems.',
    status: 'locked',
    progress: 0,
    estimatedHours: 15,
    week: 5,
    prerequisites: ['1', '2', '3', '4'],
    resourceCount: 10,
    quizCount: 3,
    adaptedDifficulty: 'hard',
    learningStyle: ['visual', 'reading', 'interactive'],
  },
];

// Mock Recent Activity
export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'module_completion',
    title: 'Completed "Introduction to Neural Networks"',
    timestamp: '2025-05-22T15:30:00Z',
    details: 'You\'ve earned a completion badge!',
    icon: 'check-circle',
  },
  {
    id: '2',
    type: 'quiz_attempt',
    title: 'Completed Quiz: Supervised Learning Basics',
    timestamp: '2025-05-21T13:45:00Z',
    details: 'Score: 85% - Great job!',
    icon: 'clipboard-check',
  },
  {
    id: '3',
    type: 'resource_view',
    title: 'Watched: "Gradient Descent Explained"',
    timestamp: '2025-05-21T10:20:00Z',
    details: '18 minute video completed',
    icon: 'video',
  },
  {
    id: '4',
    type: 'ai_interaction',
    title: 'AI Assistant Chat Session',
    timestamp: '2025-05-20T16:15:00Z',
    details: 'Topic: Neural network backpropagation',
    icon: 'message-circle',
  },
];

// Mock Chat Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    content: 'Can you explain backpropagation in simple terms?',
    timestamp: '2025-05-22T14:30:00Z',
  },
  {
    id: '2',
    sender: 'ai',
    content: 'Backpropagation is the algorithm neural networks use to learn. Think of it as a way for the network to figure out which weights (connections) need adjusting to make better predictions.\n\nIt works backward from the output layer:\n\n1. The network makes a prediction\n2. The error is calculated (difference between prediction and actual value)\n3. The algorithm calculates how much each neuron contributed to the error\n4. The weights are adjusted to reduce future errors\n\nIt\'s similar to learning from your mistakes. Would you like me to provide a visual example?',
    timestamp: '2025-05-22T14:31:00Z',
    relatedModules: ['1', '5'],
  },
  {
    id: '3',
    sender: 'user',
    content: 'Yes, a visual would be helpful. Also, is this related to gradient descent?',
    timestamp: '2025-05-22T14:32:00Z',
  },
  {
    id: '4',
    sender: 'ai',
    content: 'Yes, backpropagation uses gradient descent to minimize the error function. Gradient descent is the optimization strategy that determines how to adjust the weights.\n\nHere\'s how they work together:\n\n1. Backpropagation calculates the gradients (derivatives) of the error with respect to each weight\n2. Gradient descent uses these gradients to update the weights in the direction that reduces error\n\nI see you\'re working on Module 2. This concept will be covered more deeply in Module 5 on Deep Learning Architectures.',
    timestamp: '2025-05-22T14:33:00Z',
    relatedModules: ['2', '5'],
  },
];

// Mock Quiz
export const mockQuizSession: QuizSession = {
  id: '1',
  title: 'Supervised Learning Assessment',
  courseId: '1',
  totalQuestions: 10,
  timeLimit: 30,
  currentQuestion: 0,
  adaptiveLevel: 0.5,
  securityEnabled: true,
  webcamRequired: false,
  questions: [
    {
      id: '1',
      type: 'multiple_choice',
      content: 'Which of the following is NOT a supervised learning algorithm?',
      options: [
        'Linear Regression', 
        'Support Vector Machines', 
        'K-means Clustering', 
        'Random Forests'
      ],
      correctAnswer: 'K-means Clustering',
      difficulty: 0.3,
      topic: 'supervised_learning',
      explanation: 'K-means Clustering is an unsupervised learning algorithm used for clustering data points.',
    },
    {
      id: '2',
      type: 'true_false',
      content: 'Gradient descent is used to minimize the cost function in neural networks.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      difficulty: 0.2,
      topic: 'optimization',
    },
    {
      id: '3',
      type: 'multiple_choice',
      content: 'What is the primary difference between L1 and L2 regularization?',
      options: [
        'L1 adds the absolute value of weights, L2 adds squared weights', 
        'L1 is for classification, L2 is for regression', 
        'L1 uses gradient descent, L2 uses stochastic gradient descent', 
        'L1 is faster to compute than L2'
      ],
      correctAnswer: 'L1 adds the absolute value of weights, L2 adds squared weights',
      difficulty: 0.7,
      topic: 'regularization',
    },
  ],
  studentAnswers: [],
  sessionStartTime: new Date(),
};
