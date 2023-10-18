
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { BallTriangle } from 'react-loader-spinner'
import { UserContext } from "../UserContext/UserContext";


export default function Login() {
    let { setuserToken } = useContext(UserContext)
    let navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false)
    let [error, setError] = useState(null)

    async function loginSubmit(values) {

        setIsLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .then((res) => res)
            .catch((err) => {
                setError(err.response.data.message)
                setIsLoading(false)
            })

        if (data.message === 'success') {
            localStorage.setItem('userToken', data.token)
            setuserToken(data.token)
            // setuserData(data.user)
            navigate('/')
            setIsLoading(false)
        }

    }

    let validationSchema = yup.object({
        email: yup.string().email('email is invalid').required('required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/, "Password must contain at least one lowercase letter").required(),
    });

    let formik = useFormik({

        initialValues: {
            email: '',
            password: ''
        }, validationSchema,
        onSubmit: loginSubmit
    })


    return (
        <>
            <div className="contacts  d-flex justify-content-center align-items-center">
                <div className="container p-5 ">
                    <div className=" text-center row align-items-center p-2  ">
                        <div className="container-fluid p-5 ">
                            <h1 className="pb-2 mt-4 toptext fw-bolder">Login</h1>
                            <div className="linenStar my-3 d-flex justify-content-center align-items-center ">
                                <div className="lineContact"></div>
                                <i className="starContact fa-solid fa-star mx-3"></i>
                                <i className="starContact fa-solid fa-star mx-3"></i>
                                <div className="lineContact"></div>
                            </div>
                        </div>
                    </div>
                    {error ? <div className="alert alert-danger">{error}</div> : ''}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="my-2">
                            <label className="text-black" htmlFor="email">Email:</label>
                            <input type="email" className="w-100 form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
                            {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}
                        </div>
                        <div className="my-2">
                            <label className=" text-black " htmlFor="password"> password :  </label>
                            <input type="password" className=" w-100 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password" />
                            {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}
                        </div>
                        {isLoading ? <button type="button" className="btn btn-success me-auto ">
                            <BallTriangle
                                height={20}
                                width={40}
                                radius={5}
                                color="white"
                                ariaLabel="ball-triangle-loading"
                                wrapperClass={{}}
                                wrapperStyle=""
                                visible={true}
                            />
                        </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success me-auto ">
                            Login
                        </button>}
                        <Link to={'/Forgetpassword'}>
                            <h5 className="forget mt-3">Forget your password ?</h5>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
