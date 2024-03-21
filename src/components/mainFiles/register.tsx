import {useState,} from 'react';
import '../../styles/style.css'
import RegisterCustomer from './registerCustomer';
import RegisterEmployee from './registerEmployee';
import Cookies from 'js-cookie';
export const removeCookie = (key: string): void => {
  Cookies.remove(key);
};
export default function Register(){
    const [shown,setShown] = useState(1)
    removeCookie("userData")
    return <div className="register"> 
      <div className='container'>
        <div className='options'>
          <button className="button" onClick={()=>{setShown(1)}}  >
            <div className="background" />
              <div className="content"  style={{background:shown===1?"transparent":""}}>
                Register Customer
              </div>
          </button>
        <button className="button" onClick={()=>{setShown(2)}}>
          <div className="background" />
            <div className="content"  style={{background:shown===2?"transparent":""}}>
              Register Employee
            </div>
        </button>
      </div>
      {shown===1?<RegisterCustomer />:<RegisterEmployee />}
    </div>
    </div>
}