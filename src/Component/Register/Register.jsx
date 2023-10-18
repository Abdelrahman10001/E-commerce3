
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { BallTriangle } from 'react-loader-spinner'


export default function Register(props) {
  // console.log(props)ppp
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)
  let [error, setError] = useState(null)
  async function registerSubmit(values) {
    setIsLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message)
        setIsLoading(false)
      })
    // console.log(data);
    if (data.message === 'success') {
      navigate('/login')
      setIsLoading(false)
    }

  }


  const regex = /^[0-9]{11}$/;

  let validationSchema = yup.object({
    name: yup.string().min(3, "At least put 3 characters").max(10, 'max 10 chraracters').required(),
    email: yup.string().email('email is invalid').required('required'),
    phone: yup.string().matches(regex, "Enter a proper phone number").required(),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/, "Password must contain at least one lowercase letter").required(),
    rePassword: yup.string().required().oneOf([yup.ref('password')], "Passwords must match"),
  });



  let formik = useFormik({

    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    }, validationSchema,
    onSubmit: registerSubmit
  })


  return (
    <>
      <div className="contacts  d-flex justify-content-center align-items-center">
        <div className="container p-5 ">
          <div className=" text-center row align-items-center p-2  ">
            <div className="container-fluid p-5 ">
              <h1 className="pb-2 mt-4 toptext fw-bolder">Register</h1>
              <div className="linenStar my-3 d-flex justify-content-center align-items-center ">
                <div className="lineContact"></div>
                <i className="starContact fa-solid fa-star mx-3"></i>
                <div className="lineContact"></div>
              </div>
            </div>
          </div>
          {error ? <div className="alert alert-danger">{error}</div> : ''}
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label className=" text-black " htmlFor="name"> Name :  </label>
              <input type="text" className=" w-100 form-control " onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" id="name" />
              {formik.errors.name && formik.touched.name && <div className="alert alert-danger">{formik.errors.name}</div>}
            </div>
            <div className="my-2">
              <label className="text-black" htmlFor="email">Email:</label>
              <input type="email" className="w-100 form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
              {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}
            </div>
            <div className="my-2">
              <label className=" text-black " htmlFor="phone"> Phone :  </label>
              <input type="tel" className=" w-100 form-control " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name="phone" id="phone" />
              {formik.errors.phone && formik.touched.phone && <div className="alert alert-danger">{formik.errors.phone}</div>}
            </div>
            <div className="my-2">
              <label className=" text-black " htmlFor="password"> password :  </label>
              <input type="password" className=" w-100 form-control " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password" />
              {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}
            </div>
            <div className="my-2">
              <label className=" text-black " htmlFor="rePassword"> rePassword :  </label>
              <input type="password" className=" w-100 form-control " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name="rePassword" id="rePassword" />
              {formik.errors.rePassword && formik.touched.rePassword && <div className="alert alert-danger">{formik.errors.rePassword}</div>}
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
              Register
            </button>}

          </form>
        </div>
      </div>
    </>
  );
}
