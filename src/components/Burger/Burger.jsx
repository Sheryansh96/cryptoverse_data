import React, { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import './Burger.css'


const Burger = (props) => {
  const [open, setOpen] = useState(false)

  const handleClick = () =>{
    props.nav_handle()
  }
  
  return (
        <div className='burger-container'>
        <div className = 'icon' onClick={handleClick}>
         <MenuIcon fontSize="large"/>
         </div>
        </div>
  )
}

export default Burger