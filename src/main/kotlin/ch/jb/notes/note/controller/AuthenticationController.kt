/*
package ch.jb.notes.note.controller

import ch.jb.notes.note.security.JWTProvider
import ch.jb.notes.note.security.UserPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@RestController
@PreAuthorize("permitAll()")
class AuthenticationController {

    @Autowired
    private lateinit var jwtProvider: JWTProvider

    @PostMapping
    fun login(exchange: ServerWebExchange): Mono<UserPrincipal> {
        return ReactiveSecurityContextHolder.getContext()
                .map { it.authentication.principal as UserPrincipal }
                .doOnNext {
                    exchange.response.headers.setBearerAuth(jwtProvider.generateToken(it))
                }
    }
}*/
