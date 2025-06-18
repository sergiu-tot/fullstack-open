import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = React.useState([])
    const [newNote, setNewNote] = React.useState('')
    const [showAll, setShowAll] = React.useState(true)
    const [errorMessage, setErrorMessage] = React.useState('some error happened...')

    const addNote = (e) => {
        e.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5
            }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
                })
        }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
                })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                    )
                setTimeout(() => {
                    setErrorMessage(null)
                    }, 5000)
                setNotes(notes.filter(n => n.id !== id))
                })
        }

    const handleNoteChange = (e) => setNewNote(e.target.value)

    useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
              setNotes(initialNotes)
              })
        }, [])

    console.log('render', notes.length, 'notes')

    return (
            <div>
              <h1>Notes</h1>
              <Notification message={errorMessage} />
              <ul>
                {notes.map(note =>
                  <Note
                      key={note.id}
                      note={note}
                      toggleImportance={() => toggleImportanceOf(note.id)}
                  />
                )}
              </ul>
              <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
              </form>
              <Footer />
            </div>
        )
}

export default App
