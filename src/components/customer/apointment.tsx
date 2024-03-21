import { useEffect, useState,useRef } from "react"
import Button from "../readyComponents/Button";
import {cookieData} from "../globalVariables/cookies";
import {getCompanies, makeApointment } from "../globalVariables/fetchFunctions";
import RecentAppointment from "./recentAppointments";
interface companyInterface{
    ID:number;
    name:string;
    adres:string;
}

export default function Apointment(){
    const [tableDataCompany,setTableDataCompany]=useState<any>()
    const [companyID,setCompanyID]=useState<number>(1)
    const [resp,setresp]=useState<Array<companyInterface>>([])
    const problemRef = useRef<HTMLTextAreaElement|null>(null)
    const productRef = useRef<HTMLTextAreaElement|null>(null)
    function handleMakeApointment(){
        var objekt={
            productName:productRef.current?.value,
            problem:problemRef.current?.value,
            customer_ID:cookieData?.user_ID,
            companyID:companyID,
        }
        makeApointment(objekt).then(e=>{
            window.location.reload()
        })
    }
  
    useEffect(()=>{
        getCompanies().then(e=>{
            setresp(e)
        })
    },[])
   useEffect(()=>{
    const companies = resp?.map((e: companyInterface) => (
        <tr
          onClick={() => {
            setCompanyID(e.ID);
          }}
          className={e.ID === companyID ? "selectedCompany" : ""}
          key={e.ID}
        >
          <td>{e.name}</td>
          <td>{e.adres}</td>
        </tr>
      ));
        setTableDataCompany(companies)
   },[companyID,resp])
  
    return <div className="right apointment">
        <div className="apointmentForm col-start-1 col-end-2 row-start-1 row-end-4">
            <div className="col-start-1 col-end-5 firmy row-start-1 row-end-3">
                <p >Select Company</p>
                {tableDataCompany&&
                    <table >
                    <tr><td>Company Name</td><td>Company Adress</td></tr>
                    {tableDataCompany}
                    </table>
                }
            </div>
            <div className=" row-start-3 row-end-6 col-start-1 col-end-3 ">
                <span>Product Name</span>
               <textarea ref={productRef}></textarea>
            </div>
            <div className=" row-start-3 row-end-6 col-start-3 col-end-5 " >
                <span>Problem</span>
                <textarea ref={problemRef}></textarea>
            </div>
            <div className="col-start-3 col-end-4">
                <Button fkc={handleMakeApointment} val="Make Apointment" />
            </div>
        </div>
        <RecentAppointment />
    </div> 
}