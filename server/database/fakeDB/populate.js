const mongoose = require("mongoose");
const config = require("../../config/dev")
const fakeDb = require("./fakeDB")

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}, async () => {
    console.log('Populating DB........');
    await fakeDb.populate()
    await mongoose.connection.close();
    console.log('Close connection to DB');
})