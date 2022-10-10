import { useState, useEffect, createContext } from "react"
import * as utilities from './utilities'
import { useParams, useNavigate } from 'react-router-dom'
import Box from "./Box/Box"
import { notes_api_url } from './settings'

function isNoteBodyChanged(initialNoteBody, currentNoteBody) {
    return initialNoteBody != currentNoteBody
}

const Note = () => {
    const navigateTo = useNavigate()
    const note_id = useParams()["note_id"]
    const [noteData, setNoteData] = useState({"body": ""})
    const [initialNoteBody, setInitialNoteBody] = useState(noteData.body)
    const [isNewNote, setIsNewNote] = useState(true)
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)
    const [isSavingChangesBoxVisible, setIsSavingChangesBoxVisible] = useState(false)
    const currentNote_api_url = notes_api_url + note_id + "/"

    useEffect(() => {
        if (note_id != 'new') {
            setIsNewNote(false)
            utilities.fetch_and_set(currentNote_api_url, [setNoteData, setInitialNoteBody])
        }
    }, [])
    useEffect(() => {
        if (isNoteBodyChanged(initialNoteBody, noteData.body)) {
            setIsSubmitButtonDisabled(false)
        } else {
            setIsSubmitButtonDisabled(true)
        }
    }, [noteData, initialNoteBody])

    function textAreaChangeHandler(event) {
        setNoteData((prevNoteData) => ({
            ...prevNoteData, 
            "body": event.target.value
        }))
    }

    async function createNote() {
        await fetch(notes_api_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
    }

    async function updateNote() {
        await fetch(currentNote_api_url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"body": noteData.body})
        })
    }

    async function deleteNote() {
        await fetch(currentNote_api_url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
    }

    async function submitButtonHandler() {
        setIsSavingChangesBoxVisible(true)
        if (isNewNote) {
            await createNote()
        } else {
            await updateNote()
        }
        navigateTo('/')
    }

    async function deleteButtonHandler() {
        setIsSavingChangesBoxVisible(true)
        await deleteNote()
        navigateTo('/')
    }

    function GoBackButtonHandler() {
        if (isSubmitButtonDisabled) {
            navigateTo('/')
        } else {
            submitButtonHandler()
        }
    }

    return (
        <div id="note">
            <Box isBoxDisplayed={isSavingChangesBoxVisible}>Saving changes...</Box>
            <button id="back_button" onClick={GoBackButtonHandler}>
                <i className="fas fa-chevron-left" />
            </button>
            {isNewNote ? (<div id="date_field" />) : (
                <div id="date_field" >
                    <p>Created: {new Date(noteData.created).toLocaleDateString()}</p>
                    <p>Last update: {new Date(noteData.created).toLocaleDateString()}</p>
                </div>
            )}
            <textarea 
                onChange={(event) => textAreaChangeHandler(event)}
                onBlur={({ target }) => target.focus()}
                name="note_body" 
                id="note_body" 
                value={noteData.body} 
                autoFocus={true}
                cols="30" rows="10"
                style={{"resize": "none"}}
            />
            <div id="note_buttons_container">
                <button onClick={submitButtonHandler} disabled={isSubmitButtonDisabled}>
                    {isNewNote ? "Create" : "Update"}
                </button>
                <button onClick={deleteButtonHandler} disabled={isNewNote}>
                    <i className="fas fa-trash-alt" />
                </button>
            </div>
        </div>
    )
}

export default Note