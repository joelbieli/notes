package ch.jb.notes.repository

import ch.jb.notes.domainmodel.Note
import ch.jb.notes.domainmodel.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux

interface NoteRepository: ReactiveMongoRepository<Note, String> {
    fun findAllByOwner(owner: User): Flux<Note>
}