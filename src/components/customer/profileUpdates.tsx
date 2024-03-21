import { useEffect, useRef,useState } from "react";
import Button from "../readyComponents/Button";
import {cookieData,} from "../globalVariables/cookies";
import { getCustomerProfilDataUpdates, updateCustomerData } from "../globalVariables/fetchFunctions";

export default function RightPanel(){
    const [warunek,setWarunek]=useState<boolean>(false)
    const [data,setData]=useState<Array<string>>(Array(9).fill(""))
    const [checkedStar,setCheckedStar]=useState<number>(1)
    const [emailConfirmMessage,setEmailConfirmMessage] = useState<string|null>()
    const refArray = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    const txtRef =useRef<HTMLTextAreaElement>(null)
    useEffect(()=>{
        getCustomerProfilDataUpdates().then(e=>{
            setCheckedStar(parseFloat(e.rating))
            setData(Object.values(e))
        })
    },[])
    const updateFields = (e:any, index: number) => {
        setWarunek(true)
        const newData = [...data];
        newData[index] = e.target.value;
        setData(newData);
      };
      function makeArray(){
        var arr = []
        for(var x=0;x<refArray.length;x++){
            arr.push(refArray[x].current?.value)
        }
        arr.push(txtRef.current?.value)
        arr.push(checkedStar)
        arr.push(cookieData?.user_ID)
        return arr
    }
    function handleUpdateData(){
        if(!warunek){
            setEmailConfirmMessage("Data haven't changed");
            return 0;
        }
        const arr = makeArray()
        setEmailConfirmMessage("")
        updateCustomerData(arr,data[0]).then(e=>{
            setEmailConfirmMessage("Confirm data change on your email")
        }).catch(e=>{
            setEmailConfirmMessage("Something went wrong with sending conifrmation email")
        })
        
    }
    return <div className="rightData">
        <h2 className="col-start-1 col-end-7" >{emailConfirmMessage}</h2>
    <div className="col-start-1 col-end-4">
        <p>Email</p>
        <input className=" read" value={data[0]} type="text"   readOnly  />
    </div>
    <div className="col-start-4 col-end-7"  >
        <p>Username</p>
        <input  value={data[1]}  type="text" ref={refArray[0]} onInput={(e)=>{updateFields(e,1)}} />
    </div>
    <div className="col-start-1 col-end-4">
        <p>First Name</p>
        <input  value={data[2]}  type="text" ref={refArray[1]}  onInput={(e)=>{updateFields(e,2)}}/>
    </div>
    <div className="col-start-4 col-end-7">
        <p>Last Name</p>
        <input  value={data[3]}  type="text" ref={refArray[2]} onInput={(e)=>{updateFields(e,3)}}/>
    </div>
    <div className="col-start-1 col-end-3">
        <p>Country</p>
        <input value={data[4]}  type="text"  ref={refArray[3]} onInput={(e)=>{updateFields(e,4)}}/>
    </div>
    <div className="col-start-3 col-end-5">
        <p>City</p>
        <input value={data[5]}  type="text"   ref={refArray[4]} onInput={(e)=>{updateFields(e,5)}}/>
    </div>
    <div className="col-start-5 col-end-7">
        <p>Post Code</p>
        <input value={data[6]}  type="text"  ref={refArray[5]} onInput={(e)=>{updateFields(e,6)}}/>
    </div>
    <div className="col-start-1 col-end-4">
        <p>Number</p>
        <input  value={data[7]} readOnly className="read"  type="text" />
    </div>
    <div className="col-start-4 col-end-7">
        <p>Rating</p>
        <div className="stars">
            {Array.from({length:10}).map((e,index)=>{
                return <i onClick={()=>{setCheckedStar((index+1)/2)}} key={(index+1)/2} className={checkedStar<(index+1)/2?"fa-regular fa-star":"fa-solid fa-star"}></i>
            })}
        </div>
    </div>
    <div className="col-start-1 col-end-7 area" >
        <p>About me</p>
        <textarea  ref={txtRef} value={data[9]} onInput={(e)=>{updateFields(e,9)}} maxLength={30}></textarea>
        <p className="words">{data[9]&&data[9].length}/30</p>
    </div>
        <Button fkc={handleUpdateData} val="Update Data"  />
</div>
}