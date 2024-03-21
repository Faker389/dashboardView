interface data{
    fkc:Function;
    val:string
}
export default function Button({fkc,val}:data){
    return <input type="button"  value={val}  onClick={()=>fkc()} className="but"/>
       
}