const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { GraphQLError } = require("graphql");


const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (!author){
          return []
        }
        query.author = author._id;
      }
      if (args.genre === "all genres") args.genre = null;

      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }

      const books = await Book.find(query).populate("author")
      return books;
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({});
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let foundAuthor = await Author.findOne({ name: args.author });
      foundAuthor = foundAuthor
        ? foundAuthor
        : new Author({ name: args.author });
      const book = new Book({ ...args, author: foundAuthor });

      try {
        await book.save();
        await foundAuthor.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save().catch(error => {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
}
module.exports = resolvers;
