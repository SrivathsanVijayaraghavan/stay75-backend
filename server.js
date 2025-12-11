// ------------------- Imports -------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // needed if frontend is on a different port
const subjectRoutes = require('./routes/subjects');
const leaveRoutes = require('./routes/leave');
const authRoutes = require('./routes/auth');
const middleware = require("./middleware/middleware");
const userdataRoutes = require('./routes/userdata');
const userdataRouter = require('./routes/userdata');


// ------------------- Initialize App -------------------
const app = express(); // must be first

// ------------------- Middleware -------------------
app.use(cors());          // allow cross-origin requests
app.use(express.json());  // parse JSON body
app.use('/userdata', userdataRoutes);

// ------------------- Routes -------------------
app.use("/auth", authRoutes);
app.use("/subjects", subjectRoutes);
app.use("/leave", leaveRoutes);
app.use('/userdata', userdataRouter);
// ------------------- Connect MongoDB -------------------
mongoose.connect(
  'mongodb+srv://stay75user:Cheechu%402007@stay75-fullstack.npfllp9.mongodb.net/stay75-fullstack'
)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ------------------- Start Server -------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
