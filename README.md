# Snowflakes

This is a project to allow users to create snowflake designs and share them with others.

## Setting up the project

A database needs to be prepared, and all required dependencies need to be installed, before the project can be successfully run locally.

### Inside pgAdmin

First, create a user with the following credentials and permissions:

- Username `snowflakes`
- Password `snowflakes`
- Able to login

Then, create a database called `snowflakes`, owned by the user created previously (also called `snowflakes`).

### Inside the root directory

```bash
dotnet tool restore
npm install
```

### Inside the `backend/` directory

```bash
dotnet restore
dotnet ef database update
```

### Inside the `frontend/` directory

```bash
npm install
```

## Running the project

To run the project locally, the backend and frontend should be started separately.

### Inside the `backend/` directory

```bash
dotnet watch run
```

### Inside the `frontend/` directory

```bash
npm run dev
```
