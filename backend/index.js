// framework node
import express from "express";
// define app
const app = express();

// req.body
// ex:  TypeError: Cannot read properties of undefined (reading 'title')
app.use(express.json());

// ERROR: has been blocked by CORS policy
import cors from "cors";
app.use(cors());

// bd mysql
import mysql from "mysql2";

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"silman",
  database:"ssillmann"
});


// listing routine
app.get("/instruction/listall", (req,res) => 
{
  const q = "SELECT * FROM instruction";
  db.query(q,(err,data)=>
  {
    if (err) return res.json(err);
      return res.json(data);
  })
});



// inclusion routine
app.post("/instruction/new",(req,res)=>{
  const q = "INSERT INTO instruction (`title`,`description`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
  ]
  db.query(q,[values],(err,data)=>{
    if (err) return res.json(err);
    return res.json(data); 
  })
});


// update routine
app.put("/instruction/update/:id", (req,res)=>{
  const id = req.params.id;
  const q = "UPDATE instruction SET `title` = ?, `description` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description
  ]
  db.query(q,[...values,id],(err,data)=>{
    if (err) return res.json(err);
    return res.json("Item has been updated successfully."); 
  })
})


// Route to get one post
// app.get("/instruction/getfromid/:id", (req,res)=>{
//   const id = req.params.id;
//   db.query("SELECT * FROM instruction WHERE id = ?", id,(err,data)=>{
//     if (err) return res.json(err);
//     return res.send(data);
//     })  
//  })

app.get("/instruction/getfromid/:id", (req,res)=>{
  const id = req.params.id;
  const q = "SELECT * FROM instruction WHERE id = ?";
  db.query(q,[id],(err,data)=>{
    if (err) return res.json(err);
    return res.send(data);
    })  
 })


// delete routine
app.delete("/instruction/delfromid/:id", (req,res)=>{
  const id = req.params.id;
  const q = "DELETE FROM instruction WHERE id = ?";
  db.query(q,[id],(err,data)=>{
    if (err) return res.json(err);
    return res.json("Item has been deleted successfully."); 
  })
})


// set port, listen for requests
app.listen(3333, () => 
{
  console.log("Backend Initialized");
});