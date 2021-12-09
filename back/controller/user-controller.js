const dbFile = require("../db")
const dbService = require("../service/db-service")
const { getDb } = require('../mongoConnection')
var ObjectId = require('mongodb').ObjectId;
path = require('path')

//Retorna todo os usuários cadastrados
const getAllUSers = (req, res, next) => {
    response = dbFile.users.map(user => {
        delete user.password
        return user
    })
    res.json(response)
}

//NOVO Retorna todo os usuários cadastrados  -to do
const getAllUSers2 = async (req, res, next) => {
    const users =  db.collection('users')
    let allUsers = await users.find({}).toArray()
    res.status(200).send(allUsers)
}

//Retorna um usuário cadastrado por ID
const getUserById = (req, res, next) => {
    dbContent = dbFile
    if(req.params.id){
        for(let user of dbContent.users){
            if(user.id === parseInt(req.params.id)){
                res.json(user)
            }
        }

        res.status(404).json({message: "Usuário não encontrado"})
    }
    res.status(400).json({message: "Informe um id válido."})
}

//NOVO - Retorna um usuário cadastrado por ID - to do
const getUserById2 = (req, res, next) => {
    
}


//Atualiza um usuário cadastro por ID
const updateUserById = async (req, res, next) => {
    if(req.params.id && _validateNewUserBody(req.body)){
        const db = req.app.locals.db
        const users =  db.collection('users')
        let newvalues = { $set: {nickname: req.body.nickname, email: req.body.email, password: req.body.password } };
        const user = await users.updateOne({_id: new ObjectId(req.params.id)}, newvalues)
        if(user){
            res.status(204).json(user)
            return
        }
        res.status(404).json({message: "Usuário não encontrado."})
    }else{
        res.status(400).json({message: "Id inválido"})

    }

    
}

//NOVO - Atualiza um usuário cadastro por ID - to do 
const updateUserById2 = (req, res, next) => {
     
}


//Deleta um usuário cadastrado por ID
const deleteUserById = (req, res, next) => {
    if(req.params.id){
        for(let user of dbFile.users){
            if(user.id === parseInt(req.params.id)){
                deleteIndex = dbFile.users.indexOf(user)
                dbFile.users.splice((deleteIndex),1)
                dbService.updateDbFileArchive(JSON.stringify(dbFile))
                res.status(204).json({message: "Usuário atualizado com sucesso!"})
                break
            }
        }
    }
}

//NOVO - Deleta um usuário cadastrado por ID - to do 
const deleteUserById2 = (req, res, next) => {
    
}

const _validateNewUserBody = (reqBody) => {
    if(!reqBody.nickname || !reqBody.email || !reqBody.password){
        return false
    }
    return true
}

//NOVO CRIAR USUARIO
const newUser = async (req, res, next) => {
    const db = req.app.locals.db
    const users =  db.collection('users')
    try {
        if(_validateNewUserBody(req.body)){
            const { nickname, email, password } = req.body
            let user = await users.insertOne({ nickname, email, password })

            res.status(201).send({nickname: nickname, id: user['insertedId'].valueOf()})
        }
    } catch (error) {
        console.log(error)
    }
    res.end()
};


//NOVO LOGIN DE USUARIO
const login = async (req, res) => {
    console.log("DDDDDDDDD")
    // console.log(req.app.locals.db.collection('users'))
    try {
        const {email, password} = req.body
        const db = req.app.locals.db
        console.log("XXXXXXXXXXXXX")
        
        const users =  db.collection('users')
        // let resultado = await users.find({}).toArray();
        // console.log(resultado)
        // console.log("YYYYYYYYYYYYYYY")
        const query = { email }
        console.log(query)
        let user = await users.findOne(query)
        console.log(user)
        let userId = user['_id']
        console.log(typeof userId)
        // console.log({id: user['_id'].valueOf(),user: user })

        if (!user){
            res.status(404).end()
        }

        if (user.password !== password){ //Comparando senhas
            res.status(401).end()
        }
        
        return res.json({id: user['_id'].valueOf(),user: user })
    } catch (error) {
        console.log(error)
    }
    res.end()
}

module.exports = {newUser, deleteUserById, getAllUSers, getUserById, updateUserById, login}