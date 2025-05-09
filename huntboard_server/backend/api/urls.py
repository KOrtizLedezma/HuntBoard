from django.urls import path
from .views import register, protected_view, applications_view, update_application_status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register/', register),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', protected_view),
    path('applications/', applications_view),
    path('applications/<int:app_id>/update/', update_application_status),
]
