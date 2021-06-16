module.exports = {

    //1 MongoDb
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/Agendamento',

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'mjcodegroup@gmail.com//2019',

    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 3001
}