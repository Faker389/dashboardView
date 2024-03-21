import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
const RegisterCustomer:React.FC=()=>{
    const [dataCheck,setDataCheck]=useState<string>("")
    const [passShow,setPssShow] = useState<Boolean>(true)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        login: Yup.string().min(6, 'Login must be at least 6 characters').required('Login is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        number:Yup.string().length(9,"Number must contain 9 numbers").matches(/^[0-9]{9}$/, 'This field can only contain numbers').required("Number is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            login: '',
            password: '',
            number:"",
            position:"C"
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
               const request= await fetch("http://localhost:8000/register",{
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
            <span>Number:</span>
            {formik.touched.number&&formik.errors.number&&<div className='error'>{formik.errors.number}</div>}
            <input type="text" name="number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.number} />
            <a href='/login' className='line'>Log in</a>
            <input type="submit" value="Register" name="btn" className="btn" />
        </form>
    </div>
}
export default RegisterCustomer