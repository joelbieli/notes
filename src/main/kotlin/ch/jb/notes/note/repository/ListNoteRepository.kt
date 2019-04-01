package ch.jb.notes.note.repository

import ch.jb.notes.note.domainmodel.ListNote
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface ListNoteRepository: ReactiveMongoRepository<ListNote, String>