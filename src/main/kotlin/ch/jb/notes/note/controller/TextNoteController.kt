package ch.jb.notes.note.controller

import ch.jb.notes.note.dto.TextNoteDTO
import ch.jb.notes.note.exception.NoNotesFoundException
import ch.jb.notes.note.exception.NoteNotFoundException
import ch.jb.notes.note.mapper.TextNoteMapper
import ch.jb.notes.note.repository.TextNoteRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import reactor.core.publisher.Flux
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@RestController
@RequestMapping("/textnotes")
@CrossOrigin
class TextNoteController {

    @Autowired
    private lateinit var textNoteRepository: TextNoteRepository

    @Autowired
    private lateinit var textNoteMapper: TextNoteMapper

    @GetMapping
    fun getAll(): Flux<TextNoteDTO> {
        return textNoteRepository.findAll()
                .switchIfEmpty { throw NoNotesFoundException("Could not find any notes") }
                .map { textNoteMapper.toDTO(it) }
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Mono<TextNoteDTO> {
        return textNoteRepository.findById(id)
                .switchIfEmpty { throw NoteNotFoundException("Could not find note with id: $id") }
                .map { textNoteMapper.toDTO(it) }
    }

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun save(@RequestBody textNoteDTO: TextNoteDTO): Mono<TextNoteDTO> {
        return textNoteRepository.save(textNoteMapper.fromDTO(textNoteDTO)).map { textNoteMapper.toDTO(it) }
    }

    @PutMapping
    fun update(@RequestBody textNoteDTO: TextNoteDTO): Mono<TextNoteDTO> {
        return textNoteRepository.save(textNoteMapper.fromDTO(textNoteDTO)).map { textNoteMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return textNoteRepository.deleteById(id)
    }
}