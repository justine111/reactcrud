import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/booklist", (req, res) => {
  const q = "SELECT * FROM booklist";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/booklist/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM booklist WHERE book_id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});


app.post("/booklist", (req, res) => {
  const q = "INSERT INTO booklist(`title`, `description`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/booklist/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM booklist WHERE book_id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/booklist/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE booklist SET `title`=?, `description`=?, `price`=?, `cover`=? WHERE `book_id`=?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error updating book:", err);  // Log the error
      return res.json(err);
    }
    return res.json("Book has been updated.");
  });
  
});



app.listen(8800, () => {
  console.log("Connected to backend.");
});
