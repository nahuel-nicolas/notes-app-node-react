import { Link } from 'react-router-dom'

function get_note_id(noteData) {
    let note_id = noteData._id
    return note_id
}

let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
    let title = note.body.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}


let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')
    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}


const NoteListItem = ({ noteData }) => {
    return (
        <Link to={`/note/${get_note_id(noteData)}`}>
            <div className="note-list-item" >
                <p>{getTitle(noteData)}</p>
                <p><span>{getTime(noteData)}</span>{getContent(noteData)}</p>
            </div>
        </Link>
    )
}

export default NoteListItem
