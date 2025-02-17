const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models"); // ✅ Sequelize models
const patientRoutes = require("./routes/patientRoutes");
const opdRoutes = require("./routes/opdRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Route Setup
app.use("/api/patients", patientRoutes);
app.use("/api", opdRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ✅ Test API Endpoint
app.get("/", (req, res) => {
  res.send("Hospital Management System API is running...");
});

// ✅ Database Sync (Only for development - remove in production)
db.sequelize.sync().then(() => {
  console.log("Database connected successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
