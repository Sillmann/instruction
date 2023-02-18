import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

export default function Update() {

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

    <div className="upt-header">  
      <h1>Update Instruction</h1>
    </div>
        
    <div className="upt-form">
      <form onSubmit={handlePut}>

        <div className="upt-input">

          <input className="upt-input-title"
            type="text" 
            placeholder="instruction title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea className="upt-input-area"
            placeholder="describe the instruction"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button type="submit">Post</button>

        </div>

      </form>
    </div>

    </div>
  )
};