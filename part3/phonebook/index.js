const express = require("express");
const app = express();
const morgan = require("morgan");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

let currentDate = Date();
app.use(express.json());

morgan.token(
  "body",
  (getBody = (req) => {
    return JSON.stringify(req.body);
  })
);

app.use(morgan(`:method :url :referrer  :response-time ms :body`));
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const newPerson = req.body;
  newPerson.id = Math.random();
  const findPerson = persons.find((person) => person.name === req.body.name);
  persons = persons.concat(newPerson);
  if (!req.body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!req.body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  if (findPerson) {
    return res.status(400).json({
      error: "name exists already",
    });
  }
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, (req, res) => {
  console.log("Server listening on port 3001");
});