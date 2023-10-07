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
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
    );
  });
});

app.delete("/api/persons/:id", (req, res) => {
  //persons = persons.filter((person) => person.id !== id);
  Person.findOneAndDelete(req.params.id).then((person) => {
    res.json(person);
    res.status(204).end();
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  console.log(req.params.id);
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name == "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name == "ValidationError") {
    return res.status(400).send({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, (req, res) => {
  console.log("Server listening on port 3001");
});
