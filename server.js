const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

//config dot env file
dotenv.config()

//database call
connectDb();

//rest object
const app = express();
// const https = require('https');
// const agent = new https.Agent({
//     rejectUnauthorized: false
// });
//middlewares
app.use(cors());
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users', require('./routes/userRoute'))
// app.use('/api/v1', createProxyMiddleware({
//   target: 'https://localhost:8080',
//   changeOrigin: true,
//   agent,
//   pathRewrite: {
//       [`^/api/v1`]: '',
//   },
//   router: {
//       // add your route and the corresponding target here
//   }
// }, require('./routes/userRoute')));

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
