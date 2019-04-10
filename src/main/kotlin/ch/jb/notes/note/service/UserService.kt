package ch.jb.notes.note.service

import ch.jb.notes.note.exception.UserNotFoundException
import ch.jb.notes.note.repository.ListNoteRepository
import ch.jb.notes.note.repository.TextNoteRepository
import ch.jb.notes.note.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@Service
class UserService {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var listNoteRepository: ListNoteRepository

    @Autowired
    private lateinit var textNoteRepository: TextNoteRepository

    fun delete(id: String): Mono<Void> {
        return userRepository.findById(id)
                .switchIfEmpty { throw UserNotFoundException("Could not find user with id $id") }
                .doOnSuccess {
                    listNoteRepository.deleteAllByOwner(it)
                    textNoteRepository.deleteAllByOwner(it)
                }.flatMap { userRepository.delete(it) }
    }
}