const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const nodemailer = require("nodemailer");

//model import
const { TutorModel } = require("../models/Tutor.model");

//middleware import
const { isAdminAuthenticated } = require("../middlewares/authenticate");

//get all tutor data
router.get("/all", async (req, res) => {
  try {
    const tutors = await TutorModel.find();
    return res.send({ message: "All tutor data", tutors });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

//register new tutor
// router.post("/register", isAdminAuthenticated, async (req, res) => {
//   const { name, email, password, subject } = req.body.data;
//   try {
//     let user = await TutorModel.find({ email });
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
//           const tutor = new TutorModel({
//             name,
//             email,
//             subject,
//             password: secure_password,
//           });
//           await tutor.save();
//           let newTutor = await TutorModel.find({ email });

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
//             text: `Welcome to SIIT, Congratulations,Your account has been created successfully.This is your User type : Tutor and Password : ${password}  `,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               return res.send({ msg: "error" });
//             }
//             return res.send({ msg: "Password sent" });
//           });

//           return res.send({
//             msg: "Tutor Registered Successfully",
//             tutor: newTutor[0],
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res.status(404).send({ msg: "Tutor Registration failed" });
//   }
// });
router.post("/register", isAdminAuthenticated, async (req, res) => {
  const { name, email, password, subject } = req.body.data;
  try {
    const user = await TutorModel.findOne({ email });
    if (user) {
      return res.send({ msg: "User already registered" });
    }
    
    const secure_password = await bcrypt.hash(password, +process.env.Salt_rounds);
    
    const tutor = new TutorModel({
      name,
      email,
      subject,
      password: secure_password,
    });
    
    await tutor.save();
    
    const newTutor = await TutorModel.findOne({ email });

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
      text: `Welcome to SIIT, Congratulations, Your account has been created successfully. This is your User type: Tutor and Password: ${password}`,
    };
    // const mailOptions = {
    //   from: "suryayadav1012002@gmail.com",
    //   to: email,
    //   subject: "Account ID and Password",
    //   html: `
    //     <html>
    //       <body>
    //         <h1>Welcome to SIIT</h1>
    //         <p>Congratulations, your account has been successfully created as a Teacher.</p>
    //         <p>Your login credentials are as follows:</p>
    //         <ul>
    //           <li>User Type: Tutor</li>
    //           <li>Password: ${password}</li>
    //         </ul>
    //         <p>Thank you for becoming a Teacher at SIIT. We appreciate your dedication to education and look forward to your contributions to our learning community.</p>
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
        msg: "Tutor Registered Successfully",
        tutor: newTutor,
      });
    });
  } catch (err) {
    res.status(404).send({ msg: "Tutor Registration failed" });
  }
});

//tutor login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const tutor = await TutorModel.find({ email });
    if (tutor.length > 0) {
      if (tutor[0].access == "false") {
        return res.send({ message: "Access Denied" });
      }
      bcrypt.compare(password, tutor[0].password, (err, results) => {
        if (results) {
          let token = jwt.sign(
            { email, name: tutor[0].name },
            process.env.secret_key,
            { expiresIn: "7d" }
          );
          res.send({
            message: "Login Successful",
            user: tutor[0],
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

//edit tutor
router.patch("/:tutorId", isAdminAuthenticated, async (req, res) => {
  const { tutorId } = req.params;
  const payload = req.body.data;
  try {
    const tutor = await TutorModel.findByIdAndUpdate({ _id: tutorId }, payload);
    const updatedTutor = await TutorModel.find({ _id: tutorId });
    res.status(200).send({ msg: "Updated Tutor", tutor: updatedTutor[0] });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete tutor
router.delete("/:tutorId", async (req, res) => {
  const { tutorId } = req.params;
  try {
    const tutor = await TutorModel.findByIdAndDelete({ _id: tutorId });
    res.status(200).send({ msg: "Deleted Tutor" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
