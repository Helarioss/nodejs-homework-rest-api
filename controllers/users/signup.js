const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const createError = require("http-errors");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const { User } = require("../../models/users");

const { URL_HOST } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw createError(409, "Email already exists");

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({
    email,
    avatarURL,
    verificationToken,
    password: hashPassword,
  });

  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="${URL_HOST}/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = signup;
