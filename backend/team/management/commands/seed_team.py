from django.core.management.base import BaseCommand
from django.conf import settings

from team.models.team import Team
from team.models.member import Member


class Command(BaseCommand):
    help = "Seeds the database with teams and members"

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(self.style.ERROR("This command only runs in DEBUG mode"))
            return

        teams = [
            {
                "category": "booking",
                "members": [
                    {
                        "region": "NL",
                        "name": "Roel",
                        "surname": "Coppen",
                        "organization": "Friendly Fire",
                        "email": "r.coppen@friendlyfire.nl",
                    },
                    {
                        "region": "BE",
                        "name": "Björn",
                        "surname": "Nuyens",
                        "organization": "Busker",
                        "email": "bjorn@busker.be",
                    },
                ],
            },
        ]

        created_teams = 0
        created_members = 0

        for team_data in teams:
            team, team_created = Team.objects.get_or_create(
                category=team_data["category"],
            )
            if team_created:
                created_teams += 1

            for member_data in team_data["members"]:
                member, member_created = Member.objects.get_or_create(
                    email=member_data["email"],
                    defaults={
                        "region": member_data["region"],
                        "name": member_data["name"],
                        "surname": member_data["surname"],
                        "organization": member_data.get("organization"),
                    },
                )
                if member_created:
                    created_members += 1

                team.members.add(member)

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created_teams} teams and {created_members} members"
            )
        )
