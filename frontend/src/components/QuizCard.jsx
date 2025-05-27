import React from 'react';
import { Link } from 'react-router-dom';

function QuizCard({ quiz }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Link to={`/quiz/${quiz.id}/solve`} className="text-blue-500 mt-2 inline-block">Solve</Link>
    </div>
  );
}

export default QuizCard;
