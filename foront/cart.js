// Function to dynamically generate the cart items
function generateCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = ''; // Clear previous content
 
  let cartTotal = 0;
 
  // Retrieve the cart items from local storage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
 
  cart.forEach(item => {
     const itemDiv = document.createElement('div');
     itemDiv.classList.add('cart-item');
     itemDiv.innerHTML = `
       <p>${item.name} - $${item.price.toFixed(2)}</p>
       <button onclick="removeFromCart(${item.id})">Remove</button>
       <button onclick="addToCart(${item.id})">Add</button>
     `;
     cartItemsDiv.appendChild(itemDiv);
     cartTotal += item.price * (item.quantity || 1);
  });
 
  // Update the cart total
  document.getElementById('cart-total').textContent = `Total: $${cartTotal.toFixed(2)}`;
 }
 
 // Function to remove a product from the cart
 function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  generateCartItems(); // Update the cart items display
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
     generateCartItems(); // Update the cart items display
  }
 }
 
 // Call the function to generate the cart items when the page loads
 window.onload = generateCartItems;
 