# ChatGenius - Premium SaaS Dashboard UI Template

A stunning, production-ready Next.js template to launch your next SaaS application.

![ChatGenius Preview](https://picsum.photos/seed/readme/1200/600)

## Overview

ChatGenius is a high-quality UI Template for a modern SaaS application, built with the latest web technologies. It features a beautiful and professional design that is fully responsive, ensuring a flawless experience on desktops, tablets, and mobile devices.

This template is perfect for developers who want a beautiful, production-ready frontend without starting from scratch. **Please note: ChatGenius is a UI template only.** It does not include any backend functionality, database, or authentication logic. All data displayed in the UI is hardcoded mock data, making it incredibly easy for you to connect it to your backend of choice (e.g., Firebase, Supabase, a custom Node.js API, etc.).

## Live Demo

You can view a live preview of the template here:

- **[Live Demo Link](https://chatgenius-template.yourdomain.com)**

## Key Features

- **Modern & Professional Design:** A clean, beautiful interface ready for production.
- **Built with Next.js 15 (App Router) & TypeScript:** Enjoy the benefits of the latest React framework features.
- **Styled with Tailwind CSS & shadcn/ui:** A highly customizable and popular styling solution.
- **Fully Responsive:** Works perfectly on desktop, tablet, and mobile.
- **100% Static & Backend-Free:** Easy to connect to any backend API or service.
- **Pre-built Pages:** Includes a wide range of essential pages:
    - Landing Page (Hero, Features, Pricing, etc.)
    - User Dashboard (Overview, Conversations, Analytics, AI Training, Widget Settings, Team Management, etc.)
    - Admin Panel (Dashboard, User Management, Billing, Product, etc.)
    - Auth Pages (Sign In & Sign Up modals)
- **Reusable Components:** A rich library of components to easily build new pages.
- **Clear Code & Folder Structure:** Written with best practices to make customization straightforward.
- **Dark Mode Ready:** Though not implemented by default, the structure is ready for easy dark mode theming.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Getting Started (Installation)

Follow these steps to get the template running on your local machine.

#### Prerequisites

Make sure you have the following software installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- `npm` or `yarn`

#### Installation Steps

1.  **Unzip & Navigate:**
    Unzip the downloaded file and open your terminal. Navigate into the project folder:
    ```bash
    cd chatgenius-template
    ```

2.  **Install Dependencies:**
    Install all the necessary packages using npm or yarn.
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Run the Development Server:**
    Start the Next.js development server.
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Open your browser and navigate to `http://localhost:9002`. You should now see the ChatGenius template live!

## Folder Structure

The project uses a standard Next.js App Router structure to make finding and editing files easy.

```
/
├── public/                # Static assets like images
├── src/
│   ├── app/               # All pages and layouts (App Router)
│   │   ├── (landing)/     # Contains landing page sections
│   │   ├── dashboard/     # User dashboard pages
│   │   └── admin/         # Admin panel pages
│   ├── components/        # Reusable UI components (shadcn, layout, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/
│   │   ├── mock-data.ts   # IMPORTANT: All hardcoded UI data is here!
│   │   └── utils.ts       # Utility functions (e.g., cn for Tailwind)
│   └── globals.css        # Global CSS styles and Tailwind directives
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## Customization

Customizing the template is designed to be as simple as possible.

#### Changing Colors & Branding

-   **Colors:** The primary brand colors can be easily changed by editing the HSL values in the `/src/app/globals.css` file.
-   **Fonts:** The main font (Inter) is linked in `/src/app/layout.tsx`. You can change it there.
-   **Logo:** The logo component is located in `/src/components/layout/navbar.tsx`. You can replace the SVG with your own.

#### Changing Page Content (Mock Data)

**This is the most important part of customizing the template.** All the text, lists, charts, and user information you see on the pages are hardcoded in a single file:

➡️ **`/src/lib/mock-data.ts`**

To change the content of any page (e.g., the number of users on the dashboard, the list of team members, conversation history), simply open this file and edit the corresponding mock data objects. This allows you to quickly set up a visually complete prototype before connecting your backend.

## Support

I am happy to provide support for the template. Please read the following to understand what is included.

#### ✅ What's INCLUDED in support:
- Answering questions about installation and project setup.
- Fixing any bugs or issues found within the original template's UI code.
- General guidance on how to use the provided components.

#### ❌ What's NOT INCLUDED in support:
- Help with integrating a backend (Firebase, Supabase, custom APIs, etc.). This is the responsibility of the buyer.
- Creating new custom features or pages.
- Teaching web development fundamentals (React, Next.js, Tailwind CSS).

For support requests, please email: **[your-support-email@example.com]**

## Final Package Contents

Your final `.zip` file should contain all the files and folders from this project, excluding `node_modules`. This includes:

- `.env`
- `README.md`
- `components.json`
- `next.config.ts`
- `package.json`
- `package-lock.json` (or `yarn.lock`)
- `src/` (the entire source folder)
- `tailwind.config.ts`
- `tsconfig.json`


## Changelog

**v1.0.0** (October 28, 2025)
- Initial Release
