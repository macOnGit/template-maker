from .settings import env


ALLOWED_HOSTS = [env("SITENAME")]
CORS_ORIGIN_WHITELIST = []
CSRF_TRUSTED_ORIGINS = []
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USERNAME"),
        "PASSWORD": env("DB_PASSWORD"),
    },
}
# Raises Django's ImproperlyConfigured
# exception if SECRET_KEY not in os.environ
SECRET_KEY = env("SECRET_KEY")
