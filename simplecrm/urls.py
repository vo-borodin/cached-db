"""simplecrm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.urls import path, re_path

from nodes import views as nviews

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('^/?$', nviews.index, name='nodes-index'),
    re_path(r'^nodes/(id=\d+)?$', nviews.NodeListAPIView.as_view(), name='node-list'),
    path(r'reset/', nviews.reset_view, name='reset-db'),
    re_path(r'^apply', nviews.apply_view, name='apply-changes')
]
