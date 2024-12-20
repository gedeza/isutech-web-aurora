# iSu Technologies Web Application

## Overview
This is a modern web application built with React, TypeScript, and Tailwind CSS, featuring a sleek design with deep blues, rich purples, and electric accents.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js) or yarn
- Git - [Download](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/gedeza/isutech-web-aurora
cd isu-web-aurora
```

### 2. Install Dependencies
```bash
npm install
# or if using yarn
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or if using yarn
yarn dev
```
The application will be available at `http://localhost:8080`

## Project Structure
```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and constants
├── pages/         # Page components
└── styles/        # CSS and style-related files
```

## Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Type Checking**: TypeScript
- **State Management**: React Query
- **Icons**: Lucide React
- **Charts**: Recharts

## Design System
The application uses a consistent design system with:
- **Colors**: 
  - Deep blues (#0F172A)
  - Rich purples (#6366F1)
  - Electric accents (#60A5FA)
- **Typography**: Inter font family
- **UI Elements**: 
  - Floating cards
  - Glass-morphism effects
  - Glowing borders
  - Smooth animations

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Implement responsive designs
- Use Tailwind CSS for styling
- Utilize shadcn/ui components when possible

### Component Creation
- Create new components in `src/components`
- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling

### State Management
- Use React Query for server state
- Implement proper loading and error states
- Follow the object syntax for query configuration

### Performance
- Implement code splitting where necessary
- Optimize images and assets
- Use proper React memo and callback hooks
- Monitor bundle size

## Deployment
The application can be deployed using:
1. Lovable's built-in deployment feature
2. Manual deployment to platforms like Netlify or Vercel

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Follow the code review process

## Support
For any questions or issues:
1. Check the documentation
2. Create an issue in the repository
3. Contact the development team

## License
This project is licensed under the MIT License - see the LICENSE file for details
