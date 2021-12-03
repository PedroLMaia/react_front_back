const fs = require("fs")

const updateDbFileArchive = (content) => {
    console.log(content)
    fs.writeFile((path.join(__dirname, '../') + 'db.json'), content, (err) => {
        console.log(err)
        console.log()
        if(err){
            throw err
        }
    })
}

module.exports = {updateDbFileArchive}