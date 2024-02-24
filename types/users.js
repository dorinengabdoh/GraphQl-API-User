const {  GraphQLObjectType, GraphQLString } = require('graphql');


const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      birth_date: { type: GraphQLString },
      gender: { type: GraphQLString },
    }),
  });

  module.exports = User;