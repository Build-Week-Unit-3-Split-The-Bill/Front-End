import React from 'react';


function Login(props) {

    const handleSubmit = event => {
        event.preventDefault()
    }

        const handleChange = event => {
            props.setLoginFormValues({...props.loginFormValues,
                [event.target.name]: event.target.value
            })
            console.log(props.state)
    }

  return (
    <div>
      <form className='login-form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='email' type='text' value={props.loginFormValues.email} placeholder='Email' />
          <input onChange={handleChange} name='password' type='password' value={props.loginFormValues.password} placeholder='Password' />
          <input type='submit' id='submit'/>
      </form>
    </div>
  );
}

export default Login;