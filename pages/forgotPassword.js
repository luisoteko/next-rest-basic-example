import { Formik, Form, Field, ErrorMessage } from 'formik';

const ForgotPassword = () => {

    const initialValues = {
        username: '',
    }
    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
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
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
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

export default ForgotPassword;