package ch.jb.notes.controller

import ch.jb.notes.dto.NoteDTO
import ch.jb.notes.exception.NoNotesFoundException
import ch.jb.notes.exception.NoteNotFoundException
import ch.jb.notes.mapper.NoteMapper
import ch.jb.notes.repository.NoteRepository
import ch.jb.notes.repository.UserRepository
import ch.jb.notes.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import reactor.core.publisher.Flux
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@RestController
@RequestMapping("/notes")
@PreAuthorize("isAuthenticated()")
class NoteController {

    @Autowired
    private lateinit var noteRepository: NoteRepository

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var noteMapper: NoteMapper

    @GetMapping
    fun getAll(): Flux<NoteDTO> {
        return userService.getCurrentUserId()
                .flatMapMany { noteRepository.findAllByOwner(it) }
                .switchIfEmpty { throw NoNotesFoundException("Could not find any notes") }
                .map { noteMapper.toDTO(it) }

    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Mono<NoteDTO> {
        return noteRepository.findById(id)
                .switchIfEmpty { throw NoteNotFoundException("Could not find note with id: $id") }
                .map { noteMapper.toDTO(it) }
    }

    @PostMapping
    fun save(@RequestBody noteDTO: NoteDTO): Mono<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .map { noteMapper.fromDTO(noteDTO).apply { owner = it } }
                .flatMap { noteRepository.save(it) }
                .map { noteMapper.toDTO(it) }
    }

    @PutMapping
    fun update(@RequestBody noteDTO: NoteDTO): Mono<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .map { noteMapper.fromDTO(noteDTO).apply { owner = it } }
                .flatMap { noteRepository.save(it) }
                .map { noteMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return noteRepository.deleteById(id)
    }
}