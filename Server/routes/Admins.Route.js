const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const nodemailer = require("nodemailer");

//model import
const { AdminModel } = require("../models/admin.model");

//middleware import
const {
  isAdminAuthenticated,
} = require("../middlewares/authenticate");

//get all admin data route
router.get("/all", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    return res.send({ message: "All admins data", admins });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

//admin registration route
// router.post("/register", isAdminAuthenticated, async (req, res) => {
//   const { name, email, password } = req.body.data;
//   try {
//     let user = await AdminModel.find({ email });
//     if (user.length > 0) {
//       return res.send({ msg: "User already registered" });
//     }
//     bcrypt.hash(
//       password,
//       +process.env.Salt_rounds,
//       async (err, secure_password) => {
//         if (err) {
//           console.log(err);
//         } else {
//           const admin = new AdminModel({
//             name,
//             email,
//             password: secure_password,
//           });
//           await admin.save();
//           let newAdmin = await AdminModel.find({ email });

//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: "suryayadav1012002@gmail.com",
//               pass: "nsziioprjzwcodlm",
//             },
//           });

//           const mailOptions = {
//             from: "suryayadav1012002@gmail.com",
//             to: email,
//             subject: "Account ID and Password",
//             text: `Welcome to SIIT, Congratulations,Your account has been created successfully.This is your User type : Admin and Password : ${password}  `,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               return res.send({ msg: "error" });
//             }
//             return res.send({ msg: "Password sent" });
//           });

//           res.send({
//             msg: "Admin Registered Successfully",
//             admin: newAdmin[0],
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res.status(404).send({ msg: "Admin Registration failed" });
//   }
// });
router.post("/register", isAdminAuthenticated, async (req, res) => {
  const { name, email, password } = req.body.data;
  try {
    const user = await AdminModel.findOne({ email });
    if (user) {
      return res.send({ msg: "User already registered" });
    }

    const secure_password = await bcrypt.hash(password, +process.env.Salt_rounds);

    const admin = new AdminModel({
      name,
      email,
      password: secure_password,
    });

    await admin.save();

    const newAdmin = await AdminModel.findOne({ email });

    // Email sending code using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "suryayadav1012002@gmail.com",
        pass: "nxhv dhlj jpxd ahgv",
      },
    });

    const mailOptions = {
      from: "suryayadav1012002@gmail.com",
      to: email,
      subject: "Account ID and Password",
      text: `Welcome to SIIT, Congratulations, Your account has been created successfully. This is your User type: Admin and Password: ${password}`,
    };
    // const mailOptions = {
    //   from: "suryayadav1012002@gmail.com",
    //   to: email,
    //   subject: "Account ID and Password",
    //   html: `
    //     <html>
    //       <body>
    //         <h1>Welcome to SIIT</h1>
    //         <p>Congratulations, your account has been successfully created as an Administrator.</p>
    //         <p>Your login credentials are as follows:</p>
    //         <ul>
    //           <li>User Type: Administrator</li>
    //           <li>Password: ${password}</li>
    //         </ul>
    //         <p>Thank you for joining SIIT, where you'll have access to a world of opportunities and resources. We look forward to your active participation and contributions.</p>
    //       </body>
    //     </html>
    //   `,
    // };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Password sent successfully.");
      }
      // Continue with sending the registration success response.
      res.send({
        msg: "Admin Registered Successfully",
        admin: newAdmin,
      });
    });
  } catch (err) {
    res.status(404).send({ msg: "Admin Registration failed" });
  }
});

//admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.find({ email });
    if (admin.length > 0) {
      if (admin[0].access == "false") {
        return res.send({ message: "Access Denied" });
      }
      bcrypt.compare(password, admin[0].password, (err, results) => {
        if (results) {
          let token = jwt.sign(
            { email, name: admin[0].name },
            process.env.secret_key,
            { expiresIn: "7d" }
          );
          res.send({
            message: "Login Successful",
            user: admin[0],
            token,
          });
        } else {
          res.status(201).send({ message: "Wrong credentials" });
        }
      });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error" });
  }
});

//edit admin route
router.patch("/:adminId", isAdminAuthenticated, async (req, res) => {
  const { adminId } = req.params;
  const payload = req.body.data;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: adminId }, payload);
    const updatedAdmin = await AdminModel.find({ _id: adminId });
    res.status(200).send({ msg: "Updated Admin", admin: updatedAdmin[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete admin route
router.delete("/:adminId", async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: adminId });
    res.status(200).send({ msg: "Deleted Admin" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
