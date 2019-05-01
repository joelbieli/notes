package ch.jb.notes

import ch.jb.notes.domainmodel.Color
import ch.jb.notes.domainmodel.Note
import ch.jb.notes.domainmodel.Role
import ch.jb.notes.domainmodel.User
import ch.jb.notes.repository.NoteRepository
import ch.jb.notes.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.password.PasswordEncoder
import java.time.LocalDateTime

@SpringBootApplication
class NotesApplication {

    @Bean
    fun run(noteRepository: NoteRepository, userRepository: UserRepository, passwordEncoder: PasswordEncoder) = CommandLineRunner {
        val user = User(
                null,
                "joel",
                passwordEncoder.encode("pw"),
                mutableSetOf(Role.ADMIN)
        )
        userRepository.deleteAll().subscribe()
        userRepository.save(user).subscribe(null, null, { println("User Created") })

        val note = Note(
                null,
                "title1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                user,
                Color.GREY,
                mutableMapOf("blocks" to arrayOf(
                        mapOf(
                                "type" to "paragraph",
                                "data" to mapOf("text" to "A paragraph")
                        )
                ))
        )
        noteRepository.deleteAll().subscribe()
        noteRepository.save(note).subscribe(null, null, { println("Note Created") })
    }
}

fun main(args: Array<String>) {
    runApplication<NotesApplication>(*args)
}
