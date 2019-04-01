package ch.jb.notes

import ch.jb.notes.note.domainmodel.ListNote
import ch.jb.notes.note.repository.ListNoteRepository
import ch.jb.notes.note.repository.TextNoteRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import java.time.LocalDateTime
import java.util.stream.Stream

@SpringBootApplication
class NotesApplication {
    @Bean
    fun run(listNoteRepository: ListNoteRepository, textNoteRepository: TextNoteRepository) = CommandLineRunner {
        listNoteRepository.deleteAll().subscribe(null, null, {
            Stream.of(
                    ListNote(null, "Test Note", LocalDateTime.now(), LocalDateTime.now(), listOf("test content"))
            ).forEach {
                listNoteRepository.save(it).subscribe(System.out::println)
            }
        })
    }
}

fun main(args: Array<String>) {
    runApplication<NotesApplication>(*args)
}
