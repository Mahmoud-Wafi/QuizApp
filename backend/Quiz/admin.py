# from django.contrib import admin
# from .models import Quiz, Question, Answer

# class QuestionInline(admin.TabularInline):
#     model = Question
#     extra = 1
#     fields = ('title', 'created_at', 'updated_at')
#     readonly_fields = ('created_at', 'updated_at')

# @admin.register(Quiz)
# class QuizAdmin(admin.ModelAdmin):
#     list_display = ('id','title')
#     search_fields = ('title', 'author')
#     list_filter = ('created_at',)
#     inlines = [QuestionInline]

# @admin.register(Question)
# class QuestionAdmin(admin.ModelAdmin):
#     list_display = ('title', 'quiz')
#     search_fields = ('title', 'quiz__title')
#     list_filter = ('quiz', 'created_at')

# @admin.register(Answer)
# class AnswerAdmin(admin.ModelAdmin):
#     list_display = ('id', 'question', 'is_right')
#     search_fields = ('answer_text', 'question__title')
#     list_filter = ('is_right', 'created_at')
from django.contrib import admin
from .models import Quiz, Question, Answer

# Inline for Answers in Question Admin
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1
    fields = ('answer_text', 'is_right', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

# Inline for Questions in Quiz Admin
class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1
    fields = ('title', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

# Admin for Quiz with inline Questions
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'questions_count')
    search_fields = ('title', 'author')
    list_filter = ('created_at',)
    inlines = [QuestionInline]

# Admin for Question with inline Answers
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'quiz', 'created_at', 'updated_at')
    search_fields = ('title', 'quiz__title')
    list_filter = ('quiz', 'created_at')
    inlines = [AnswerInline]

# Admin for Answer (in case you want to access it directly)
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('answer_text', 'question', 'is_right', 'created_at', 'updated_at')
    search_fields = ('answer_text', 'question__title')
    list_filter = ('is_right', 'created_at')
