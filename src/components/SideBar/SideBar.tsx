import React from "react";
import styled from "styled-components";
import { withRouter,RouteComponentProps } from "react-router-dom";
import { checkAdmin } from "../../helpers/authHelper";
import pic from "./../../static/images/close.svg";

const Container = styled.div`
position:fixed;
left:0;
top:110px;
font-size:20px;
  transform:translateX(${props => props.theme.position}%);
  transition: transform 0.3s ease-out;
  z-index:100;
  height:100vh;
  width:100%;
  color:#0c0663;
  .sidebar{
  height:100vh;
    cursor:pointer;
    margin:0;
    padding-top:20px;
    padding-left:10px;
    list-style-type:none;
    width:50%;
    heigth:100%;
    background-color:#e3e87ae6;    
    
  }
  .open{
    transform:translateX(0);
  }

  .close-btn{
    cursor:pointer;
   position:absolute;
   height:17px;
   width:17px;
   right:18%;
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
  const {history, onClick, isOpen}=props;
 const theme={
   position: isOpen? 0 : -100
 }

  return (
    <Container theme={theme}>   
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
           <img src={pic} className="close-btn" onClick={onClick}/>       
        </ul>   
      
    </Container>
  );
}

export default withRouter(SideBar);
