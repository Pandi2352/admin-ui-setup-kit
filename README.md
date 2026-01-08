# 🚀 Admin Kit

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-v18.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-v5.0-blue)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.0-blue)
![Vite](https://img.shields.io/badge/vite-v5.0-purple)

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg?style=for-the-badge&logo=vercel)](https://admin-ui-setup-kit.vercel.app/)

A robust, enterprise-grade React boilerplate designed for scalability, performance, and best-in-class developer experience. This kit is pre-configured with essential utilities, hooks, RBAC, and a modern UI foundation to jumpstart your next SaaS or Admin Dashboard project.

---

## 🌟 Key Features

### 🏗 Core Architecture
- **Vite Powered**: Instant HMR and lightning-fast builds.
- **TypeScript Strict**: Fully typed codebase for confidence and scalability.
- **Tailwind CSS v4**: Modern, utility-first styling with a custom design system.
- **React Router v6/v7**: Robust client-side routing with protected routes.

### 🛡 Security & Authentication
- **RBAC System**: Built-in `RoleProvider` and `PermissionGate` for granular access control.
- **Axios Interceptors**: Automated JWT token injection, refresh logic, and error handling.
- **Secure Utils**: Helpers for crypto, sanitization, and secure storage access.
- **Route Guards**: `<ProtectedRoute />` components to shield sensitive pages.

### 🧩 UI/UX Components
- **Dynamic Sidebar**: Data-driven, collapsible, and mobile-responsive navigation.
- **Toast Notifications**: Integrated `react-hot-toast` for beautiful alerts.
- **Loading Skeletons**: Pre-built skeletal loading states for tables and content.
- **SEO Optimized**: Reusable `<SEO />` component using `react-helmet-async`.
- **Error Boundaries**: Graceful error handling with custom 404 and 500 pages.

### ⚡ Advanced Performance & Mocking
- **PWA Ready**: Installable as a native app with offline capability (`vite-plugin-pwa`).
- **MSW (Mock Service Worker)**: Prototype fast with network-level API mocking using `msw`.
- **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense`.

### 🧰 Developer Utilities
- **Custom Hooks**:
  - `useLocalStorage` / `useSessionStorage`: Persist state easily.
  - `useNetworkStatus`: Detect offline/online state changes.
  - `useOnClickOutside`: Handle clicks outside modals/dropdowns.
  - `useDebounce`: Optimize performance for search inputs.
  - `useCopyToClipboard`: Simple clipboard interaction.
  - `useSidebar`: Global sidebar state management.
- **Utility Libraries**:
  - `string.ts`: Capitalization, slugs, truncation.
  - `date.ts`: Formatting, relative time helpers.
  - `array.ts`: Chunking, filtering, sorting, unique sets.
  - `object.ts`: Deep cloning, property picking/omitting.
  - `validation.ts`: RegEx validators for emails, passwords, etc.
  - `browser.ts`: Cookie management, device detection.

---

## 📂 Project Structure

```bash
src/
├── 📂 api/                  # API Layer
│   ├── 📂 endpoints/        # API Endpoint definitions
│   ├── 📂 interceptors/     # Axios interceptors (Auth, Error)
│   ├── 📂 types/            # API Response interfaces
│   └── client.ts            # Configured Axios instance
├── 📂 components/           # UI Components
│   ├── 📂 auth/             # PermissionGate, ProtectedRoute
│   ├── 📂 common/           # SEO, ErrorBoundary, GTranslate
│   ├── 📂 header/           # App Header, LanguageSelector
│   ├── 📂 sidebar/          # Sidebar navigation logic
│   └── 📂 ui/               # Generic UI (Toaster, Skeletons, Tooltip)
├── 📂 config/               # App Configuration (Routes)
├── 📂 constants/            # Static Constants (Regex, App, Messages)
├── 📂 context/              # Global Contexts (Role, Sidebar, Theme)
├── 📂 hooks/                # Custom Hooks
│   ├── 📂 common/           # General purpose hooks
│   └── useSidebar.ts        # Specific feature hooks
├── 📂 layouts/              # Page Layouts (DashboardLayout)
├── 📂 pages/                # Views (Dashboard, Settings, Projects)
├── 📂 routes/               # Route Definitions
├── 📂 services/             # External Services (Logger)
└── 📂 utils/                # Helper Functions
    ├── array.ts
    ├── browser.ts
    ├── crypto.ts
    ├── date.ts
    ├── file.ts
    ├── number.ts
    ├── object.ts
    ├── storage.ts
    ├── string.ts
    └── validation.ts
```

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/admin-kit.git
    cd admin-kit
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

### Configuration
- **Environment Variables**: Create a `.env` file based on `.env.example`.
- **API Base URL**: Update `VITE_API_BASE_URL` in `.env`.
- **Theme**: Customize colors in `tailwind.config.js`.

---

## 🧭 Usage Guide

### Role-Based Access Control
```tsx
// 1. Wrap your component or route
<ProtectedRoute allowedRoles={['admin']}>
  <AdminPage />
</ProtectedRoute>

// 2. Or conditionally render inside a component
const { hasPermission } = useRole();

if (hasPermission(['admin', 'editor'])) {
  return <EditButton />;
}
```

### Making API Requests
```tsx
import { api } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';

// The client automatically handles auth tokens
const fetchUsers = async () => {
  try {
    const data = await api.get(ENDPOINTS.USERS.LIST);
    return data;
  } catch (error) {
    // Error interceptor handles global errors
    console.error(error);
  }
};
```

### Using Utilities
```tsx
import { formatDate } from '@/utils/date';
import { slugify } from '@/utils/string';

console.log(formatDate(new Date())); // "Jan 08, 2026"
console.log(slugify("Hello World")); // "hello-world"
```

---

## 🤝 Contributing
Contributions are welcome! Please read our [Contribution Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
