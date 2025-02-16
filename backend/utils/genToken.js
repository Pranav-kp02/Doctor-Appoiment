const jsw = require("jsonwebtoken");

exports.genToken = (req, res) => {
  const option = {
    id: req.genPass.id,
    role: req.genPass.role,
    time: Date.now(),
  };

  const token = jsw.sign(option, process.env.SECRETKEY, { expiresIn: "1d" });
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "inValid token",
    });
  }

  res
    .cookie("token", token, {
      httpOnly: true, // Prevents client-side access (more secure)
      secure: process.env.NODE_ENV === "production", // Only sends over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    })
    .status(200)
    .json({
      success: true,
      message: "You are logged in successfully",
      user: req.genPass,
      authentication: true,
      token,
    });
};
