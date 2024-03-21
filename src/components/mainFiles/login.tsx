import * as Yup from 'yup';
import { useFormik } from 'formik';
import '../../styles/style.css'
import { useState } from 'react';
import { setCookie } from '../globalVariables/cookies';
import { Link } from 'react-router-dom';
const validationSchema = Yup.object().shape({
  login: Yup.string().min(6, 'Login must be at least  characters').required('Login is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login(){
    const [passShow,setPssShow]=useState<Boolean>(true)
    const [error,setError] = useState<string>("")
    const formik = useFormik({
        initialValues: {
          login: '',
          password: '',
        },
        validationSchema,
        onSubmit:async (values) => {
            try{

                const request = await fetch("http://localhost:8000/login",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(values)
                })
                const response = await request.json()
                setCookie("userData",JSON.stringify(response))
                response.position==="E"?window.location.href="/dashBoard/Employee/Statistics":window.location.href="/dashBoard/Customer/profile"
            }catch(err){
                setError("Invalid Login data")
            }
            },
        });
        return <div className="login">
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <p className='error'>{error}</p>
                <h2>Login</h2>
                <span>Login:</span>
                {formik.touched.login && formik.errors.login && <div className='error'>{formik.errors.login}</div>}
                <input onInput={()=>setError("")} type="text" name="login" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.login} />

                <span>Password:</span>
                {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}
                <div className='pass'>
                <input onInput={()=>setError("")} type={passShow===true?"password":"text"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                <i className={passShow===true?"fa-regular fa-eye":"fa-regular fa-eye-slash"} onClick={()=>setPssShow((prev)=>{
                    return !prev
                })}></i>
                </div>
                <div className='loginOptions'> 
                <a href='/register' className='line'>Sign in</a><Link to="/forgotPassword">Forgot password?</Link>
                </div>
                <input type="submit" value="Login" name="btn" className="btn" />
            </form>
    </div>
    </div>
}
