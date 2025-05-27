from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'full_name', 'phone_number', 'gender', 'password', 'is_mentor']
        extra_kwargs = {
            'is_mentor': {'read_only': True}  # Prevent client from sending this field
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            phone_number=validated_data.get('phone_number'),
            gender=validated_data.get('gender'),
            password=validated_data['password'],
            is_mentor=False  # Always set to False by default
        )
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid login credentials")
        return {'user': user}


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone_number', 'gender', 'is_mentor']
