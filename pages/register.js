import {Formik, Form, Field, ErrorMessage} from 'formik';
import { signUp } from '../service/authService';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Register = () => {
    useEffect(()=>{
        if (typeof window !== "undefined" && localStorage.getItem('token')){
            window.location.href = '/';
        }
    },[])
    const router = useRouter();
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        password_confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup.string().email("Not a valid email").required(),
        first_name: yup.string().required(),
        last_name: yup.string().required(),
    });
    const initialValues = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
    }
    const onSubmit = async (values, {setErrors, resetForm}) => {
        let response = await signUp(values);
        response[0] != 201 ? new setErrors(response[1]) : router.push("/login");
    }
    return (
        <div className="container">
            <h1>Sign Up</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({errors, touched}) => (
                    <Form>
                        <ErrorMessage name="detail" component="div" className="invalid-feedback" />
                        <ErrorMessage name="non_field_errors" component="div" className="invalid-feedback" />
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="first_name">First Name</label>
                            <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="last_name">Last Name</label>
                            <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                            <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <label htmlFor="password_confirm">Confirm Password</label>
                            <Field name="password_confirm" type="password" className={'form-control' + (errors.password_confirm && touched.password_confirm ? ' is-invalid' : '')} />
                            <ErrorMessage name="password_confirm" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group my-2 mx-sm-10">
                            <button type="submit" name="submit" className="btn btn-primary mr-2">Sign Up</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register;