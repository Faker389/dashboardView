interface response{
    zamowienia:string;
    rating:string;
    klienci:number;
    username:string;
    aboutMe:string;
    pfp:string;
    bgp:string;
}
interface mainData{
    data:response;
    fkc:Function;
    position:position
}    
interface position{
    x:number;
    y:number;
}
export default function Profil({data,fkc,position}:mainData){
    return<div className="leftProfil absolut"  style={{top:`${position.y-415}px`,left:`${position.x-435}px`}}>
        <div className="leftProfilTop">
        <i className="fa-solid fa-x" onClick={()=>fkc(false)}></i>
        {data.bgp&&<img alt="phot" src={data.bgp} />}
            <div className="user">
                <div className="bg">
                {data.pfp&&<img alt="phot" src={data.pfp}/>}
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