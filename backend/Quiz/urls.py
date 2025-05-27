from django.urls import path
from . import views

urlpatterns = [
    # Quizzes
    path("quizzes/", views.ListCreateQuiz.as_view(), name="quiz-list-create"),              
    path("quizzes/public/", views.PublicQuizList.as_view(), name="quiz-public-list"),         
    path("quizzes/<int:pk>/", views.RetrieveUpdateDestroyQuiz.as_view(), name="quiz-detail"), 
    path("quizzes/<int:quiz_id>/questions/", views.QuizQuestions.as_view(), name="quiz-questions"),  

    # Questions
    path("questions/<int:pk>/", views.QuizQuestionDetail.as_view(), name="question-detail"),  

    # Answers
    path("answers/create/", views.CreateAnswerAPIView.as_view(), name="create-answer"),      
    path("answers/my/", views.UserAnswersAPIView.as_view(), name="user-answers"),       
    path("quizzes/<int:quiz_id>/progress/", views.QuizProgressView.as_view(), name="quiz-progress"),
    path('quizzes/<int:quiz_id>/results/', views.QuizResultView.as_view(), name='quiz-results'),
    path('quizzes/all/', views.AllQuizListView.as_view(), name='all-quizzes'),

     
]
