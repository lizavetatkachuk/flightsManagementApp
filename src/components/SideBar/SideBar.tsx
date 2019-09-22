import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter,RouteComponentProps } from "react-router-dom";
import { checkAdmin } from "../../helpers/authHelper";

const Container = styled.div`
position:fixed;
left:0;
top:110px;
font-size:20px;
  display: flex;
  flex-direction:row;
  justify-content:flex-start;
  z-index:100;
  height:100%;
  width:100%;
  background-color:#a6a49ccc;
  color:#0c0663;
  .sidebar{
    cursor:pointer;
    margin:0;
padding-top:20px;
padding-left:10px;
list-style-type:none;
    width:50%;
    heigth:100%;
    background-color:#e3e87ae6;    
    li{
      margin:5px;
      width:80%;
     
    }
  }
  .sidebar li{
    :hover {
      background-color: #acae78e;
      border-radius:3px;
    }
  }
  .close-btn{
    cursor:pointer;
   position:absolute;
   right:10%;
   top:2%;
  }
  .close-btn:before{
    transform: rotate(45deg);
    content: ' ';
      height: 33px;
      width: 2px;
      color:#0c0663;
  }
  .close-btn:after{
    transform: rotate(-45deg);
    content: ' ';
      height: 33px;
      width: 2px;
      color:#0c0663;
  }
`;

function SideBar(props) { 

  const role = checkAdmin();
  const {history, onClick}=props;

  return (
    <Container>   
      <ul className='sidebar'>
      <li onClick={ ()=>{onClick();
      history.push('/')
    }} >
        Search Flights</li>
       <li onClick={()=>{onClick();
         history.push('/orders')
        }}>
          My flights
        </li>
        {role === "admin" ? (
         <li onClick={()=>{onClick();
         history.push('/admin')
         }}>
            Admin Pane
         </li>
        ) : null}
        </ul>   
         <div className="close-btn" onClick={onClick}>
Close
        </div>
    </Container>
  );
}

export default withRouter(SideBar);
