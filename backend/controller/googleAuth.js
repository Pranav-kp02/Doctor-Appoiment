const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const User = require("../modules/userSchema");

/* GET Google Authentication API. */
exports.googleAuth = async (req, res, next) => {
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        image: picture,
      });
    }
    user.verified = undefined;
    await user.save();
    const option = {
      id: user._id,
      role: user.role,
      time: Date.now(),
    };

    const token = jwt.sign(option, process.env.SECRETKEY, { expiresIn: "1d" });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "You are logged in successfully",
        user,
        authentication: true,
        token,
      });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};
