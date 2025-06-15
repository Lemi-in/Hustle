
# 🔎 Hustle – Modern Job Search Platform

Hustle is a full-stack job search platform built with **Next.js**, **TailwindCSS**, and **BetterAuth**. It connects **job seekers** and **companies**, enabling seamless job discovery, application, and talent matching.

## 🚀 Features

### 👤 For Job Seekers
- Register and log in securely
- Filter jobs by type (Full-time, Part-time, Remote, Hybrid, On-site)
- Search using tags (e.g., React, Design, Entry-Level)
- Sort jobs by recency: latest, last 24 hours, past week
- View detailed job descriptions
- Apply to jobs directly
- Save/bookmark jobs for later

### 🏢 For Companies
- Company registration and authentication
- Post new job listings with tags, descriptions, and type
- Edit or remove job posts
- Search for candidates using filters and tags
- Access a dashboard with analytics (views, bookmarks, applications)

### 🌐 Common Features
- Role-based authentication using BetterAuth
- Responsive design using TailwindCSS
- Realtime timestamps (e.g., "Posted 3 hours ago")
- User and company dashboards
- Account and profile management

## 🧱 Tech Stack

- **Frontend**: Next.js 14, TailwindCSS
- **Authentication**: BetterAuth
- **Backend/API**: Next.js API Routes 
- **Database**: Firebase/Firestore
- **Deployment**: Vercel

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/jobmatch.git
cd jobmatch
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file and add:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_BETTERAUTH_CLIENT_ID=your_client_id
NEXT_PUBLIC_BETTERAUTH_SECRET=your_secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## 📦 Deployment

Easily deploy with [Vercel](https://vercel.com), the platform built for Next.js.

## 📌 Roadmap (optional)

* [ ] Resume upload and parsing
* [ ] Admin panel
* [ ] Email notifications
* [ ] Dark mode support
* [ ] Tag recommendation system

## 🧑‍💻 Author

**Lemesa Elias**
Passionate full-stack developer and problem solver.
[GitHub](https://github.com/lemesa) • [LinkedIn](https://linkedin.com/in/lemesaelias)

## 📝 License

MIT License
