import RightPanel from "./profileUpdates"
import LeftProfil from "./userProfil"
export default function ProfileCustomer(){
    return<div className="right profile">
        <LeftProfil />
        <RightPanel />
    </div>
}