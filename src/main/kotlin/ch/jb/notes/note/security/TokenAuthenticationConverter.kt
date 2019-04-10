/*
package ch.jb.notes.note.security

import org.springframework.http.HttpHeaders
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

class TokenAuthenticationConverter: ServerAuthenticationConverter {
    override fun convert(exchange: ServerWebExchange): Mono<Authentication> {
        val authorization = exchange.request.headers.getFirst(HttpHeaders.AUTHORIZATION)

        return if (authorization == null || !authorization.startsWith("Bearer "))
            Mono.empty<Authentication>()
        else
            Mono.just<Authentication>(JWTAuthenticationToken(authorization.substring(7)))
    }
}*/
