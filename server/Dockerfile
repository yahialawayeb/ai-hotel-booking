FROM node:20-slim

WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npm run start:dev"]
