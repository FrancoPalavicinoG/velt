/* ================================================
   V1__init.sql  –  Initial schema for VELT API
   Creates the DB, then builds tables.
   ================================================ */

CREATE DATABASE velt_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE velt_db;

/* ---------- USERS -------------------------------- */
CREATE TABLE users (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email          VARCHAR(120)  NOT NULL UNIQUE,
    password_hash  VARCHAR(256)  NOT NULL,
    username       VARCHAR(80),
    locale         VARCHAR(8)    DEFAULT 'en',
    units          VARCHAR(8)    DEFAULT 'metric',
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    last_login_at  TIMESTAMP     NULL
);

/* ---------- DEVICES ------------------------------ */
CREATE TABLE devices (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    hardware_id     CHAR(16)     NOT NULL UNIQUE,
    alias           VARCHAR(50),
    version         VARCHAR(20),
    status          ENUM('onboarding','active','offline') DEFAULT 'onboarding',
    battery_level   TINYINT UNSIGNED,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

/* ---------- SESSIONS ----------------------------- */
CREATE TABLE sessions (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED NOT NULL,
    start_time  TIMESTAMP(6) NOT NULL,
    end_time    TIMESTAMP(6),
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

/* ---------- TELEMETRIES -------------------------- */
CREATE TABLE telemetries (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id   INT UNSIGNED NOT NULL,
    session_id  INT UNSIGNED,
    ts          TIMESTAMP(6) NOT NULL,
    ax          FLOAT,
    ay          FLOAT,
    az          FLOAT,
    gx          FLOAT,
    gy          FLOAT,
    gz          FLOAT,
    FOREIGN KEY (device_id)  REFERENCES devices(id)
        ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
        ON DELETE SET NULL,
    INDEX idx_tel_device_ts  (device_id, ts),
    INDEX idx_tel_session_ts (session_id, ts)
);

/* ---------- CRASHES ------------------------------ */
CREATE TABLE crashes (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id   INT UNSIGNED NOT NULL,
    session_id  INT UNSIGNED,
    ts          TIMESTAMP(6) NOT NULL,
    severity    ENUM('low','medium','high') DEFAULT 'low',
    latitude    FLOAT,
    longitude   FLOAT,
    confirmed   ENUM('auto','user','false_positive') DEFAULT 'auto',
    FOREIGN KEY (device_id)  REFERENCES devices(id)
        ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
        ON DELETE SET NULL,
    INDEX idx_crash_device_ts  (device_id, ts),
    INDEX idx_crash_session_ts (session_id, ts)
);