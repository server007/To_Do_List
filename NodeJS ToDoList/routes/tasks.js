const { Router } = require("express");
const { Tasks, Notes } = require("./../database/db");
const { Op } = require("sequelize");

const route = Router();

route.get("/", async(req, res) => {
    const tasks = await Tasks.findAll();
    console.log("chl gya");
    res.send(tasks);
});

route.get("/:id", async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: "Task id must be an Integer",
        });
    }
    const task = await Tasks.findByPk(req.params.id);

    if (!task) {
        return res.status(404).send({
            error: "No task found with id = " + req.params.id,
        });
    }
    res.send(task);
});

route.get("/:id/notes", async(req, res) => {
    if (isNaN(Number(req.param.id))) {
        return res.status(400).send({
            error: "Task id must be an Integer",
        });
    }
    const notes = await Notes.findAll({
        where: { taskId: req.params.id },
    });

    if (!notes) {
        return res.status(404).send({
            error: "No note found associated with task id =  " + req.params.id,
        });
    }
    res.send(notes);
});

route.post("/:id/notes", async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: "Task id must be an Integer",
        });
    }
    const task = await Tasks.findByPk(req.params.id);

    if (!task) {
        return res.status(404).send({
            error: "No task found with id = " + req.params.id,
        });
    }
    if (typeof req.body.description !== "string") {
        return res.status(400).send({
            error: "Task description not provided",
        });
    }
    const newNote = await Notes.create({
        taskId: req.body.id,
        description: req.body.description,
    });

    res.status(201).send({ success: "New Note added", data: newNote });
});

route.post("/", async(req, res) => {
    if (typeof req.body.title !== "string") {
        return res.status(400).send({
            error: "Task title not provided",
        });
    }
    if (typeof req.body.description !== "string") {
        return res.status(400).send({
            error: "Task description not provided",
        });
    }
    if (typeof req.body.dueDate !== "string") {
        return res.status(400).send({
            error: "Due date not provided",
        });
    }
    if (typeof req.body.status !== "string") {
        return res.status(400).send({
            error: "Task status not provided",
        });
    }
    if (typeof req.body.priority !== "string") {
        return res.status(400).send({
            error: "Task priority not provided",
        });
    }

    const newTask = await Tasks.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        priority: req.body.priority,
    });

    res.status(201).send({ success: "New Task added", data: newTask });
});

route.patch("/:id", async(req, res) => {
    await Tasks.update({
        title: req.body.title,
        description: req.body.description,
        dueDate: Date.parse(req.body.dueDate),
        status: req.body.status,
        priority: req.body.priority,
    }, { where: { id: req.params.id } });
    res
        .status(201)
        .send({ success: "Task with id = " + req.params.id + " updated." });
});

route.delete("/:id", async(req, res) => {
    await Tasks.destroy({ where: { id: req.params.id } });
    await Notes.destroy({ where: { taskId: req.params.id } });
    res
        .status(204)
        .send({ success: "Task with id = " + req.params.id + " deleted." });
});

route.delete("/:id/notes", async(req, res) => {
    await Notes.destroy({ where: { taskId: req.params.id } });
    res
        .status(204)
        .send({ success: "Notes with task id = " + req.params.id + " deleted." });
});

module.exports = route;