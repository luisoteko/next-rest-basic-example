import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login, signUp } from '../service/authService';
import * as yup from 'yup';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();
    const schema = yup.object().shape({
        login: yup.string().required(),
        password: yup.string().required(),
    });
    const initialValues = {
        login: '',
        password: '',
    }
    const onSubmit = async(values, {setErrors, resetForm}) => {
        let response = await login(values);
        response[0] != 200 ? new setErrors(response[1]) : router.push("/notes");
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto max-w-50">
                    <div className="card">
                        <div className="card-header">
                            <h4>Log In</h4>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={schema}
                                onSubmit={onSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <ErrorMessage name="detail" component="div" className="invalid-feedback" />
                                        <ErrorMessage name="non_field_errors" component="div" className="invalid-feedback" />
                                        <div className="form-group my-2">
                                            <label htmlFor="login">Username</label>
                                            <Field name="login" type="text" className={'form-control' + (errors.login && touched.login ? ' is-invalid' : '')} />
                                            <ErrorMessage name="login" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group my-2">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group my-2">
                                            <button type="submit" name="submit" className="btn btn-primary mr-2">Log In</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;