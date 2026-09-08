import django_filters
from .models import Profile


class ProfileFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(
        field_name="user__username", lookup_expr="icontains"
    )

    role = django_filters.CharFilter(field_name="role", lookup_expr="iexact")

    location = django_filters.CharFilter(field_name="location", lookup_expr="icontains")
    skills = django_filters.CharFilter(field_name="skills", lookup_expr="icontains")
    looking_for = django_filters.CharFilter(
        field_name="looking_for", lookup_expr="icontains"
    )

    class Meta:
        model = Profile
        fields = ["username", "role", "location", "skills", "looking_for"]
