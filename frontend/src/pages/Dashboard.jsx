
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { fetchQuizzes } from '../api/api'; 

// function Dashboard() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuizId, setSelectedQuizId] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [unauthorized, setUnauthorized] = useState(false);

//   useEffect(() => {
//     const loadQuizzes = async () => {
//       try {
//         const response = await fetchQuizzes();
//         const data = response.data;
//         setQuizzes(Array.isArray(data) ? data : []);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setUnauthorized(true);
//         } else {
//           console.error('Error fetching quizzes:', error.response || error);
//         }
//         setQuizzes([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuizzes();

//     const storedFullName = localStorage.getItem('full_name');
//     if (storedFullName) {
//       setFullName(storedFullName);
//     }
//   }, []);

//   const handleSolve = () => {
//     if (!selectedQuizId) {
//       alert('Please select a quiz first!');
//       return;
//     }
//     window.location.href = `/quiz/${selectedQuizId}/solve`;
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading your quizzes...</div>;
//   }

//   if (unauthorized) {
//     return (
//       <div className="text-center mt-10 text-xl font-semibold text-red-600">
//         You must be logged in to view our quizzes.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-10 px-4">
//       {fullName && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="mb-6 text-center text-3xl font-extrabold text-indigo-600 drop-shadow-md"
//         >
//           Welcome {fullName}, <br /> Let's Test Your Information!
//         </motion.div>
//       )}

//       <div className="bg-white border shadow rounded p-6">
//         <h1 className="text-2xl font-bold mb-4 text-center">Select a Quiz</h1>

//         {quizzes.length === 0 ? (
//           <p className="text-center text-gray-600">No quizzes found.</p>
//         ) : (
//           <>
//             <motion.select
//               value={selectedQuizId}
//               onChange={(e) => setSelectedQuizId(e.target.value)}
//               className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               whileHover={{ scale: 1.03 }}
//               whileFocus={{ scale: 1.03 }}
//             >
//               <option value="" className="text-center">Choose a quiz</option>
//               {quizzes.map((quiz) => (
//                 <option key={quiz.id} value={quiz.id}>
//                   {quiz.title}
//                 </option>
//               ))}
//             </motion.select>

//             <motion.button
//               onClick={handleSolve}
//               className="w-full bg-indigo-600 text-white py-3 rounded font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Solve Quiz
//             </motion.button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboad
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchQuizzes } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [fullName, setFullName] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const response = await fetchQuizzes();
        const data = response.data;
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response?.status === 401) {
          setUnauthorized(true);
        } else {
          console.error('Error fetching quizzes:', error.response || error);
        }
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();

    const storedFullName = localStorage.getItem('full_name');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleSolve = () => {
    if (!selectedQuizId) {
      alert('Please select a quiz first!');
      return;
    }
    window.location.href = `/quiz/${selectedQuizId}/solve`;
  };

  if (loading) {
    return <div className="p-4 text-center">Loading your quizzes...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-6 text-white shadow-inner">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center items-center gap-3">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            Welcome to Mahmoud Quiz App
          </h1>
        </div>
        <p className="text-lg text-white/90">Join us to solve our quizzes easily!</p>
        <p className="mt-2 text-sm text-white/70">{dateTime}</p>
      </motion.div>

      {/* Welcome or Guest Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 text-center text-2xl font-semibold text-white"
      >
        {fullName
          ? `Welcome ${fullName}, Let's Test Your Knowledge!`
          : 'You are not logged in. Please log in or sign up to access quizzes.'}
      </motion.div>

      {/* Quiz Selection Box */}
      <div className="bg-white/90 border border-indigo-100 shadow-2xl rounded-xl p-6 max-w-2xl mx-auto text-black">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">Select topic below to start your Quiz</h1>

        {unauthorized ? (
          <>
            {/* <p className="text-center text-red-500 mb-4">You must be logged in to solve quizzes.</p> */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700 flex items-center gap-2"
              >
                🔑 Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white border border-indigo-500 text-indigo-600 py-2 px-4 rounded shadow hover:bg-indigo-100"
              >
                📝 Sign Up
              </button>
            </div>
          </>
        ) : quizzes.length === 0 ? (
          <p className="text-center text-gray-600">No quizzes found.</p>
        ) : (
          <>
            <motion.select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <option value="">Choose a quiz</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </motion.select>

            <motion.button
              onClick={handleSolve}
              className="w-full bg-indigo-600 text-white py-3 rounded font-semibold shadow-md hover:bg-indigo-700 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Solve Quiz
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
