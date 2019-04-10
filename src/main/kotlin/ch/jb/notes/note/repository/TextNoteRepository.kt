package ch.jb.notes.note.repository

import ch.jb.notes.note.domainmodel.TextNote
import ch.jb.notes.note.domainmodel.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface TextNoteRepository: ReactiveMongoRepository<TextNote, String> {
    fun deleteAllByOwner(owner: User)
}