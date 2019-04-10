package ch.jb.notes

import ch.jb.notes.note.domainmodel.ListNote
import ch.jb.notes.note.domainmodel.TextNote
import ch.jb.notes.note.repository.ListNoteRepository
import ch.jb.notes.note.repository.TextNoteRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import java.time.LocalDateTime

@SpringBootApplication
class NotesApplication {

    @Bean
    fun run(listNoteRepository: ListNoteRepository, textNoteRepository: TextNoteRepository) = CommandLineRunner {
        val lnote = ListNote(
                null,
                "title1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                listOf("content 11", "content 12")
        )
        listNoteRepository.deleteAll().subscribe()
        listNoteRepository.save(lnote).subscribe(null, null, { println("gucci") })

        val tnote = TextNote(
                null,
                "title1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                "coooonnnteeennnt"
        )
        textNoteRepository.deleteAll().subscribe()
        textNoteRepository.save(tnote).subscribe(null, null, { println("gucci") })
    }
}

fun main(args: Array<String>) {
    runApplication<NotesApplication>(*args)
}
