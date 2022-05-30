import { Formik, Form, Field, ErrorMessage } from 'formik';

const ConfirmForgotPassword = () => {

    const initialValues = {
        password: '',
        confirm_password: '',
    }
    const validate = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.confirm_password) {
            errors.confirm_password = 'Required';
        }
        if (values.password !== values.confirm_password) {
            errors.confirm_password = 'Passwords do not match';
        }
        return errors;
    }
    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h4>Forgot Password</h4>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={initialValues}
                                validate={validate}
                                onSubmit={onSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <Field name="confirm_password" type="password" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" name="submit" className="btn btn-primary mr-2">Submit</button>
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

export default ConfirmForgotPassword;