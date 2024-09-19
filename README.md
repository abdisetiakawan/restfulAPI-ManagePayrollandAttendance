
# restAPI-ManagePayrollandAttendance

This project is a RESTful API for managing payroll and attendance using Node.js, Express.js, MySQL, and JWT for authentication. It includes features for managing employees, attendance records, and payroll information.

## Requirements

- Node.js
- MySQL
- VSCode with REST Client extension (for testing API)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using Git Bash or any other terminal:

```bash
git clone https://github.com/abdisetiakawan/restAPI-ManagePayrollandAttendance
```

### 2. Install Dependencies

Navigate into the project directory and run the following command to install the required packages:

```bash
npm install
```

### 3. Database Configuration

Create a MySQL database and configure the connection in the `.env` file. Rename the `.env.example` file to `.env` and update it with your database credentials:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=managepayrollattendance

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 4. Migrate the Database

Ensure your MySQL database is up and running, then run the following command to apply database migrations (if any):

```bash
npm run migrate
```

### 5. Start the Application

Run the following command to start the server:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

### 6. Testing the API

To test the API, follow these steps:

1. Open the `./testing/test.http` file in VSCode.
2. Install the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VSCode if you haven’t already.
3. Click on the `Send Request` button next to each API request in the `test.http` file to test the corresponding endpoints.

### Endpoints

The API includes endpoints for managing employees, attendance, and payroll. You can find the full list of available routes in the `routes` directory.

### 7. Environment Variables

- `DB_HOST`: Hostname for your MySQL database.
- `DB_USER`: Your MySQL username.
- `DB_PASS`: Your MySQL password.
- `DB_NAME`: The database name.
- `ACCESS_TOKEN_SECRET`: Secret for generating JWT access tokens.
- `REFRESH_TOKEN_SECRET`: Secret for generating JWT refresh tokens.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
