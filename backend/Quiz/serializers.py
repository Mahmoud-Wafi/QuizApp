from rest_framework import serializers
from .models import Quiz, Question, Answer

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "answer_text", "is_right", "user", "question"]
        read_only_fields = ["user", "question"]
        
    def get_correct_answer(self, obj):
        correct = obj.question.answers.filter(is_right=True).first()
        return correct.answer_text if correct else None
    def get_question_title(self, obj):
        return obj.question.title


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = ["id", "quiz", "title", "answers"]
        read_only_fields = ["quiz"]

    def create(self, validated_data):
        answers_data = validated_data.pop("answers")
        question = Question.objects.create(**validated_data)
        for answer_data in answers_data:
            Answer.objects.create(question=question, **answer_data)
        return question

    def update(self, instance, validated_data):
        answers_data = validated_data.pop("answers", None)
        instance.title = validated_data.get("title", instance.title)
        instance.save()

        if answers_data is not None:
            instance.answers.all().delete()
            for answer_data in answers_data:
                Answer.objects.create(question=instance, **answer_data)

        return instance

class QuizSerializer(serializers.ModelSerializer):
    question_count = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ["id", "title", "author", "created_at", "question_count"]
        read_only_fields = ["author", "created_at", "question_count"]


    def get_question_count(self, obj):
        return obj.questions.count()




class SimpleQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'published']