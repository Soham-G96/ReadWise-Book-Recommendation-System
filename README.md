# 📚 AI-Powered Book Recommendation System

A full-stack web application that intelligently recommends books using **collaborative filtering**, **NLP-based sentiment analysis**, and user preferences. Built with **Django REST Framework** (backend) and **ReactJS + Tailwind CSS** (frontend), this project showcases production-ready features like **JWT authentication**, **user reviews**, **trending genres**, and a dynamic **personalized home page**.


![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Django](https://img.shields.io/badge/Backend-Django-green?logo=django)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38b2ac?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---
## 💡 Why This Project?

With thousands of books available online, readers often struggle to find titles that match their taste.

This system solves that by combining:
- 📊 **Data-driven recommendations**
- 💬 **Sentiment understanding of user reviews**
- 🎯 **Personalized suggestions based on genre and behavior**
---

## 🚀 Features

- 🔐 **JWT Authentication** (Login & Signup)
- 👤 **User Preferences**: Select your favorite genres
- 💬 **Review System** with real-time **Sentiment Analysis**
- ⭐ **Book Ratings** with automatic average calculation
- 📖 **Personalized Recommendations** using:
  - ✅ NLP Sentiment Scores (TextBlob / VADER)
  - ✅ Collaborative Filtering (User-to-User)
- 📊 **Trending Genres**, **Featured & Recommended Books**
- 🧠 Smart Home Page with dynamic sections
- 📌 Bookmarked Books, Likes (coming soon)
- 🎨 Responsive UI (Tailwind CSS)

---

## 🛠️ Tech Stack

### Frontend
- **React** + **Axios** + **Tailwind CSS**
- **Framer Motion** (UI Animations)
- React Router, Context API

### Backend
- **Django** + **Django REST Framework (DRF)**
- **SimpleJWT** for authentication
- **TextBlob / NLTK** for NLP sentiment analysis
- SQLite (dev) / PostgreSQL (prod)

---

## 📂 Project Structure
```
book_recommend/                     # Root directory
│
├── book_recommendation/           # Django backend project folder
│   ├── books/                     # App handling books, reviews, genres
│   ├── users/                     # App for user auth and preferences
│   ├── settings.py                # Django settings
│   └── urls.py                    # URL routing for the backend
│
├── book-recommendation-ui/       # React frontend folder
│   ├── public/                   # Static files
│   └── src/                      # React components and pages
│       ├── components/           # Reusable components like BookCard, Navbar, etc.
│       ├── pages/                # Pages like Home, BookList, Login, etc.
│       └── App.js                # Root component
│
├── db.sqlite3                    # Local development database
├── manage.py                     # Django CLI entry point
└── README.md                     # Project documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Soham-G96/book-recommendation-system.git
cd book_recommendation-system
```

### 2. Backend Setup

```bashcd book_recommendation
python -m venv myenv
myenv\Scripts\activate  # or source myenv/bin/activate (Mac/Linux)

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver

```
### 3. Frontend Setup

```bash
cd ../book-recommendation-ui
npm install
npm start
```

🔐 React .env Setup
Create a .env file in book-recommendation-ui/ and add the following:

```bash
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/
```
--- 

## 🔍 How It Works

- On login, user sets genre preferences
- Recommender combines collaborative filtering + NLP sentiment scores
- Books, reviews, and genres fetched via secured DRF endpoints
- Review save triggers sentiment scoring & rating update
- Trending genres and dynamic home page update in real-time

---
🧠 Future Improvements
 Bookmarks & Likes

 Genre-based Sorting & Filtering

 User Profile Dashboard

 Dark Mode

 Docker Support

 ---

 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss your idea.

---

## 🙋‍♂️ Author

Made with ❤️ by [Soham Gaikwad](https://github.com/Soham-G96)

I'm a passionate **Python developer** with a strong foundation in **Django, React, and Machine Learning**.  
Looking for full-time opportunities where I can build meaningful and scalable products.

📫 Feel free to reach out or connect with me on [LinkedIn](www.linkedin.com/in/soham-9696).

📄 License
MIT License © Soham-G96


