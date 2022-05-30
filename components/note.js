import { Formik, Form, Field, ErrorMessage } from 'formik';

import Modal from 'react-bootstrap/Modal';

const Note = ({note, show, close}) => {
    if (!note) {
        note = {
            title: '',
            content: '',
        };
    }
    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        }
        if (!values.content) {
            errors.content = 'Required';
        }
        return errors;
    };
    const onSubmit = (values) => {
        
        close();
    };
    return(
        <Modal show={show} onHide={close}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title> {note.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* A form for note modify */}
                    <Formik
                        initialValues={note}
                        validate={validate}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <Field name="content" type="text" className={'form-control' + (errors.content && touched.content ? ' is-invalid' : '')} />
                                    <ErrorMessage name="content" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group my-3">
                                    <button type="submit" name="submit" className="btn btn-primary mr-2">Submit</button>
                                    <button type="button" name="share" className="btn btn-primary mr-2">Share</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {note.created && <p>Created: {note.created}</p>}
                    {note.modified && <p>Modified: {note.modified}</p>}
                    <hr />
                    <ul>
                        {(note.shares && note.shares.lenght > 0) ? note.shares.map((share, key) =>
                            <li key={key}>
                                <span>{share.user.name}</span>
                                <span>{share.user.email}</span>
                            </li>
                        ): <li>No shares</li>}
                    </ul>
                    <hr />
                </Modal.Body>
            </Modal.Dialog>
        </Modal>

    )
}

export default Note