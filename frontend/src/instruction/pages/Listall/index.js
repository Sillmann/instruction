import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

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

    <button className="all-button"><Link to={`/update/${it.id}`}>UPT</Link></button>
    <button className="all-button"><Link to={`/delete/${it.id}`}>DEL</Link></button>

    <Link to={`/view/${it.id}`}>{it.id}-{it.title}</Link></li>);


  return (

    <div>
      <div className="all-header">  
        <h1>List ALL Instructions</h1>
      </div>

      <button className="all-button"><Link to="/new">NEW</Link></button>

      <div className="all-list">

        <ul>
          {ListItem}
        </ul>

      </div>  
    </div>
  )
};