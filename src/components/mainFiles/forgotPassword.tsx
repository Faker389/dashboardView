import * as Yup from 'yup';
import { useFormik } from 'formik';
import '../../styles/style.css'
import { useRef, useState } from 'react';
import { forgotPassword, updatePassword } from '../globalVariables/fetchFunctions';
import { Link } from 'react-router-dom';
export default function ForgotPassword(){
    const [shownVersion,setShownVersion]=useState<boolean>(false)
    const emailRef = useRef<string>("")
    const codeRef = useRef<string>("")
    const passwordRef = useRef<HTMLInputElement|null>(null)
    const [passwordShown,setPasswordShown]=useState<boolean>(false)
    const [err,setErr] = useState<string>("")
    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema : Yup.object().shape({
            email: Yup.string().email("Invalid email").required('Email is required')
        }),
        onSubmit:async (values) => {
                const {email} = values
                emailRef.current=email
                forgotPassword(values).then(e=>{
                    const {confirm} =e
                    codeRef.current=confirm
                    setShownVersion(true)
                }).catch(err=>{
                    console.log(2)
                    setErr("Wrong email adress try diffrent one")
                })
            },
        });
        const formik2 =useFormik({
            initialValues:{
                code:"",
                password:"",
                confirmPassword:""
            },validationSchema : Yup.object().shape({
                code: Yup.string()
                .length(6, "Code must be 6 characters long")
                .required("Code is required")
                .test('code-match', "Code doesn't match", function (val) {
                    return val === codeRef.current;
                }),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .required("Confirm password is required")
                .test('passwords-match', "Passwords don't match", function (value) {
                    return value === this.parent.password;
                }),
                }),onSubmit:async (values)=>{
                updatePassword(passwordRef.current?.value,emailRef.current).then(e=>{
                    window.location.href="/login"
                })
              
            }
        })
        return <div className="login">
        <div className="form-container">
            {shownVersion===false?
            <form onSubmit={formik.handleSubmit}>
                <p className='error'>{err}</p>
                <h2>Password Recovery</h2>
                <span>Email:</span>
                {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
                <input type="text" onInput={()=>{setErr('')}} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                <Link to="/login">Go to login page</Link>
                <input type="submit" value="Send Email" name="btn" className="btn" />
            </form>:
                <form onSubmit={formik2.handleSubmit}>
                <h2>Password Recovery</h2>
                <span>Code from email:</span>
                {formik2.touched.code && formik2.errors.code && <div className='error'>{formik2.errors.code}</div>}
                <input type="text" name="code" onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.code} />
                <span>New Password:</span>
                {formik2.touched.password && formik2.errors.password && <div className='error'>{formik2.errors.password}</div>}
                <input type={passwordShown===false?"password":"text"} id='password' ref={passwordRef} name="password" onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.password} />
                <span>Confirm Password:</span>
                {formik2.touched.confirmPassword && formik2.errors.confirmPassword && <div className='error'>{formik2.errors.confirmPassword}</div>}
                <input type={passwordShown===false?"password":"text"} id='' name="confirmPassword" onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.confirmPassword} />
                <div className='checkbox'>
                <label htmlFor="">Show password</label><input type='checkbox' onClick={()=>{
                    setPasswordShown(prev=>{
                        return !prev
                    }) 
                }} /> <Link to="/login">Go to login page</Link>
                </div>
                <input type="submit" value="Update Password" name="btn" className="btn"  />
                </form>
            }
    </div>
    </div>
}
