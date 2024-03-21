import { useEffect, useRef,useState,ChangeEvent } from "react";
import { getEmployeeProfilInfo, updateUserPhotos } from "../globalVariables/fetchFunctions";
import { cookieData } from "../globalVariables/cookies";
interface date{
    pfp:string;
    bgp:string;
    username:string;
    aboutMe:string;
    zamowienia:string;
    rating:string;
    klienci:string;
}
export default function LeftProfil(){
    const [data,setData]=useState<date>(
        { pfp:"",
            bgp:"",
            username:"",
            aboutMe:"",
            zamowienia:"",
            rating:"",
            klienci:""
        }
    )
    const pfpRef = useRef<HTMLImageElement | null>(null);
    const bgRef = useRef<HTMLImageElement | null>(null);
    const input1 = useRef<HTMLInputElement|null>(null)
    const input2 = useRef<HTMLInputElement|null>(null)
    function handleClick(nr:number){
        if(nr===1){
            input1.current?.click()
        }else{
            input2.current?.click()
        }
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>,nr:number) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
          const file = fileList[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            if(nr===1){
                if (bgRef.current) {
                    bgRef.current.src = e.target?.result as string;
                    updateUserPhotos("bg",bgRef.current.src)
                  }
            }else{
                if (pfpRef.current) {
                    pfpRef.current.src = e.target?.result as string;
                    updateUserPhotos("pfp",pfpRef.current.src)
                }
            }
          };
          reader.readAsDataURL(file);
        }
      };
      useEffect(()=>{
        getEmployeeProfilInfo(cookieData?.user_ID).then(e=>{
            setData(e)
        })        
      },[])
    return<div className="leftProfil">
    <input type="file" ref={input1} style={{display:"none"}} name="" id="" onChange={(e)=>handleFileChange(e,1)} />
    <input type="file" ref={input2} style={{display:"none"}} name="" id="" onChange={(e)=>handleFileChange(e,2)} />
        <div className="leftProfilTop">
        <i className="fa-solid fa-plus" onClick={()=>{handleClick(1)}}></i>
        <img alt="phot" src={data.bgp} ref={(ref) => (bgRef.current = ref)} />
            <div className="user">
                <div className="bg">
                <i className="fa-solid fa-plus" onClick={()=>{handleClick(2)}}></i>
                <img alt="phot" src={data.pfp} ref={(ref) => (pfpRef.current = ref)} />
                </div>
            </div>
        </div>
        <div className="leftProfilBottom">
            <div className="leftProfileData">
                <h2 >{data.username} </h2>
                <p className="about">{data.aboutMe}</p>
                <hr />
                <div className="things">
                    <div>
                        <p>{data.zamowienia}</p>
                        <span>Services</span>
                    </div>
                    <div>
                        <p>{data.rating}</p>
                        <span>Rating</span>
                    </div>
                    <div>
                        <p>{data.klienci}</p>
                        <span>Clients</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}