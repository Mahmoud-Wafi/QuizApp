from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer , AnswerSerializer
from django.http import Http404
from useraccount.permissions import IsMentor
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from .serializers import SimpleQuizSerializer

class AllQuizListView(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = SimpleQuizSerializer
    permission_classes = [AllowAny]  # Anyone can access this

class PublicQuizList(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(published=True)


class ListCreateQuiz(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    def get_queryset(self):
        return Quiz.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class RetrieveUpdateDestroyQuiz(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
 

class QuizQuestions(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsMentor()]
        return [IsAuthenticated()]
    def get(self, request, quiz_id):
        questions = Question.objects.filter(quiz_id=quiz_id)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(quiz=quiz)
            return Response({
                "message": "Question Created Successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        quiz = self.get_object()
        user = request.user  # Assuming user is authenticated

        questions = quiz.questions.all()

        results = []
        for question in questions:
            # Find user's answer to this question, if any
            try:
                user_answer = question.answers.get(user=user)
            except Answer.DoesNotExist:
                user_answer = None

            # Find the correct answer(s)
            correct_answers = question.answers.filter(is_correct=True)

            results.append({
                'question': question.text,
                'user_answer': user_answer.text if user_answer else None,
                'correct_answers': [a.text for a in correct_answers],
            })

        if not results:
            return Response({'detail': 'No answers found for this quiz.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(results)


class QuizQuestionDetail(APIView):
    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsMentor()]
        return [IsAuthenticated()]

    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def patch(self, request, pk):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Question partially updated.",
                "data": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Question updated successfully.",
                "data": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        question = self.get_object(pk)
        question.delete()
        return Response({"message": "Question deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class CreateAnswerAPIView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        question_id = self.request.data.get("question")
        if not question_id:
            raise serializers.ValidationError({"question": "Question ID is required."})

        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            raise serializers.ValidationError({"question": "Invalid Question ID."})

        serializer.save(user=self.request.user, question=question)


class UserAnswersAPIView(generics.ListAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Answer.objects.filter(user=self.request.user)




class QuizProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        total_questions = Quiz.objects.get(id=quiz_id).questions.count()
        answered = Answer.objects.filter(user=request.user, question__quiz_id=quiz_id).count()
        return Response({
            "answered": answered,
            "total": total_questions,
            "progress_percent": round((answered / total_questions) * 100) if total_questions > 0 else 0
        })

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class QuizResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        answers = Answer.objects.filter(user=request.user, question__quiz_id=quiz_id)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)
