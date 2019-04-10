package ch.jb.notes.note.controller

import ch.jb.notes.note.dto.ListNoteDTO
import ch.jb.notes.note.exception.NoNotesFoundException
import ch.jb.notes.note.exception.NoteNotFoundException
import ch.jb.notes.note.mapper.ListNoteMapper
import ch.jb.notes.note.repository.ListNoteRepository
import org.springframework.beans.factory.annotation.Autowired
import reactor.core.publisher.Flux
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty


@RestController
@RequestMapping("/listnotes")
class ListNoteController {

    @Autowired
    private lateinit var listNoteRepository: ListNoteRepository

    @Autowired
    private lateinit var listNoteMapper: ListNoteMapper

    @GetMapping
    fun getAll(): Flux<ListNoteDTO> {
        return listNoteRepository.findAll()
                .switchIfEmpty { throw NoNotesFoundException("Could not find any notes") }
                .map { listNoteMapper.toDTO(it) }
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Mono<ListNoteDTO> {
        return listNoteRepository.findById(id)
                .switchIfEmpty { throw NoteNotFoundException("Could not find note with id: $id") }
                .map { listNoteMapper.toDTO(it) }
    }

    @PostMapping
    fun save(@RequestBody listNoteDTO: ListNoteDTO): Mono<ListNoteDTO> {
        return listNoteRepository.save(listNoteMapper.fromDTO(listNoteDTO)).map { listNoteMapper.toDTO(it) }
    }

    @PutMapping
    fun update(@RequestBody listNoteDTO: ListNoteDTO): Mono<ListNoteDTO> {
        return listNoteRepository.save(listNoteMapper.fromDTO(listNoteDTO)).map { listNoteMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return listNoteRepository.deleteById(id)
    }
}