/*
package ch.jb.notes.security

import ch.jb.notes.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

class TokenAuthenticationManager: ReactiveAuthenticationManager {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var jwtProvider: JWTProvider

    override fun authenticate(authentication: Authentication): Mono<Authentication> {
        val jwt = authentication.credentials as String

        return userRepository
                .findById(jwtProvider.getUserIdFromJWT(jwt))
                .map { user -> UserPrincipal(user) }
                .map { principal -> JWTAuthenticationToken(
                        principal,
                        jwt,
                        principal.authorities
                ) }
    }
}*/
