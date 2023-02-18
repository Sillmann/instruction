1. create paste instruction

2. definir tabela
CREATE TABLE `ssillmann`.`instruction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
ALTER TABLE `ssillmann`.`instruction` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;
  
3. create paste instruction/backend
   
4. backend
   npm init -y 
   npm install mysql2
   npm install express

5. backend 
   create index.js
   
   set connection to mysql
   
index.js
--------
// framework node
import express from "express";
// define app
const app = express();


// bd mysql
import mysql from "mysql2";

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"silman",
  database:"ssillmann"
});


app.listen(3333, () => 
{
  console.log("Backend Initialized");
});

node index.js  

ERROR: SyntaxError: Cannot use import statement outside a module
SOLUTION: in package.json add "type": "module",

6. 
index.js
--------

// inclusion routine
app.get("/instruction/listall", (req,res) => 
{
  const q = "SELECT * FROM instruction";
  db.query(q,(err,data)=>
  {
    if (err) return res.json(err);
      return res.json(data);
  })
});

simulate "listall" in Postman
GET: http://localhost:3333/instruction/listall


7. npx create-react-app frontend

structure
src\App.js
src\instruction\pages\Listall\index.js

import React from 'react';
export default function Listall() {
  return (
      <h1>--ListALL--</h1>
  )
};
npm start

8. npm install react-router-dom

App.js
------
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListAll from './instruction/pages/Listall';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/listall" element={<ListAll />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

9.

npm install axios

ERROR: has been blocked by CORS policy:
SOLUTION: npm install cors;

Listall
-------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Listall() {

  const [item,setItem] = useState([]);

  useEffect(() => {
    const fetchAllItem = async () => {
      try {
        const res = await axios.get("http://localhost:3333/instruction/listall");
        //console.log(res);
        setItem(res.data);

      } catch(err) {
        console.log(err);
      }
    }
    fetchAllItem();
  }, []);
  
  
  const ListItem = item.map(it=>
    <li key={it.id}>

    <button><Link to={`/update/${it.id}`}>UPT</Link></button>
    <button><Link to={`/delete/${it.id}`}>DEL</Link></button>

    <Link to={`/view/${it.id}`}>{it.id}-{it.title}</Link></li>);


  return (
    <div className="Listall">
      <h1>--ListALL--</h1>

      <div className="employs">

        <button><Link to="/new">NEW</Link></button>

        <ul>
          {ListItem}
        </ul>
      </div>  
    </div>
  )
};

10. ====inclusion routine====

on the backend...
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

on the postman...
POST: http://localhost:3333/instruction/new
body - raw - json ( app.use(express.json());
{
    "title": "aaaaaaa",
    "description": "bbbbbbbbbbb"
}
 
on the frontend...
import New from './instruction/pages/New';
<Route path="/new" element={<New />} />
...
import React, { useState } from 'react';
import axios from 'axios';

export default function New() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handlePost(e) {
    e.preventDefault();

    const data = {
      title,
      description
    }    

    try {
      await axios.post("http://localhost:3333/instruction/new",data);
    } catch (err) {
       console.log(err);
    }

  } 

  return(
    <div>

    <h1>New</h1>
    
    <div className="new-form">
      <form onSubmit={handlePost}>
          
          <input 
            type="text" 
            placeholder="instruction title" 
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="describe the instruction"
            onChange={e => setDescription(e.target.value)}
          />

        <button type="submit">Post</button>

      </form>
    </div>

    </div>
  )
};

11. add navigate
import { useNavigate } from 'react-router-dom';
...
const navigate = useNavigate();
...  
navigate("/listall");


12. ====update routine====

on the backend...
// Route to get one post
app.get("/instruction/getfromid/:id", (req,res)=>{
  const id = req.params.id;
   db.query("SELECT * FROM instruction WHERE id = ?", id,(err,data)=>{
    if (err) return res.json(err);
    return res.send(data);
    })  
 })
 
on the postman...
http://localhost:3333/instruction/getfromid/4



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

on the postman...
http://localhost:3333/instruction/update/4



on the frontend
import Update from './instruction/pages/Update';
...
<Route path="/update/:id" element={<Update />} />
...

UPDATE
------
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {

  const {id} = useParams();
  // const [item, setItem] = useState([]);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  
  useEffect(()=>{
    Axios.get('http://localhost:3333/instruction/getfromid/'+id).then((data)=>{
    
    setTitle(data.data[0].title);
    setDescription(data.data[0].description);

    // setItem({
    //          title: data.data[0].title,
    //          description: data.data[0].description,
    //          id:data.data[0].id
    //         });

    });

    //console.log(title);

  },[id]);


  async function handlePut(e) {
    e.preventDefault();

    const data = {
      title,
      description
    }    

    try {
      await Axios.put("http://localhost:3333/instruction/update/"+id,data);
	  
      navigate("/listall");
    } catch (err) {
       console.log(err);
    }

  } 

  return(
    <div>

    <h1>Update</h1>
    
    <div className="new-form">
      <form onSubmit={handlePut}>
          
          <input 
            type="text" 
            placeholder="instruction title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="describe the instruction"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

        <button type="submit">Post</button>

      </form>
    </div>

    </div>
  )
};



13. ====delete routine====
on the backend
...
// delete routine
app.delete("/instruction/delfromid/:id", (req,res)=>{
  const id = req.params.id;
  const q = "DELETE FROM instruction WHERE id = ?";
  db.query(q,[id],(err,data)=>{
    if (err) return res.json(err);
    return res.json("Item has been deleted successfully."); 
  })
})
...


on the postman:
DELETE: http://localhost:3333/instruction/delfromid/4

on the browser:
http://localhost:3000/Delete/3

on the frontend:
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Delete() {

  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    Axios.get('http://localhost:3333/instruction/getfromid/'+id).then((data)=>{
    
    setTitle(data.data[0].title);
    setDescription(data.data[0].description);

    });

  },[id]);

  //const handleDel = async (e) => {
  //  e.preventDefault();
  //  try {
  //     await Axios.delete("http://localhost:3333/instruction/delfromid/"+id);
  //     navigate("/listall");
  //  } catch (err) {
  //    console.log(err);
  //  }
  // }
  
  async function handleDel(e) {
    e.preventDefault();
    try {
      await Axios.delete("http://localhost:3333/instruction/delfromid/"+id);
      navigate("/listall");
    } catch (err) {
      console.log(err);
    }    
  }      

  return (
    <div>

      <h1>DELETE</h1>

      <div className="delete-form">

        <strong>Title</strong>
        <p>{title}</p>

        <strong>Description</strong>
        <p>{description}</p>

        <button onClick={handleDel}>DEL</button>

      </div>

    </div>
  )
};


14.


 
 

	