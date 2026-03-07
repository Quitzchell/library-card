from django.contrib.admin import AdminSite


class CustomAdminSite(AdminSite):
    def get_app_list(self, request, app_label=None):
        app_list = super().get_app_list(request, app_label)

        model_order = {
            "team": ["Member", "Team"],
            "core": ["GeneralContent", "CarouselImage"]
        }

        for app in app_list:
            if app["app_label"] in model_order:
                order = model_order[app["app_label"]]
                app["models"].sort(
                    key=lambda m: order.index(m["object_name"])
                    if m["object_name"] in order else len(order)
                )

        return app_list