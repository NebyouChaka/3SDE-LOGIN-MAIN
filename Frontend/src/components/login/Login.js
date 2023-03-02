import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";

import login, {getUsers} from "../../apiCalls";


function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === "admin") {
    error = "Nice try!";
  }
  return error;
}

 const Login = () => {
  const navigate = useNavigate()
  return (
   <div className='form-group'>
     <h1>Login</h1>
     <Formik className= "form"
       initialValues={{
         email: "",
         password: "",
       }}
       onSubmit={async (values) => {
         // same shape as initial values
         const successFull = await login(values)
         if (successFull.error !== "Incorrect login, no user found matching that information.") navigate('/home')
         else {
          alert("Incorrect Login information, please try again.")
         }
        }}
     >
       {({ errors, touched, isValidating }) => (
         <Form className='rigster-form'>
           <Field
             placeholder='email'
             className='email'
             name='email'
             validate={validateEmail}
           />
           {errors.email && touched.email && <div>{errors.email}</div>}

           <Field
             type='password'
             placeholder='password'
             className='password'
             name='password'
             validate={validateUsername}
           />
           {errors.password && touched.password && <div>{errors.password}</div>}

           <button className='btn' type='submit'>
             Submit
           </button>
           <Link to="/forgotPassword">Forgot password?</Link>
         </Form>
       )}
     </Formik>
   </div>
 )};
export default Login
