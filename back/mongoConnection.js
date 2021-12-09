const { MongoClient } = require('mongodb')


const uri = "mongodb+srv://reactspotifyclone:unifor2021@cluster0.hkmbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)

const db = 'clonespotify'
let database;

const getConnection = async () => {
    const mongoConnection = await client.connect()
    return mongoConnection
}

const getDb = async () => {
    if(!database){
        console.log("ENTEREEEEEEEEEEEEEi")
        database = await client.db(db)
    }
    return database
}

module.exports = {getDb}