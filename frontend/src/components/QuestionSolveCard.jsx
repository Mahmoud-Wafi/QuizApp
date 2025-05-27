// // src/components/QuestionSolveCard.js
// import React from "react";

// function QuestionSolveCard({ question, selected, onSelect }) {
//   if (!question) return null;

//   return (
//     <div className="border p-4 rounded shadow mb-4">
//       <h3 className="font-semibold mb-2">{question.title}</h3>
//       {question.answers.map((ans) => (
//         <div key={ans.id} className="mb-2">
//           <label className="cursor-pointer">
//             <input
//               type="radio"
//               name={`q-${question.id}`}
//               value={ans.answer_text}
//               checked={selected === ans.answer_text}
//               onChange={() => onSelect(ans.answer_text)}
//               className="mr-2"
//             />
//             {ans.answer_text}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default QuestionSolveCard;


// src/components/QuestionSolveCard.js
import React from "react";

function QuestionSolveCard({ question, selected, onSelect }) {
  if (!question) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6 transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">
        {question.title}
      </h3>

      <div className="space-y-3">
        {question.answers.map((ans) => (
          <label
            key={ans.id}
            htmlFor={`answer-${ans.id}`}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer transition
              ${
                selected === ans.answer_text
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-indigo-100"
              }`}
          >
            <input
              type="radio"
              id={`answer-${ans.id}`}
              name={`q-${question.id}`}
              value={ans.answer_text}
              checked={selected === ans.answer_text}
              onChange={() => onSelect(ans.answer_text)}
              className="form-radio text-indigo-600 focus:ring-indigo-500"
            />
            <span>{ans.answer_text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionSolveCard;
