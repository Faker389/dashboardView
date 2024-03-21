import { useEffect, useRef, useState } from "react";
import ChartComponent from "./chart";
import { getChartInfo } from "../globalVariables/fetchFunctions";
import { cookieData } from "../globalVariables/cookies";
interface topValueElementParams{
    paragraph:string;
    emotka:string;
    amount:string;
    text:string;
}
function Tops(params:topValueElementParams){
    return<div className="feedback">
        <i className={params.emotka}></i>
        <div className="feedbackRight">
            <p>{params.paragraph}</p>
            <h1>{params.amount}</h1>    
        </div>
        <div className="feedbackBottom">
            {params.text}
        </div>
    </div>
}
interface topValueParams{
    customers:string;
    income:string;
    rating:string;
    days:string;
}
export default function Statistics(){
    const [arr,setArr]= useState<any>([])
    const [topValues,setTopValues]=useState<topValueParams>({
        customers:"",
        income:"",
        rating:"",
        days:"",
    })
    const info=useRef<any>({
            message1:<h5>Ponad <span style={{fontWeight:"bold"}}>{topValues.customers}</span> zadowolonych klientów z usług naszego serwisu</h5>,
            message2:<h5>Ponad <span style={{fontWeight:"bold"}}>{topValues.income}</span> przychodu z ostatniego miesiąca</h5>,
            message3:<h5>Klienci średnio oceniają nasz serwis na <span style={{fontWeight:"bold"}}>{topValues.rating}</span> gwiazdki</h5>,
            message4:<h5>Twój sprzęt będzie gotowy przed upływem <span style={{fontWeight:"bold"}}>{topValues.days}</span></h5>
    })
    useEffect(()=>{
        getChartInfo().then(e=>{
            setTopValues(e.response1)
            setArr(e.response2)
        })
    },[])
    console.log(cookieData)
    return<>
    <div className="right dashboard">
        <Tops paragraph="Klienci" emotka="fa-regular fa-user" amount={topValues.customers} text={info.current.message1} />
        <Tops paragraph="Przychód" emotka="fa-solid fa-chart-line" amount={topValues.income} text={info.current.message2} />
        <Tops paragraph="Ocena" emotka="fa-regular fa-star" amount={topValues.rating} text={info.current.message3} />
        <Tops paragraph="Termin" emotka="fa-regular fa-calendar-days" amount={topValues.days} text={info.current.message4} />
        <div className="wykres">
        < ChartComponent data={arr} />
        </div>
    </div>
    </>
}