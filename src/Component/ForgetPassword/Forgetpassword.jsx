import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function Forgetpassword() {
    let navigate = useNavigate()
    async function loginSubmit(values) {

        let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`, values)
        if (data.statusMsg === 'success') {
            document.getElementById('forgetForm').classList.add('d-none')
            document.getElementById('resetForm').classList.remove('d-none')
        }

    }

    let validationSchema = yup.object({
        email: yup.string().email('email is invalid').required('required'),
    });

    let formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: loginSubmit
    })

    // Verify End

    //Reset code Start

    async function resetapi(values) {
        try {
            const response = await axios.post(
                'https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode', values
            );
            if (response.data.status == "Success") {
                navigate('/ResetPass')
            }

        } catch (error) {
            console.log('An error occurred while verifying reset code:');
        }

    }

    let resetValidation = yup.object({
        resetCode: yup.string().required('required').matches(/^[0=9]+$/, 'must be numbers')
    });

    let resetFormik = useFormik({
        initialValues: {
            resetCode: ''
        },
        resetValidation,
        onSubmit: resetapi
    })

    return <>
        <div className="container my-5 p-5">

            <form id='forgetForm' onSubmit={formik.handleSubmit}>
                <label className="text-black" htmlFor="email">Email:</label>
                <input type="email" className="w-100 form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
                {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success mt-3'>Verify Email</button>
            </form>

            <form id='resetForm' className='mt-3 d-none' onSubmit={resetFormik.handleSubmit}>
                <label className="text-black" htmlFor="resetCode">resetCode:</label>
                <input type="text" className="w-100 form-control" onBlur={resetFormik.handleBlur} onChange={resetFormik.handleChange} value={resetFormik.values.resetCode} name="resetCode" id="resetCode" />
                {resetFormik.errors.resetCode && resetFormik.touched.resetCode && <div className="alert alert-danger">{resetFormik.errors.resetCode}</div>}
                <button disabled={!(resetFormik.isValid && resetFormik.dirty)} type='submit' className='btn btn-success mt-3'>Send</button>
            </form>

        </div>
    </>
}
