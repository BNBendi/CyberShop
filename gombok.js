addToCartButton = document.querySelectorAll(".add-to-cart-button");

document.querySelectorAll('.add-to-cart-button').forEach(function(addToCartButton) {
    addToCartButton.addEventListener('click', function() {
        addToCartButton.classList.add('added');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 2000);
    });
});
const button = document.querySelector('.add-to-cart-button');

button.addEventListener('click', function() {
    button.classList.toggle('clicked');
});

document.querySelectorAll('.add-to-cart-button').forEach(function(addToCartButton) {
    addToCartButton.addEventListener('click', function() {
        addToCartButton.classList.add('clicked');
        setTimeout(function(){
            addToCartButton.classList.remove('clicked');
        }, 2000); 
    });
});// Select cart elements
const listCartHTML = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('.icon-cart span');
const body = document.querySelector('body');
const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.close');

// Select all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// Initialize cart and products array
let cart = [];
let products = [];

// Function to add item to cart
const addToCart = (productName, productId) => {
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.product_id === productId);
    if (existingItem) {
        existingItem.quantity++; // Increment quantity if already in cart
    } else {
        // Add new item to cart
        cart.push({
            product_id: productId,
            name: productName,
            quantity: 1
        });
    }
    // Update cart display
    updateCart();
    // Save cart to localStorage
    saveCart();
}

// Event listener for 'Add to Cart' buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.mycard');
        const productName = card.querySelector('.card-title').textContent.trim();
        const productId = card.dataset.id;
        addToCart(productName, productId);

        // Apply CSS animation class
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 2000);
    });
});

// Function to update cart display
const updateCart = () => {
    // Clear previous cart content
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    // Iterate through items in cart
    cart.forEach(item => {
        totalQuantity += item.quantity;
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <div class="name">${item.name}</div>
            <div class="quantity">
                <button class="minus" data-id="${item.product_id}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-id="${item.product_id}">+</button>
            </div>
        `;
        listCartHTML.appendChild(newItem);
    });

    // Update cart icon with total quantity
    iconCartSpan.innerText = totalQuantity;
}

// Event listener for cart item quantity buttons using event delegation
listCartHTML.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('plus') || target.classList.contains('minus')) {
        const productId = target.dataset.id;
        const itemIndex = cart.findIndex(item => item.product_id === productId);
        if (itemIndex !== -1) {
            if (target.classList.contains('plus')) {
                cart[itemIndex].quantity++;
            } else {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1); // Remove item if quantity becomes 0
                }
            }
            // Update cart display and save cart to localStorage
            updateCart();
            saveCart();
        }
    }
});

// Save cart to localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Event listener for cart icon
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Event listener for close button
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

// Initialize app
const initApp = () => {
    // Fetch product data
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        loadCart();
    });
}
// Event listener for cart item quantity buttons using event delegation
listCartHTML.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('plus') || target.classList.contains('minus')) {
        const productId = target.dataset.id;
        const itemIndex = cart.findIndex(item => item.product_id === productId);
        if (itemIndex !== -1) {
            if (target.classList.contains('plus')) {
                cart[itemIndex].quantity++;
            } else {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1); // Remove item if quantity becomes 0
                }
            }
            // Update cart display and save cart to localStorage
            updateCart();
            saveCart();
        }
    }
});

// Call initApp function to start the application
initApp();
