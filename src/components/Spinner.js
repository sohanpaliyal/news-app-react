import React from 'react'
import loading  from "./../../src/loading.gif";

const Spinner =()=> {
    return (
      <div className='text-center'>
          <img src={loading} alt="" width={300}/>
      </div>
    )
}

export default Spinner;