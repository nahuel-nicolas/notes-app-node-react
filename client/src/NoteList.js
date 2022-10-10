import { useState, useEffect } from "react"
import * as utilities from './utilities'
import { Link } from "react-router-dom"
import NoteListItem from "./NoteListItem"
import { notes_api_url } from './settings'

const NoteList = () => {
    const [noteListData, setNoteListData] = useState(null)
    useEffect(() => {
        utilities.fetch_and_set(notes_api_url, setNoteListData)
    }, [])
    console.log(noteListData)
    let valueToReturn;
    if (noteListData == null) {
        valueToReturn = <h2>Loading...</h2>
    }
    else if (noteListData.length < 1) {
        valueToReturn = <h2>No notes</h2>
    } else {
        valueToReturn = noteListData.map((currentNoteData, currentNoteIdx) => (
            <NoteListItem noteData={currentNoteData} key={currentNoteIdx} />
        ))
    }
    return (
        <div id="note_list_app">
            <div id="notes">
                {valueToReturn}
            </div>
            <Link to='note/new'>
                <button id="add_note_button">+</button>
            </Link>
        </div>
    )
}

export default NoteList