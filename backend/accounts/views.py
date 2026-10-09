from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import RegisterSerializer


class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            return Response({
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "phone": user.phone,
                    "city": user.city
                }
            }, status=status.HTTP_201_CREATED)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    # First try normal username login
    user = authenticate(
        username=username,
        password=password
    )

    # If username login fails, try email login
    if user is None:

        user_obj = User.objects.filter(
            email__iexact=username
        ).first()

        if user_obj and user_obj.check_password(password):
            user = user_obj

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",

            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            },

            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone": user.phone,
                "city": user.city,
                "is_staff": user.is_staff
            }

        }, status=status.HTTP_200_OK)

    return Response({
        "message": "Invalid username or password"
    }, status=status.HTTP_401_UNAUTHORIZED)