"use client";

import { useState } from "react";
import { Zap, X, CheckCircle, XCircle } from "lucide-react";
import { Article } from "./Article";

type Quiz = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type Answer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

export function QuizClient({
  quizzes,
  content,
  title,
}: {
  quizzes: Quiz[];
  content: string;
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const quiz = quizzes[current];
  const total = quizzes.length;

  const answerIndex = parseInt(quiz.answer);

  const correctOption =
    !isNaN(answerIndex) && answerIndex >= 0 && answerIndex < quiz.options.length
      ? quiz.options[answerIndex]
      : quiz.answer;

  const handleSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === correctOption) setScore((s) => s + 1);
  };

  const handleNext = () => {
    const isCorrect = selected === correctOption;
    setAnswers((prev) => [
      ...prev,
      {
        question: quiz.question,
        selected: selected ?? "",
        correct: correctOption,
        isCorrect,
      },
    ]);

    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowCancel(false);
    setAnswers([]);
  };

  if (finished) {
    return (
      <div className="bg-gray-50 p-4 rounded-2xl mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-green-500" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Quiz Complete!
            </h2>
            <p className="text-sm text-gray-400">
              Your score:{" "}
              <span className="font-semibold text-gray-700">
                {score} / {total}
              </span>
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border ${
                  a.isCorrect
                    ? "bg-green-50 border-green-100"
                    : "bg-red-50 border-red-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  {a.isCorrect ? (
                    <CheckCircle
                      size={16}
                      className="text-green-500 mt-0.5 shrink-0"
                    />
                  ) : (
                    <XCircle
                      size={16}
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {i + 1}. {a.question}
                    </p>
                    <p className="text-xs text-gray-500">
                      Таны хариулт:{" "}
                      <span
                        className={
                          a.isCorrect ? "text-green-600" : "text-red-500"
                        }
                      >
                        {a.selected}
                      </span>
                    </p>
                    {!a.isCorrect && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Зөв хариулт:{" "}
                        <span className="text-green-600 font-medium">
                          {a.correct}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-2xl mt-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md overflow-hidden">
        <Article content={content} title={title} />
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">
              Quick test
            </span>
          </div>
          <button
            onClick={() => setShowCancel(true)}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <p className="text-xs text-gray-400 px-5 pt-3 pb-0">
          Take a quick test about your knowledge from your content
        </p>

        <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {quiz.question}
          </p>
          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 mt-0.5 font-medium">
            {current + 1} / {total}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 pb-5">
          {quiz.options.map((option, i) => {
            let style =
              "border border-gray-200 text-gray-700 bg-white hover:border-gray-400 hover:bg-gray-50";

            if (selected !== null) {
              if (option === selected) {
                style = "border border-red-300 bg-red-50 text-red-600";
              } else {
                style = "border border-gray-100 text-gray-400 bg-gray-50";
              }

              if (option === correctOption) {
                style = "border border-green-400 bg-green-50 text-green-700";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`rounded-xl px-4 py-3 text-sm font-medium text-center transition-all duration-150 ${style} ${
                  selected === null ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="px-5 pb-5">
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {current + 1 >= total ? "See Results" : "Next Question →"}
            </button>
          </div>
        )}
      </div>

      {showCancel && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Are you sure?
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              If you press 'Cancel', this quiz will restart from the beginning.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
