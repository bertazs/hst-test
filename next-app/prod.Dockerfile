# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to install dependencies
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that your Next.js app will run on (for example, 3000)
EXPOSE 3000

# Command to start the Next.js app in production mode
CMD ["npm", "start"]