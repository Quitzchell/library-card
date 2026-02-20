from django.core.management.base import BaseCommand
from django.conf import settings
from datetime import date

from tour.models import TourDate, Venue


class Command(BaseCommand):
    help = "Seeds the database with tour dates and venues"

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(self.style.ERROR("This command only runs in DEBUG mode"))
            return

        tour_dates = [
            # 2022
            {
                "date": date(2022, 3, 12),
                "venue": {"name": "Roodkapje", "city": "Rotterdam", "country": "NL"},
                "description": "try-out",
            },
            {
                "date": date(2022, 5, 25),
                "venue": {"name": "V11", "city": "Rotterdam", "country": "NL"},
                "description": "Support Kills Birds",
                "sold_out": True,
            },
            {
                "date": date(2022, 5, 26),
                "venue": {"name": "Studio Snack", "city": "Rotterdam", "country": "NL"},
            },
            {
                "date": date(2022, 6, 30),
                "venue": {"name": "Worm", "city": "Rotterdam", "country": "NL"},
                "description": "Yugofuturism",
            },
            {
                "date": date(2022, 7, 16),
                "venue": {
                    "name": "Welcome to the Village",
                    "city": "Leeuwarden",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2022, 7, 29),
                "venue": {
                    "name": "Kunst & complex",
                    "city": "Rotterdam",
                    "country": "NL",
                },
                "description": "No-Spray",
            },
            {
                "date": date(2022, 8, 12),
                "venue": {"name": "Festiek Etiek", "city": "Nijmegen", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2022, 8, 20),
                "venue": {
                    "name": "Katzwijm Studio",
                    "city": "Voorhout",
                    "country": "NL",
                },
            },
            {
                "date": date(2022, 8, 27),
                "venue": {"name": "Kreekrock", "city": "Westdorpe", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2022, 10, 7),
                "venue": {"name": "EKKO", "city": "Utrecht", "country": "NL"},
                "description": "Support Just Mustard",
            },
            {
                "date": date(2022, 10, 22),
                "venue": {"name": "Roodkapje", "city": "Rotterdam", "country": "NL"},
                "description": "Left of the Dial",
            },
            {
                "date": date(2022, 10, 22),
                "venue": {"name": "Cafe Voigt", "city": "Rotterdam", "country": "NL"},
                "description": "Left of the Dial",
            },
            {
                "date": date(2022, 11, 18),
                "venue": {
                    "name": "TivoliVredenburg",
                    "city": "Utrecht",
                    "country": "NL",
                },
                "description": "Support Sports Team",
            },
            {
                "date": date(2022, 12, 1),
                "venue": {"name": "Pracht", "city": "Leipzig", "country": "DE"},
                "description": "w/ Mellie",
            },
            {
                "date": date(2022, 12, 2),
                "venue": {"name": "Svetadilna", "city": "Budweis", "country": "CZ"},
                "description": "w/ Nichi Mlebom",
            },
            {
                "date": date(2022, 12, 3),
                "venue": {"name": "Sub", "city": "Graz", "country": "AT"},
                "description": "w/ Nichi Mlebom",
            },
            {
                "date": date(2022, 12, 4),
                "venue": {"name": "Venster 99", "city": "Wenen", "country": "AT"},
                "description": "w/ Nichi Mlebom",
            },
            {
                "date": date(2022, 12, 16),
                "venue": {"name": "EKKO", "city": "Utrecht", "country": "NL"},
                "description": "Perfect Indie Disco XL",
            },
            {
                "date": date(2022, 12, 18),
                "venue": {"name": "Roodkapje", "city": "Rotterdam", "country": "NL"},
                "description": "Festival",
            },
            # 2023
            {
                "date": date(2023, 1, 8),
                "venue": {"name": "Bar3", "city": "Rotterdam", "country": "NL"},
                "description": "Double bill w/ Rats & Daggers",
            },
            {
                "date": date(2023, 1, 18),
                "venue": {
                    "name": "Concerto/Penguin ESNS",
                    "city": "Groningen",
                    "country": "NL",
                },
                "description": "Eurosonic Noorderslag",
            },
            {
                "date": date(2023, 1, 19),
                "venue": {
                    "name": "Grasnapolsky ESNS",
                    "city": "Groningen",
                    "country": "NL",
                },
                "description": "Eurosonic Noorderslag",
            },
            {
                "date": date(2023, 2, 2),
                "venue": {"name": "Hedon", "city": "Zwolle", "country": "NL"},
                "description": "These Go To Eleven",
            },
            {
                "date": date(2023, 2, 12),
                "venue": {"name": "Grauzone", "city": "Den Haag", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 2, 16),
                "venue": {"name": "Doka", "city": "Amsterdam", "country": "NL"},
            },
            {
                "date": date(2023, 3, 5),
                "venue": {
                    "name": "Kaapse Will'ns",
                    "city": "Rotterdam",
                    "country": "NL",
                },
                "description": "w/ Mellie",
            },
            {
                "date": date(2023, 3, 11),
                "venue": {"name": "Nijverheid", "city": "Utrecht", "country": "NL"},
                "description": "w/ Rats & Daggers",
            },
            {
                "date": date(2023, 3, 12),
                "venue": {"name": "Grasnapolsky", "city": "Scheemda", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 3, 15),
                "venue": {"name": "SuperSonic", "city": "Parijs", "country": "FR"},
            },
            {
                "date": date(2023, 5, 4),
                "venue": {"name": "OCCII", "city": "Amsterdam", "country": "NL"},
            },
            {
                "date": date(2023, 5, 12),
                "venue": {"name": "Merleyn", "city": "Nijmegen", "country": "NL"},
                "description": "Support Iguana Death Cult",
            },
            {
                "date": date(2023, 5, 26),
                "venue": {"name": "Vera", "city": "Groningen", "country": "NL"},
                "description": "Support Iguana Death Cult",
            },
            {
                "date": date(2023, 5, 27),
                "venue": {"name": "Skatecafe", "city": "Amsterdam", "country": "NL"},
                "description": "Support Iguana Death Cult",
            },
            {
                "date": date(2023, 6, 16),
                "venue": {"name": "Vide", "city": "Alkmaar", "country": "NL"},
            },
            {
                "date": date(2023, 6, 18),
                "venue": {
                    "name": "Cultuur Borrelt",
                    "city": "Schiedam",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2023, 6, 30),
                "venue": {"name": "V11", "city": "Rotterdam", "country": "NL"},
                "description": "Release Calls from the Hull",
            },
            {
                "date": date(2023, 7, 2),
                "venue": {"name": "Metropolis", "city": "Rotterdam", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 7, 15),
                "venue": {"name": "Valkhof", "city": "Nijmegen", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 8, 16),
                "venue": {"name": "Maassilo", "city": "Rotterdam", "country": "NL"},
                "description": "Support OSEES",
            },
            {
                "date": date(2023, 8, 26),
                "venue": {"name": "Loose Ends", "city": "Utrecht", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 9, 15),
                "venue": {"name": "Helling", "city": "Utrecht", "country": "NL"},
                "description": "Support MICH",
            },
            {
                "date": date(2023, 9, 16),
                "venue": {"name": "GPR", "city": "Rotterdam", "country": "NL"},
            },
            {
                "date": date(2023, 10, 20),
                "venue": {"name": "Hit The City", "city": "Eindhoven", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2023, 11, 11),
                "venue": {
                    "name": "U? / Le Guess Who?",
                    "city": "Utrecht",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2023, 11, 25),
                "venue": {
                    "name": "Explore The North",
                    "city": "Leeuwarden",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2023, 11, 25),
                "venue": {
                    "name": "Vera Downstage",
                    "city": "Groningen",
                    "country": "NL",
                },
            },
            {
                "date": date(2023, 11, 30),
                "venue": {
                    "name": "Peel Slowly Pre-Party",
                    "city": "Leiden",
                    "country": "NL",
                },
                "description": "w/ Baby's Berserk",
            },
            {
                "date": date(2023, 12, 6),
                "venue": {"name": "Cat's Cult", "city": "Tilburg", "country": "NL"},
                "description": "w/ Mantra",
            },
            {
                "date": date(2023, 12, 15),
                "venue": {"name": "Rotown", "city": "Rotterdam", "country": "NL"},
                "sold_out": True
            },
            {
                "date": date(2023, 12, 16),
                "venue": {"name": "Slachthuis", "city": "Haarlem", "country": "NL"},
                "description": "w/ Goodboys Club",
            },
            # 2024
            {
                "date": date(2024, 1, 3),
                "venue": {"name": "Indiestad", "city": "Amsterdam", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 1, 20),
                "venue": {"name": "Noorderslag", "city": "Groningen", "country": "NL"},
                "description": "Eurosonic Noorderslag",
            },
            {
                "date": date(2024, 3, 12),
                "venue": {
                    "name": "SXSW / Low Down Lounge",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 13),
                "venue": {
                    "name": "SXSW / Chess Club",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 13),
                "venue": {
                    "name": "SXSW / Hole in the Wall",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 14),
                "venue": {
                    "name": "SXSW / Electronic Church",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 14),
                "venue": {
                    "name": "SXSW / Jumpstart @ Side Bar",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 14),
                "venue": {
                    "name": "SXSW / Trash Casual @ Valhalla",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 3, 15),
                "venue": {
                    "name": "SXSW / Hotel Vegas",
                    "city": "Austin",
                    "country": "US",
                },
                "description": "SXSW",
            },
            {
                "date": date(2024, 4, 13),
                "venue": {
                    "name": "Nikspack (OJC Niks)",
                    "city": "Horst",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 4, 19),
                "venue": {
                    "name": "Motel Mozaique",
                    "city": "Rotterdam",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 4, 20),
                "venue": {
                    "name": "MOMO x Parfum de BoemBoem",
                    "city": "Rotterdam",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 4, 22),
                "venue": {"name": "Paradiso", "city": "Amsterdam", "country": "NL"},
                "description": "Headline",
                "sold_out": True
            },
            {
                "date": date(2024, 5, 5),
                "venue": {
                    "name": "Bevrijdingsfestival",
                    "city": "Rotterdam",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 5, 24),
                "venue": {"name": "Sniester", "city": "Den Haag", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 5, 30),
                "venue": {
                    "name": "De Gudde Wellen",
                    "city": "Luxemburg",
                    "country": "LU",
                },
            },
            {
                "date": date(2024, 6, 1),
                "venue": {"name": "Supersonic", "city": "Parijs", "country": "FR"},
                "description": "Festival",
            },
            {
                "date": date(2024, 6, 8),
                "venue": {
                    "name": "Best Kept Secret dj-set",
                    "city": "Hilvarenbeek",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 6, 9),
                "venue": {
                    "name": "Best Kept Secret",
                    "city": "Hilvarenbeek",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 6, 15),
                "venue": {"name": "Oerol", "city": "Terschelling", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 6, 22),
                "venue": {"name": "Spijkerrock", "city": "Arnhem", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 7, 6),
                "venue": {
                    "name": "Wilde Weide",
                    "city": "Kraggenburg",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 7, 12),
                "venue": {"name": "Knives Out", "city": "Alkmaar", "country": "NL"},
            },
            {
                "date": date(2024, 7, 13),
                "venue": {"name": "Winsummerfest", "city": "Winsum", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 8, 3),
                "venue": {"name": "Waterpop", "city": "Den Haag", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 8, 22),
                "venue": {"name": "Loppen", "city": "Kopenhagen", "country": "DK"},
            },
            {
                "date": date(2024, 8, 23),
                "venue": {"name": "HeadQuarters", "city": "Aarhus", "country": "DK"},
            },
            {
                "date": date(2024, 8, 24),
                "venue": {"name": "Posten", "city": "Odense", "country": "DK"},
            },
            {
                "date": date(2024, 8, 30),
                "venue": {
                    "name": "Paard van Stal",
                    "city": "Den Haag",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 8, 31),
                "venue": {
                    "name": "Into The Great Wide Open",
                    "city": "Vlieland",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 9, 6),
                "venue": {
                    "name": "SMG Music Fest",
                    "city": "Sart-Messire-Guillaume",
                    "country": "BE",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 9, 7),
                "venue": {
                    "name": "Misty Fields",
                    "city": "Asten-Heusden",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 9, 14),
                "venue": {
                    "name": "Popmonument",
                    "city": "Bergen op Zoom",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 10, 12),
                "venue": {
                    "name": "Here's The Thing",
                    "city": "Tilburg",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2024, 10, 26),
                "venue": {"name": "Beerland", "city": "Hengelo", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2024, 11, 15),
                "venue": {"name": "Fifty Lab", "city": "Brussel", "country": "BE"},
                "description": "Festival",
            },
            # 2025
            {
                "date": date(2025, 1, 16),
                "venue": {
                    "name": "Eurosonic / Vera",
                    "city": "Groningen",
                    "country": "NL",
                },
                "description": "Eurosonic Noorderslag",
            },
            {
                "date": date(2025, 1, 17),
                "venue": {
                    "name": "ESNS / Platosonic",
                    "city": "Groningen",
                    "country": "NL",
                },
                "description": "Eurosonic Noorderslag",
            },
            {
                "date": date(2025, 2, 1),
                "venue": {
                    "name": "Club BKS X Willem Twee",
                    "city": "Den Bosch",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 2, 7),
                "venue": {"name": "Supersonic", "city": "Paris", "country": "FR"},
                "description": "Festival",
            },
            {
                "date": date(2025, 4, 10),
                "venue": {"name": "Windmill", "city": "London", "country": "UK"},
                "description": "Festival",
            },
            {
                "date": date(2025, 4, 12),
                "venue": {"name": "Outer Town", "city": "Bristol", "country": "UK"},
                "description": "Festival",
            },
            {
                "date": date(2025, 4, 19),
                "venue": {
                    "name": "BendjesKijken",
                    "city": "Veldhoven",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 4, 26),
                "venue": {"name": "Kroongetuige", "city": "Tilburg", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 5, 29),
                "venue": {
                    "name": "Green Vibrations",
                    "city": "Enschede",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 5, 30),
                "venue": {"name": "Maifeld Derby", "city": "Mannheim", "country": "DE"},
                "description": "Festival",
            },
            {
                "date": date(2025, 5, 31),
                "venue": {"name": "Dauwpop", "city": "Hellendoorn", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 6, 28),
                "venue": {
                    "name": "Rooftop Festival",
                    "city": "Den Haag",
                    "country": "NL",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 7, 5),
                "venue": {"name": "Coninx Pop", "city": "Elsloo", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 7, 17),
                "venue": {"name": "Dour", "city": "Dour", "country": "BE"},
                "description": "Festival",
            },
            {
                "date": date(2025, 8, 1),
                "venue": {"name": "Micro Festival", "city": "Liege", "country": "BE"},
                "description": "Festival",
            },
            {
                "date": date(2025, 8, 2),
                "venue": {
                    "name": "Absolutely Free Festival",
                    "city": "Genk",
                    "country": "BE",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 8, 8),
                "venue": {"name": "Zomerparkfeest", "city": "Venlo", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 8, 9),
                "venue": {
                    "name": "SchoL!Festival",
                    "city": "Turnhout",
                    "country": "BE",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 9, 6),
                "venue": {"name": "Bunkerpop", "city": "Landgraaf", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 11, 22),
                "venue": {
                    "name": "Kulturkollektiv Kontaktfeld",
                    "city": "Bochum",
                    "country": "DE",
                },
                "description": "Festival",
            },
            {
                "date": date(2025, 11, 29),
                "venue": {"name": "Altooooh Fest", "city": "Arnhem", "country": "NL"},
                "description": "Festival",
            },
            {
                "date": date(2025, 12, 5),
                "venue": {
                    "name": "Burgerweeshuis",
                    "city": "Deventer",
                    "country": "NL",
                },
                "description": "/w Rats on Rafts",
            },
            # 2026
            {
                "date": date(2026, 3, 27),
                "venue": {
                    "name": "Any Minute Now",
                    "city": "Bergen op Zoom",
                    "country": "NL",
                },
                "description": "/w Lézard",
                "ticket_url": "https://gebouw-t.nl/agenda/library-card-lezard/"
            },
            {
                "date": date(2026, 3, 28),
                "venue": {"name": "Roodkapje", "city": "Rotterdam", "country": "NL"},
                "ticket_url": "https://roodkapje.org/event/2026-03-roodkapjes-housewarming/"
            },
        ]

        created_venues = 0
        created_dates = 0

        for tour_date_data in tour_dates:
            venue_data = tour_date_data["venue"]
            venue, venue_created = Venue.objects.get_or_create(
                name=venue_data["name"],
                city=venue_data["city"],
                defaults={"country": venue_data["country"]},
            )
            if venue_created:
                created_venues += 1

            tour_date, date_created = TourDate.objects.get_or_create(
                date=tour_date_data["date"],
                venue=venue,
                defaults={
                    "ticket_url": tour_date_data.get("ticket_url"),
                    "sold_out": tour_date_data.get("sold_out", False),
                    "description": tour_date_data.get("description", ""),
                },
            )
            if date_created:
                created_dates += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created_venues} venues and {created_dates} tour dates"
            )
        )
