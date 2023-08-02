# Use the official Node.js image as the base image
FROM node:lts-hydrogen

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express.js app listens on
EXPOSE 8080

# Start the Express.js server
CMD ["npm", "run", "start"]