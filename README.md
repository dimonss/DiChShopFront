# Chalysh.tech Shop

A modern platform available at [chalysh.tech](https://chalysh.pro).

## Description

This project is a React-based platform built with modern web technologies. It provides a seamless shopping experience with both development and production environments.

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Router
- Axios
- Styled Components
- ESLint & Prettier for code quality

## Prerequisites

- Node.js (version specified in package.json)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dimonss/DiChShopFront.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with necessary environment variables.

## Available Scripts

In the project directory, you can run:

### `npm start:dev`

Runs the app in development mode with a locally launched backend.
- Open [http://localhost:3001](http://localhost:3001) to view it in the browser
- The page will reload automatically if you make edits
- You will see any lint errors in the console

### `npm start:stage`

Runs the app in development mode with the staging backend.

### `npm start:prod`

Runs the app in development mode with the production backend.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run lint`

Runs ESLint to check code quality.

## Project Structure

```
├── public/          # Static files
├── src/            # Source code
│   ├── api/        # API integration and endpoints
│   ├── components/ # React components
│   │   ├── aboutUser/    # User profile components
│   │   ├── bottomNavBar/ # Bottom navigation components
│   │   ├── cart/        # Shopping cart components
│   │   ├── content/     # Main content components
│   │   ├── error/       # Error handling components
│   │   ├── favorites/   # Favorites components
│   │   ├── notification/# Notification components
│   │   ├── product/     # Product-related components
│   │   ├── reusable/    # Reusable UI components
│   │   └── sideNavBar/  # Side navigation components
│   ├── constants/  # Application constants
│   ├── hooks/      # Custom React hooks
│   ├── images/     # Image assets
│   ├── layout/     # Layout components
│   ├── mockData/   # Mock data for development
│   ├── redux/      # Redux store and slices
│   ├── types/      # TypeScript type definitions
│   ├── utils/      # Utility functions
│   ├── config.ts   # Application configuration
│   ├── index.tsx   # Application entry point
│   └── routes.tsx  # Route definitions
├── .env            # Environment variables
├── package.json    # Dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.