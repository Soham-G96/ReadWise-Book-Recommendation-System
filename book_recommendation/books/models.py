from itertools import count
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models
from textblob import TextBlob
from django.db.models import Avg, Count
from nltk.sentiment import SentimentIntensityAnalyzer

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.ManyToManyField(Genre, related_name='books')
    description = models.TextField()
    rating = models.FloatField(default=0.0)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.cover_image:
            image_path = self.cover_image.path
            try:
                img = Image.open(image_path)
                #Resize to consistent dimensions
                max_size = (400,600)
                img.thumbnail(max_size, Image.ANTIALIAS)
                #save it back to the same path
                img.save(image_path)
            except Exception as e:
                print(f"Image resize error: {e}")
                
    def update_rating(self):
        avg_rating = self.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']
        self.rating = avg_rating if avg_rating is not None else 0.0
        self.save()

    def get_rating_distribution(self):
        """ Returns a dictionary like {5: 10, 4:2, 3:0, 2:1, 1:0 }"""
        counts = self.reviews.values('rating').annotate(count=Count('rating')).order_by('-rating')

        distribution = {entry['rating']: entry['count'] for entry in counts }
        return distribution

    def __str__(self):
        return self.title
    
class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_genres = models.ManyToManyField('Genre', blank=True)
    read_books = models.ManyToManyField(Book, blank=True, related_name='read_by_users')

    def __str__(self):
        return f'{self.user.username} Preferences'
    

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices = [(i,i) for i in range(1,6)]) 
    review_text = models.TextField()
    sentiment_score = models.FloatField(default=0.0) 
    created_at = models.DateTimeField(auto_now_add = True)

    def save(self, *args, **kwargs):
        '''Automatically analyze sentiment when saving a review'''
        # If we are using TextBlob to calculate sentiments -
        # self.sentiment_score = TextBlob(self.review_text).sentiment.polarity
        sia = SentimentIntensityAnalyzer()
        self.sentiment_score = sia.polarity_scores(self.review_text)['compound']
        super().save(*args, **kwargs)
        self.book.update_rating() 
    
    class Meta:
        unique_together = ('user', 'book')  

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.rating} Stars)"