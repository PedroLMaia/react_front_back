const dbFile = require("../db")
const dbService = require("../service/db-service")
const { getConnection } = require('../mongoConnection')
path = require('path')

//Retorna todo os usuários cadastrados
const getAllUSers = (req, res, next) => {
    response = dbFile.users.map(user => {
        delete user.password
        return user
    })
    res.json(response)
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



//Atualiza um usuário cadastro por ID
const updateUserById = (req, res, next) => {
    if(req.params.id && _validateNewUserBody(req.body)){
        for(let user of dbFile.users){
            if(user.id === parseInt(req.params.id)){
                req.body.id = user.id
                userIndex = dbFile.users.indexOf(user)
                dbFile.users[userIndex] = req.body
                dbService.updateDbFileArchive(JSON.stringify(dbFile))
                res.status(204).json({message: "Usuário atualizado com sucesso!"})
                break
            }
        }
        res.status(404).json({message: "Usuário não encontrado."})
    }else{
        res.status(400).json({message: "Id inválido"})

    }

    
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

const _validateNewUserBody = (reqBody) => {
    console.log(reqBody)
    if(!reqBody.nickname || !reqBody.email || !reqBody.password){
        return false
    }
    return true
}

//NOVO CRIAR USUARIO
const newUser = async (req, res, next) => {
    const conn = await getConnection()
    try {
        if(_validateNewUserBody(req.body)){
            const { nickname, email, password } = req.body

            const database = conn.db('clonespotify')
            const users = database.collection('users')
            await users.insertOne({ nickname, email, password })
            res.status(201).json({message: "Usuário criado com sucesso!"})
        }
    } catch (error) {
    } finally {
        conn.close()
    }
    res.end()
};


//NOVO LOGIN DE USUARIO
const login = async (req, res) => {

    const conn = await getConnection()

    try {
        const {email, password} = req.body
        const database = conn.db('clonespotify')
        const users = database.collection('users')
        const query = { email }
        const user = await users.findOne(query)

        if (!user){
            res.status(404).end()
        }

        if (user.password !== password){ //Comparando senhas
            res.status(401).end()
        }
        
        return res.json({ user })
    } catch (error) {

    } finally {
        conn.close()
    }
    res.end()
}

module.exports = {newUser, deleteUserById, getAllUSers, getUserById, updateUserById, login}