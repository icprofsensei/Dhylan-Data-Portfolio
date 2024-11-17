from .base import *
SECURE_SSL_REDIRECT = False  # Do not redirect to HTTPS
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
# Use SQLite for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / "db.sqlite3",
    }
}
STATIC_URL = '/static/'
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# Optional: Local settings for CORS, if needed
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8000',
]
CORS_ALLOW_CREDENTIALS = True