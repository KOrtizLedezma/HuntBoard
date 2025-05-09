from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import ApplicationSerializer
from .models import Application
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if not username or not password:
        return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    User.objects.create_user(username=username, password=password)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": f"Welcome {request.user.username}!"})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def applications_view(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ApplicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    apps = Application.objects.filter(user=request.user)
    serializer = ApplicationSerializer(apps, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_application_status(request, app_id):
    try:
        application = Application.objects.get(id=app_id, user=request.user)
    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)

    application.status = request.data.get("status", application.status)
    application.save()
    return Response({"message": "Status updated"}, status=status.HTTP_200_OK)