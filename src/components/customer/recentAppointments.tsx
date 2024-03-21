import { useEffect, useState } from "react";
import Profil from "./profilComponent";
import { customerCompanyParams, customerCompanyParamsStatus, deleteApointment, getEmployeeProfilInfo, getServiceFeedback, payService } from "../globalVariables/fetchFunctions";

interface returnedData{
    price:number;
    serviceInfo:string;
}
interface position{
    x:number;
    y:number;
}
interface apointments{
    service_ID:number;
    productName:string;
    problem:string;
    comeDate:string;
    status:string;
    personalia:string;
    ID_pracownika:number|null;
}
interface response{
    zamowienia:string;
    rating:string;
    klienci:number;
    username:string;
    aboutMe:string;
    pfp:string;
    bgp:string;
}
export default function RecentAppointment(){
    const [openWindow,setOpenWindow]=useState<boolean>(false)
    const [showSelect,setShowSelect]=useState<boolean>(false)
    const [showWindow,setShowWidnow]=useState<boolean>(false)
    const [serviceID,setServiceID]=useState<number>()
    const [data,setData] =useState<response>()
    const [position,setPosition]=useState<position>({
        x:0,
        y:0
    })
    const [appointments,setAppointments]=useState<Array<JSX.Element>|null>(null)
    function handleDeleteApointment(ID:number){
        deleteApointment(ID).then(e=>{
            window.location.reload()
        })
   }
   function handleMouse(event:React.MouseEvent<HTMLElement>,ID:number|null){
    setUsedID(ID);
    setOpenWindow(true)
    var obj = {
        x:event.pageX,
        y:event.pageY
    }
    setPosition(obj)
}
    const [usedID,setUsedID]=useState<any>(0)
    const [returnedData,setReturnedData] = useState<returnedData>()
    function createAppointments(data:Array<apointments>){
        var oldApointments = data.map((e:apointments)=>{
            return <tr key={e.service_ID}>
                    <td>{e.productName}</td>
                    <td>{e.problem}</td>
                    <td>{e.comeDate}</td>
                    <td className="person">
                        {e.personalia}
                        {e.personalia!=="noone"?
                        <i onMouseOver={(ev)=>handleMouse(ev,e.ID_pracownika)}
                            className="fa-solid fa-info"></i>:""}</td>
                    <td className="i">
                     {e.status}
                     {e.status==="New"?<button onClick={()=>handleDeleteApointment(e.service_ID)}>
                         <i className="fa-solid fa-x"></i></button>:
                         e.status==="Ready"?<button onClick={()=>{setServiceID(e.service_ID);setShowWidnow(true)}}><i className="fa-solid fa-check"></i></button>:""}
                     </td>
                    </tr>
            })
            setAppointments(oldApointments)
    }
    function handleStatusSelect(e:any){
        setShowSelect(false)
        customerCompanyParamsStatus(e.target.textContent).then(e=>{
            createAppointments(e)
        })
      }
      function handlePay(){
        payService(serviceID).then(e=>{
            window.location.reload()
        })
      }
      useEffect(()=>{
        getServiceFeedback(serviceID).then(e=>{
            setReturnedData(e)
        })
       },[serviceID])
       useEffect(()=>{
        getEmployeeProfilInfo(usedID).then(e=>{
            setData(e)
           })
       },[usedID])
       useEffect(()=>{
        customerCompanyParams().then((el)=>{
            createAppointments(el.data2)
            })
        },[])
       
    return <>
     <div className="recentApointments col-start-1 col-end-2 row-start-4 row-end-6">
     <div className="claimWindow" style={{display:showWindow===true?"block":'none'}}>
            <div className="claimInfo">
                <h1>Service Feedback</h1>
                <i className="fa-solid fa-x" onClick={()=>setShowWidnow(false)}></i>
                <div>
                <span>Price:</span>
                <h2>{returnedData?.price}</h2>
                </div>
                <div>
                <span>Service Feedback</span>
                <h2>{returnedData?.serviceInfo}</h2>
                </div>
                <input type="button" onClick={()=>handlePay()} value="Pay" />
            </div>
        </div>
            <p>Your Appointments</p>
                {appointments&&<table>
                    <tr><td>Product</td><td>Problem</td><td>Date</td><td>Taken By</td><td onMouseOver={()=>{setShowSelect(true)}} >Status
                        <select size={5} onMouseOut={()=>setShowSelect(false)} className="opcje" style={{display:showSelect===true?"block":"none"}}>
                            <option onClick={handleStatusSelect} value="All">All</option>
                            <option onClick={handleStatusSelect} value="New">New</option>
                            <option onClick={handleStatusSelect} value="In service">In service</option>
                            <option onClick={handleStatusSelect} value="Ready">Ready</option>
                            <option onClick={handleStatusSelect} value="Claimed">Claimed</option>
                        </select></td></tr>
                    {appointments}
                    </table>}
        </div>
        {data&&openWindow&&<Profil position={position} data={data} fkc={setOpenWindow} />}
        </>
}