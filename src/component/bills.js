import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../custom-hooks/axiosWithAuth'
import styled from 'styled-components';

function Bills() {

    const [state, setState] = useState([])

    useEffect(() => {
        axiosWithAuth().get('https://build-split-the-bill.herokuapp.com/api/bills')
            .then(response => {
                setState(response.data.bills)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


  return (
    <div className='bills-container'>
      <h3 className='bills-heading'>My Bills</h3>
      <div className='all-bills'>
      {state.map((curr, index) => {
        return(
          <div className='bill-card' key={index}>
            <div className='bill-top-row'>
            <div className='bill-left-corner'>
            <img alt='people icon' src='https://i.imgur.com/74ww7EK.png' width='32px' height='32px' />
            <p className='party-count'>{curr.split_people_count}</p>
            </div>  
            <p className='bill-id'>{curr.id}</p> 
            </div>
            <p className='split-sum'>{Number.parseFloat(curr.split_sum).toFixed(2)}$</p>
            <p className='total-sum'>(Total: {Number.parseFloat(curr.split_sum * curr.split_people_count).toFixed(2)}$)</p>
            <p>{curr.created_at}</p>
            <div className='bill-buttons'>
              <button>Remove</button>
              <button>Edit</button>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default Bills;