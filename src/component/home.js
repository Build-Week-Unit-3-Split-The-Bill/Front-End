import React from 'react';


function Home() {
  return (
    <div className='home'>
      <h1>SPLIT THE BILL</h1>
      <p>a Build Week Project for <a target='_blank' href='https://lambdaschool.com'>Lambda School</a></p>
      <h3>Made by:</h3>
      <p>Emma Andrews</p>
      <div className='credentials'>
        <a target='_blank' href='https://github.com/ELAndrews'>Github</a>
        
        <a target='_blank' href='https://www.linkedin.com/in/emma-andrews-b26768169/'>LinkedIn</a>
      </div>
      <p>Niklas Becker</p>
      <div className='credentials'>
        <a target='_blank' href='https://github.com/niklasbec'>Github</a>
        <a target='_blank' href='https://www.linkedin.com/in/niklas-becker-a14305178/'>LinkedIn</a>
      </div>
     
      <h3>Team Lead:</h3>
      <p>Matt Locklin</p>
      <div className='credentials'>
        <a target='_blank' href='https://github.com/Lockers'>Github</a>
        <a target='_blank' href='https://www.linkedin.com/in/matthewlocklin/'>LinkedIn</a>
      </div>
    </div>
  );
}

export default Home;