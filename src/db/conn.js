import mongoose from "mongoose";

const conn_db = (user, password) => {
    mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.zpl0tui.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
        console.log("the database is connected successfully")
    }).catch((e) => {
        console.log(e);
    })
}
export default conn_db;