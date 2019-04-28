package ch.jb.notes.repository

import ch.jb.notes.domainmodel.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface UserRepository: ReactiveMongoRepository<User, String> {
    fun findUserByUsername(username: String): Mono<User>
    fun existsByUsername(username: String): Mono<Boolean>
}