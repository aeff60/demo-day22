const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
];

app.get("/", (req, res) => {
  res.send("Hello From Day22");
});
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found.");
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const book = { id: books.length + 1, title, author };
  books.push(book);
  res.status(201).send(book);
});

app.put("/books/:id", (req, res) => {
  let book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found.");

  const { title, author } = req.body;
  book.title = title;
  book.author = author;
  res.send(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
