const { ApolloServer, UserInputError } = require("@apollo/server");

const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
//const User = require("./models/users");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connection to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("conncted to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
input AuthorInput{
  name: String!,
  born: Int
}
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String) : [Book!]
    allAuthors: [Author!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
    
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
  }

  type Mutation {
    addBook(
        title: String!
        author: AuthorInput!
        published: Int!
        genres: [String!]

    ) : Book,
    editAuthor(
        name: String!,
        setBornTo: Int!
    ) : Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });

        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            });
          }
          return await Book.find({ author: foundAuthor.id });
        }
      } else if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } });
      } else {
        return await Book.find({});
      }
    },

    allAuthors: async () => {
      return await Author.find();
      /* return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return { ...author, bookCount };
      }); */
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author.name });
      if (!foundAuthor) {
        const author = new Author({ ...args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const foundAuthor2 = await Author.findOne({ name: args.author.name });

      const book = new Book({ ...args, author: foundAuthor2 });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        return null;
      }

      const filter = { name: args.name };
      const updateDoc = {
        $set: {
          born: args.setBornTo,
        },
      };

      await Author.updateOne(filter, updateDoc);
      return await Author.findOne({ name: args.name });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
