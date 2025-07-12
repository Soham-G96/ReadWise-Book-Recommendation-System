from django.urls import path
from .views import BookListCreateView, BookDetailView, UserPreferenceView, BookRecommendationView, ReviewView, ReviewDetailView, GenreListView, AllReviewsView, FeaturedBooksView, \
                    trending_genres

urlpatterns = [
    path('genres/', GenreListView.as_view(), name='genre_list'),
    path('books/', BookListCreateView.as_view(), name='book_list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('preferences/', UserPreferenceView.as_view(), name='user_preferences'),
    path('recommendations/', BookRecommendationView.as_view(), name='book_recommendations'),
    path('books/all_reviews/', AllReviewsView.as_view(), name="all_reviews"),    # Fetch all reviews for a logged in user
    path('books/<int:book_id>/reviews/', ReviewView.as_view(), name='reviews_unique_book'), # Fetch and submit new reviews
    path('books/<int:book_id>/reviews/my/', ReviewDetailView.as_view(), name='my_reviews'), # Retrieve, Update or delete reviews
    path('books/featured/', FeaturedBooksView.as_view(), name='featured_books'),
    path('genres/trending/', trending_genres, name='trending_genres'),
]