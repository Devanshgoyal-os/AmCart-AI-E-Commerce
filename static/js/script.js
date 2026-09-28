// ================= IMAGE SLIDER =================

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    if (index >= slides.length) {
        currentSlide = 0;
    }

    if (index < 0) {
        currentSlide = slides.length - 1;
    }

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");
}


function changeSlide(direction) {

    currentSlide = currentSlide + direction;

    showSlide(currentSlide);
}


setInterval(function() {

    currentSlide++;

    showSlide(currentSlide);

}, 4000);


// ================= SEARCH =================

function searchProducts() {

    const input = document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const searchText = input.value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const name =
            product.getAttribute("data-name").toLowerCase();

        const category =
            product.getAttribute("data-category").toLowerCase();

        if (
            name.includes(searchText) ||
            category.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        function(event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );

}


// ================= CATEGORY FILTER =================

function filterCategory(category) {

    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= CART =================

let cart = [];

function addToCart(productName, productPrice) {

    let cleanPrice = String(productPrice)
        .replace(/[^0-9.]/g, "");

    let price = parseFloat(cleanPrice);

    if (isNaN(price)) {
        price = 0;
    }

    // Check if product already exists
    let existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        let totalItems = 0;

        cart.forEach(function(product) {
            totalItems += product.quantity;
        });

        cartCount.innerText = totalItems;
    }


    displayCart();

    alert(productName + " added to cart!");
}
function toggleCart() {

    const cartSection =
        document.getElementById("cartSection");

    if (cartSection) {

        cartSection.classList.toggle("show");

    }

}
 function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();

    updateCartCount();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();

    updateCartCount();
}


function updateCartCount() {

    let totalItems = 0;

    cart.forEach(function(product) {

        totalItems += product.quantity;

    });


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText = totalItems;

    }

}

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.innerText = "0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(product, index) {

        total =
            total + (product.price * product.quantity);


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <br>

                    <small>
                        ₹${product.price} × ${product.quantity}
                    </small>

                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>


                <button
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    cartTotal.innerText = total;
}

function removeFromCart(index) {

    cart.splice(index, 1);


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText = cart.length;

    }


    displayCart();

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    window.location.href = "/checkout";

}


// ================= PLACE ORDER =================

function placeOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById("customerName").value;


    alert(

        "🎉 Order placed successfully!\n\n" +

        "Thank you, " + name + "!\n" +

        "Your AmCart order has been confirmed."

    );


    cart = [];


    window.location.href = "/";

}


// ================= AI RECOMMENDATIONS =================

async function loadRecommendations() {

    if (typeof currentProductId === "undefined") {

        return;

    }


    const recommendationBox =
        document.getElementById("recommendations");


    if (!recommendationBox) {

        return;

    }


    try {

        const response =
            await fetch("/recommend/" + currentProductId);


        const recommendations =
            await response.json();


        recommendationBox.innerHTML = "";


        if (recommendations.length === 0) {

            recommendationBox.innerHTML =
                "<p>No recommendations available.</p>";

            return;

        }


        recommendations.forEach(function(product) {

            const card =
                document.createElement("div");


            card.className = "product-card";


            card.innerHTML = `

                <img
                    src="/static/products/${product.image}"
                    alt="${product.name}"
                >


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p class="category">
                        ${product.category}
                    </p>


                    <p class="description">
                        ${product.description}
                    </p>


                    <h3 class="price">
                        ₹${product.price}
                    </h3>


                    <div class="buttons">

                        <a
                            href="/product/${product.id}"
                            class="view-btn">

                            View Details

                        </a>


                        <button
                            class="cart-btn"
                            onclick="addToCart('${product.name}', '${product.price}')">

                            Add to Cart

                        </button>

                    </div>

                </div>

            `;


            recommendationBox.appendChild(card);

        });

    }

    catch (error) {

        console.error(
            "Recommendation error:",
            error
        );


        recommendationBox.innerHTML =
            "<p>Unable to load recommendations.</p>";

    }

}


// ================= SAVE LAST VIEWED PRODUCT =================

document.querySelectorAll(".view-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const productId =
            this.getAttribute("data-product-id");


        if (productId) {

            localStorage.setItem(
                "lastViewedProduct",
                productId
            );

        }

    });

});


// ================= AI HOMEPAGE RECOMMENDATIONS =================

async function loadHomepageRecommendations() {

    const box =
        document.getElementById("recommendations");


    if (!box) {

        return;

    }


    let productId =
        localStorage.getItem("lastViewedProduct");


    if (!productId) {

        productId = 1;

    }


    box.innerHTML =
        "<p>🤖 Finding similar products...</p>";


    try {

        const response =
            await fetch("/recommend/" + productId);


        const products =
            await response.json();


        box.innerHTML = "";


        if (products.length === 0) {

            box.innerHTML =
                "<p>No recommendations found.</p>";

            return;

        }


        products.forEach(function(product) {

            const card =
                document.createElement("div");


            card.className = "product-card";


            card.innerHTML = `

                <img
                    src="/static/products/${product.image}"
                    alt="${product.name}"
                >


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p class="category">
                        ${product.category}
                    </p>


                    <p class="description">
                        ${product.description}
                    </p>


                    <h3 class="price">
                        ₹${product.price}
                    </h3>


                    <div class="buttons">

                        <a
                            href="/product/${product.id}"
                            class="view-btn">

                            View Details

                        </a>


                        <button
                            class="cart-btn"
                            onclick="addToCart('${product.name}', '${product.price}')">

                            Add to Cart

                        </button>

                    </div>

                </div>

            `;


            box.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);


        box.innerHTML =
            "<p>Unable to load AI recommendations.</p>";

    }

}


// ================= LOAD AI RECOMMENDATIONS =================

loadRecommendations();

loadHomepageRecommendations();