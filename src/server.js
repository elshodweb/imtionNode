const express = require("express");
const todosRouter = require("./routes/todos");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.query());

const port = process.env.PORT;

app.use(todosRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
