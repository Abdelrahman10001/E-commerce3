import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { FallingLines } from 'react-loader-spinner'

export default function Brands() {

  let { data, isLoading } = useQuery('getbrands', getBrands)
  const [brandData, setbrandData] = useState('')
  const [brandslug, setbrandslug] = useState('')
  const [brandImg, setbrandImg] = useState(null)

  function getBrands() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }

  async function getBrandModal(id) {
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
   
    setbrandData(response?.data.data.name)
    setbrandslug(response?.data.data.slug)
    setbrandImg(response?.data.data.image)
    
  }


  return <>

    <div className="container">
      <div className="row g-4 p-4 my-5">
        {isLoading ? <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel='falling-lines-loading'
        /> : <>
          {data ? <>
            <h2 className='text-main fw-bolder text-center'>All Brands</h2>
            {data?.data.data.map((brand) => <div key={brand._id} className="col-md-3 col-sm-6">
              <div data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                getBrandModal(brand._id)
              }} className="brand text-center cursor-pointer ">
                <img className='w-100' src={brand.image} alt="" />
                <h6 className='  py-3 fw-bold'>{brand.name} </h6>
              </div>
            </div>)

            }
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className='text-main'>{brandData}</h3>
                      <h6>{brandslug}</h6>
                    </div>

                    <img className='w-50' src={brandImg} alt="" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </> : ''}
        </>
        }

      </div>
    </div>


    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </>

}
