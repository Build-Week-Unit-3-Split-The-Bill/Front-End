import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../custom-hooks/axiosWithAuth'
import styled from 'styled-components';

const Id = styled.p`
  font-size: 1.2rem;
  margin-right: 20px;
`

const Date = styled.p`
  font-size: 1.2rem;
`



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
      <h3>My Bills</h3>
      <div className='all-bills'>
      {state.map((curr, index) => {
        return(
          <div className='bill-card' key={index}>
              <div className='id-and-peoplecount'>
              <div className='party-size'>
                <img src='https://i.imgur.com/74ww7EK.png' width='32px' height='32px' />
                <p>{curr.split_people_count}</p>
              </div>
              <div className='pay-amounts'>
                <h3 className='split-sum'>{curr.split_sum}$</h3>
                <h4 className='total-sum'>(Total: {curr.split_sum * curr.split_people_count}$)</h4>
              </div>
              <Id>{curr.id}</Id>
              </div>
            
              <Date>{curr.created_at}</Date>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default Bills;