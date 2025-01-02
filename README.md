# Contact Management App

This is an Angular-based application that allows users to manage their contacts. It supports features like adding, editing, deleting, and searching contacts. The contact data is stored in the browser's `localStorage` for persistence.

## Features

- **Add Contacts**: Add new contacts with first name, last name, phone, email, and date of birth.
- **Edit Contacts**: Modify existing contacts while keeping the contact's ID intact.
- **Delete Contacts**: Remove contacts from the list.
- **Search Contacts**: Filter contacts by first name, last name, or phone number.
- **Persistent Storage**: Contact information is stored in `localStorage`, so data persists between app sessions.

## Tech Stack

- Angular
- Angular Material
- localStorage for persistent contact data
- TypeScript

## Installation & Setup

### Prerequisites

- **Node.js** (version 14 or higher)
- **Angular CLI** (version 12 or higher)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/victoria-varenytsia/ContactsList
   ```

2. Navigate to the project directory:

   ```bash
   cd contact-management-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   ng serve
   ```

5. Open `http://localhost:4200` in your browser to access the app.
