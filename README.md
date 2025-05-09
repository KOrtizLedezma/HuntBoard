# HuntBoard

HuntBoard is a job application tracking dashboard built with:

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Django + Django REST Framework + SimpleJWT
- **Features:** Auth, application management

## Features

### Frontend
- User registration & login
- Application form and status dashboard
- Charts: Applications over time, position breakdown, status overview

### Backend
- JWT-based user authentication (`/api/token/`)
- Auth-protected application endpoints

## API Endpoints

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/api/token/`              | Get access/refresh tokens       |
| POST   | `/api/register/`           | Register a new user             |
| GET    | `/api/protected/`          | Example protected route         |
| GET    | `/api/applications/`       | List user's applications        |
| POST   | `/api/applications/`       | Add a new application           |

## Dependencies

### Backend

- Django 5.2
- djangorestframework
- djangorestframework-simplejwt
- corsheaders

### Frontend

- Next.js 14+
- React 19+
- Chart.js + react-chartjs-2