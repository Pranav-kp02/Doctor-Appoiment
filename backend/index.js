const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./configDB/connectDataBase");
const userRouter = require("./routes/userRoute");
const cookie = require("cookie-parser");
const docRouter = require("./routes/doctorRoute");
const adminRoute = require("./routes/adminRoute");
const cors = require("cors");

dotenv.config({ path: `./dot.env` });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

app.use(userRouter);
app.use(docRouter);
app.use(adminRoute);

connectDataBase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`sever on ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log(err.message);
});
