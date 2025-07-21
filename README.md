# VELT
## Backend API
<img width="1085" alt="Screenshot 2025-07-09 at 9 24 27 pm" src="https://github.com/user-attachments/assets/35f54ee0-6620-47a4-99e4-eea88baa00c6" />

### Setting Up and Activating a Virtual Environment

1. **Create the environment**  
    ```bash
    python3 -m venv venv
    ```

2. **Activate it**  
    ```bash
    source venv/bin/activate
    ```

3. **Install the required dependencies**  
    ```bash
    pip install -r requirements.txt
    ```
    
### Setting Up MySQL Locally
1. Install MySQL:
   ```bash
   brew install mysql
   ```
2. Start the MySQL client:
   ```bash
   mysql -u root -p
   ```
3. Initialize and use the database:
   ```bash
   source app/db/migrations/v1_init.sql;
   USE velt_db;
   ```

## API Documentation

### 1. Auth API 
#### `/api/v1/auth/{}`

| Name   | Method | Path             | Uso                                             |
| -- | ------ | ---------------- | ----------------------------------------------- |
|  Register  | POST   | `/auth/register` | Crear usuario → devuelve **access+refresh** JWT |
|  Login  | POST   | `/auth/login`    | Login → devuelve **access+refresh** JWT         |
|   Refresh | POST   | `/auth/refresh`  | Enviar **refresh** (Bearer) → nuevo **access**  |

---
