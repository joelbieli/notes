package ch.jb.notes.repository

import ch.jb.notes.domainmodel.Note
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface NoteRepository: ReactiveMongoRepository<Note, String> {
}