const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
//const person = require("./models/person");

let currentDate = Date();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token(
  "body",
  (getBody = (req) => {
    return JSON.stringify(req.body);
  })
);

app.use(morgan(`:method :url :referrer  :response-time ms :body`));
app.get("/api/persons", (req, res) => {
  Person.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  //persons = persons.filter((person) => person.id !== id);
  Person.findOneAndDelete(req.params.id).then((person) => {
    res.json(person);
    res.status(204).end();
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  const findPerson = Person.findOne(newPerson.name);

  //persons = persons.concat(newPerson);
  if (!req.body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!req.body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  /* 
  if (findPerson) {
    return res.status(400).json({
      error: "name exists already",
    });
  } */
  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = 3001;
app.listen(PORT, (req, res) => {
  console.log("Server listening on port 3001");
});
