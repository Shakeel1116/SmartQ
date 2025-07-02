# 🕒 SmartQ – Real-Time Queue & Appointment Booking System

SmartQ is a full-stack web application designed to modernize and automate the service booking process for businesses like clinics, salons, and service centers. It offers real-time queue tracking, role-based access control, hybrid authentication (Google OAuth + Email/Password), and payment features for customers.

---

## 🚀 Tech Stack

### 🧩 Frontend
- React (Vite)
- Tailwind CSS / CSS Modules
- React Router
- Axios

### ⚙️ Backend
- Spring Boot (REST APIs)
- Spring Security (JWT Authentication + Google OAuth 2.0)
- MySQL (Database)
- JPA & Hibernate

---

## 📁 Project Structure

smartq/
├── backend/ # Spring Boot Application
│ └── src/main/java/com/smartq/...
│ └── application.properties
├── frontend/ # React Vite App
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── App.jsx
│ └── main.jsx
└── README.md

yaml
Copy
Edit

---

## 🛠️ Prerequisites

- Node.js (v16+)
- Java 17 or above
- Maven
- MySQL
- Git

---

## 🔧 Backend Setup (Spring Boot)

1. **Configure MySQL**:
   - Create a database named `smartqdb` in MySQL:
     ```sql
     CREATE DATABASE smartqdb;
     ```

2. **Update `application.properties`**:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/smartqdb
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update

   jwt.secret=your_jwt_secret_key
   jwt.expiration=86400000
Run the backend:

bash
Copy
Edit
cd backend
mvn spring-boot:run
💻 Frontend Setup (React Vite)
Install dependencies:

bash
Copy
Edit
cd frontend
npm install
Set up .env file:
Create .env in the frontend root:

ini
Copy
Edit
VITE_API_URL=http://localhost:8080
Run the React app:

bash
Copy
Edit
npm run dev
🔐 Authentication
✅ Hybrid Authentication:

Google OAuth 2.0

Traditional Signup/Login with JWT

✅ Role-based access:

Admin: Manage dashboard, users, appointments

Vendor/Staff: Handle appointments

Customer: Book services, track queue

📦 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login and get JWT
GET	/api/appointments	Get all appointments
POST	/api/appointments/book	Book new appointment

🧪 Testing
Test endpoints using Postman or frontend UI

Google login requires valid OAuth client credentials

📸 Screenshots
Add your screenshots or UI previews here (e.g., Login Page, Dashboard, Booking UI)
![Screenshot 2025-07-02 171247](https://github.com/user-attachments/assets/358c8ef1-8ea1-4e20-9cfd-b34b44955832)
![Screenshot 2025-07-02 171259](https://github.com/user-attachments/assets/86bc02e4-2898-405e-86fb-51aa2dad631d)
![Screenshot 2025-07-02 171309](https://github.com/user-attachments/assets/99e7f981-05a1-475d-b144-5b94fc407e5d)
![Screenshot 2025-07-02 171329](https://github.com/user-attachments/assets/7681aa4b-48ca-423b-b3f5-5d207b6fd6b1)
![Screenshot 2025-07-02 171358](https://github.com/user-attachments/assets/f1d76c93-cc8e-4c50-ac4b-f1c9621a8f63)

![Screenshot 2025-07-02 171321](https://github.com/user-attachments/assets/0935e8f2-d371-4b8c-b319-0246d6ce1245)

![Screenshot 2025-07-02 171358](https://github.com/user-attachments/assets/5ac75a10-6adc-4e51-8010-fed281621057)



💡 Future Enhancements
Email and SMS Notifications

Admin Analytics Dashboard

PDF Appointment Slip Generation

Payment Gateway Integration

🧑‍💻 Author
Shakeel Shaik
📧 shaikshakeel860@gmail.com
🔗 LinkedIn: shakeel1116

📃 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you also want:
- A separate Google OAuth setup guide.
- A `postman_collection.json` to test APIs.
- `.gitignore` files for both backend and frontend.








Ask ChatGPT
# SmartQ
