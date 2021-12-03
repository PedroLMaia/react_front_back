const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mainRoutes = require('./routes/routes')

app.use((req, res, next) => {
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

