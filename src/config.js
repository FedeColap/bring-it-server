module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    // API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
    DB_URL: process.env.DB_URL || 'postgresql://federica.colapaoli@localhost/capstone',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://federica.colapaoli@localhost/capstone-test',
    JWT_SECRET: process.env.JWT_SECRET || 'bring-it-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}