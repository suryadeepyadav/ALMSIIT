const bcrypt = require("bcrypt");
const { AdminModel } = require("./models/admin.model");
const { connection } = require("./configs/db");

async function vasu() {
  const secure_password = await bcrypt.hash('vasu123', 5);
  console.log(secure_password);
  console.log("this is our console")
}

// Call the function
vasu();
async function insertAdminDocument(name, email, password) {
    try {
      await connection;
      const newAdmin = new AdminModel({
        name,
        email,
        password,
      });
      await newAdmin.save();
      console.log("Document inserted successfully");
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  }
  
  insertAdminDocument("vasudev", "surya@gmail.com", "$2b$05$Rh1Lw5nraKeTvtL3x8NHYOioG.FiMrvBBKSuZfWgM/mRlBt0YzANq");
  
// {
//   "_id": {
//     "$oid": "65f930fcb334445235b0c75d"
//   },
//   "name": "vasudev",
//   "email": "surya@gmail.com",
//   "password": "$2b$05$Rh1Lw5nraKeTvtL3x8NHYOioG.FiMrvBBKSuZfWgM/mRlBt0YzANq"
// }