/*
package ch.jb.notes.note.security

import ch.jb.notes.note.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class CustomReactiveUserService: ReactiveUserDetailsService {

    @Autowired
    private lateinit var userRepository: UserRepository

    override fun findByUsername(username: String): Mono<UserDetails> {
        return userRepository.findUserByUserName(username).map { UserPrincipal(it) }
    }
}*/
