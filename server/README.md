# QuickTix - Backend

This is the backend for the **QuickTix**, developed using **Spring Boot**. The backend handles user authentication, ticket management,  and logging.

## Features

- **User Authentication**: Sign up and sign in using JWT tokens.
- **Ticket Management**: Manage tickets (create, update).
- **System Logging**: Logs all actions for auditing and debugging purposes.
- **Event managment**: Manage wvwnts (create, update and change status).
- **System Config managment**: Manage system config and system active / inactive status.

## Tech Stack

- **Backend Framework**: Spring Boot (Java)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL
- **Logging**: Custom logging with system event tracking
- **web socket**: real time data tracking
- **Swagger**: API documentation ans testing
- **Build Tool**: Maven

## Setup

### Prerequisites

Before running the backend project, ensure you have the following installed:

- **Java 11** or higher
- **Maven**
- **MySQL**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sahan-madusha/QuickTix.git
   cd backend
