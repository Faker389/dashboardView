import { useEffect, useRef,useState } from "react";
import Button from "../readyComponents/Button";
import { cookieData } from "../globalVariables/cookies";
import { getEmployeeProfilDataUpdates, updateEmployeeData } from "../globalVariables/fetchFunctions";
export default function RightPanel(){
    const [warunek,setWarunek]=useState<boolean>(false)
    const [data,setData]=useState<Array<string>>(Array(9).fill(""))
    const refArray = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    useEffect(()=>{
        getEmployeeProfilDataUpdates().then((e)=>{
            setData(Object.values(e))
        })
    },[])
    const txtRef =useRef<HTMLTextAreaElement>(null)
    const [emailConfirmMessage,setEmailConfirmMessage] = useState<string|null>()
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
        arr.push(cookieData?.user_ID)
        return arr
    }
    function handleUpdateData(){
        if(!warunek){
            setEmailConfirmMessage("Data haven't changed");
            return 0;
        }
        var arr = makeArray()
        updateEmployeeData(arr,data[2]).then(e=>{
            setEmailConfirmMessage("Confirm data change on your email")
        }).catch(e=>{
            setEmailConfirmMessage("Something went wrong with sending conifrmation email")
        })
    }
    return <div className="rightData">
        <h2 className="col-start-1 col-end-7" >{emailConfirmMessage}</h2>
    <div className="col-start-1 col-end-3">
        <p>Company</p>
        <input className=" read" value={data[0]} type="text"   readOnly  />
    </div>
    <div className="col-start-3 col-end-5">
        <p>Username</p>
        <input  value={data[1]}  type="text" ref={refArray[0]} onInput={(e)=>{updateFields(e,1)}} />
    </div>
    <div className="col-start-5 col-end-7">
        <p>Email address</p>
        <input className=" read"  value={data[2]} type="text"   readOnly  />
    </div>
    <div className="col-start-1 col-end-4">
        <p>First Name</p>
        <input  value={data[3]}  type="text" ref={refArray[1]}  onInput={(e)=>{updateFields(e,3)}}/>
    </div>
    <div className="col-start-4 col-end-7">
        <p>Last Name</p>
        <input  value={data[4]}  type="text" ref={refArray[2]} onInput={(e)=>{updateFields(e,4)}}/>
    </div>
    <div className="col-start-1 col-end-7">
        <p>Company Address</p>
        <input className=" read" value={data[5]}  type="text"  readOnly   />
    </div>
    <div className="col-start-1 col-end-4">
        <p>Number</p>
        <input  value={data[6]}  type="text" ref={refArray[3]} onInput={(e)=>{updateFields(e,6)}}/>
    </div>
   
    <div className="col-start-4 col-end-7">
        <p>Company Number</p>
        <input className=" read" value={data[7]}  type="text" readOnly  />
    </div>
    <div className="col-start-1 col-end-7 area" >
        <p>About me</p>
        <textarea  ref={txtRef} value={data[8]} onInput={(e)=>{updateFields(e,8)}} maxLength={30}></textarea>
        <p className="words">{data[8]&&data[8].length}/30</p>
    </div>
    <Button fkc={handleUpdateData} val="Update Data" />
</div>
}