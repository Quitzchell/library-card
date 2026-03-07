from django.contrib.auth import get_user_model
from django.test import TestCase, RequestFactory

from core.admin import GeneralContentAdmin
from core.models import GeneralContent


User = get_user_model()


class GeneralContentAdminTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.admin_user = User.objects.create_superuser(
            "admin", "admin@test.com", "pass"
        )

    def setUp(self):
        self.client.force_login(self.admin_user)

    def test_changelist_redirects_to_singleton(self):
        response = self.client.get("/admin/core/generalcontent/")
        obj = GeneralContent.load()
        self.assertRedirects(
            response,
            f"/admin/core/generalcontent/{obj.pk}/change/",
            fetch_redirect_response=False,
        )

    def test_no_add_when_exists(self):
        GeneralContent.load()
        factory = RequestFactory()
        request = factory.get("/admin/")
        request.user = self.admin_user
        admin_instance = GeneralContentAdmin(GeneralContent, None)
        self.assertFalse(admin_instance.has_add_permission(request))

    def test_add_allowed_when_empty(self):
        factory = RequestFactory()
        request = factory.get("/admin/")
        request.user = self.admin_user
        admin_instance = GeneralContentAdmin(GeneralContent, None)
        self.assertTrue(admin_instance.has_add_permission(request))

    def test_no_delete(self):
        factory = RequestFactory()
        request = factory.get("/admin/")
        request.user = self.admin_user
        admin_instance = GeneralContentAdmin(GeneralContent, None)
        self.assertFalse(admin_instance.has_delete_permission(request))
