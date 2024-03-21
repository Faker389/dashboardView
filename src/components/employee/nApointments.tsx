import { useEffect, useState } from "react"
import Button from "../readyComponents/Button";
import { getEmployeeApointments, takeCase } from "../globalVariables/fetchFunctions";
interface objekt{
    service_ID:number;
    comeDate:string;
    person:string;
    problem:string;
    productName:string;
    status:string;
}
interface drugi{
    data:objekt;
}
function RenderZamowienia({data}:drugi){
    return<tr key={data.service_ID}>
        <td>{data.person}</td>
        <td>{data.productName}</td>
        <td>{data.problem}</td>
        <td>{data.comeDate}</td>
        <td>{data.status}</td>
        <td><Button val="take" fkc={()=>{takeCase(data.service_ID).then(e=>{window.location.reload()})}} /></td>
    </tr>
}
export default function NewAppointments(){
    const [zamowienia,setZamowienia]= useState<Array<JSX.Element>>()
    useEffect(()=>{
        getEmployeeApointments("New").then(el=>{
            const mapa =el.map((e:objekt)=>{
                return <RenderZamowienia data={e} />
            })
            setZamowienia(mapa)
        })
    },[])
    return <div className="right service">
        <table>
            <tr><td>Customer</td><td>Product</td><td>Problem</td><td>Come Date</td><td>Status</td><td>Take case</td></tr>
            {zamowienia}
        </table>
    </div>
}