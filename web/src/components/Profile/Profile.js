import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {Navigate} from 'react-router-dom'

function Profile() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users_details/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const jwtToken = Cookies.get("jwt_token")
  if (jwtToken === undefined){
      return <Navigate to="/login"/>
  }
  
  
  return (
    <div style={{padding:'50px 10%'}}>
        <h1>Sample USERS</h1>
      {users.map((user) =>
       (
        <div key={user.id} style={{boxShadow:'0 3px 10px rgb(0 0 0 / 0.2)', padding:"20px 5%"}}>
           <h6>
               {user.name}
           </h6>
           <p>
               {user.id}
           </p>
           <h2>
               {user.user_name}
           </h2>
           <h6>
             {user.email}  
           </h6>
        </div>
      ))}
    </div>
  );
}

export default Profile;