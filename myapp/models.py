from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

class FileUpload(models.Model):
   file = models.FileField(upload_to='uploads/')
   uploaded_at = models.DateTimeField(auto_now_add=True)