
// Sidebar
import React from 'react'
import {Link} from "react-router-dom"
import { EyeOutlined } from '@ant-design/icons'
import { Drawer, List, Button } from 'antd';
import style from './style.module.scss'

function Sidebar({open, onClose}) {
    
    return (
        
       <Drawer   
            className={style.drawer}  
            title={<Link  to="/" >
            <img 
               className={style.logo} 
                src='../assets/images/Logo.png' alt='Logo' />
            </Link>}
                placement="top"
                onClose={onClose}
                visible={open} >
            <List className={style.FavVisBtn}>
                <Link  to="/favorites" >                 
                    <Button className={style.favorit}> ❤ Fovarit </Button>
                </Link>
                <Link to="/visited"  >
                    <Button  className={style.watch}><EyeOutlined />Watch</Button>
                </Link>
            </List>
        </Drawer>
    )
}

export default Sidebar
