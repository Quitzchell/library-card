from unittest.mock import patch
from urllib.error import URLError

from django.test import SimpleTestCase, override_settings

from config.revalidation import trigger_revalidation


class TriggerRevalidationTests(SimpleTestCase):
    def test_no_url_returns_early(self):
        with override_settings(REVALIDATION_URL="", REVALIDATION_SECRET="s"):
            with patch("config.revalidation.urlopen") as mock_urlopen:
                trigger_revalidation(["/"])
                mock_urlopen.assert_not_called()

    def test_no_secret_returns_early(self):
        with override_settings(
            REVALIDATION_URL="https://example.com/api/revalidate",
            REVALIDATION_SECRET="",
        ):
            with patch("config.revalidation.urlopen") as mock_urlopen:
                trigger_revalidation(["/"])
                mock_urlopen.assert_not_called()

    @override_settings(
        REVALIDATION_URL="http://example.com/api/revalidate",
        REVALIDATION_SECRET="secret",
        DEBUG=False,
    )
    def test_http_url_rejected_in_production(self):
        with patch("config.revalidation.urlopen") as mock_urlopen:
            trigger_revalidation(["/"])
            mock_urlopen.assert_not_called()

    @override_settings(
        REVALIDATION_URL="https://example.com/api/revalidate",
        REVALIDATION_SECRET="secret",
        DEBUG=True,
    )
    def test_success_calls_urlopen(self):
        with patch("config.revalidation.urlopen") as mock_urlopen:
            trigger_revalidation(["/", "/music"])
            mock_urlopen.assert_called_once()
            req = mock_urlopen.call_args[0][0]
            self.assertEqual(req.get_header("X-revalidation-secret"), "secret")

    @override_settings(
        REVALIDATION_URL="https://example.com/api/revalidate",
        REVALIDATION_SECRET="secret",
        DEBUG=True,
    )
    def test_urlopen_failure_logs_warning(self):
        with patch(
            "config.revalidation.urlopen", side_effect=URLError("timeout")
        ):
            with patch("config.revalidation.logger") as mock_logger:
                trigger_revalidation(["/"])
                mock_logger.warning.assert_called_once()
