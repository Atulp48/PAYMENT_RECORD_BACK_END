import express from "express"
import conn_db from "./db/conn.js";
import router from "./routers/router.js"
import rotertsk from "./routers/routerTask.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


const port = process.env.PORT;
const Password = process.env.PASS;
const Usr = process.env.USR;
conn_db(Usr, Password);


app.use("/api/v1/users", router);
app.use("/api/v1/task", rotertsk);



app.get("/", async (req, res) => {
    res.send("hello from server side");
})

app.listen(port, () => {
    console.log(`connection is run at port ${port}`);
})
