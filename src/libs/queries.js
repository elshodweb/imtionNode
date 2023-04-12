module.exports = {
  getForId: "select * from tasks where id = $1",
  get: "select * from tasks",
  getWhithLimit: "select * from tasks offset $1 limit $2",
  getWhithDate: "select * from tasks where created_at between $1 and $2;",
  deleteForId: "delete from tasks where id = $1 returning *",
  update: `update tasks set title = $1, descr = $2 where id = $3 returning * ;`,
  create: `INSERT INTO tasks(title,descr)values($1, $2) returning *;`,
};
