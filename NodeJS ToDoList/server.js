const express = require('express')

const { db } = require("./database/db");
const taskRoute = require("./routes/tasks");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(__dirname + "/public"));

app.use("/tasks", taskRoute);

db.sync()
    .then(() => {
        app.listen(7777);
        console.log("Server Started.\nListening at 7777");
    })
    .catch((err) => {
        console.error(err);
    });