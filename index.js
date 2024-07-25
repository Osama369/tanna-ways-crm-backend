import { app } from "./app.js";
import ConnectDB from "./server.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

ConnectDB()
.then(
    app.listen(process.env.PORT, ()=>{
        console.log(`server connected on ${process.env.PORT}`);
    })
)
.catch((error)=>{
    console.log("Error " +error)
})
