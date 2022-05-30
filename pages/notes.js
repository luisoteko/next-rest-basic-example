import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import Note from "../components/note";
import { getNotes, getSharedNotes } from "../service/notesService";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]);
    const [create, setCreate] = useState(false);
    const setError = () => {}
    useEffect(() => {
        console.log("NotesPage.useEffect");
        getNotes().then(data => {
            console.log("NotesPage.useEffect.getNotes", data);
            data[0] != 200 ? setError() : setNotes(data[1]);
        })
        getSharedNotes().then(data => {
            console.log("NotesPage.useEffect.getSharedNotes", data);
            data[0] != 200 ? setError() : setSharedNotes(data[1]);
        })
    }, [])

    const [selectedNote, setSelectedNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openNote = (note) => {
        setSelectedNote(note);
        setShowModal(true);
        setCreate(false);
    }
    const closeModal = () => {
        setShowModal(false);
        getNotes().then(data => {
            console.log("NotesPage.useEffect.getNotes", data);
            data[0] != 200 ? setError() : setNotes(data[1]);
        });
    }
    const createNote = () => {
        setCreate(true);
        setSelectedNote({
            title: "",
            body: "",
        });
        setShowModal(true);
    }
    return(
        <div>
            <h1>Notes Page</h1>
            {showModal && <Note note={selectedNote} close={closeModal} show={showModal} create={create}/>}
            <div className="grid grid-cols-1 gap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5">
            {notes.map((note, key)=>{
                return(
                    <div key={key} onClick={()=>openNote(note)} className="border border-gray-900 rounded py-2 px-4 w-60 max-w-xs text-ellipsis min-h-50">
                        <h1>{note.title}</h1>
                        <p>{note.body}</p>
                        <p>{note.created}</p>
                        <p>{note.modified}</p>
                    </div>
                )
            })}
            </div>
            <h1>Shared Notes</h1>
            <div className="grid grid-cols-1 gap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5">
            {sharedNotes.map((note, key)=>{
                return(
                    <div key={key} onClick={()=>openNote(note)} className="border border-gray-900 rounded py-2 px-4 w-60 max-w-xs text-ellipsis min-h-50">
                        <h1>{note.title}</h1>
                        <p>{note.body}</p>
                        <p>{note.created}</p>
                        <p>{note.modified}</p>
                    </div>
                )
            })}
            </div>
            <div onClick={createNote} className="rounded-full bg-cyan-800 w-20 h-20 fixed bottom-0 right-0 m-2 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </div>
        </div>
    )
}

export default NotesPage