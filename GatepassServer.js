// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const Koa = require("koa");
// const Router = require("koa-router");
 
// const app = express();
// const port = process.env.PORT || 3131;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Array to store RFID tag data
// const tagDataArray = [];

// // Route to handle POST requests to /tagData
// app.post('/tagData', (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data:', tagData);
//   tagDataArray.push(tagData);

//   io.emit('tagData', tagData);

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Gatepass";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 3131;  

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // // Route to handle POST requests to /tagData
// // app.post('/tagData', async (req, res) => {
// //   const tagData = req.body.tagData;

// //   console.log('Received tag data:', tagData);

// //   try {
// //     // Fetch student and device information
// //     // const studentResponse = await axios.get(`http://192.168.100.138:2525/studentinforDevice`);
// //     // const deviceResponse = await axios.get(`http://192.168.100.138:2525/get_deviceForDevice`);
// //     const studentResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/studentinforDevice`);
// //     const deviceResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/get_deviceForDevice`);

// //     const studentInfo = studentResponse.data[0];
// //     const studentDevice = deviceResponse.data[0];

// //     // Check if device registration matches
// //     if (studentDevice.deviceRegistration === tagData) {
// //       const now = new Date().getTime();
// //       const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

// //       const tapHistory = {
// //         firstName: studentInfo.studentInfo_first_name,
// //         middleName: studentInfo.studentInfo_middle_name,
// //         lastName: studentInfo.studentInfo_last_name,
// //         tuptId: studentInfo.studentInfo_tuptId,
// //         course: studentInfo.studentInfo_course,
// //         section: studentInfo.studentInfo_section,
// //         deviceName: studentDevice.device_brand,
// //         serialNumber: studentDevice.device_serialNumber,
// //         date: formattedDate,
// //         user_id: studentDevice.user_id,
// //       };

// //       // Insert the data into the database
// //       // await axios.post('https://macts-backend-mobile-app-production.up.railway.app/Gatepass_history', tapHistory);
// //       await axios.post('https://macts-backend-mobile-app.onrender.com/Gatepass_history', tapHistory);
// //       console.log('Tap history recorded successfully');

// //       io.emit('tagData', { tagData, excessiveTap: false });
// //       res.send('Tag data received and processed successfully');
// //     } else {
// //       console.log("Tag data does not match device registration.");
// //       res.status(400).send('Tag data does not match device registration.');
// //     }
// //   } catch (error) {
// //     console.error('Error processing tag data:', error);
// //     res.status(500).send('Error processing tag data');
// //   }
// // });

// let lastProcessedTagData = null;
// let lastProcessedTime = 0;

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;
//   const currentTime = new Date().getTime();

//   // Check if 1 minute has passed since the last processed tag data
//   if (lastProcessedTagData === tagData && currentTime - lastProcessedTime < 60000) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send('Tag data received within 1 minute interval, ignoring.');
//   }

//   console.log('Received tag data:', tagData);

//   try {
//     // Fetch student and device information
//     // const studentResponse = await axios.get(`https://macts-backend-mobile-app-production.up.railway.app/studentinforDevice`);
//     // const deviceResponse = await axios.get(`https://macts-backend-mobile-app-production.up.railway.app/get_deviceForDevice`);
//     const studentResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/studentinforDevice`);
//     const deviceResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/get_deviceForDevice`);

//     const studentInfo = studentResponse.data[0];
//     const studentDevice = deviceResponse.data[0];

//     // Check if device registration matches
//     if (studentDevice.deviceRegistration === tagData) {
//       const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//       const tapHistory = {
//         firstName: studentInfo.studentInfo_first_name,
//         middleName: studentInfo.studentInfo_middle_name,
//         lastName: studentInfo.studentInfo_last_name,
//         tuptId: studentInfo.studentInfo_tuptId,
//         course: studentInfo.studentInfo_course,
//         section: studentInfo.studentInfo_section,
//         deviceName: studentDevice.device_brand,
//         serialNumber: studentDevice.device_serialNumber,
//         date: formattedDate,
//         user_id: studentDevice.user_id,
//       };

//       // Insert the data into the database
//       // await axios.post('https://macts-backend-mobile-app-production.up.railway.app/Gatepass_history', tapHistory);
//       await axios.post('https://macts-backend-mobile-app.onrender.com/Gatepass_history', tapHistory);
//       console.log('Tap history recorded successfully');

//       io.emit('tagData', { tagData, excessiveTap: false });
      
//       // Update the last processed tag data and time
//       lastProcessedTagData = tagData;
//       lastProcessedTime = currentTime;
      
//       res.send('Tag data received and processed successfully');
//     } else {
//       console.log("Tag data does not match device registration.");
//       res.status(400).send('Tag data does not match device registration.');
//     }
//   } catch (error) {
//     console.error('Error processing tag data:', error);
//     res.status(500).send('Error processing tag data');
//   }
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Gatepass";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");
const axios = require('axios');
const Koa = require("koa");
const Router = require("koa-router");
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3131;  

// Create an HTTP server
const server = http.createServer(app);

// Pass the server instance to Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  
  socket.on('tagData', (data) => {
    console.log('Received tag data via WebSocket:', data);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

// Object to store RFID tag data with timestamp
const tagDataMap = {};

let lastProcessedTagData = null;
let lastProcessedTime = 0;

// Route to handle POST requests to /tagData
app.post('/tagData', async (req, res) => {
  const tagData = req.body.tagData;
  const currentTime = new Date().getTime();

  // Normalize and trim tag data
  const receivedTagData = tagData.trim().toLowerCase();

  // Check if 1 minute has passed since the last processed tag data
  if (lastProcessedTagData === receivedTagData && currentTime - lastProcessedTime < 60000) {
    console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
    io.emit('tagData', { tagData, excessiveTap: true });
    return res.status(429).send('Tag data received within 1 minute interval, ignoring.');
  }

  console.log('Received tag data:', receivedTagData);

  try {
    // Fetch student and device information
    const studentResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/studentinforDevice`);
    const deviceResponse = await axios.get(`https://macts-backend-mobile-app.onrender.com/get_deviceForDevice`);

    const studentInfo = studentResponse.data[0];
    const studentDevice = deviceResponse.data[0];

    // Normalize and trim device registration data
    const deviceTagData = studentDevice.deviceRegistration.trim().toLowerCase();

    console.log('Normalized received tag data:', receivedTagData);
    console.log('Normalized device registration data:', deviceTagData);

    // Check if device registration matches
    if (deviceTagData === receivedTagData) {
      const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

      const tapHistory = {
        firstName: studentInfo.studentInfo_first_name,
        middleName: studentInfo.studentInfo_middle_name,
        lastName: studentInfo.studentInfo_last_name,
        tuptId: studentInfo.studentInfo_tuptId,
        course: studentInfo.studentInfo_course,
        section: studentInfo.studentInfo_section,
        deviceName: studentDevice.device_brand,
        serialNumber: studentDevice.device_serialNumber,
        date: formattedDate,
        user_id: studentDevice.user_id,
      };

      // Insert the data into the database
      await axios.post('https://macts-backend-mobile-app.onrender.com/Gatepass_history', tapHistory);
      console.log('Tap history recorded successfully');

      io.emit('tagData', { tagData: receivedTagData, excessiveTap: false });
      
      // Update the last processed tag data and time
      lastProcessedTagData = receivedTagData;
      lastProcessedTime = currentTime;
      
      res.send('Tag data received and processed successfully');
    } else {
      console.log("Tag data does not match device registration.");
      res.status(400).send('Tag data does not match device registration.');
    }
  } catch (error) {
    console.error('Error processing tag data:', error);
    res.status(500).send('Error processing tag data');
  }
});

// Koa setup
const koaApp = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = "Hello World from Railway this is Gatepass";
});

koaApp.use(router.routes()).use(router.allowedMethods());

// Middleware to handle Koa routes in Express
app.use('/koa', (req, res) => {
  koaApp.callback()(req, res);
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});