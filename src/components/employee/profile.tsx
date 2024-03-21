import React,{useState,useEffect, useRef } from "react"
import LeftProfil from "./leftProfil";
import RightPanel from "./userProfilCp";
import { getEmployeeCustomers, sendEmailToCustomer, updateAuthPass,emailParams } from "../globalVariables/fetchFunctions";
interface clientParams{
    personalia:string;
    pfp:string;
    email:string;
}
interface memberParams{
    src:string;
    name:string;
    fkc:Function;
    setEmail:Function;
    email:string;
}
const Member = (e:memberParams)=>{
    return<div className="member">
        {e.src!==null?
        <img alt="phot" src={e.src} />:
        <div className="picture"></div>    
        }
        <div className="status">
            <p>{e.name}</p>
        </div>
        <i className="fa-solid fa-envelope" onClick={()=>{e.fkc(true);e.setEmail(e.email)}}></i>
    </div>
}
export default function Profile(){
    const [customers,setCustomers]=useState<JSX.Element>()
    const [authPassword,setAuthPassowrd]=useState<string|null>()
    const [displayWindow,setdisplayWindow]=useState<boolean>(false)
    const [customerEmail,setcustomerEmail]=useState<string>("")
    const [employeeEmail,setEmployeeEmail]=useState<string>("")
    const passRef = useRef<HTMLInputElement|null>(null)
    const inputRef= useRef<HTMLInputElement|null>(null)
    const txtRef= useRef<HTMLTextAreaElement|null>(null)
    useEffect(()=>{
        getEmployeeCustomers().then(el=>{
            setAuthPassowrd(el[el.length-1].pfp)
            setEmployeeEmail(el[el.length-1].email)
            const klienci =el.map((e:clientParams,index:number)=>{
                if(index===el.length-1){
                    return ""
                }
                return <Member name={e.personalia} src={e.pfp} email={e.email} fkc={setdisplayWindow} setEmail={setcustomerEmail}/>
            })
            setCustomers(klienci)
        })
    },[])
    function handleAuthPassUpdate(){
        setAuthPassowrd(passRef.current?.value)
        setdisplayWindow(false)
        updateAuthPass(passRef.current?.value)
    }
    function handleEmailSend(){
        var emailParamsobj = {
            from:employeeEmail,
            to:customerEmail,
            title:inputRef.current?.value,
            message:txtRef.current?.value,
            auth:authPassword
        } as emailParams
        sendEmailToCustomer(emailParamsobj).then(e=>{
            setdisplayWindow(false)
        })
    }
    return<>
    <div className="right profile">
    <div className="mailWindow" style={displayWindow===true&&authPassword?{display:"block"}:{display:"none"}}>
        <div className="mailForm">
            <i className="fa-solid fa-x" onClick={()=>{setdisplayWindow(false)}}></i>
            <h1>Send Email</h1>
            <span>From</span>
            <input type="text" value={employeeEmail} readOnly />
            <span>To</span>
            <input type="text" value={customerEmail} readOnly />
            <span>Title</span>
            <input ref={inputRef} minLength={4} type="text" />
            <span>Message</span>
            <textarea name="" minLength={4} ref={txtRef} id=""></textarea>
            <input type="button" value="Send" onClick={handleEmailSend} />
        </div>
    </div>
        <LeftProfil />
        <RightPanel />
        <div className="leftMembers">
    <div className="authConfirm"  style={displayWindow===true&&authPassword===null?{display:"block"}:{display:"none"}}>
    <i className="fa-solid fa-x" onClick={()=>{setdisplayWindow(false)}}></i>
    <p>If you want to use this function you need to provide your Gmail password or auth token</p>
    <input type="text" ref={passRef} /> <input type="button" value="Send"  onClick={handleAuthPassUpdate}/>
    </div>
            <h2>Klienci</h2>
            <div className="gridMembers">
                {customers}
            </div>
        </div>
    </div>
    </>
}