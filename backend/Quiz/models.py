# from django.db import models
# from django.utils.translation import gettext_lazy as _ # help django to translate to other languages
# from autoslug import AutoSlugField  

# class Quiz(models.Model):
#     author=models.CharField(_("Author"), max_length=50)
#     title= models.CharField(_("Quiz Title"),max_length=255,unique=True,blank=False,default=_("New Quiz"))
#     creared_at= models.DateTimeField(auto_now_add=True)
    
#     @property
#     def questions_count(self):
#         return self.questions_count()

#     class Meta:
#         verbose_name=_("Quiz")
#         verbose_name_plural=_("Quizzes")
#         ordering=["id"]
        
#     def __str__(self):
#         return self.title
        
# class Question(models.Model):
#     quiz= models.ForeignKey(Quiz, related_name=("questions"), on_delete=models.CASCADE)
#     title= models.CharField(max_length=255,default="")
#     creared_at= models.DateTimeField(auto_now_add=True)
#     updated_at= models.DateTimeField(auto_now=True)
    
    
#     class Meta:
#         verbose_name=_("Question")
#         verbose_name_plural=_("Questions")
#         ordering=["id"]
        
#     def __str__(self):
#         return self.title
    
    
# class Answer(models.Model):
#     question= models.ForeignKey(Question, related_name=("answers"), on_delete=models.CASCADE)
#     answer_text= models.CharField(max_length=255,null=True, blank=True)
#     creared_at= models.DateTimeField(auto_now_add=True)
#     updated_at= models.DateTimeField(auto_now=True)
#     is_right=models.BooleanField(default=False,null=True,blank=True)
    
     
#     class Meta:
#         verbose_name=_("Answer")
#         verbose_name_plural=_("answers")
#         ordering=["id"]
        
#     def __str__(self):
#         return self.answer_text
    
    
    
    
    
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
class Quiz(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quizzes")
    title = models.CharField(_("Quiz Title"), max_length=255, unique=True, blank=False, default=_("New Quiz"))
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)
    
    
    @property
    def questions_count(self):
        return self.questions.count()

    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ["id"]
        
    def __str__(self):
        return self.title
        
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ["id"]
        
    def __str__(self):
        return self.title
    
    
class Answer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="answers", null=True)
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_right = models.BooleanField(default=False, blank=True)
    
    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")
        ordering = ["id"]
        
    def __str__(self):
        return self.answer_text or ""

     