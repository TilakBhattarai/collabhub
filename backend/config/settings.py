from pathlib import Path
import os
import dj_database_url

from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# Security settings

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise ImproperlyConfigured("SECRET_KEY environment variable is required.")

DEBUG = os.getenv("DEBUG", "False").lower() in (
    "true",
    "1",
    "yes",
)

ALLOWED_HOSTS = [
    host.strip() for host in os.getenv("ALLOWED_HOSTS", "").split(",") if host.strip()
]

render_hostname = os.getenv("RENDER_EXTERNAL_HOSTNAME")

if render_hostname and render_hostname not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(render_hostname)

if DEBUG:
    ALLOWED_HOSTS.extend(
        [
            "localhost",
            "127.0.0.1",
        ]
    )


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "cloudinary_storage",
    "cloudinary",
    "rest_framework",
    "corsheaders",
    "accounts",
    "profiles",
    "connection",
    "projects",
    "notifications",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# Cloudinary configuration

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.environ.get("CLOUDINARY_CLOUD_NAME"),
    "API_KEY": os.environ.get("CLOUDINARY_API_KEY"),
    "API_SECRET": os.environ.get("CLOUDINARY_API_SECRET"),
}

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# Static and media storage

STORAGES = {
    "default": {"BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedStaticFilesStorage"},
}


# Django REST Framework

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}


# CORS and CSRF configuration

FRONTEND_URL = os.getenv("FRONTEND_URL", "").rstrip("/")

CORS_ALLOWED_ORIGINS = []
CSRF_TRUSTED_ORIGINS = []

if DEBUG:
    CORS_ALLOWED_ORIGINS.extend(
        [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )

    CSRF_TRUSTED_ORIGINS.extend(
        [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )

if FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(FRONTEND_URL)
    CSRF_TRUSTED_ORIGINS.append(FRONTEND_URL)


# URL configuration

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database configuration

if os.getenv("DATABASE_URL"):
    DATABASES = {
        "default": dj_database_url.config(
            conn_max_age=600,
            conn_health_checks=True,
            ssl_require=not DEBUG,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DB_NAME"),
            "USER": os.getenv("DB_USER"),
            "PASSWORD": os.getenv("DB_PASSWORD"),
            "HOST": os.getenv("DB_HOST"),
            "PORT": os.getenv("DB_PORT"),
            "CONN_MAX_AGE": 600,
            "OPTIONS": {"sslmode": "require"} if not DEBUG else {},
        }
    }


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# Production security

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

SECURE_SSL_REDIRECT = not DEBUG

SESSION_COOKIE_SECURE = not DEBUG

CSRF_COOKIE_SECURE = not DEBUG

SECURE_HSTS_SECONDS = 3600 if not DEBUG else 0

SECURE_HSTS_INCLUDE_SUBDOMAINS = False

SECURE_HSTS_PRELOAD = False


# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
