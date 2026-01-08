# Deploying Admin Kit to Vercel

Since you have already pushed your code to GitHub, deploying to Vercel is extremely easy.

## Option 1: Vercel Dashboard (Recommended)

1.  **Log in** to [Vercel](https://vercel.com/).
2.  Click **"Add New"** -> **"Project"**.
3.  **Import** your repository: `admin-ui-setup-kit`.
4.  Vercel will automatically detect that this is a **Vite** project.
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add keys from your `.env` file (e.g., `VITE_API_BASE_URL`).
6.  Click **"Deploy"**.

Your site will be live in less than a minute!

## Option 2: Vercel CLI

If you prefer the command line:

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run this command in your project root:
    ```bash
    vercel
    ```
    *   Follow the prompts (accept defaults).

4.  **Production Deploy**:
    ```bash
    vercel --prod
    ```

---

## Configuration Note

A `vercel.json` file has been added to the project root. This ensures that client-side routing works correctly (redirecting all traffic to `index.html` so React Router can handle it).

```json
{
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
