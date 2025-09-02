console.log(process.env.DB_HOST);

module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00',
}