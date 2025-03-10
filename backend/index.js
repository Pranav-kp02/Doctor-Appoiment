const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./configDB/connectDataBase");
const userRouter = require("./routes/userRoute");
const cookie = require("cookie-parser");
const docRouter = require("./routes/doctorRoute");
const adminRoute = require("./routes/adminRoute");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const chatSocket = require("./socket/chatSocket");
const chatRoute = require("./routes/chatRoute");

dotenv.config({ path: `./dot.env` });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

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
app.use(chatRoute);

connectDataBase();
chatSocket(io);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`sever on ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log(err.message);
});
