const jsw = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return res.status(404).json({
      succses: false,
      message: "please login",
    });
  }

  jsw.verify(token, process.env.SECRETKEY, (err, decode) => {
    if (err) {
      return res.status(404).json({
        succses: false,
        message: "invalid tokken",
      });
    }
    req.id = decode.id;
    req.role = decode.role;
    next();
  });
};

exports.authorization = (...roles) => {
  return (req, res, next) => {
    const adminRole = req.role;
    if (!roles.includes(adminRole)) {
      return res.status(404).json({
        succses: false,
        message: "Unauthorized Access",
      });
    }
    next();
  };
};
