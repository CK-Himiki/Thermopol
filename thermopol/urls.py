"""
URL configuration for termopol project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from myapp import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from drf_yasg.generators import OpenAPISchemaGenerator
from django.conf import settings
from django.conf.urls.static import static



schema_view = get_schema_view(
    openapi.Info(
        title=" API Thermopol",
        default_version="v1",
    ),
    generator_class=OpenAPISchemaGenerator,
)

urlpatterns = [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("append", views.append, name="append"),
    path("stream", views.stream, name="stream"),
    path("me", views.me, name="me"),
    path("edit/<int:pkey>", views.edit, name="edit"),
    path("delete/<int:pkey>", views.delete_substance, name="delete"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path('register/', views.register, name='register'),
    path('api/', include('myapp.api_urls', namespace='api')),
    path("favicon.ico", lambda request: redirect("static/favicon.ico"))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
