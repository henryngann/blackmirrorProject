const express = require("express");
const db = require("./db/index");
const app = express();

//express middleware for req body
app.use(express.json());
//Get All Users
app.get("/users", async (req, res) => {
  try {
    const response = await db.query("select * from users");
    console.log(response);

    res.json({
      results: response.rows.length,
      data: {
        users: response.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
//Get One User
app.get("/users/:id", async (req, res) => {
  try {
    const response = await db.query(
      `select * from users where id = ${req.params.id}`
    );
    res.json({
      results: response.rows.length,
      data: {
        users: response.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//Create a User

app.post("/users", async (req, res) => {
  try {
    const response = await db.query(
      "INSERT INTO users (name,review) values ($1,$2) returning *",
      [req.body.name, req.body.review]
    );
    console.log(response, req.body.name, req.body.review);

    res.json({
      results: response.rows.length,
      data: {
        users: response.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log(req.body);
});

//Update a user

app.put("/users/:id", async (req, res) => {
  try {
    const response = await db.query(
      "UPDATE users SET name = $1, review = $2 where id = $3",
      [req.body.name, req.body.review, req.params.id]
    );

    res.json({
      results: response.rows.length,
      data: {
        users: response.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a user

app.delete("/users/:id", async (req, res) => {
  try {
    const response = await db.query(
      `DELETE FROM users where id = ${req.params.id}`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
  console.log("deleted");
});

app.listen(4040, () => {
  console.log("Listening");
});
