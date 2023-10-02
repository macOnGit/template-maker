import logging
import os

from rest_framework import viewsets
from templater.models import Template
from templater.serializers import TemplateSerializer
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    https://www.fusionbox.com/blog/detail/create-react-app-and-django/624/
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, "build", "index.html")) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception("Production build of app not found")
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `npm run build` to test the production version.
                """,
                status=501,
            )


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    # permission_classes = [permissions.IsAuthenticated]
