import {useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css'
import { removeCookie } from '../globalVariables/cookies';
function checkPath(path:string){
    switch(path){
        case '/dashboard/Employee/Statistics':return 0
        case '/dashboard/Employee/profile':return 1
        case '/dashboard/Employee/newAppointments':return 2
        case '/dashboard/Employee/service':return 3
        default :return 0
    }
}
export default function PanelEmployee(){
    const [selected,setSelect]=useState<number>(0)
    useMemo(()=>{
        setSelect(checkPath(window.location.pathname))
    },[])
    return<div className="left p2">
        <Link to="/dashboard"><h1 onClick={()=>setSelect(0)}>Serwis AGD</h1></Link>
        <hr />
        <ul>
            <div className='tringle' style={{ top:`${47*selected-4}px`}}></div>
            <Link to="/dashboard/Employee/Statistics"><li className={selected===0?"selected":""} onClick={(e)=>setSelect(0)}><i className="fa-solid fa-chart-line"></i>Dashboard</li></Link>
            <Link to="/dashboard/Employee/profile"><li className={selected===1?"selected":""} onClick={(e)=>setSelect(1)}><i className="fa-regular fa-user"></i>Your Profile</li></Link>
            <Link to="/dashboard/Employee/newAppointments"><li className={selected===2?"selected":""} onClick={(e)=>setSelect(2)}><i className="fa-regular fa-calendar-check"></i>New Apointments</li></Link>        
            <Link to="/dashboard/Employee/service"><li className={selected===3?"selected":""} onClick={(e)=>setSelect(3)}><i className="fa-solid fa-screwdriver-wrench"></i>Service</li></Link>        
        </ul> 
        <div className='foot'>
        <Link to="/login" onClick={()=>removeCookie("userData")}><input type='button' className='logoutButton' value="Log out" /></Link>
        </div>
    </div>
}