import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

function QuestionCard({ question }) {
  return (
    <div className="bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-xl shadow-md border border-gray-100 p-6 mb-6 transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">
        {question.title}
      </h3>
      <ul className="space-y-3">
        {question.answers.map((answer, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 p-3 rounded-md ${
              answer.is_right
                ? 'bg-green-50 text-green-800 border border-green-300'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {answer.is_right ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span>{answer.answer_text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;
