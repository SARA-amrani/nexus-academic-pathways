
import React, { useState } from 'react';
import { 
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { mockQuizSession } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function QuizInterface() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(mockQuizSession.timeLimit * 60); // seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentQuestion = mockQuizSession.questions[currentQuestionIndex];
  const totalQuestions = mockQuizSession.questions.length;
  
  // Format time remaining as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Submit quiz
  const handleSubmitQuiz = () => {
    // Count correct answers
    const questionsAnswered = Object.keys(answers).length;
    const unansweredCount = totalQuestions - questionsAnswered;
    
    if (unansweredCount > 0 && !isSubmitted) {
      toast.warning(`You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`, {
        action: {
          label: "Submit Anyway",
          onClick: () => setIsSubmitted(true),
        },
      });
      return;
    }
    
    setIsSubmitted(true);
    toast.success("Quiz submitted successfully!");
  };
  
  // Get difficulty label
  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 0.4) return "Easy";
    if (difficulty < 0.7) return "Medium";
    return "Hard";
  };
  
  // Get current answer
  const currentAnswer = answers[currentQuestion.id] || '';
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Quiz Header */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{mockQuizSession.title}</h2>
          
          <div className="flex items-center space-x-2 text-sm px-3 py-1.5 bg-muted rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`font-mono ${timeRemaining < 300 ? 'text-red-500 font-bold animate-pulse' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex space-x-2">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>•</span>
            <span>
              Difficulty: <span className="font-medium">
                {getDifficultyLabel(currentQuestion.difficulty)}
              </span>
            </span>
          </div>
          
          <div>
            Topic: <span className="font-medium">{currentQuestion.topic}</span>
          </div>
        </div>
        
        <Progress value={progressPercent} className="h-2" />
      </div>
      
      {/* Quiz Content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-lg font-medium mb-6">
              {currentQuestion.content}
            </h3>
            
            {currentQuestion.type === 'multiple_choice' && (
              <RadioGroup 
                value={currentAnswer}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="peer"
                    />
                    <label 
                      htmlFor={`option-${index}`}
                      className="text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === 'true_false' && (
              <RadioGroup 
                value={currentAnswer}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="peer"
                    />
                    <label 
                      htmlFor={`option-${index}`}
                      className="text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between">
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast.info("Hint: Look for patterns in the training data");
              }}
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              Hint
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast.info("This question is flagged for review");
              }}
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              Flag
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {answers[currentQuestion.id] ? (
              <span className="flex items-center text-edu-green-600">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Answered
              </span>
            ) : (
              "Not answered yet"
            )}
          </div>
        </CardFooter>
      </Card>
      
      {/* Quiz Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <div>
          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={goToNextQuestion}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
