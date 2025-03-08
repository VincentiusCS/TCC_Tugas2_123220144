import express from "express";
import cors from "cors";
import MsgRoute from "./routes/MsgRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static("uploads")); 
app.use(MsgRoute);

app.listen(5000, () => console.log("Server connected"));
