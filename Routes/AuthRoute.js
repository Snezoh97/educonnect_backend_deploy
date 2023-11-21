const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();
const { resetPassword } = require("../Controllers/ResetControl");
const { updatePassword } = require("../Controllers/UpdateController");
const { resetPassword } = require("./Controllers/ResetControl");
const User = require("./Models/UserModel");
const { updatePassword } = require("./Controllers/UpdateController");
const {
  submitApplication,
  deleteApplication,
  getApplication,
} = require("./Controllers/ApplicationController");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  
  // Endpoint to delete all users
  app.delete("/delete-users", async (_, res) => {
    try {
      await User.deleteMany();
      res.json({ message: "All users deleted successfully" });
    } catch (error) {
      console.error("Error deleting users:", error);
      res.status(500).json({ error: "Failed to delete users" });
    }
  });
  
  // Endpoint to check if email exists
  app.get("/check-email/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const existingUser = await User.findOne({ email });
      res.json({ exists: !!existingUser });
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Failed to check email" });
    }
  });
  
  // Endpoint to check if ID number exists
  app.get("/check-idnumber/:idnumber", async (req, res) => {
    try {
      const { idnumber } = req.params;
      const existingUser = await User.findOne({ idnumber });
      res.json({ exists: !!existingUser });
    } catch (error) {
      console.error("Error checking ID number:", error);
      res.status(500).json({ error: "Failed to check ID number" });
    }
  });
  
  app.post("/password/reset", resetPassword);
  app.post("/update-password", updatePassword);
  app.use("/apply-student", submitApplication);
  
  // Endpoint to delete an application by ID
  app.delete("/apply-delete/idnumber/:idnumber", deleteApplication);
  
  // Endpoint to get an application by ID
  app.get("/apply-get/idnumber/:idnumber", getApplication);

module.exports = router;
