import User from "../models/User.js";
import Trip from "../models/Trip.js";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.user) throw new Error("Not logged in");
      return User.findById(context.user._id).populate("trips");
    },
    trips: async (_parent, _args, context) => {
      if (!context.user) throw new Error("Not logged in");
      return Trip.find({ userId: context.user._id });
    },
  },
  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password)))
        throw new Error("Incorrect credentials");
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (_parent, args, context) => {
      if (!context.user) throw new Error("Not logged in");
      return Trip.create({ ...args, userId: context.user._id });
    },
    deleteTrip: async (_parent, { id }, context) => {
      if (!context.user) throw new Error("Not logged in");
      return Trip.findOneAndDelete({ _id: id, userId: context.user._id });
    },
  },
};

export default resolvers;
