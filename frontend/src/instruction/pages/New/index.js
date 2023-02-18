import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function New() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  async function handlePost(e) {
    e.preventDefault();

    const data = {
      title,
      description
    }    

    try {
      await axios.post("http://localhost:3333/instruction/new",data);
      navigate("/listall");
    } catch (err) {
       console.log(err);
    }

  } 

  return(
    <div>

    <div className="new-header">  
      <h1>New Instruction</h1>
    </div>
    
    <div className="new-form">
      <form onSubmit={handlePost}>
          
          <div className="new-input">

            <input className="new-input-title"
              type="text" 
              placeholder="instruction title" 
              onChange={e => setTitle(e.target.value)}
            />

            <textarea className="new-input-area"
              placeholder="describe the instruction"
              onChange={e => setDescription(e.target.value)}
            />

            <button type="submit">Post</button>

        </div>

      </form>
    </div>

    </div>
  )
};