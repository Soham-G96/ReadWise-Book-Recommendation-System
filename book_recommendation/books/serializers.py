from rest_framework import serializers
from .models import Book, UserPreference, Review, Genre

class GenreSerializer(serializers.ModelSerializer):
    book_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Genre
        fields = ['id','name', 'book_count']

class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(many=True, read_only=True)
    rating_distribution = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'rating', 'rating_distribution','cover_image']
        read_only_fields = ['id', 'rating','rating_distribution']

    def get_rating_distribution(self, obj):
        return obj.get_rating_distribution()

class UserPreferenceSerializer(serializers.ModelSerializer):
    read_books = serializers.PrimaryKeyRelatedField(many=True, queryset=Book.objects.all(), required=False)
    # preferred_genres = serializers.PrimaryKeyRelatedField(many=True, queryset=Genre.objects.all())
    preferred_genres = GenreSerializer(many=True, read_only=True)
    preferred_genres_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Genre.objects.all(), write_only=True, source='preferred_genres', required=False)
    class Meta:
        model = UserPreference
        fields = ['preferred_genres','preferred_genres_ids','read_books']
    
    def update(self, instance, validated_data):
        # Only updates genres if provided
        if 'preferred_genres' in validated_data:
            instance.preferred_genres.set(validated_data['preferred_genres'])

        if 'read_books' in validated_data:
            instance.read_books.set(validated_data['read_books'])

        instance.save()
        return instance

class BookMiniSerializer(serializers.ModelSerializer):
    rating_distribution = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ['id', 'title','author', 'rating','rating_distribution']
    
    def get_rating_distribution(self, obj):
        return obj.get_rating_distribution()

class ReviewSerializer(serializers.ModelSerializer):
    book = BookMiniSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'book', 'user', 'rating', 'review_text', 'sentiment_score']
        read_only_fields = ['id', 'user','book','sentiment_score']

    def create(self, validated_data):
        # Override create to ensure the user is automatically assigned
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)