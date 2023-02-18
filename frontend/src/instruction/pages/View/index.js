import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './styles.css';

export default function View() {

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

  
  return (
    <div>

    <div className="viw-header">  
      <h1>View Instruction</h1>
    </div>

    <div className="viw-form">

      <div className="viw-input">
      
        <strong>Title</strong>
        <input className="viw-input-title"
            value={title}
        />

        <strong>Description</strong>
        <textarea className="viw-input-area"
            value={description}
        />        

        <button><Link to="/listall">Back</Link></button>

      </div>

    </div>

    </div>
  )
};