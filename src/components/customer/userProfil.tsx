import { useEffect, useRef,useState,ChangeEvent } from "react";
import { getCustomerProfilData, updateUserPhotos } from "../globalVariables/fetchFunctions";
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
    const input1 = useRef<HTMLInputElement>(null)
    const input2 = useRef<HTMLInputElement>(null)
    function handleClick(nr:number){
        if(nr===1){
            input1.current?.click()
        }else{
            input2.current?.click()
        }
    }
    useEffect(()=>{
        getCustomerProfilData().then(e=>{
            setData(e)
        })
    },[])
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
            }else if(nr===2){
                if (pfpRef.current) {
                    console.log('dfa')
                    pfpRef.current.src = e.target?.result as string;
                    updateUserPhotos("pfp",pfpRef.current.src)
                }
            }
          };
          reader.readAsDataURL(file);
        }
      };
    return<div className="leftProfil row-start-2 row-end-3">
    <input type="file" ref={input1} style={{display:"none"}} name="" id="" onChange={(e)=>handleFileChange(e,1)} />
    <input type="file" ref={input2} style={{display:"none"}} name="" id="" onChange={(e)=>handleFileChange(e,2)} />
        <div className="leftProfilTop">
        <i className="fa-solid fa-plus" onClick={()=>{handleClick(1)}}></i>
        {data.bgp&&<img alt="phot" src={data.bgp} ref={(ref) => (bgRef.current = ref)} />}
            <div className="user">
                <div className="bg">
                <i className="fa-solid fa-plus" onClick={()=>{handleClick(2)}}></i>
                {data.pfp&&<img alt="phot" src={data.pfp} ref={(ref) => (pfpRef.current = ref)} />}
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
                        <span>Zamówień</span>
                    </div>
                    <div>
                        <p>{data.rating}</p>
                        <span>Ocena</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}