import axios from 'axios';

// Change this to your actual backend base URL
const BASE_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically add auth token to requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});



// --- Auth ---
export const loginUser = (credentials) =>
    axiosInstance.post('user/login/', credentials);

export const registerUser = (data) =>
    axiosInstance.post('user/register/', data);

export const getProfile = () => axiosInstance.get('user/profile/');

export const logoutUser = () => axiosInstance.post('user/logout/');

// --- Quizzes ---
export const fetchQuizzes = () => axiosInstance.get('quiz/quizzes/public/');

export const fetchQuizById = (id) => axiosInstance.get(`quiz/quizzes/${id}/`);

export const createQuiz = (data) => axiosInstance.post('quiz/quizzes/', data);

export const updateQuiz = (id, data) =>
    axiosInstance.put(`quiz/quizzes/${id}/`, data);

export const deleteQuiz = (id) =>
    axiosInstance.delete(`quiz/quizzes/${id}/`);

// --- Questions ---
export const fetchQuestions = (quizId) =>
    axiosInstance.get(`quiz/quizzes/${quizId}/questions/`);

export const addQuestion = (quizId, data) =>
    axiosInstance.post(`quiz/quizzes/${quizId}/questions/`, data);

export const updateQuestion = (questionId, data) =>
    axiosInstance.put(`quiz/questions/${questionId}/`, data);

export const deleteQuestion = (questionId) =>
    axiosInstance.delete(`quiz/questions/${questionId}/`);