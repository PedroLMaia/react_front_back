const { MongoClient } = require('mongodb')


const uri = "mongodb+srv://reactspotifyclone:unifor2021@cluster0.hkmbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)

module.exports.getConnection = async () => {
    const mongoConnection = await client.connect()
    return mongoConnection
}