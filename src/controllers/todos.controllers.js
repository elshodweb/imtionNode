let Joi = require("joi");
const pg = require("pg");

const {
  getForId,
  get,
  update,
  create,
  deleteForId,
  getWhithLimit,
  getWhithDate,
} = require("../libs/queries");
const { Pool } = pg;




let pool = new Pool({
  database: "todos",
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1290",
});









let getTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let client = await pool.connect();

    if (id) {
      let {
        rows: [rows],
      } = await client.query(getForId, [id]);

      if (!rows) {
        throw new Error("malumot kelmadi");
      }

      res.status(200).json({ message: "succers", task: rows });
    } else {
      let { page, limit } = req.query;
      let { from, to } = req.query;
      if (page != undefined && limit != undefined) {
        let { rows } = await client.query(getWhithLimit, [page, limit]);
        if (!rows) {
          throw new Error("malumot kelmadi");
        }
        res.status(200).json({ message: "succers", tasks: rows });
      } else if (from != undefined && to != undefined) {
        let { rows } = await client.query(getWhithDate, [from, to]);
        if (!rows) {
          throw new Error("malumot kelmadi");
        }
        res.status(200).json({ message: "succers", tasks: rows });
      } else {
        let { rows } = await client.query(get);

        if (!rows) {
          throw new Error("malumot kelmadi");
        }

        res.status(200).json({ message: "succers", tasks: rows });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};






let scheme = Joi.object({
  title: Joi.string().max(100).required(),
  descr: Joi.string().max(1000).required(),
});

let postTodo = async (req, res) => {
  try {
    let { title, descr } = req.body;
    let { error } = scheme.validate({ title, descr });

    if (error) {
      throw new Error(error.message);
    }
    let client = await pool.connect();

    let {
      rows: [rows],
    } = await client.query(create, [title, descr]);

    if (!rows) {
      throw new Error("qoshilmadi");
    }

    res.status(201).json({ message: "created", task: rows });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};








let schemeForPut = Joi.object({
  title: Joi.string().max(100),
  descr: Joi.string().max(1000),
});




let putTodos = async (req, res) => {
  try {
    let { title, descr } = req.body;
    let { id } = req.params;
    let { error } = schemeForPut.validate({ title, descr });

    if (error) {
      throw new Error(error.message);
    }

    let client = await pool.connect();

    let {
      rows: [task],
    } = await client.query(getForId, [id]);
    if (!task) {
      throw new Error("bunday idda task yoq!!!");
    }

    let {
      rows: [rows],
    } = await client.query(update, [
      title ? title : task.title,
      descr ? descr : task.descr,
      id,
    ]);

    if (!rows) {
      throw new Error("qoshilmadi");
    }

    res.status(201).json({ message: "created", task: rows });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




const deleteTodo = async (req, res) => {
  try {
    let { id } = req.params;

    let client = await pool.connect();
    let {
      rows: [task],
    } = await client.query(deleteForId, [id]);

    if (!task) {
      throw new Error("bunday idda task yoq!!!");
    }

    res.status(201).json({ message: "deleted", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getTodo,
  postTodo,
  deleteTodo,
  putTodos,
};
