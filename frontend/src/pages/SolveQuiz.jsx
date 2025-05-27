// src/pages/SolveQuiz.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionSolveCard from "../components/QuestionSolveCard";
import ResultCard from "../components/ResultCard";
import { motion } from "framer-motion";

function SolveQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const resQuiz = await axios.get(`/api/quiz/quizzes/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setQuiz(resQuiz.data);

        const resQuestions = await axios.get(`/api/quiz/quizzes/${id}/questions/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setQuestions(Array.isArray(resQuestions.data) ? resQuestions.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  const handleSubmit = () => {
    if (selected === null) {
      alert("Please select an answer.");
      return;
    }

    const currentQuestion = questions[currentIndex];
    const correctAnswerObj = currentQuestion.answers.find((ans) => ans.is_right);
    const correctAnswer = correctAnswerObj ? correctAnswerObj.answer_text : null;

    const isCorrect = selected === correctAnswer;

    if (!isCorrect) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    const userAnswer = {
      id: currentQuestion.id,
      question_title: currentQuestion.title,
      answer_text: selected,
      correct_answer: correctAnswer,
      is_right: isCorrect,
    };

    setResultData((prev) => [...prev, userAnswer]);

    if (currentIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      }, isCorrect ? 0 : 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, isCorrect ? 0 : 500);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
    setResultData([]);
  };

  if (loading) return <p className="p-4">Loading quiz...</p>;
  if (!quiz) return <p className="p-4">Quiz not found.</p>;

  if (showResult) {
    const score = resultData.filter((r) => r.is_right).length;

    return (
      // <div className="p-4 max-w-4xl mx-auto text-center">
      //   <motion.h1
      //     className="text-3xl font-bold mb-2"
      //     initial={{ opacity: 0 }}
      //     animate={{ opacity: 1 }}
      //   >
      //     {quiz.title} - Final Results
      //   </motion.h1>
      //   <motion.p
      //     className="mb-4 text-lg font-semibold"
      //     initial={{ y: -10, opacity: 0 }}
      //     animate={{ y: 0, opacity: 1 }}
      //   >
      //     Your Score: {score} out of {resultData.length}
      //   </motion.p>

      //   <motion.div
      //     className="grid gap-4"
      //     initial={{ opacity: 0 }}
      //     animate={{ opacity: 1 }}
      //   >
      //     {resultData.map((result, index) => (
      //       <ResultCard key={index} result={result} />
      //     ))}
      //   </motion.div>

      //   <div className="mt-6 flex justify-center gap-4">
      //     <button
      //       onClick={restartQuiz}
      //       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      //     >
      //       Restart Quiz
      //     </button>
      //     <button
      //       onClick={() => navigate("/")}
      //       className="bg-blue-600 hover:bg-gray-600 text-white px-4 py-2 rounded"
      //     >
      //       Go to Home
      //     </button>
      //   </div>
      // </div>
          <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl text-center">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {quiz.title}
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 font-semibold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Your Score: <span className="text-indigo-700">{score}</span> out of {resultData.length}
        </motion.p>

        <motion.div
          className="grid gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {resultData.map((result, index) => (
            <ResultCard key={index} result={result} />
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            🔄 Restart Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            🏠 Go to Home
          </button>
        </div>
      </div>
    </div>

    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-300 to-pink-500">
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-2 font-semibold">
        Question {currentIndex + 1} of {questions.length}
      </p>

      {/* Progress Bar with Tooltip */}
      <div className="w-full bg-gray-200 rounded h-2 mb-4 relative group">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block text-sm bg-black text-white px-2 py-1 rounded">
          {Math.round(((currentIndex + 1) / questions.length) * 100)}%
        </div>
      </div>

      {/* Question Card with Shake animation */}
      <motion.div
        key={currentIndex}
        className={shake ? "animate-shake" : ""}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <QuestionSolveCard
          question={currentQuestion}
          selected={selected}
          onSelect={setSelected}
        />
      </motion.div>

      <button
        onClick={handleSubmit}
        disabled={selected === null}
        className={`px-4 py-2 rounded text-white ${
          selected === null
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-blue-700"
        }`}
      >
        {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
    </div>
  );
}

export default SolveQuiz;
