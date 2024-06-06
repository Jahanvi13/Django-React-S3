from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import FileUpload
from .serializers import UserSerializer, FileUploadSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework import status
from django.http import HttpResponse
import boto3, json
from django.conf import settings
from rest_framework.response import Response
from django.shortcuts import render , redirect
from django.http import JsonResponse
from .models import FileUpload
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
import json
from django.middleware.csrf import get_token

@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            # Save user data to AWS S3
            user_data = {
                'username': name,
                'email': email,
                'password': password,
            }
            s3 = boto3.client('s3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME,
                config=boto3.session.Config(signature_version='s3v4')
            )
            s3.put_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=f'users/{name}.json', Body=json.dumps(user_data))
            
            response_data = {
                'message': 'Form data received successfully',
                'data': data
            }
            return JsonResponse(response_data, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            print(f"Received username: {username}, password: {password}")

            # Fetch user data from AWS S3
            s3 = boto3.client('s3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME,
                config=boto3.session.Config(signature_version='s3v4')
            )

            try:
                response = s3.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=f'users/{username}.json')
                user_data = json.loads(response['Body'].read().decode('utf-8'))

                print(f"Retrieved user data for {username}: {user_data}")

                if user_data and user_data['username'] == username and user_data['password'] == password:
                    return JsonResponse({'message': 'Login successful'}, status=200)
                else:
                    return JsonResponse({'error': 'Invalid username or password'}, status=401)
            except s3.exceptions.NoSuchKey:
                print(f"User {username} not found in S3")
                return JsonResponse({'error': 'Invalid username or password'}, status=401)
            except Exception as e:
                print(f"Error fetching user data: {e}")
                return JsonResponse({'error': 'Error fetching user data'}, status=500)
        except json.JSONDecodeError:
            print("Invalid JSON received")
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)






@api_view(['GET'])
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

def upload_view(request):
    if request.method == 'POST':
        form = upload_view(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            s3 = boto3.client('s3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME,
                config=boto3.session.Config(signature_version='s3v4')
            )
            s3.upload_fileobj(file, settings.AWS_STORAGE_BUCKET_NAME, file.name)
            return JsonResponse({'message': 'File uploaded successfully'})
        else:
            return JsonResponse({'error': 'Form is not valid'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def file_list_view(request):
    if request.method == 'GET':
        try:
            s3 = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME,
                config=boto3.session.Config(signature_version='s3v4')
            )
            
            response = s3.list_objects_v2(Bucket=settings.AWS_STORAGE_BUCKET_NAME)
            files = [content['Key'] for content in response.get('Contents', [])]
            return JsonResponse({'files': files}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def graphical_view(request):
    data = {'labels': ['A', 'B', 'C'], 'values': [10, 20, 30]}
    return JsonResponse(data)