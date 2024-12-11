# QuickTix - Backend

This is the backend for the **QuickTix**, developed using **Spring Boot**. The backend handles user authentication, ticket management, event managment , config managment and logging.

## Features

- **User Authentication**: Sign up and sign in using JWT tokens.
- **Ticket Management**: Manage tickets (create, update).
- **System Logging**: Logs all actions for auditing and debugging purposes.
- **Event managment**: Manage wvwnts (create, update and change status).
- **System Config managment**: Manage system config and system active / inactive status.

## Tech Stack

- **Backend Framework**: Spring Boot (Java)
- **Authentication**: JWT
- **Database**: MySQL
- **Logging**: Custom logging with system event tracking
- **web socket**: real time data tracking
- **Swagger**: API documentation ans testing
- **Build Tool**: Maven

- **Frontend Framework**: React.js
- **State Management**: React Context API
- **Routing**: React Router
- **HTTP Requests**: Axios
- **CSS Framework**: Tailwind CSS
- **Authentication**: JWT tokens
- **Form Management**: React Hook Form
- **WebSockets**: STOMP for real-time updates

## Setup

### Prerequisites

Before running the backend project, ensure you have the following installed:

- **Java 11** or higher
- **Maven**
- **MySQL**
- **React**
- **typescript**
- **Node.js** (v14 or higher)
- **npm**

### Installation

1. Clone the repository:
   For Backend
   ```bash
   git clone https://github.com/sahan-madusha/QuickTix.git
   cd backend
   mvn spring-boot:run
   ```
   For Frontend
   ```bash
   git clone https://github.com/sahan-madusha/QuickTix.git
   cd client
   npm start
   ```

   For CLI
   ```bash
   git clone https://github.com/sahan-madusha/QuickTix.git
   cd cli
   ```



### Explanation of the final README:
- The **Backend** and **Frontend** sections are combined into one file, clearly outlining the tech stack, 
   setup instructions, folder structures, and API details for both.

This README should give clear guidance on setting up both the backend and frontend for **QuickTix**! Let me know if you need any further modifications or additions.