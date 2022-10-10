import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteList from './NoteList'
import Note from './Note'

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="note/:note_id" element={<Note />} />
            <Route path="*" element={<main><h2>Error 404</h2></main>} />
          </Routes>
        </Router>
    </div>
        
  )
}

export default App;
