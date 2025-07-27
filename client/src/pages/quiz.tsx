import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Trophy, TrendingUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  answered: boolean;
  answer: boolean | null;
}

interface ScoreTier {
  min: number;
  max: number;
  title: string;
  description: string;
  nextSteps: string;
  buttonText: string;
  color: string;
}

const quizQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Can customers clearly see their point balance and rewards status without asking?',
    answered: false,
    answer: null
  },
  {
    id: 'q2',
    text: 'Do you ever send offers based on a customer\'s purchase history or preferences?',
    answered: false,
    answer: null
  },
  {
    id: 'q3',
    text: 'Do you have rewards other than dollars off available to redeem?',
    answered: false,
    answer: null
  },
  {
    id: 'q4',
    text: 'Can someone sign up for your program in under 30 seconds?',
    answered: false,
    answer: null
  },
  {
    id: 'q5',
    text: 'Do customers hear from you regularly with loyalty updates via SMS, email, or app?',
    answered: false,
    answer: null
  },
  {
    id: 'q6',
    text: 'Do you reward people for things beyond purchases—like referrals or visit milestones?',
    answered: false,
    answer: null
  },
  {
    id: 'q7',
    text: 'Do your team members know how the program works and talk about it with customers?',
    answered: false,
    answer: null
  },
  {
    id: 'q8',
    text: 'Can customers redeem rewards both in-store and on your menu without confusion?',
    answered: false,
    answer: null
  },
  {
    id: 'q9',
    text: 'Do you look at campaign results or KPIs to improve your loyalty program over time?',
    answered: false,
    answer: null
  },
  {
    id: 'q10',
    text: 'Has your program been updated or improved in the last 6 months?',
    answered: false,
    answer: null
  }
];

const scoreTiers: ScoreTier[] = [
  {
    min: 9,
    max: 10,
    title: "",
    description: "You're running a high-performing loyalty program. Customers likely feel seen, valued, and rewarded—and it shows. You're ahead of the curve, and honestly, I want to know your secret.",
    nextSteps: "",
    buttonText: "Tell Me Your Loyalty Secret →",
    color: "bg-gradient-to-r from-[#00CECB] to-cyan-600"
  },
  {
    min: 6,
    max: 8,
    title: "",
    description: "You've got a solid foundation. The essentials are there, but there's probably room to tighten up how you communicate, segment, or differentiate rewards. If you're not sure what to adjust first, I can help you figure that out.",
    nextSteps: "",
    buttonText: "Book a Discovery Call →",
    color: "bg-gradient-to-r from-blue-500 to-cyan-600"
  },
  {
    min: 3,
    max: 5,
    title: "",
    description: "Your program exists, but it may not be doing what you want it to. If customers aren't engaging, the issue might be clarity, usability, or relevance. Let's take a look together and identify what's holding it back.",
    nextSteps: "",
    buttonText: "Book a Discovery Call →",
    color: "bg-gradient-to-r from-orange-500 to-yellow-600"
  },
  {
    min: 0,
    max: 2,
    title: "",
    description: "Your loyalty program might be hurting more than helping. If it feels invisible, confusing, or like a checkbox with no return, it's time to rebuild. I can help you design something that actually drives repeat visits.",
    nextSteps: "",
    buttonText: "Book a Discovery Call →",
    color: "bg-gradient-to-r from-[#F05E5E] to-pink-600"
  }
];

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>(quizQuestions);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  // Pagination settings - force 3 pages for 10 questions
  const questionsPerPage = Math.ceil(questions.length / 3);
  const totalPages = 3;
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  // Calculate score based on "Yes" answers
  const yesAnswers = questions.filter(q => q.answer === true).length;
  const answeredQuestions = questions.filter(q => q.answered).length;

  const getCurrentTier = (): ScoreTier => {
    return scoreTiers.find(tier => yesAnswers >= tier.min && yesAnswers <= tier.max) || scoreTiers[scoreTiers.length - 1];
  };

  const answerQuestion = (questionId: string, answer: boolean) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answered: true, answer }
        : q
    ));
  };

  const viewResults = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuestions(quizQuestions);
    setShowResults(false);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const canProceed = currentQuestions.every(q => q.answered);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Is Your Loyalty Program Really Working?
                </h1>
                <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto" style={{ fontFamily: 'Lato, sans-serif' }}>
                  A 10-question "yes or no" check-up for brands that want to grow repeat business.
                </p>

                {/* Progress */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="text-center mb-3">
                    <div className="text-gray-600 text-sm mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {answeredQuestions} of 10 questions answered
                    </div>
                    <Progress value={(answeredQuestions / 10) * 100} className="h-2 progress-custom" />
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="max-w-3xl mx-auto space-y-4 mb-6">
                {currentQuestions.map((question, index) => {
                  const questionNumber = currentPage * questionsPerPage + index + 1;
                  return (
                    <Card key={question.id} className="overflow-hidden border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-[#F05E5E] text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {questionNumber}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-800 mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                              {question.text}
                            </h3>
                            <div className="flex gap-3">
                              <Button
                                onClick={() => answerQuestion(question.id, true)}
                                variant="ghost"
                                size="sm"
                                className={`${
                                  question.answer === true 
                                    ? "bg-[#00CECB] hover:bg-[#00CECB]/90 text-white border-0" 
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                                } rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs`}
                                style={{ fontFamily: 'Lato, sans-serif' }}
                              >
                                Yes
                              </Button>
                              <Button
                                onClick={() => answerQuestion(question.id, false)}
                                variant="ghost"
                                size="sm"
                                className={`${
                                  question.answer === false 
                                    ? "bg-[#F05E5E] hover:bg-[#F05E5E]/90 text-white border-0" 
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                                } rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs`}
                                style={{ fontFamily: 'Lato, sans-serif' }}
                              >
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center max-w-3xl mx-auto mb-6">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="ghost"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Previous
                </Button>
                
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Page {currentPage + 1} of {totalPages}
                </div>

                {currentPage < totalPages - 1 ? (
                  <Button
                    onClick={nextPage}
                    disabled={!canProceed}
                    variant="ghost"
                    className="bg-[#F05E5E] hover:bg-[#F05E5E]/90 text-white border-0 rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={viewResults}
                    disabled={answeredQuestions < 10}
                    variant="ghost"
                    className="bg-[#F05E5E] hover:bg-[#F05E5E]/90 text-white border-0 rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    View Results
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Your Results Are In!
                </h1>
                
                <div className="max-w-2xl mx-auto">
                  <Card className="mb-6 border shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl font-bold text-[#F05E5E] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {yesAnswers}/10
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {getCurrentTier().description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={resetQuiz}
                    variant="ghost"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs flex items-center gap-2"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    <RotateCcw size={14} />
                    Take Quiz Again
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-[#F05E5E] text-white hover:bg-[#F05E5E]/90 border-0 rounded-full px-6 py-2 font-medium uppercase tracking-wide text-xs"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                    onClick={() => {
                      window.open('https://highdef.studio/contact/', '_blank');
                    }}
                  >
                    {getCurrentTier().buttonText}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}