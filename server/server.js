const express = require("express");
const db = require("./db/index");
const app = express();

//express middleware for req body
app.use(express.json());
//Get All Users
app.get("/Users", async (req, res) => {
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
app.get("/Users/:id", (req, res) => {
  console.log(req.params.id);
});

//Create a User

app.post("/Users/", (req, res) => {
  console.log(req.body);
});
app.listen(4040, () => {
  console.log("Listening");
});

//Update a user

app.put("/Users/:id", (req, res) => {
  console.log(req.params.id);
});

//delete a user

app.delete("/Users/:id", (req, res) => {
  console.log("deleted");
});
