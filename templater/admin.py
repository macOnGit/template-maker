from django.contrib import admin
from templater.models import Template


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    fields = ("template_name", "template_text")
    list_display = ("template_name",)
