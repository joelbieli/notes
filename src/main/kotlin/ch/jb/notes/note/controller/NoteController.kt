package ch.jb.notes.note.controller

import ch.jb.notes.note.dto.NoteDTO
import ch.jb.notes.note.exception.NoNotesFoundException
import ch.jb.notes.note.exception.NoteNotFoundException
import ch.jb.notes.note.mapper.NoteMapper
import ch.jb.notes.note.repository.NoteRepository
import org.springframework.beans.factory.annotation.Autowired
import reactor.core.publisher.Flux
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@RestController
@RequestMapping("/notes")
class NoteController {

    @Autowired
    private lateinit var noteRepository: NoteRepository

    @Autowired
    private lateinit var noteMapper: NoteMapper

    @GetMapping
    fun getAll(): Flux<NoteDTO> {
        return noteRepository.findAll()
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
    fun save(@RequestBody listNoteDTO: NoteDTO): Mono<NoteDTO> {
        return noteRepository.save(noteMapper.fromDTO(listNoteDTO)).map { noteMapper.toDTO(it) }
    }

    @PutMapping
    fun update(@RequestBody listNoteDTO: NoteDTO): Mono<NoteDTO> {
        return noteRepository.save(noteMapper.fromDTO(listNoteDTO)).map { noteMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return noteRepository.deleteById(id)
    }
}