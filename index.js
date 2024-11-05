const express = require("express")
const logger = require('morgan');
const cors = require('cors');
const {port} = require("./utils/config");

const articlesRouter = require('./routes/articles');
const db = require("./utils/db");

const app = express()
app.use(express.json())
app.use(logger('dev'));
app.use(cors());
db();

app.use('/', (req,res)=>{
    res.send("Welcome to Cybersecurity News API");
});
app.use('/articles', articlesRouter);

app.listen(port, () => console.log(`Server Connected`))

export default app;