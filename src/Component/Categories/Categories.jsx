import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query';

import { FallingLines } from 'react-loader-spinner'

export default function Categories() {

  let { data, isLoading } = useQuery('getCatg', getCategories)
  const [subData, setsubData] = useState([])
  const [catgName, setcatgName] = useState('')
  function getCategories() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  }

  async function getspecficCatg(idNode) {
    let res = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${idNode}`)
    setcatgName(res.data.data.name)
  }

  async function getSubcat(sub) {
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${sub}/subcategories`)
    setsubData(response?.data.data)
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
            {data?.data.data.map((category) => <div key={category._id} className="col-md-4 col-sm-6">
              <div onClick={() => {
                getSubcat(category._id)
                getspecficCatg(category._id)

              }} className="cat-item text-center cursor-pointer ">
                <img className='w-100' src={category.image} alt="" />
                <h3 className=' text-main py-3 fw-bolder'>{category.name} </h3>
              </div>
            </div>)

            }
            <div className="text-center ">
              {catgName?<h2 className='text-main fw-bolder my-4' >{catgName} subcategories</h2>:''}
              
              <div className="row">
                {subData.map((subbb) => <div key={subbb._id} className="col-md-4">
                  <div className="subcategory">
                    <h4 className='p-3 my-2 fw-bolder'>{subbb.name}</h4>
                  </div>
                </div>)}
              </div>
            </div>
          </> : ''}
        </>
        }

      </div>
    </div>

  </>

}
