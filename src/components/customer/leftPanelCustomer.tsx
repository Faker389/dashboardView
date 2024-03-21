import {useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css'
import { removeCookie } from '../mainFiles/register';
function checkPath(path:string){
    switch(path){
        case '/dashboard/Customer/Profile':return 0
        case '/dashboard/Customer/Apointment':return 1
        default :return 0
    }
}
export default function PanelCustomer(){
    const [selected,setSelect]=useState<number>(0)
    useMemo(()=>{
        setSelect(checkPath(window.location.pathname))
    },[selected])
    return<div className="left p1">
        <Link to="/dashboard"><h1 onClick={()=>setSelect(0)}>Serwis AGD</h1></Link>
        <hr />
        <ul>
            <div className='tringle' style={{ top:`${47*selected-4}px`}}></div>
            <Link to="/dashboard/Customer/Profile"><li className={selected===0?"selected":""} onClick={(e)=>setSelect(0)}><i className="fa-regular fa-user"></i>Profile</li></Link>
            <Link to="/dashboard/Customer/Apointment"><li className={selected===1?"selected":""} onClick={(e)=>setSelect(1)}><i className="fa-regular fa-calendar-check"></i>Make Apointment</li></Link>
        </ul>
        <div className='foot'>
        <Link to="/login" onClick={()=>removeCookie("userData")}><input type='button' className='logoutButton' value="Log out" /></Link>
        </div>

    </div>
}