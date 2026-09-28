from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load products
products = pd.read_csv("data/products.csv")

# Convert product information into text
products["features"] = (
    products["name"] + " " +
    products["category"] + " " +
    products["description"]
)

# Create TF-IDF vectors
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(products["features"])

# Calculate similarity between products
similarity = cosine_similarity(tfidf_matrix)


# Home page
@app.route("/")
def home():
    return render_template(
        "index.html",
        products=products.to_dict("records")
    )


# Product details page
@app.route("/product/<int:product_id>")
def product(product_id):

    product_data = products[products["id"] == product_id]

    if product_data.empty:
        return "Product not found", 404

    product_info = product_data.iloc[0].to_dict()

    return render_template(
        "product.html",
        product=product_info
    )


# AI recommendation API
@app.route("/recommend/<int:product_id>")
def recommend(product_id):

    product_index = products.index[
        products["id"] == product_id
    ].tolist()

    if not product_index:
        return jsonify([])

    index = product_index[0]

    # Get similarity scores
    similarity_scores = list(
        enumerate(similarity[index])
    )

    # Sort from most similar to least similar
    similarity_scores = sorted(
        similarity_scores,
        key=lambda x: x[1],
        reverse=True
    )

    # Remove current product
    similarity_scores = similarity_scores[1:5]

    recommendations = []

    for i, score in similarity_scores:
        recommendations.append(
            products.iloc[i].to_dict()
        )

    return jsonify(recommendations)


@app.route("/checkout")
def checkout_page():
    return render_template("checkout.html")


# Run application
if __name__ == "__main__":
    app.run(debug=True)

 