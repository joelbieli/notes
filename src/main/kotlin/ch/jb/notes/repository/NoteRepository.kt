package ch.jb.notes.repository

import ch.jb.notes.domainmodel.Note
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface NoteRepository: ReactiveMongoRepository<Note, String> {
    fun findAllByOwner(id: String): Flux<Note>
}