const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
   // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
   res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    console.log(email);
    const user = users.filter(user=>user.email === email);
    res.send(user);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
     // Push a new user object into the users array based on query parameters from the request
   users.push({
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB});
    // Send a success message as the response, indicating the user has been added
   res.send("The user " + req.query.firstName+"has been added successfully");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  
  if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
       // Extract and update DOB if provided
      
      let DOB = req.query.DOB;    
      if (DOB) {
          filtered_user.DOB = DOB;
      }
     
      let firstName = req.query.firstName;
      let lastName =  req.query.lastName;
      if(firstName){
        filtered_user.firstName =  firstName;
      }
      if(lastName){
        filtered_user.lastName = lastName;
      }
    
      // Replace old user entry with updated user
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      
      // Send success message indicating the user has been updated
      res.send(`User with the email ${email} updated.`);
  } else {
      // Send error message if no user found
      res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter(user=>user.email!= email);
    res.send(`user with email ${email} is succeffully deleted`);
});

module.exports=router;
