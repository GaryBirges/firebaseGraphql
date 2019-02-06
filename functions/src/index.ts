// require both the firebase function package to define function   // behavior and your local server config function
const functions = require("firebase-functions");
const configureServer = require("../server");
//initialize the server
const server = configureServer();
// create and export the api
const api = functions.https.onRequest(server);
module.exports = { api:api };



/*import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// }); 

import * as admin from 'firebase-admin';

const serviceAccount = require('../highscore-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server-express';
// const { ApolloServer, gql } = require("apollo-server-express");

interface User {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
}

interface Tweet {
  id: string;
  likes: number;
  text: string;
  userId: string;
}
interface Puzzle {
  id: string,
  difficulty: number;
  name: string;
  steps:string;
  time: string;
}
//shema
  // type Puzzle {
  //   id: ID!
  //   difficulty: Int!
  //   name: String!
  //   steps: String!
  //   time: String!
  // }
const typeDefs = gql`

  type Puzzles {
    puzzle: [Puzzle]
  }
  type Puzzle {
    id: ID!
    difficulty: Int!
    name: String!
    steps: String!
    time: String!
  }

  # A Twitter User
  type User {
    id: ID!
    name: String!
    screenName: String!
    statusesCount: Int!
    tweets: [Tweets]!
  }

  # A Tweet Object
  type Tweets {
    id: ID!
    text: String!
    userId: String!
    user: User!
    likes: Int!
  }

  type Query {
    tweets: [Tweets]
    user(id: String!): User
    puzzles: [Puzzle]
  }
`;
//resolver
const resolvers = {
  Query: {
    async puzzles(){ // _: null,args: { id: string }
      const puzzle = await admin 
        .firestore().collection(`Puzzle`).get();  ///${args.id}
        // return puzzle.docs.map(puzzle=>puzzle.data()) as Puzzle[];
        return puzzle.docs.map(puzzle=>puzzle.data()) as Puzzle[];
    },
    async tweets() {
      const tweets = await admin
        .firestore()
        .collection('tweets')
        .get();
      return tweets.docs.map(tweet => tweet.data()) as Tweet[];
    },
    async user(_: null, args: { id: string }) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.id}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  // Puzzle: {
  //   async puzzle()
  // },
  User: {
    async tweets(user: User) {
      try {
        const userTweets = await admin
          .firestore()
          .collection('tweets')
          .where('userId', '==', user.id)
          .get();
        return userTweets.docs.map(tweet => tweet.data()) as Tweet[];
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Tweets: {
    async user(tweet: Tweet) {
      try {
        const tweetAuthor = await admin
          .firestore()
          .doc(`users/${tweet.userId}`)
          .get();
        return tweetAuthor.data() as User;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "<APOLLO ENGINE API KEY HERE>"
  },
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/