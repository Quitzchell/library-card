"""
On-demand ISR revalidation utility.

Call trigger_revalidation() after saving content in the Django admin
to trigger Incremental Static Regeneration on Vercel.

Usage in a ModelAdmin:

    from config.revalidation import trigger_revalidation

    class MyModelAdmin(admin.ModelAdmin):
        def save_model(self, request, obj, form, change):
            super().save_model(request, obj, form, change)
            trigger_revalidation(["/", "/music"])

        def delete_model(self, request, obj):
            super().delete_model(request, obj)
            trigger_revalidation(["/", "/music"])
"""

import json
import logging
from urllib.error import URLError
from urllib.request import Request, urlopen

from django.conf import settings

logger = logging.getLogger(__name__)


def trigger_revalidation(paths=None):
    """Send a revalidation request to the Next.js frontend."""
    url = getattr(settings, "REVALIDATION_URL", "")
    secret = getattr(settings, "REVALIDATION_SECRET", "")

    if not url or not secret:
        return

    data = json.dumps({"paths": paths or ["/"]}).encode()
    req = Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-revalidation-secret": secret,
        },
    )

    try:
        urlopen(req, timeout=10)
        logger.info("Revalidation triggered for paths: %s", paths)
    except URLError as e:
        logger.warning("Failed to trigger revalidation: %s", e)
