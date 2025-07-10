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
3. Start the MySQL client:
   ```bash
   mysql -u root -p
   ```
5. Create the database:
   ```bash
   CREATE DATABASE velt_db;
   ```
7. Initialize the database (if applicable):
   ```bash
   source /path/to/your/db/v1_init.sql`
   ```
