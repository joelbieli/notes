package ch.jb.notes.note.repository

import ch.jb.notes.note.domainmodel.Note
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface NoteRepository: ReactiveMongoRepository<Note, String> {
}