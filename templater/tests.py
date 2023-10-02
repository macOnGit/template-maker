from django.test import TestCase
from django.urls import reverse
from templater.models import Template


create_template_data = {
    "template_name": "my template",
    "template_text": "template text",
    "template_author": "template author",
}


class CreateTemplateTest(TestCase):
    def test_gives_201_response(self):
        response = self.client.post(reverse("template-list"), data=create_template_data)
        self.assertEquals(response.status_code, 201)

    def test_response_includes_id(self):
        response = self.client.post(reverse("template-list"), data=create_template_data)
        response_json = response.json()
        self.assertEqual(response_json["id"], 1)

    def test_creates_template(self):
        self.client.post(reverse("template-list"), data=create_template_data)
        template = Template.objects.first()
        self.assertEqual(template.template_name, create_template_data["template_name"])
        self.assertEqual(template.template_text, create_template_data["template_text"])
        self.assertEqual(
            template.template_author, create_template_data["template_author"]
        )
