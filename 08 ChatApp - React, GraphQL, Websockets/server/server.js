const {GraphQLServer, PubSub} = require("graphql-yoga");

const messages = [];

//- eg. ID! -> field is required

const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
  type Subscription {
    messages: [Message!]
  }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_parent, {user, content}) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (_parent, _args, {pubsub}) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, {messages}));
        setTimeout(() => pubsub.publish(channel, {messages}), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const pubsub = new PubSub();
const server = new GraphQLServer({typeDefs, resolvers, context: {pubsub}});

const options = {
  port: 3000,
};

server.start(options, ({port}) => {
  console.log(`Server is running on http://localhost:${port}/`);
});
