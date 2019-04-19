package ch.jb.notes.service

import ch.jb.notes.exception.UserNotFoundException
import ch.jb.notes.repository.NoteRepository
import ch.jb.notes.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@Service
class UserService {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var noteRepository: NoteRepository

    fun delete(id: String): Mono<Void> {
        return userRepository.findById(id)
                .switchIfEmpty { throw UserNotFoundException("Could not find user with id $id") }
                .doOnSuccess {
                    noteRepository.deleteAll()
                }.flatMap { userRepository.delete(it) }
    }
}