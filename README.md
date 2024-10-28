# E-Academy Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It serves as the frontend for the E-Academy platform, providing users with a seamless and interactive learning experience.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm, yarn, pnpm, or bun (package managers)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/happychuks/e-academy.git
   cd e-academy
   ```



2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

**Running the Development Server**
First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Building for Production**
To create an optimized production build:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

**Running in Production Mode**
To run the project in production mode:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Features

- User Authentication (Sign Up, Login)
- Responsive Design
- Integration with Google and Twitter for authentication
- Form validation using Zod
- Loading spinners for asynchronous actions
- Error handling and alerts

## Technologies Used

- [Next.js](https://nextjs.org/docs/getting-started/installation) - The React Framework
- React - A JavaScript library for building user interfaces
- Tailwind CSS - A utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/docs) - A collection of re-usable components
- Zod - TypeScript-first schema declaration and validation library
- Lucide - Beautiful & consistent icon toolkit
- Vercel - Platform for frontend frameworks and static sites

