from django.shortcuts import render
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import Book, UserPreference, Review, Genre
from .serializers import BookSerializer, UserPreferenceSerializer, ReviewSerializer, GenreSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from datetime import timedelta
# Create your views here.

class NoPagination(PageNumberPagination):
    page_size = None

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer
    pagination_class = None
    
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all().order_by('pk')
    print("table name - ", Genre._meta.db_table)
    # print("queryset - ",queryset.values_list('pk','title'))
    serializer_class = BookSerializer 
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_queryset(self):
        print("booklistcreateview")
        queryset = Book.objects.all()
        genre_name = self.request.query_params.get('genre')
        # genre_name = "Novel"
        print("genre_name value: ", genre_name)
        if genre_name:
            # Try matching exact first, then fallback to icontains
            queryset = queryset.filter(genre__name__iexact=genre_name).distinct()
            print("queryset:- ", genre_name)

            if not queryset.exists():
                queryset = Book.objects.filter(genre__name__icontains=genre_name).distinct()
        return queryset

    def perform_create(self, serializer):
        serializer.save()

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    print("queryset - ",(queryset.count()))
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

class UserPreferenceView(generics.RetrieveUpdateAPIView):
    serializer_class = UserPreferenceSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user' # telling DRF NOT to use 'pk' (RetrieveUpdateAPIView)

    def get_object(self):
        """ Fetch user preferences based on the logged-in user, create if not found."""
        return UserPreference.objects.get_or_create(user=self.request.user)[0]


class BookRecommendationView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    # Code to Implement the Genre Based Recommendation Logic 
    # def get_queryset(self):
    #     """Fetch books based on the user's preferred genres."""
    #     user_preferences, created = UserPreference.objects.get_or_create(user=self.request.user)

    #     #Get preferred genres
    #     preferred_genres = user_preferences.preferred_genres.split(',') if user_preferences.preferred_genres else []

    #     # Find books that match the user's preferred genres, excluding books they've already read
    #     recommended_books = Book.objects.filter(genre__in=preferred_genres).exclude(id__in=user_preferences.read_books.all())

    #     return recommended_books
    # def get_queryset(self):
    #     ''' Collaborative Filtering: Recommend books based on user ratings and similar users'''
    #     user = self.request.user

    #     #Step 1: Find books the user has rated highly (atleast above 3 stars)
    #     user_ratings = Rating.objects.filter(user=user, rating__gte=3).values_list('book', flat=True)
    #     print(user_ratings)
    #     #Step 2: Find users who rated those books highly
    #     similar_users = Rating.objects.filter(book__in=user_ratings, rating__gte=3).values_list('user', flat=True)
    #     print(similar_users)
    #     # Step 3: Find books that these similar users have rated highly
    #     recommended_books = Rating.objects.filter(user__in=similar_users, rating__gte=3 ).values_list('book', flat=True).distinct()
    #     print(Book.objects.filter(id__in=recommended_books).exclude(id__in=user_ratings))
    #     #Step 4: Return recommended books
    #     return Book.objects.filter(id__in=recommended_books).exclude(id__in=user_ratings)

    # NLP
    def get_queryset(self):
        user = self.request.user
        user_pref, _ = UserPreference.objects.get_or_create(user = user)
        
        #Get preferred genres and already read books
        preferred_genres = user_pref.preferred_genres.all()
        read_books = user_pref.read_books.all()

        #Fetch books that match preferred genres but are not already read
        recommended_books = Book.objects.filter(genre__in=preferred_genres).exclude(id__in =read_books)
        
        #Annotate with average sentiment)
        recommended_books = recommended_books.annotate(avg_sentiment=Avg('reviews__sentiment_score'))

        return recommended_books.order_by('-avg_sentiment', '-rating').distinct()
    
class ReviewView(generics.ListCreateAPIView):
    # Handles creating and listing reviews for books
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get all reviews for a specific book
        book_id = self.kwargs.get('book_id')
        return Review.objects.filter(book_id=book_id)
    
    def perform_create(self, serializer):
        # Ensure a user can only leave one review per book
        book_id = self.kwargs.get('book_id')
        book = get_object_or_404(Book, id=book_id)
        existing_review = Review.objects.filter(user=self.request.user, book=book)

        if existing_review.exists():
            raise ValidationError("You have already reviewed this book.")
        serializer.save(user=self.request.user, book=book)

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    # Allows users to update or delete their own review

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Ensure users can only modify their own reviews.

        book_id = self.kwargs.get('book_id')
        review = get_object_or_404(Review, book_id=book_id, user=self.request.user)
        return review
    
class AllReviewsView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user).select_related('book')

class FeaturedBooksView(APIView):
    def get(self, request):
        # Get top 5 books by rating or by number of reviews
        top_books = Book.objects.annotate(num_reviews=Count('reviews')) \
                                .order_by('-rating', '-num_reviews')[:5]
        serializer = BookSerializer(top_books, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def trending_genres(request):
    #1. Filter reviews from last 7 days
    seven_days_ago = timezone.now() - timedelta(days=7)
    recent_reviews = Review.objects.filter(
        book__genre__isnull = False, created_at__gte=seven_days_ago
    )

    #2. Count number of reviews per genre
    genre_counts = (
        recent_reviews.values('book__genre__id', 'book__genre__name')
        .annotate(review_count=Count('id'))
        .order_by('-review_count')
    )

    #3. Format Response
    trending = [
        {
            "id": genre["book__genre__id"],
            "name":genre["book__genre__name"],
            "review_count":genre["review_count"]
        }
        for genre in genre_counts
    ]
    return Response(trending[:10]) # Top 10 trending genres
# class TrendingGenresView(APIView):
#     def get(self, request):
#         trending = Genre.objects.annotate(book_count = Count('books')) \
#                                 .order_by('-book_count')[:6]
#         serializer = GenreSerializer(trending, many=True)
#         return Response(serializer.data)