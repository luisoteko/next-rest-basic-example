import { Formik, Form, Field, ErrorMessage } from 'formik';

import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import { createNote, updateNote, deleteNote, share, unShare } from '../service/notesService';
import * as yup from 'yup';
import { useState } from 'react';

const Note = ({note, show, close, create}) => {
    const router = useRouter();
    const [newShare, setNewShare] = useState(false)
    const [unShareErrors, setUnShareErrors] = useState(false)
    const [deleteErrors, setDeleteErrors] = useState(false)
    if (!note) {
        note = {
            title: '',
            body: '',
        };
    }
    const schema = yup.object().shape({
        title: yup.string().required(),
        body: yup.string().required(),
    });
    const onSubmit = async (values, { setErrors, resetForm }) => {
        let response = create ? await createNote(values) : await updateNote(values);
        response[0] != 201 && response[0] != 200 ? new setErrors(response[1]) : close();
    };
    const onDelete = async () => {
        const response = await deleteNote(note.id);
        response[0] == 204 ? setDeleteErrors(response[1]) : close();
    };
    const noteShareInitial = {
        email: '',
    }
    const schemaShare = yup.object().shape({
        email: yup.string().email().required(),
    });
    const onSubmitShare = async (values, { setErrors, resetForm }) => {
        let response = await share(values, note.id)
        response[0] != 201 && response[0] != 200 ? new setErrors(response[1]) : close();
    };
    const submitUnShare = async (shareObj) => {
        let response = await unShare(shareObj.id)
        response[0] != 204 && response[0] != 200 ? new setUnShareErrors(response[1]) : close();
    } 
    return(
        <Modal show={show} onHide={close} >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title> {note.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={note}
                        validationSchema={schema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {deleteErrors && deleteErrors['detail'] && <p className=" text-danger">{deleteErrors['detail']}</p>}
                                <ErrorMessage name="detail" component="div" className="invalid-feedback" />
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">Body</label>
                                    <Field name="body" type="text" className={'form-control' + (errors.body && touched.body ? ' is-invalid' : '')} />
                                    <ErrorMessage name="body" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group my-3">
                                    <button type="submit" name="submit" className="btn btn-primary mr-2">Submit</button>
                                    {!create && <>
                                        <button type="button" name="share" className="btn btn-success mr-2" onClick={()=>setNewShare(!newShare)}>Share</button>
                                        <button type="button" name="delete" className="btn btn-danger mr-2" onClick={onDelete}>Delete</button>
                                    </>
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {note.created && <p>Created: {note.created}</p>}
                    {note.modified && <p>Modified: {note.modified}</p>}
                    {
                        !create && <>
                            <hr />
                            <h3>Shared with:</h3>
                            <ul>
                                {newShare && <Formik
                                    initialValues={noteShareInitial}
                                    validationSchema={schemaShare}
                                    onSubmit={onSubmitShare}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <hr/>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group my-3">
                                                <button type="submit" name="submit" className="btn btn-primary mr-2">Submit</button>
                                            </div>
                                            <hr/>
                                        </Form>
                                    )}
                                </Formik>}

                                {note.shares ? note.shares.map((share, key) =>
                                    <li key={key}>
                                        {unShareErrors && unShareErrors['detail'] && <p className=" text-danger">{unShareErrors['detail']}</p>}
                                        <span>{share.showed_name}</span>
                                        <button className="btn btn-danger ml-2" onClick={()=>submitUnShare(share)}>X</button>
                                    </li>
                                ): <li>No shares</li>}
                            </ul>
                            <hr />
                            Owned by: {note.owner.first_name} {note.owner.last_name} - {note.owner.email}
                            <hr/>
                        </>
                    }

                </Modal.Body>
            </Modal.Dialog>
        </Modal>

    )
}

export default Note