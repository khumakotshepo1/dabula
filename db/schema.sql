
-- Creating verification_token table
CREATE TABLE IF NOT EXISTS verification_token (
    expires TIMESTAMP NOT NULL,
    token TEXT PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

-- Create sequences with starting values
CREATE SEQUENCE user_id_seq START WITH 100000 INCREMENT BY 1;

-- Creating users table
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY DEFAULT nextval('user_id_seq'),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    identity_number VARCHAR(50) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    password VARCHAR(255) NOT NULL,
    residential_address VARCHAR(255),
    role VARCHAR(8) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Creating accounts table
CREATE TABLE IF NOT EXISTS accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at TIMESTAMP,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    UNIQUE (user_id, provider_account_id),
    UNIQUE (provider, provider_account_id)
);

-- Creating sessions table
CREATE TABLE IF NOT EXISTS sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table to track purchases and points earned
CREATE TABLE IF NOT EXISTS points (
    point_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    paid_amount NUMERIC(10, 2) NOT NULL,
    points_earned INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by INTEGER NOT NULL
);

-- Rewards table to define reward thresholds
CREATE TABLE IF NOT EXISTS quart (
    quart_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    redeemed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Redemptions table to track reward redemptions
CREATE TABLE IF NOT EXISTS redemptions (
    redemption_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    quart_id INTEGER NOT NULL REFERENCES quart(quart_id) ON DELETE CASCADE,
    redemption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
