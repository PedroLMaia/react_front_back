const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mainRoutes = require('./routes/routes')
const { MongoClient } = require('mongodb')


const uri = "mongodb+srv://reactspotifyclone:unifor2021@cluster0.hkmbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(uri, { promiseLibrary: Promise }, (err, client) => {
    if (err) {
      logger.warn(`Failed to connect to the database. ${err.stack}`);
    }
    // console.log(db )
    app.locals.db = client.db('clonespotify');

    app.use((req, res, next) => {
        console.log("TESTE")
        //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
        res.header("Access-Control-Allow-Origin", "*");
        //Quais são os métodos que a conexão pode realizar na API
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept')
        app.use(cors());
        next();
    });
    
    app.use(express.json(), mainRoutes);
    
    app.listen(port, () => {
        console.log(`Express listening on port ${port}`);
    });
  });



