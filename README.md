# Hotel Reservation Management System

A full-stack hotel management application built with **Next.js**, **NestJS**, **PostgreSQL**, and **Tailwind CSS**.

## Project Structure

- **`client/`**: Frontend application (Next.js 16, Tailwind CSS v4)
- **`server/`**: Backend application (NestJS, Prisma ORM)
- **`docker-compose.yml`**: Docker orchestration for the full stack

---

## 🚀 Quick Start (Docker)

The easiest way to run the application is using Docker Compose.

### 1. Prerequisites
- Docker and Docker Compose installed on your machine.

### 2. Configuration
Ensure you have a `.env` file in the root directory. You can start by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file if you wish to change passwords or ports.

**Important**: For the AI Chatbot to function, you must provide a valid `GROQ_API_KEY` in the `.env` file.
```env
GROQ_API_KEY="your_groq_api_key_here"
```

### 3. Run the Application
Run the following command in the root directory:

```bash
docker compose up --build
```

### 4. Access the App
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **API Documentation (Swagger)**: [http://localhost:4000/api](http://localhost:4000/api)
- **PgAdmin (DB GUI)**: [http://localhost:5050](http://localhost:5050)
  - Login with the email/password defined in `.env`.
  - To connect to the DB server, use host: `db` (internal Docker network name).

---

## 🛠️ Local Development (Manual Setup)

If you prefer to run services individually without Docker (except maybe the DB), follow these steps.

### Prerequisites
- Node.js (v18 or v20)
- PostgreSQL (or run just the DB via Docker)

### 1. Database Setup
You need a running PostgreSQL instance. You can start just the database using Docker:

```bash
docker compose up -d db
```
*This will expose Postgres on port **5433** (defined in .env as DB_PORT).*

### 2. Backend Setup (`server/`)

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    Create `server/.env` based on the root settings but adapted for localhost connectivity:
    ```env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5433/hotel_db?schema=public"
    JWT_SECRET="super-secret"
    PORT=4000
    ```
4.  Run Migrations (create tables):
    ```bash
    npx prisma migrate dev
    ```
5.  Start the Server:
    ```bash
    npm run start:dev
    ```
    The server runs on `http://localhost:4000`.

### 3. Frontend Setup (`client/`)

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment (**Important**):
    Create `client/.env.local` to point to your local backend:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:4000
    ```
    *Note: The app's `getApiUrl` helper will automatically use this.*
4.  Start the Frontend:
    ```bash
    npm run dev
    ```
    The app runs on `http://localhost:3000`.



## Features
- **Public**: Landing page, Room listing, Room details, Real-time availability check, Contact & About pages.
- **Multilingual**: Full support for English (`en`) and French (`fr`) using `next-intl`.
- **AI Chatbot**: Intelligent concierge powered by Groq (LLame-3) capable of recommending rooms with images and handling queries in multiple languages.
- **Booking**: Guest booking flow with date selection and price calculation.
- **Admin**: Dashboard, Room management (CRUD), Reservation management.
- **Auth**: JWT-based authentication for admins and users.
