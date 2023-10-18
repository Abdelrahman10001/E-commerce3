import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { cashaction } from '../../Redux/payInCash'
import { useDispatch} from 'react-redux'
export default function OrderDetails() {

    let dispatch = useDispatch()
    let phoneRegex = /^[0-9]{11}$/

    let validationSchema = yup.object({
        details: yup.string('only letters').min(5, 'At least 5 letters'),
        phone: yup.string().matches(phoneRegex, 'Enter a proper phone number'),
        city: yup.string('Where will you be receiving your package')
    })


    // let allStore = useSelector((store) => store.cashapi)


    function CashIN(values) {
        dispatch(cashaction(values))
        // console.log(allStore);
    }

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        }, validationSchema,
        onSubmit: CashIN
    })

    return <>

        <div className="container mt-5 p-5">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="details">Details</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className='form-control my-3' type="text" name='details' id='details' />
                {formik.touched.details && formik.errors.details && < div className='alert alert-danger'>{formik.errors.details}</div>}

                <label htmlFor="phone">phone</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control my-3' type="tel" name='phone' id='phone' />
                {formik.touched.phone && formik.errors.phone && < div className='alert alert-danger'>{formik.errors.phone}</div>}


                <label htmlFor="details">city</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className='form-control my-3' type="text" name='city' id='city' />
                {formik.touched.city && formik.errors.city && < div className='alert alert-danger'>{formik.errors.city}</div>}
                <button type='submit' onClick={CashIN} className='btn btn-info'>Pay in Cash</button>
            </form>
        </div >

    </>
}
