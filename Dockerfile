# Use Node.js 18 as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the app with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/baza-ksk-frontend /usr/share/nginx/html
