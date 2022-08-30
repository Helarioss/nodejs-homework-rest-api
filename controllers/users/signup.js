const bcrypt = require("bcryptjs");

const { User } = require("../../models/users");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signup;
