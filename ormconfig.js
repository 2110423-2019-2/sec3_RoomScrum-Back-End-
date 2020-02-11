require('dotenv').config;
const caching_sha2_password = require('mysql2/lib/auth_plugins/caching_sha2_password');
// const native_password = require('mysql2/lib/auth_plugins/mysql_native_password');

const ormConfig = {
    "type": "mysql",
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "entities": ['src/**/*.entity.ts'],
    "extra": {
        "insecureAuth": true,
        authPlugins: { 
            sha256_password: caching_sha2_password({})
        }
    },
    "cli": {
        "migrationsDir": "migration",
    }, 
};

module.exports = ormConfig;