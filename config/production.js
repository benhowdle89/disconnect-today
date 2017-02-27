module.exports = {
    "production": {
        "url": process.env.DATABASE_URL,
        "dialect": "postgres",
        "use_env_variable": "DATABASE_URL",
        "ssl": true,
        "dialectOptions":{
          "ssl":true
       }
    },
}
