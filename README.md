# 🍔 The Debug Burger

> **Transform messy production crashes into well-structured, delicious GitHub Issues shaped like a gourmet burger.**

[![TypeScript](https://shields.io)](https://typescriptlang.org)
[![Express](https://shields.io)](https://expressjs.com)

`The Debug Burger` is a lightweight, highly automated API backend that acts as a middleman between your app's production error logs (or custom `try/catch` baskets) and your GitHub repository. Whenever your application throws a critical error, this bot intercepts the crash payload and "cooks" a fully formatted GitHub Issue complete with ASCII art, structured error metadata, and stack trace layers.

---

## 🥪 How the Analogy Works

Every bug report is formatted as an **Order Receipt** from the GitHub Kitchen:
* **The Top Bun 🍞:** The high-level error context and message.
* **The Rotten Meat 🥩:** The raw, unfiltered, colored Stack Trace where the code got poisoned.
* **Pickles & Seasoning 🍅:** Environment details, Server specs, and affected user metadata.

```text
       .-------------.
      (   THE DEBUG   )  <- [PRODUCTION] CRASH DETECTED
       '-------------'
          \ (x_x) /      <- TypeError: Cannot read property 'password'
       ================  <- CRITICAL STACK TRACE INSIDE
       [-------------]   <- AUTO-OPENED VIA THE-DEBUG-BURGER
       '-------------'
```

---

## 🚀 Features

- [x] **Gourmet Layout:** Replaces ugly, unreadable text errors with clean Markdown tables and visual structural blocks.
- [x] **Automatic Labeling:** Smart filtering automatically appends labels based on the server environment (`production`, `staging`) and issue nature (`bug`).
- [x] **Fully Typed:** Built entirely on top of TypeScript and the official `@octokit/rest` Client.
- [x] **Easily Extensible:** Connect it effortlessly into your existing Express, NestJS, Fastify backends or Sentry webhooks.

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com
cd the-debug-burger
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory of your project:
```env
PORT=3000
GITHUB_TOKEN=ghp_YourPersonalAccessTokenGoesHere
GITHUB_OWNER=your-github-username-or-org
GITHUB_REPO=your-target-repository-name
```
> **Note:** Ensure your GitHub Personal Access Token (PAT) has `repo` or `write:packages` / `issues:write` permissions enabled.

### 4. Build and Run
**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

---

## 🍽️ API Reference

### Cook a New Bug Burger
Send a POST request when an error is caught in your main application infrastructure.

* **Endpoint:** `POST /webhook/crash`
* **Content-Type:** `application/json`

#### Request Payload Body Example:
```json
{
  "errorName": "ReferenceError",
  "message": "userProfile is not defined",
  "stack": "ReferenceError: userProfile is not defined\n    at dashboard.ts:42:11\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)",
  "environment": "production",
  "url": "https://my-app.com",
  "userId": "usr_77231-alpha"
}
```

#### Quick Test using cURL:
```bash
curl -X POST http://localhost:3000/webhook/crash \
  -H "Content-Type: application/json" \
  -d '{"errorName":"TypeError","message":"Cannot read properties of undefined","stack":"TypeError: ...\n at server.js:10","environment":"staging","url":"http://localhost/test"}'
```

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingIngredient`)
3. Commit your Changes (`git commit -m 'feat: add bacon layer to formatting'`)
4. Push to the Branch (`git push origin feature/AmazingIngredient`)
5. Open a Pull Request

---

_Made with ❤️ and plenty of grease by a developer who hates unformatted logs._
