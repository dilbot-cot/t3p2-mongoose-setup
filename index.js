const mongoose = require('mongoose');

async function dbConnect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/CoderIsAwesome')
        console.log("Database connected!")
    } catch(error) {
        console.log(`dbConnect failed. Error:\n${JSON.stringify(error)}`)
    }
}

async function dbClose(){
    await mongoose.connection.close();
    console.log("Database disconnected")
}

async function dbWipe(){
    console.log('Emptying out the database');
    await mongoose.connection.db.dropDatabase
    console.log('Database is now empty');
}

const Developer = mongoose.model('Developer', {
    name: String,
    skills: [String]
})


async function someAppFunction(){
    await dbConnect();

    let newDev = new Developer({
        name: "Dillon",
        skills: ["HTML", "CSS", "Python", "JavaScript"]
    })

    await newDev.save().then(() => {
        console.log("Save successful!");
    }).catch(error => {
        console.log("An error occured: " + error)
    })

    // warn and close database
    console.log("Closing the DB now so the app doesn't stay open for ages")
    await dbClose();
}
someAppFunction();