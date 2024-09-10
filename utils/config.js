const env = require("dotenv");
env.config();

module.exports = {
    port: process.env.PORT,
    newsapi_key: process.env.NEWSAPI_KEY,
    db_string: process.env.DATABASE_CONNECTION_STRING,
    newscatcher_api_key: process.env.NEWSCATCHER_API_KEY
}