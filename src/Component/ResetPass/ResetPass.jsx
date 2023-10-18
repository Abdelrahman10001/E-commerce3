import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function ResetPass() {
    let navigate = useNavigate()
    async function changePass(values) {

        let { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`, values)
        if (data.token) {
            navigate('/login')
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email('email is invalid').required('required'),
        newPassword: yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/, "Password must contain at least one lowercase letter").required(),

    });

    let newformik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema,
        onSubmit: changePass
    })


    return <>
        <div className="container mt-5 p-5">
            <form onSubmit={newformik.handleSubmit}>
                <label htmlFor="email">email</label>
                <input onChange={newformik.handleChange} onBlur={newformik.handleBlur} value={newformik.values.email} className='form-control' type="text" name='email' id='email' />
                {newformik.errors.email && newformik.touched.email && <div className='alert alert-danger'>{newformik.errors.email}</div>}
                <label className='my-3' htmlFor="newPassword">newPassword</label>
                <input onChange={newformik.handleChange} onBlur={newformik.handleBlur} value={newformik.values.newPassword} className='form-control' type="text" name='newPassword' id='newPassword' />
                {newformik.errors.newPassword && newformik.touched.newPassword && <div className='alert alert-danger'>{newformik.errors.newPassword}</div>}
                <button className='btn mt-3 btn-success' disabled={!(newformik.isValid && newformik.dirty)} type='submit'>Update Pass</button>
            </form>
        </div>

    </>
}
