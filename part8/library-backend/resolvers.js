const Book = require("./models/book");
const Author = require("./models/author");

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
    }
  }
}
module.exports = resolvers;
