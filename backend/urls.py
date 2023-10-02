from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from templater import views


router = routers.DefaultRouter()
router.register(r"templates", views.TemplateViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("", views.FrontendAppView.as_view()),
]
