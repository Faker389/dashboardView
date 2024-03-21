import { useEffect, useRef, useState } from "react"
import Button from "../readyComponents/Button";
import {sendServiceFeedback, getEmployeeApointments } from "../globalVariables/fetchFunctions";
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
    refer:Function;
    fk:Function
}
function RenderZamowienia({data,refer,fk}:drugi){
    return<tr key={data.service_ID}>
        <td>{data.person}</td>
        <td>{data.productName}</td>
        <td>{data.problem}</td>
        <td>{data.comeDate}</td>
        <td>{data.status}</td>
        <td><Button val="Claim" fkc={()=>{refer(data.service_ID);fk(true)}} /></td>
    </tr>
}
export default function Service(){
    const [zamowienia,setZamowienia]= useState<Array<JSX.Element>>()
    const [showWindow,setShowWidnow]=useState<boolean>(false)
    const [error,setError]=useState<string>("")
    const fedBackRef = useRef<HTMLTextAreaElement>(null)
    const pricekRef = useRef<HTMLInputElement>(null)
    const [ID,setID] = useState<number>()
    useEffect(()=>{
        getEmployeeApointments("In service").then(el=>{
            const mapa =el.map((e:objekt)=>{
                return <RenderZamowienia data={e} refer={setID} fk={setShowWidnow} />
            })
            setZamowienia(mapa)
        })
    },[])
    function handleFeedbac(){
        setError("")
        if(pricekRef.current?.value.trim().length===0||fedBackRef.current?.value.trim().length===0){
            setError("Fields cannot be empty")
            return 0
        }
        sendServiceFeedback(pricekRef.current?.value,fedBackRef.current?.value,ID).then(e=>{
            setShowWidnow(false);
            window.location.reload()
        })
    }
    return <div className="right service">
        <div className="claimWindow" style={{display:showWindow===true?"block":'none'}}>
            <div className="claimInfo">
                <p className="error">{error}</p>
                <h1>Service Feedback</h1>
                <i className="fa-solid fa-x" onClick={()=>setShowWidnow(false)}></i>
                <div>
                <span>Price:</span>
                <input ref={pricekRef} type="number" min={1} name="" id="" />
                </div>
                <div>
                <span>What was fixed</span>
                <textarea ref={fedBackRef} name="" id=""  ></textarea>
                </div>
                <input type="button" onClick={handleFeedbac} value="Send" />
            </div>
        </div>
        <table>
            <tr><td>Customer</td><td>Product</td><td>Problem</td><td>Come Date</td><td>Status</td><td>Claim</td></tr>
            {zamowienia}
        </table>
    </div>
}