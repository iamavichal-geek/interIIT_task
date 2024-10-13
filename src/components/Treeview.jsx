

import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/treeview.css'; 

export default function Treeview() {
  const [godowns, setGodowns] = useState([]);
  const [selectedGodown, setSelectedGodown] = useState(null);
  const [items, setItems] = useState([]);
  const [openChildGodowns, setOpenChildGodowns] = useState({}); 

  useEffect(() => {
    
    axios.get('http://localhost:3001/api/godowns').then((response) => {
      setGodowns(response.data);
    });
  }, []);

  
  const handleSelectGodown = (id) => {
    axios.get(`http://localhost:3001/api/items/${id}`).then((response) => {
      setItems(response.data);
    });
    setSelectedGodown(id);
  };

 
  const toggleChildGodowns = (id) => {
    if (openChildGodowns[id]) {
      
      setOpenChildGodowns((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    } else {
    
      axios.get(`http://localhost:3001/api/child-godowns/${id}`).then((response) => {
        const childGodowns = response.data;
        setGodowns((prevGodowns) =>
          prevGodowns.map((godown) => {
            if (godown.id === id) {
              return { ...godown, childGodowns }; 
            }
            return godown;
          })
        );
        setOpenChildGodowns((prevState) => ({
          ...prevState,
          [id]: true, 
        }));
      });
    }
  };

  return (
    <div className="treeview-container">
      <div className="sidebar">
        <h3>Warehouse</h3>
        {godowns.map((godown) => (
          <div key={godown.id}>
            <div
              onClick={() => toggleChildGodowns(godown.id)}
              className={`godown ${openChildGodowns[godown.id] ? 'open' : ''}`}
            >
              {godown.name}
            </div>
         
            {openChildGodowns[godown.id] && godown.childGodowns && (
              <div className="child-godowns">
                {godown.childGodowns.map((child) => (
                  <div key={child.id} onClick={() => handleSelectGodown(child.id)} className="child-godown">
                    {child.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div><div className="item-details">
        <h3>Item Details</h3>
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.item_id} className="item-card">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Status: {item.status}</p>
                <p>Brand: {item.brand}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );    
}
