# Beyond Scraper

Article scraping and AI rewriting platform built with Laravel 12, React, and Node.js worker powered by OpenAI.

Application Video Recording - https://www.loom.com/share/31d92fde5c6d47199b99b2bc352d8b4b
---

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- SQLite (included with Laravel)
- OpenAI API Key (https://platform.openai.com/api/keys)

---

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/beyond-scraper.git
cd beyond-scraper
```

### 2. Backend Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 3. Frontend Setup
```bash
npm install
npm run build
```

### 4. Node.js Worker Setup
```bash
cd scraper
npm install
cp .env.example .env
```

Edit `scraper/.env`:
```
OPENAI_API_KEY=sk-your-actual-key
LARAVEL_API_URL=http://127.0.0.1:8000/api
```

---

## Running the Project

Open THREE terminals:

### Terminal 1 - Laravel Server
```bash
php artisan serve
```

Runs at: http://127.0.0.1:8000

<img width="816" height="181" alt="image" src="https://github.com/user-attachments/assets/3f4472b6-834f-42dc-9cec-ea7ebda090bf" />


### Terminal 2 - Vite (Frontend)
```bash
npm run dev
```

Runs at: http://localhost:5173

<img width="718" height="286" alt="image" src="https://github.com/user-attachments/assets/a37b194b-483b-4d47-8fab-a1489698a038" />

Note: Vite provides hot-reload for React components. Do NOT visit port 5173. Instead, visit the Laravel server at http://127.0.0.1:8000/dashboard to see your dashboard with live React updates from Vite.

### Terminal 3 - Worker
```bash
cd scraper
node researcher.js
```

Scrapes and enhances articles using OpenAI.

<img width="1077" height="243" alt="image" src="https://github.com/user-attachments/assets/2847643c-f901-4ac2-95cc-6f28e70a5cd6" />


---

## Accessing the Dashboard

Visit: http://127.0.0.1:8000/dashboard

- Vite runs on port 5173 for development/hot-reload only
- Your actual dashboard is served by Laravel on port 8000
- Keep Terminal 2 running for hot-reload to work (changes update instantly)

---

## Usage

1. Open http://localhost:8000
   <img width="816" height="181" alt="image" src="https://github.com/user-attachments/assets/f3b78ea9-27b0-4948-bdf5-b316e2c40210" />

3. Register account
4. Start worker (Terminal 3)
   <img width="1087" height="241" alt="image" src="https://github.com/user-attachments/assets/0e498dc3-c5ab-489e-a00b-0d449d91eda4" />

5. View original and AI-updated article versions on dashboard
   <img width="1901" height="944" alt="image" src="https://github.com/user-attachments/assets/7852b2c8-51de-473c-855c-125cfa67cdcd" />

6. Toggle between versions with button
   <img width="270" height="113" alt="image" src="https://github.com/user-attachments/assets/ef10537f-622e-4ac2-be77-4191255c7f0b" />


---

## Features

- User authentication via Laravel Sanctum
- CRUD operations for articles
- Automatic article scraping
- AI enhancement using OpenAI GPT-4 Turbo
- Toggle original vs updated versions
- Real-time dashboard
- Article references
- SQLite database
- Responsive React UI
- Vite hot-reload

---

## Environment Setup

Your `.env` is already configured correctly:

```
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost
DB_CONNECTION=sqlite
SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
```

For the worker, set in `scraper/.env`:
```
OPENAI_API_KEY=sk-your-api-key
LARAVEL_API_URL=http://127.0.0.1:8000/api/articles
```

---

## Troubleshooting

### Laravel won't start
```bash
php artisan cache:clear
php artisan config:clear
php artisan migrate
php artisan serve
```

### Database missing
```bash
php artisan migrate
```

### React not updating
Ensure Vite is running in Terminal 2:
```bash
npm run dev
```

### Worker fails
Check:
- OpenAI API key in scraper/.env
- Laravel running on port 8000
- LARAVEL_API_URL is correct

### Port 8000 in use
```bash
php artisan serve --port=8001
```

---

## Tech Stack

- Backend: Laravel 12
- Frontend: React 18 + Tailwind CSS
- Build: Vite
- Worker: Node.js 18+
- Database: SQLite
- AI: OpenAI GPT-4 Turbo
- Auth: Laravel Sanctum

---

## License

MIT
