const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const cors = require('cors');

// Import types
const UserType =  require("./types/users")

// Import controller
const UsersController = require("./controller/UsersController")


// Database
let users = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    birth_date: "1990-01-01",
    gender: "Masculin"
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    birth_date: "1985-05-15",
    gender: "Féminin"
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@example.com",
    birth_date: "1988-09-30",
    gender: "Masculin"
  },
  {
    id: "4",
    first_name: "samuel",
    last_name: "nana",
    email: "nana.johnson@example.com",
    birth_date: "1968-6-30",
    gender: "Féminin"
  },
  {
    id: "5",
    first_name: "aurel",
    last_name: "armel",
    email: "armel.johnson@example.com",
    birth_date: "2008-6-30",
    gender: "Masculin"
  }
];


const schema = new GraphQLSchema({

  // Queries (For retrieve data)
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {

      // Get user by id
      single_user: {
        type: UserType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (_, args) => {
          return users.find(user => user.id === args.id);
        },
      },

      // Get all users
      all_users: {
        type: new GraphQLList(UserType),
        resolve: () => {
          return users;
        },
      },
    },
  }),


  // Mutations for editing data
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {

      // Create a user
      add_new_user: {
        type: UserType,
        args: {
          first_name: { type: new GraphQLNonNull(GraphQLString) },
          last_name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          birth_date: { type: new GraphQLNonNull(GraphQLString) },
          gender: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          const newUser = {
            id: String(users.length + 1),
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            birth_date: args.birth_date,
            gender: args.gender,
          };
          users.push(newUser);
          return newUser;
        },
      },


      // Delete a user by id
      delete_user_by_id: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          const index = users.findIndex(user => user.id === args.id);
          if (index !== -1) {
            const deletedUser = users[index];
            users.splice(index, 1);
            return deletedUser;
          }
          return null;
        },
      },
    },
  }),
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


app.listen(8000, () => {
  console.log(`Server started on: http://localhost:${8000}`);
});
