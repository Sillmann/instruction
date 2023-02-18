import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

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

  // const handleDel = async (e) => {
  //   e.preventDefault();
  //   try {
  //      await Axios.delete("http://localhost:3333/instruction/delfromid/"+id);
  //      navigate("/listall");
  //   } catch (err) {
  //     console.log(err);
  //   }
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

      <div className="del-header">  
        <h1>DELETE Instruction</h1>
      </div>

        <div className="del-form">

          <div className="del-input">
          
          <strong>Title</strong>
          <input className="del-input-title"
              value={title}
          />

          <strong>Description</strong>
          <textarea className="del-input-area"
            value={description}
          />              

          <button onClick={handleDel}>DEL</button>

        </div>
      </div>
    </div>
  )
};