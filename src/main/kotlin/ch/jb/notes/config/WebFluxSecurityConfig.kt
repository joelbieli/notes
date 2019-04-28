package ch.jb.notes.config

import ch.jb.notes.repository.UserRepository
import ch.jb.notes.security.JWTAuthenticationToken
import ch.jb.notes.security.JWTProvider
import ch.jb.notes.security.UserPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.security.web.server.authentication.WebFilterChainServerAuthenticationSuccessHandler
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository
import reactor.core.publisher.Mono

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
class WebFluxSecurityConfig {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var jwtProvider: JWTProvider

    private fun authenticationManager() = ReactiveAuthenticationManager {
        val jwt = it.credentials as String

        userRepository
                .findById(jwtProvider.getUserIdFromJWT(jwt))
                .map { user -> UserPrincipal(user) }
                .map { userPrincipal -> JWTAuthenticationToken(userPrincipal, jwt, userPrincipal.authorities) }
    }

    private fun authenticationConverter() = ServerAuthenticationConverter {
        val authentication = it.request.headers.getFirst(HttpHeaders.AUTHORIZATION)

        if (authentication == null || !authentication.startsWith("Bearer ")) {
            Mono.empty()
        } else {
            Mono.just(JWTAuthenticationToken(authentication.substring(7)))
        }
    }

    private fun authenticationWebFilter() = AuthenticationWebFilter(authenticationManager()).apply {
        setServerAuthenticationConverter(authenticationConverter())
        setAuthenticationFailureHandler { _, exception -> Mono.error(exception) }
    }

    @Bean
    fun securityWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain = http
            .csrf()
                .disable()
            .logout()
                .disable()
            .authorizeExchange()
                .anyExchange()
                    .permitAll()
            .and()
            .formLogin()
                .loginPage("/login")
                .authenticationFailureHandler { _, exception -> Mono.error(exception) }
                .authenticationSuccessHandler(WebFilterChainServerAuthenticationSuccessHandler())
            .and()
            .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
            .exceptionHandling()
                .authenticationEntryPoint { _, exception -> Mono.error(exception) }
                .accessDeniedHandler { _, exception -> Mono.error(exception) }
            .and()
            .addFilterAt(authenticationWebFilter(), SecurityWebFiltersOrder.AUTHENTICATION)
            .build()

    @Bean
    fun passwordEncoder(): PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
}