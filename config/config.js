module.exports = {
  "development": {
    "username": "nodejs",
    "password": null,
    "database": "ttp-stocks-node_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "nodejs",
    "password": null,
    "database": "ttp-stocks-node_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
    "username": "nodejs",
    "password": null,
    "database": "ttp-stocks-node_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
