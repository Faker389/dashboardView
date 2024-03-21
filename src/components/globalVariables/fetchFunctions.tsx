import { cookieData } from "./cookies"
interface makeApointmentInterface{
    productName:string|undefined;
    problem:string|undefined;
    customer_ID:number|undefined;
    companyID:number|undefined;
}
export interface emailParams{
    from:string|undefined;
    to:string|undefined;
    title:string|undefined;
    message:string|undefined;
    auth:string|undefined;
}
   export async function customerCompanyParams(){
    try{

        const request = await fetch("http://localhost:8000/customerCompanyList",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export async function customerCompanyParamsStatus(status:string){
    try{

        const request = await fetch("http://localhost:8000/customerCompanyListStatus",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID,status:status})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export async function makeApointment(objekt:makeApointmentInterface){
    try{
        await fetch("http://localhost:8000/makeApointment",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(objekt)
        })
        return true
    }catch(err){
        return err
    }
}
export async function deleteApointment(ID:number){
    try{
        await fetch("http://localhost:8000/deleteApointment",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:ID})
        })
    }catch(err){
        return err
    }
}
export async function updateUserPhotos(photo:string,url:string){
    try{

        const request = await fetch('http://localhost:8000/updatePhoto',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                photo:photo,
                url:url,
                ID:cookieData?.user_ID
            })
        })
        const respones = await request.json()
        return respones
    }catch(err){
        return err
    }
}
export async function getCustomerProfilData() {
    try{

        const request = await fetch("http://localhost:8000/customerProfilInfo",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export  async function getCustomerProfilDataUpdates() {
    try{

        const request = await fetch("http://localhost:8000/customerfeedback",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export async function updateCustomerData(arr:Array<string|number|undefined>,email:string|null){
    try{
        await fetch("http://localhost:8000/updateProfilCustomer",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({arr:arr,email:email})
        })
        return true
    }catch(err){
        return err
    }

}
export async function getEmployeeProfilInfo(ID:number|undefined) {
    try{

        const request = await fetch("http://localhost:8000/employeeProfilInfo",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export async function takeCase(takenServiceID:number){
    try {
        await fetch("http://localhost:8000/takeCase",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({caseID:takenServiceID,userID:cookieData?.user_ID})
        })
        return true
    } catch (err) {
       return err
    }
}    
export async function getEmployeeApointments(status:string){
    try{

        const request = await fetch('http://localhost:8000/employeeAppointments',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify({ID:cookieData?.company_ID,status:status})
        })
        const respones = await request.json()
        return respones        
    }catch(err){
        return err
    }
}
export async function getEmployeeCustomers() {
    try{
        const request = await fetch("http://localhost:8000/employeesCustomersList",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        return err
    }
}
export async function updateAuthPass(authPass:string|undefined){
    try{
        await fetch("http://localhost:8000/updateAuthPass",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({pass:authPass,ID:cookieData?.user_ID})
        })
        return true
    }catch(err){
        return err
    }
}
export async function sendEmailToCustomer(objekt:emailParams){
    try{
        await fetch("http://localhost:8000/sendEmail",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(objekt)
        })
        return true

    }catch(err){
        console.log(err)
    }
}
export async function getChartInfo(){
    try{
        
        const request = await fetch('http://localhost:8000/chartInfo',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.company_ID})
        })
        const respones = await request.json()
        return respones
    }catch(err){
        console.log(err)
    }
}
export async function getEmployeeProfilDataUpdates() {
    try{

        const request = await fetch("http://localhost:8000/employeeFeedback",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({ID:cookieData?.user_ID})
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
}
export async function updateEmployeeData(arr:Array<string|number|undefined>,email:string){
    try{
        await fetch("http://localhost:8000/updateEmployeeProfil",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({arr:arr,email:email})
        })
        return true
    }catch(err){
        console.log(err)
    }
}
interface forgotPasswordInterface{
    email:string|null
}
export async function forgotPassword(values:forgotPasswordInterface){
 try{

     const request = await fetch("http://localhost:8000/forgotPassword",{
         method:"POST",
         headers:{
             "Content-type":"application/json"
            },
            body:JSON.stringify(values)
        })
        const response = await request.json()
        return response
    }catch(err){
    
    }
} 
export async function updatePassword(password:string|undefined,email:string){
    try{

        const request = await fetch("http://localhost:8000/updatePassword",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
               },
               body:JSON.stringify({password:password,email:email})
           })
           const response = await request.json()
           return response
       }catch(err){
        console.log(err)
       }
}
export async function sendServiceFeedback(price:string|undefined,info:string|undefined,ID:number|undefined){
    try {
        await fetch("http://localhost:8000/sendServiceFeedback",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify({price:price,info:info,ID:ID})
        })
        return true
    } catch (error) {
        
    }
}
export async function getServiceFeedback(ID:number|undefined){
    try {
       const request = await fetch("http://localhost:8000/getServiceFeedback",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify({ID:ID})
        })
        const response = await request.json()
        return response
    } catch (error) {
        
    }
}
export async function payService(ID:Number|undefined){
    try {
         await fetch("http://localhost:8000/payService",{
             method:"POST",
             headers:{
                 "Content-type":"application/json"
             },body:JSON.stringify({ID:ID})
         })
         return true
     } catch (error) {
         
     }
}
export async function getCompanies() {
    try {
        const request = await fetch("http://localhost:8000/comapnyList",{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        
    }
}