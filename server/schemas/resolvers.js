const { AuthenticationError } = require("apollo-server-express");
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async function(parent, args, context) {
            const foundUser = await User.findOne({_id: context.user._id});
        
            if (!foundUser) {
            //   return res.status(400).json({ message: 'Cannot find a user with this id!' });
                return new AuthenticationError("User is not logged in!")
            }
        
            // res.json(foundUser);
            return foundUser;
          }
    },
    Mutation: {
        createUser: async function(parent, args, context) {
            const user = await User.create(args);
        
            if (!user) {
                return new AuthenticationError("Something wrong happened!")
            }
            const token = signToken(user);
            // res.json({ token, user });
            return {
                token,
                user
            }
          },
        login: async function(parent, args, context) {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                return new AuthenticationError("Something wrong happened!")
            }
        
            const correctPw = await user.isCorrectPassword(args.password);
        
            if (!correctPw) {
                return new AuthenticationError("Something wrong happened!")
            }
            const token = signToken(user);
            return {
                token,
                user
            }
          },
        saveBook: async function(parent, args, context) {
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.bookSaved } },
                { new: true, runValidators: true }
              );
              return updatedUser
            } catch (err) {
              console.log(err);
              return new AuthenticationError("Something wrong happened!")
            }
          },
        deleteBook: async function(parent, args, context) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: args.bookId } } },
              { new: true }
            );
            if (!updatedUser) {
                return new AuthenticationError("Something wrong happened!")
            }
            return updatedUser;
          }
    }
}


module.exports = resolvers;