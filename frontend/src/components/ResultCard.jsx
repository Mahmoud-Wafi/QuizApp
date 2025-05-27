// src/components/ResultCard.js
import React from "react";

function ResultCard({ result }) {
  return (
    <div className="border p-4 mb-4 rounded">
      <h3 className="font-semibold">{result.question_title}</h3>
      <p>
        Your Answer:{" "}
        <span className={result.is_right ? "text-green-600" : "text-red-600"}>
          {result.answer_text}
        </span>
      </p>
      {!result.is_right && (
        <p>
          Correct Answer: <span className="text-green-600">{result.correct_answer}</span>
        </p>
      )}
    </div>
  );
}

export default ResultCard;
