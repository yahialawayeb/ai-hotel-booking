FROM node:20-slim

WORKDIR /app

# Copy package files from server directory
COPY ./server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY ./server ./

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]