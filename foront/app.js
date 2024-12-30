// Function to dynamically generate the product list
function generateProductList() {
  const productListDiv = document.getElementById('product-list');
  productListDiv.innerHTML = ''; // Clear previous content
 
  products.forEach(product => {
     const productDiv = document.createElement('div');
     productDiv.classList.add('product');
     productDiv.innerHTML = `
       <h2>${product.name}</h2>
       <h3 style="font-size: 14px;">$${product.price.toFixed(2)}</h3>
       <button onclick="addToCart(${product.id})">Add to Cart</button>
     `;
     productListDiv.appendChild(productDiv);
  });
 }
 
 // Function to add a product to the cart
 function addToCart(productId) {
  const productToAdd = products.find(product => product.id === productId);
  if (productToAdd) {
     // Retrieve the current cart from local storage
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
     // Check if the product is already in the cart
     const existingProductIndex = cart.findIndex(item => item.id === productId);
 
     if (existingProductIndex >= 0) {
       // If the product is already in the cart, update its quantity
       cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
     } else {
       // If the product is not in the cart, add it with a default quantity of 1
       cart.push({ ...productToAdd, quantity: 1 });
     }
 
     // Save the updated cart to local storage
     localStorage.setItem('cart', JSON.stringify(cart));
  }
 }
 
 // Call the function to generate the product list when the page loads
 window.onload = generateProductList;
 