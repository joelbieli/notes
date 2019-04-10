package ch.jb.notes.note.repository

import ch.jb.notes.note.domainmodel.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface UserRepository: ReactiveMongoRepository<User, String> {
    fun findUserByUserName(username: String): Mono<User>
}