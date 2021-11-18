//- File created by TSC

var express = require("express");
var expressGraphQL = require("express-graphql").graphqlHTTP;
var _a = require("graphql"),
  GraphQLSchema = _a.GraphQLSchema,
  GraphQLObjectType = _a.GraphQLObjectType,
  GraphQLString = _a.GraphQLString,
  GraphQLList = _a.GraphQLList,
  GraphQLInt = _a.GraphQLInt,
  GraphQLNonNull = _a.GraphQLNonNull;
var app = express();
var authors = [
  {id: 1, name: "J. K. Rowling"},
  {id: 2, name: "J. R. R. Tolkien"},
  {id: 3, name: "Brent Weeks"},
];
var books = [
  {id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1},
  {id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1},
  {id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1},
  {id: 4, name: "The Fellowship of the Ring", authorId: 2},
  {id: 5, name: "The Two Towers", authorId: 2},
  {id: 6, name: "The Return of the King", authorId: 2},
  {id: 7, name: "The Way of Shadows", authorId: 3},
  {id: 8, name: "Beyond the Shadows", authorId: 3},
];
var BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: function () {
    return {
      id: {type: GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLNonNull(GraphQLString)},
      authorId: {type: GraphQLNonNull(GraphQLInt)},
      author: {
        type: AuthorType,
        resolve: function (book) {
          return authors.find(function (author) {
            return author.id === book.authorId;
          });
        },
      },
    };
  },
});
var AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents a author of a book",
  fields: function () {
    return {
      id: {type: GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLNonNull(GraphQLString)},
      books: {
        type: new GraphQLList(BookType),
        resolve: function (author) {
          return books.filter(function (book) {
            return book.authorId === author.id;
          });
        },
      },
    };
  },
});
var RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: function () {
    return {
      book: {
        type: BookType,
        description: "A Single Book",
        args: {
          id: {type: GraphQLInt},
        },
        resolve: function (_parent, args) {
          return books.find(function (book) {
            return book.id === args.id;
          });
        },
      },
      books: {
        type: new GraphQLList(BookType),
        description: "List of All Books",
        resolve: function () {
          return books;
        },
      },
      authors: {
        type: new GraphQLList(AuthorType),
        description: "List of All Authors",
        resolve: function () {
          return authors;
        },
      },
      author: {
        type: AuthorType,
        description: "A Single Author",
        args: {
          id: {type: GraphQLInt},
        },
        resolve: function (_parent, args) {
          return authors.find(function (author) {
            return author.id === args.id;
          });
        },
      },
    };
  },
});
var RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: function () {
    return {
      addBook: {
        type: BookType,
        description: "Add a book",
        args: {
          name: {type: GraphQLNonNull(GraphQLString)},
          authorId: {type: GraphQLNonNull(GraphQLInt)},
        },
        resolve: function (_parent, args) {
          var book = {id: books.length + 1, name: args.name, authorId: args.authorId};
          books.push(book);
          return book;
        },
      },
      addAuthor: {
        type: AuthorType,
        description: "Add an author",
        args: {
          name: {type: GraphQLNonNull(GraphQLString)},
        },
        resolve: function (_parent, args) {
          var author = {id: authors.length + 1, name: args.name};
          authors.push(author);
          return author;
        },
      },
    };
  },
});
var schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, function () {
  return console.log("Server is running...");
});
