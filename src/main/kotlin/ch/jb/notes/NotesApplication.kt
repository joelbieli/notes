package ch.jb.notes

import ch.jb.notes.note.domainmodel.Note
import ch.jb.notes.note.repository.NoteRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import java.time.LocalDateTime

@SpringBootApplication
class NotesApplication {

    @Bean
    fun run(noteRepository: NoteRepository) = CommandLineRunner {
        val lnote = Note(
                null,
                "title1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                mutableMapOf("blocks" to arrayOf(
                        mapOf("type" to "header")
                ))
        )
        noteRepository.deleteAll().subscribe()
        noteRepository.save(lnote).subscribe(null, null, { println("gucci") })
    }
}

fun main(args: Array<String>) {
    runApplication<NotesApplication>(*args)
}
