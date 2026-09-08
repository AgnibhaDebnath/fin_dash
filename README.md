# ExpenseFlow

ExpenseFlow is a full-stack personal expense management application that helps users track income and expenses, manage transactions, and understand their spending through interactive dashboards and insights.

## Screenshots

### Dashboard

#### Overview
<img width="1900" height="906" alt="dashboardPreviewCurrent" src="https://github.com/user-attachments/assets/bde0f87c-d0e5-4824-9ac2-3ba6e328be88" />

#### Analytics
<img width="1598" height="592" alt="dashboardAnalysis" src="https://github.com/user-attachments/assets/86577375-bd9e-4c0b-90d5-54f1f20c89ce" />

#### Insights
<img width="1588" height="327" alt="dashboardInsights" src="https://github.com/user-attachments/assets/050a8c43-b225-4f05-8e2d-55c065457ac5" />

### Transactions
<img width="1905" height="907" alt="transactions" src="https://github.com/user-attachments/assets/f8dea48a-3071-4f26-bdaa-bbca0185fc47" />

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure authentication state management
- Logout functionality

### Transaction Management
- Add income and expense transactions
- Edit transactions
- Delete transactions
- Transaction validation
- Search transactions
- Filter transactions by:
  - Type
  - Category
  - Date
- Pagination for transaction records

### Dashboard & Analytics
- Total income
- Total expenses
- Current balance
- Income vs. expense visualization
- Expense trend analysis
- Expense distribution by category
- Highest spending month
- Top spending category
- Responsive dashboard

### User Experience
- Responsive design
- Form validation
- User-friendly error handling
- Toast notifications
- Responsive pagination controls
- Improved filtering and dashboard experience

### Testing & Code Quality
- Unit testing with Vitest
- Environment variable configuration
- Git-based version control
- GitHub Actions CI workflow

---

## Tech Stack

### Frontend
- React
- React Router
- Zod
- React Toastify
- Charting library
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Zod

### Testing
- Vitest

### DevOps
- Git
- GitHub
- GitHub Actions

---

## Application Architecture

ExpenseFlow follows a layered architecture to keep the backend maintainable and separate different responsibilities.

```text
Client
  ↓
React Frontend
  ↓
REST API
  ↓
Express Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
MongoDB
```

## Project Structure

```text
ExpenseFlow/
├── .github/                  # GitHub Actions workflows
│
├── backend/
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── middlewares/      # Authentication and request middleware
│   │   └── modules/
│   │       ├── auth/         # Authentication module
│   │       └── transaction/  # Transaction module
│   │
│   ├── app.js                # Express application configuration
│   └── server.js             # Server entry point
│
├── src/
│   ├── Components/           # Reusable UI components
│   ├── Pages/                # Application pages
│   ├── services/             # API/service layer
│   ├── context/              # React context
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── constants/            # Application constants
│   ├── layouts/              # Layout components
│   ├── lib/                  # Library/configuration utilities
│   ├── assets/               # Static assets
│   ├── animations/           # Animation definitions
│   ├── mock/                 # Mock data
│   ├── App.jsx               # Root React component
│   └── main.jsx              # Application entry point
│
├── tests/                    # Automated tests
├── .env.example              # Environment variable template
├── .gitignore
└── README.md
```
## Getting Started

Follow the steps below to run ExpenseFlow locally.

### Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB

You can verify the installations with:

```bash
node --version
npm --version
```
### Clone the Repository
Clone the ExpenseFlow repository and navigate to the project directory:
``` bash
git clone https://github.com/AgnibhaDebnath/ExpenseFlow.git
cd ExpenseFlow
```
### Install Dependencies
Install the frontend dependencies from the project root:
```bash
npm install
```
Then install the backend dependencies:
```bash
cd backend
npm install
```
After installation, return to the project root:
```bash
cd..
```
## Environment Variables

ExpenseFlow uses environment variables for both the frontend and backend.

#### Frontend

Create the frontend environment file using `.env.example` as a reference.

#### Backend

Create a `.env` file inside the `backend` directory using `backend/.env.example` as a reference.

Update the environment variables with your local configuration.

> Never commit environment files containing sensitive credentials or secrets.

## Running the Application
### Start the Backend

From the backend directory, run:
```bash
cd backend
npm run dev
```

### Start the Frontend

Open another terminal, navigate to the project root, and run:
```bash
npm run dev
```
The frontend development server will provide a local URL in the terminal.

## Access the Application

Open the local URL provided by the frontend development server in your browser.

You can now register a new account or log in to start using ExpenseFlow.

## Testing

ExpenseFlow uses Vitest for automated testing.

### Run Tests

To run the test suite in watch mode:

```bash
npm run test
```
To run the tests once:
```
npm run test:run
```
The test suite covers important application and business logic to help ensure that changes do not introduce regressions.

## CI

ExpenseFlow uses GitHub Actions to automate code quality checks.

The CI workflow runs automatically on pushes and pull requests and performs:

- Dependency installation
- Prettier formatting check
- ESLint checks
- Automated tests with Vitest

This helps maintain consistent code formatting, catch linting issues, and ensure that existing functionality continues to work.

## Security

ExpenseFlow implements several security practices:

- JWT-based authentication
- Protected API routes
- Authentication middleware
- Server-side input validation
- Password hashing using bcrypt
- User-specific access to transactions
- Environment variables for sensitive configuration
- CORS configuration

User passwords are securely hashed using bcrypt before being stored in the database. Plain-text passwords are never stored.

## Version

**Current Version:** `v1.0.0`

### v1.0.0 — Initial Stable Release

- User registration and login
- JWT-based authentication
- Transaction management
- Search, filtering, and pagination
- Dashboard analytics
- Financial insights
- Form validation
- Responsive UI
- Automated testing with Vitest
- GitHub Actions CI

## Future Improvements

- Recurring transactions
- Budget management
- Budget alerts
- Transaction export
- Email notifications
- Advanced financial insights
- Dark mode

## License

This project is developed for educational and portfolio purposes.
