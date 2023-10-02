from django.db import models


class Template(models.Model):
    template_name = models.CharField(max_length=50)
    template_text = models.TextField()
    template_author = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"{self.template_name} - {str(self.pk)}"
