const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');


const schema = require('./schema/schema');


const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/test-headinfo')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, ()=>{
  console.log('Server Running on port 3001');
});
