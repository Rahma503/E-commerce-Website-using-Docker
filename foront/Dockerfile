# Use a base image
FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the frontend files to the container
COPY index.html .
COPY cart.html .
COPY cart.js .
COPY styles.css .  
COPY app.js .
COPY profile.html .
COPY profile.js .
COPY signup.html .
COPY products.js .

# Expose the container's port
EXPOSE 80

# Define the command to start the server
CMD ["nginx", "-g", "daemon off;"]
