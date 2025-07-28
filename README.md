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

### 2. Devices API  
#### `/api/v1/devices/{}`

| Name          | Method | Path            | Uso                                                              |
|---------------|--------|-----------------|------------------------------------------------------------------|
|  **Create**   | POST   | `/devices`      | Emparejar un sensor nuevo → devuelve JSON del dispositivo creado |
|  **List**     | GET    | `/devices`      | Listar **todos** mis dispositivos                                |
|  **Get one**  | GET    | `/devices/{id}` | Obtener datos detallados de un dispositivo específico            |
|  **Update**   | PATCH  | `/devices/{id}` | Cambiar alias o estado (`online` \| `offline`)                   |
|  **Delete**   | DELETE | `/devices/{id}` | Des-vincular (eliminar) el sensor de la cuenta                   |

---

### 3. Sessions API  
#### `/api/v1/sessions/{}`

| Name        | Method | Path              | Uso                                                                 |
|-------------|--------|-------------------|---------------------------------------------------------------------|
| **Start**   | POST   | `/sessions`       | Comenzar una nueva sesión → devuelve JSON de la sesión iniciada     |
| **List**    | GET    | `/sessions`       | Listar **todas** mis sesiones                                       |
| **Get one** | GET    | `/sessions/{id}`  | Obtener los datos de una sesión específica                          |
| **Stop**    | PATCH  | `/sessions/{id}`  | Finalizar sesión → setea `end_time`                                 |
| **Delete**  | DELETE | `/sessions/{id}`  | Eliminar el registro de la sesión                                   |

---

### 4. Telemetry API  
#### `/api/v1/telemetry`

| Name      | Method | Path         | Uso                                                               |
|-----------|--------|--------------|-------------------------------------------------------------------|
| **Ingest**| POST   | `/telemetry` | Enviar lote de muestras (acelerómetro, giroscopio, etc.)   |
