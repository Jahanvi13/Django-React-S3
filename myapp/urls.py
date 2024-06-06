from django.urls import path
from .views import upload_view, file_list_view, submit_form, login_view,csrf_token_view, graphical_view

urlpatterns = [
    path('login/', login_view, name='login_view'),
    path('upload/', upload_view, name='upload_view'),
    path('api/csrf_token/', csrf_token_view, name='csrf_token_view'),
    path('graphical/', graphical_view, name='graphical_view'),
    path('files/', file_list_view, name='file_list_view'),
    path('newregister/',submit_form, name='submit_form'), 
    # Other URL patterns specific to your app...
]
