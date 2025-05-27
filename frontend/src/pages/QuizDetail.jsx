import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setQuiz(res.data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${id}/questions/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuiz();
    fetchQuestions();
  }, [id]);

  if (!quiz) return <p className="p-4">Loading quiz...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
      <p className="mb-6 text-gray-600">Created at: {new Date(quiz.created_at).toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mb-3">Questions</h2>
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))
      ) : (
        <p>No questions found for this quiz.</p>
      )}
    </div>
  );
}

export default QuizDetail;
