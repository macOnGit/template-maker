from rest_framework import serializers
from templater.models import Template


class TemplateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Template
        fields = ["id", "template_name", "template_text", "template_author"]
