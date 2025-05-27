from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None  # Remove username field
    email = models.EmailField(_("Email"), unique=True)
    full_name = models.CharField(_("Full Name"), max_length=100)
    phone_number = models.CharField(_("Phone Number"), max_length=15, unique=True, blank=True, null=True)
    gender = models.CharField(_("Gender"), choices=[("M", "Male"), ("F", "Female")], max_length=1)
    is_mentor = models.BooleanField(_("Is Mentor"), default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']  # required when creating superuser

    objects = CustomUserManager()

    def __str__(self):
        return self.email
