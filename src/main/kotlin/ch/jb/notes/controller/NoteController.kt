package ch.jb.notes.controller

import ch.jb.notes.dto.NoteDTO
import ch.jb.notes.exception.NoNotesFoundException
import ch.jb.notes.exception.NoteNotFoundException
import ch.jb.notes.mapper.NoteMapper
import ch.jb.notes.repository.NoteRepository
import ch.jb.notes.repository.UserRepository
import ch.jb.notes.service.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty
import reactor.core.publisher.toMono
import java.time.LocalDateTime

@RestController
@RequestMapping("/notes")
@PreAuthorize("isAuthenticated()")
@Api(description = "Set of endpoints for note related operations (caller must be authenticated)")
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
    @ApiOperation(
            value = "Returns all notes of the requesting user",
            response = NoteDTO::class,
            responseContainer = "List"
    )
    fun getAll(): Flux<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .flatMapMany { noteRepository.findAllByOwner(it) }
                .switchIfEmpty { throw NoNotesFoundException("Could not find any notes") }
                .map { noteMapper.toDTO(it) }

    }

    @GetMapping("/export")
    @ApiOperation(
            value = "Returns all notes of the requesting user as JSON without any ids",
            response = NoteDTO::class,
            responseContainer = "List"
    )
    fun exportNotes(): Flux<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .flatMapMany { noteRepository.findAllByOwner(it) }
                .map { noteMapper.toDTO(it) }
                .doOnNext { it.id = null }
    }

    @GetMapping("/{id}")
    @ApiOperation(
            value = "Returns a single note based on the given id",
            response = NoteDTO::class
    )
    fun getById(@PathVariable id: String): Mono<NoteDTO> {
        return noteRepository.findById(id)
                .switchIfEmpty { throw NoteNotFoundException("Could not find note with id: $id") }
                .map { noteMapper.toDTO(it) }
    }

    @PostMapping
    @ApiOperation(
            value = "Creates and returns the given note",
            response = NoteDTO::class
    )
    fun save(@RequestBody noteDTO: NoteDTO): Mono<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .map { noteMapper.fromDTO(noteDTO).apply { owner = it } }
                .flatMap { noteRepository.save(it) }
                .map { noteMapper.toDTO(it) }
    }

    @PostMapping("/import")
    @ApiOperation(
            value = "Takes a list of notes as a JSON string and saves them all with the calling user as the owner",
            response = ResponseEntity::class
    )
    fun importNotes(@RequestBody noteDTOs: List<NoteDTO>): Mono<ResponseEntity<Any>> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .map { user -> noteMapper.fromDTOs(noteDTOs).map {
                    it.apply {
                        id = null
                        owner = user
                    }
                } }
                .flatMapMany { noteRepository.saveAll(it) }
                .map { ResponseEntity<Any>(HttpStatus.OK) }
                .toMono()
    }

    @PutMapping
    @ApiOperation(
            value = "Updates the note with the id of the given note based on the given note, updates the lastEdit field and returns the updated note",
            response = NoteDTO::class
    )
    fun update(@RequestBody noteDTO: NoteDTO): Mono<NoteDTO> {
        return userService.getCurrentUserUsername()
                .flatMap { userRepository.findByUsername(it) }
                .map { noteMapper.fromDTO(noteDTO).apply {
                    owner = it
                    lastEdit = LocalDateTime.now()
                } }
                .flatMap { noteRepository.save(it) }
                .map { noteMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    @ApiOperation(
            value = "Deletes the note with the given id",
            response = Void::class
    )
    fun delete(@PathVariable id: String): Mono<Void> {
        return noteRepository.deleteById(id)
    }
}