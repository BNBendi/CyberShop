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
});
