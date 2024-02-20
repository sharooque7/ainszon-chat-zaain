module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    // Additional options
    pool: {
      max: 5, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000, // Maximum time, in milliseconds, that the pool will try to get connection before throwing error
    },
  },
  // Add configuration for other environments if needed (e.g., production, testing)
};
