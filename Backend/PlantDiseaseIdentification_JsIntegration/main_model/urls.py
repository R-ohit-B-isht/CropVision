from django.contrib import admin
from django.urls import path
from main_model import views

urlpatterns = [
    path('diseasedetection/', views.call_model.as_view()),
]