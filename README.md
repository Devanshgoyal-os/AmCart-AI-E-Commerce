# 🛒 AmCart – AI-Based E-Commerce Website

AmCart is a web-based e-commerce application built using Python, Flask, HTML, CSS and JavaScript.

It provides product browsing, product search, shopping cart functionality and an AI-based product recommendation system.

## 🚀 Features
- 🛍️ Browse products
- 🔎 Search products
- 🛒 Add products to cart
- 📦 View product details
- 💳 Checkout page
- 🤖 AI-based product recommendations
- 🖼️ Product images and banner slider
- 📱 Responsive user interface

## 🤖 AI Recommendation System

AmCart uses a content-based recommendation system to suggest similar products.

The system uses:

- Product name
- Category
- Product description
- TF-IDF Vectorization
- Cosine Similarity

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask

### Machine Learning
- Scikit-learn
- TF-IDF
- Cosine Similarity

### Data Handling
- Pandas
- CSV

### Tools
- Git
- GitHub
- VS Code

## 📁 Project Structure

```text
AmCart-AI-E-Commerce/
│
├── data/
│   └── products.csv
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── banner1.png
│   │   ├── banner2.png
│   │   └── banner3.png
│   └── products/
│       ├── dell-laptop.jpg
│       ├── hp-laptop.jpg
│       ├── iphone15.jpg
│       └── ...
│
├── templates/
│   ├── index.html
│   ├── product.html
│   └── checkout.html
│
├── app.py
├── requirements.txt
├── .gitignore
└── README.md
