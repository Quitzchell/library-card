import io
from datetime import date

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

from core.models import GeneralContent, SocialMediaLink
from core.models.social_media_link import Platform
from music.models import Release, StreamingService, StreamingServiceName, Store
from video.models import Video, VideoCategory
from team.models import Team, Member
from tour.models import TourDate, Venue


def create_test_image(
    name="test.png", size=(100, 100), color="red", fmt="PNG"
):
    img = Image.new("RGB", size, color)
    buffer = io.BytesIO()
    img.save(buffer, format=fmt)
    buffer.seek(0)
    return SimpleUploadedFile(
        name, buffer.read(), content_type=f"image/{fmt.lower()}"
    )


def create_venue(**kwargs):
    defaults = {"name": "Test Venue", "city": "Rotterdam", "country": "NL"}
    defaults.update(kwargs)
    return Venue.objects.create(**defaults)


def create_tour_date(venue=None, **kwargs):
    if venue is None:
        venue = create_venue()
    defaults = {"date": date(2099, 6, 15), "venue": venue}
    defaults.update(kwargs)
    return TourDate.objects.create(**defaults)


def create_release(**kwargs):
    defaults = {
        "title": "Test Release",
        "release_date": date(2024, 1, 1),
        "cover_image": "release-covers/test.jpg",
    }
    defaults.update(kwargs)
    return Release.objects.create(**defaults)


def create_streaming_service(release=None, **kwargs):
    if release is None:
        release = create_release()
    defaults = {
        "release": release,
        "name": StreamingServiceName.SPOTIFY,
        "url": "https://open.spotify.com/track/abc",
    }
    defaults.update(kwargs)
    return StreamingService.objects.create(**defaults)


def create_store(release=None, **kwargs):
    if release is None:
        release = create_release()
    defaults = {
        "release": release,
        "name": "Test Store",
        "url": "https://example.com/store",
    }
    defaults.update(kwargs)
    return Store.objects.create(**defaults)


def create_video(**kwargs):
    defaults = {
        "title": "Test Video",
        "video_id": "dQw4w9WgXcQ",
        "category": VideoCategory.LIVE,
    }
    defaults.update(kwargs)
    return Video.objects.create(**defaults)


def create_member(**kwargs):
    defaults = {
        "name": "John",
        "surname": "Doe",
        "region": "NL",
        "email": "john@example.com",
    }
    defaults.update(kwargs)
    return Member.objects.create(**defaults)


def create_team(category="booking", members=None):
    team = Team.objects.create(category=category)
    if members:
        team.members.set(members)
    return team


def create_social_media_link(content=None, **kwargs):
    if content is None:
        content = GeneralContent.load()
    defaults = {
        "content": content,
        "platform": Platform.INSTAGRAM,
        "url": "https://www.instagram.com/test",
        "order": 0,
    }
    defaults.update(kwargs)
    return SocialMediaLink.objects.create(**defaults)
