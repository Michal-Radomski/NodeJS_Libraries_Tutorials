const {GraphQLServer, PubSub} = require("graphql-yoga");

interface Message {
  id: number;
  user: string;
  content: string;
}

interface User {}

const messages: Message[] = [];

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

const subscribers: string[] = [];
const onMessagesUpdates = (fn: any) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_parent: any, {user, content}: {user: string; content: string}): number => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn: any) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (_parent: any, _args: any, {pubsub}: any) => {
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

const options: {port: number} = {
  port: 4000,
};

server.start(options, ({port}: {port: number}) => {
  console.log(`Server is running on http://localhost: ${port}/`);
});
