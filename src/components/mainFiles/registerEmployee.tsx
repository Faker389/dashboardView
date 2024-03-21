import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useState,useEffect} from 'react';
interface Objekt{
    ID:number;
    name:string;
}
const RegisterEmployee:React.FC=()=>{
    const [dataCheck,setDataCheck]=useState<string>("")
    const [companyNames,setCompanynames] =useState<JSX.Element[]>([])
    const [passShow,setPssShow] = useState<Boolean>(true)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        login: Yup.string().min(6, 'Login must be at least 6 characters').required('Login is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            login: '',
            password: '',
            company:'',
            position:"E"
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const request = await fetch("http://localhost:8000/register",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(values)
                })
                const response = await request
                if(response.status===303){
                    setDataCheck("Email or Login already in use")
                }else{
                    setDataCheck("")
                    window.location.href="/login"
                }
            } catch (error) {
            }
        },
    });
    useEffect(()=>{
        async function getCompany(){
            try {
                const request= await fetch("http://localhost:8000/companies",{
                     method:"GET",
                     headers:{
                         "Content-type":"application/json"
                     },
                 })
                 const response = await request.json()
                 formik.values.company = response[0].ID
                var mapa = response.map((e:Objekt,index:number)=>{
                    return <option key={index} value={e.ID}>{e.name}</option>
                })
                setCompanynames(mapa)
                } catch (error) {
             }
        }
        getCompany()
    },[])
    const handleCompanyChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        formik.values.company=e.target.value
    }
return <div className="form-container">
<a href="/dashboard"><i className="fa-solid fa-xmark"></i></a>
        <form onSubmit={formik.handleSubmit}>
            <h2>Register</h2>
            {dataCheck&&<p className='error' style={{textAlign:"center"}}>{dataCheck}</p>}
            <span>Email:</span>
            {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
            <input type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />

            <span>Login:</span>
            {formik.touched.login && formik.errors.login && <div className='error'>{formik.errors.login}</div>}
            <input type="text" name="login" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.login} />

            <span>Password:</span>
            {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}
            <div className='pass'>
            <input type={passShow===true?"password":"text"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
            <i className={passShow===true?"fa-regular fa-eye":"fa-regular fa-eye-slash"} onClick={()=>setPssShow((prev)=>{
                return !prev
            })}></i>
            </div>
            <span>Select Company:</span>
            <select onChange={handleCompanyChange}>
                {companyNames}
            </select>
            <a href='/login' className='line'>Log in</a>
            <input type="submit" value="Register" name="btn" className="btn" />
        </form>
    </div>
}
export default RegisterEmployee