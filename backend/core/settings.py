
from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-g)oci*!jbtpd@ix#=xk2dk=-itbwp&=k^h8d85qd2009wj8#8#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS=[
      "http://127.0.0.1:5173",
     "http://localhost:5173",
]


# Application definition

INSTALLED_APPS = [
    "jazzmin",  # Add this first
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #external apps
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    #internal apps
    "Quiz",
    'useraccount'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/



STATIC_URL = '/static/'

# For local development
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'staticfiles'),  # for your custom static files
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')  # used only by collectstatic



# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'





# new additions

CORS_ALLOW_ALL_ORIGINS = True



JAZZMIN_SETTINGS = {
    "site_title": "QuizApp Panel",       
    "site_header": "QuizApp Panel",      
    "site_brand": "QuizApp",              
    "welcome_sign": "Welcome to QuizApp Admin",                     
    "show_sidebar": True,
    "navigation_expanded": True,
    "copyright": "QuizApp",
     "site_logo": "AdminLogo/logo.png",
    "login_logo": "AdminLogo/logo.png",


}


JAZZMIN_UI_TWEAKS = {
    "theme": "flatly",                          
    "navbar": "navbar-light bg-warning",        
    "accent": "accent-danger",                 # Accent UI in yellow
    "brand_colour": "navbar-green",           # Sidebar brand area in yellow
    "button_classes": {
        "primary": "btn-warning",               # Yellow buttons
    },
    "text_classes": {
        "primary": "text-danger",               # Red text
        "secondary": "text-danger",
        "info": "text-danger",
        "success": "text-danger",
        "warning": "text-danger",
        "danger": "text-danger",
        "light": "text-danger",
        "dark": "text-danger",
    },
    "body_small_text": False,
    "brand_small_text": False,
}




REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}


AUTHENTICATION_BACKENDS = [
    'useraccount.backends.EmailAuthBackend',
]


AUTH_USER_MODEL = 'useraccount.User'
