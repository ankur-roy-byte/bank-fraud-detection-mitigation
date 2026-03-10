# 🛡️ Bank Fraud Detection & Mitigation System

[![Angular](https://img.shields.io/badge/Angular-15.2.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-Active-success.svg)]()

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Fraud Detection Algorithm](#fraud-detection-algorithm)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The **Bank Fraud Detection & Mitigation System** is a comprehensive Angular-based web application designed to provide secure banking operations with real-time fraud detection capabilities. This system combines traditional banking features with advanced fraud monitoring to protect users and financial institutions from fraudulent activities.

### Key Highlights
- ✅ Real-time transaction monitoring
- ✅ Risk-based fraud detection algorithm
- ✅ Secure user authentication with JWT tokens
- ✅ Interactive fraud analytics dashboard
- ✅ Transaction history tracking
- ✅ User account management
- ✅ Professional, responsive UI

## 🚀 Features

### Core Banking Features
- **User Authentication**: Secure login/logout with JWT token-based authentication
- **Account Registration**: New user registration with validation
- **Deposit Operations**: Add funds to accounts with transaction verification
- **Withdrawal Operations**: Secure money withdrawal with password authentication
- **Transaction History**: Complete view of all account transactions
- **Account Management**: Ability to delete/close accounts with confirmation

### 🛡️ Fraud Detection Features (NEW!)
- **Real-time Risk Assessment**: Automatic calculation of risk scores for each transaction
- **Fraud Alerts Dashboard**: Centralized monitoring of all fraud alerts with severity levels (Low, Medium, High, Critical)
- **Suspicious Transaction Tracking**: Detailed view of flagged transactions with risk scores
- **Alert Management**: Ability to review and resolve fraud alerts
- **Statistical Analytics**: Comprehensive fraud statistics including:
  - Total number of alerts by severity
  - Total suspicious transaction amount
  - Average risk score across transactions
- **Multi-tab Interface**: Organized views for Overview, Alerts, and Suspicious Transactions

### Fraud Detection Algorithm
The system uses a sophisticated risk scoring algorithm that evaluates:
- **Transaction Amount**: Higher amounts increase risk score
- **Transaction Type**: Withdrawals are considered higher risk than deposits
- **Time-based Patterns**: Late-night transactions (12 AM - 5 AM) receive higher risk scores
- **Behavioral Analysis**: Pattern deviation detection
- **Location Analysis**: Unusual location flagging

**Risk Score Calculation:**
- 0-50: Low Risk (Normal Transaction)
- 51-70: Medium Risk (Monitor)
- 71-85: High Risk (Suspicious)
- 86-100: Critical Risk (Requires Immediate Action)

## 💻 Technology Stack

### Frontend
- **Angular**: 15.2.0 - Modern web application framework
- **TypeScript**: 4.9.4 - Strongly typed programming language
- **RxJS**: 7.8.0 - Reactive programming library
- **Angular Material**: 15.2.2 - UI component library
- **Bootstrap**: 5.3.0 - Responsive CSS framework
- **Font Awesome**: Icon library

### Backend Requirements
The application requires a Node.js backend server running on `localhost:3000` with the following endpoints:
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /deposit` - Deposit money
- `POST /withdrew` - Withdraw money
- `POST /getTransaction` - Fetch transaction history
- `DELETE /deleteacc/:id` - Delete account

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Angular)                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    Login/    │  │   Dashboard  │  │    Fraud     │ │
│  │  Register    │  │  Component   │  │  Detection   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ Transaction  │  │    Delete    │                   │
│  │  Component   │  │  Component   │                   │
│  └──────────────┘  └──────────────┘                   │
├─────────────────────────────────────────────────────────┤
│              Services Layer                              │
│  ┌──────────────────┐  ┌──────────────────────────┐   │
│  │   DataService    │  │  FraudDetectionService   │   │
│  │  (HTTP Calls)    │  │  (Risk Calculation)      │   │
│  └──────────────────┘  └──────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│              Backend API (Node.js)                       │
│         Database (MongoDB/PostgreSQL)                    │
└─────────────────────────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI (v15.2.0)

### Step 1: Clone the Repository
```bash
git clone https://github.com/ankur-roy-byte/bank-fraud-detection-mitigation.git
cd bank-fraud-detection-mitigation
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Angular CLI (if not already installed)
```bash
npm install -g @angular/cli@15.2.0
```

### Step 4: Verify Installation
```bash
ng version
```

## 🎯 Usage

### Development Server
Run the development server:
```bash
ng serve
```
or
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

### Build for Production
```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running Tests
```bash
ng test
```

## 📱 Application Flow

1. **Login/Register**: Users start at the login page or can navigate to registration
2. **Dashboard**: After authentication, users access the main dashboard with:
   - Account balance card
   - Deposit form
   - Withdrawal form
   - Quick links to Transaction History and Fraud Detection
3. **Fraud Detection Dashboard**:
   - Real-time fraud monitoring
   - Alert management
   - Transaction risk analysis
4. **Transaction History**: View all past transactions
5. **Logout**: Secure session termination

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Form Validation**: Client-side validation using Angular Reactive Forms
- **Pattern Matching**: Account numbers (numeric only) and passwords (alphanumeric)
- **Route Guards**: Protected routes requiring authentication
- **Secure Storage**: LocalStorage for token management
- **HTTP Interceptors**: Automatic token injection in API calls

## 📊 Fraud Detection Dashboard

The Fraud Detection Dashboard provides three main views:

### 1. Overview Tab
- Critical, High, and Medium alert counters
- Total alerts summary
- Total suspicious transaction amount
- Average risk score
- Recent critical alerts preview

### 2. Alerts Tab
- Complete list of all fraud alerts
- Alert details including ID, account number, reason, and timestamp
- Severity-based color coding
- Alert resolution functionality

### 3. Suspicious Transactions Tab
- Comprehensive table of flagged transactions
- Risk score visualization
- Transaction type, amount, and location details
- Status indicators

## 📂 Project Structure

```
bank-fraud-detection-mitigation/
├── src/
│   ├── app/
│   │   ├── fraud-detection/          # NEW: Fraud detection feature
│   │   │   ├── fraud-detection.component.ts
│   │   │   ├── fraud-detection.component.html
│   │   │   └── fraud-detection.component.css
│   │   ├── Services/
│   │   │   ├── data.service.ts       # Banking operations service
│   │   │   └── fraud-detection.service.ts  # NEW: Fraud detection service
│   │   ├── dashboard/                # Main dashboard component
│   │   ├── login/                    # Login component
│   │   ├── register/                 # Registration component
│   │   ├── transaction/              # Transaction history component
│   │   ├── delete/                   # Account deletion component
│   │   ├── homecard/                 # Home card component
│   │   ├── registercard/             # Register card component
│   │   ├── app-routing.module.ts     # Application routes
│   │   └── app.module.ts             # Root module
│   ├── assets/                       # Images and static files
│   ├── index.html                    # Main HTML file
│   └── styles.css                    # Global styles
├── angular.json                      # Angular configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Code Scaffolding
Generate a new component:
```bash
ng generate component component-name
```

Generate a new service:
```bash
ng generate service service-name
```

### Further Help
To get more help on the Angular CLI:
```bash
ng help
```
or visit [Angular CLI Documentation](https://angular.io/cli)

## 🐛 Known Issues

- Backend server must be running on `localhost:3000` for full functionality
- Some security vulnerabilities in npm packages (run `npm audit fix` to address)

## 🔮 Future Enhancements

- [ ] Machine learning integration for advanced fraud detection
- [ ] Email notifications for fraud alerts
- [ ] Multi-factor authentication (MFA)
- [ ] Real-time WebSocket notifications
- [ ] Enhanced reporting and analytics
- [ ] Mobile application
- [ ] Biometric authentication
- [ ] Transaction pattern analysis
- [ ] Geolocation-based fraud detection
- [ ] Integration with external fraud databases

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- **Sachin M** - Initial work and core banking features
- **Ankur Roy** - Fraud detection system implementation

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Bootstrap team for the responsive CSS framework
- Font Awesome for the icon library
- All contributors and testers

## 📞 Support

For support, email sachinm06@aol.com or open an issue in the repository.

---

**⚠️ Disclaimer**: This is a demonstration project for educational purposes. Do not use in production without proper security audits and enhancements.

Made with ❤️ using Angular and TypeScript
