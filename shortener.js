const express= require('express');
const router=require('./routes/shortener');
const bodyParser = require('body-parser')
const knex=require('./db/instance');

// verify db connection
knex.raw('select 1+1 as result').catch(err => {
    console.log("Problem connecting to Database");
    console.log(err);
    process.exit(1);
});

const app= express();
app.use(bodyParser.json());

app.use('/api/shorturl',router);

app.listen(3000,()=>{
    console.log("Server Running on port 3000");
})