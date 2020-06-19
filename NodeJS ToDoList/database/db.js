const Sequelize = require("sequelize");

const db = new Sequelize({
    dialect: "sqlite",
    storage: __dirname + "/test.db",
});

const Tasks = db.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(255),
    },
    dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    priority: {
        type: Sequelize.STRING(6),
        allowNull: false,
    },
});

const Notes = db.define("notes", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
});

Tasks.hasMany(Notes, {
    foreignKey: "taskId",
});
Notes.belongsTo(Tasks);

// db.sync()
//   .then(() => {
//     console.log("db works");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = { db, Tasks, Notes };