/*
package ch.jb.notes.config

import ch.jb.notes.security.TokenAuthenticationConverter
import ch.jb.notes.security.TokenAuthenticationManager
import org.springframework.context.annotation.Bean
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

    fun tokenAuthenticationFilter(
            reactiveAuthenticationManager: ReactiveAuthenticationManager,
            serverAuthenticationConverter: ServerAuthenticationConverter
    ): AuthenticationWebFilter = AuthenticationWebFilter(reactiveAuthenticationManager).apply {
        setServerAuthenticationConverter(serverAuthenticationConverter)
        setAuthenticationFailureHandler { _, exception -> Mono.error(exception) }
    }

    @Bean
    fun authConverter() = TokenAuthenticationConverter()

    @Bean
    fun authManager() = TokenAuthenticationManager()

    @Bean
    fun securityFilterChain(
            http: ServerHttpSecurity,
            reactiveAuthenticationManager: ReactiveAuthenticationManager,
            serverAuthenticationConverter: ServerAuthenticationConverter
    ): SecurityWebFilterChain = http
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
            .addFilterAt(
                    tokenAuthenticationFilter(reactiveAuthenticationManager, serverAuthenticationConverter),
                    SecurityWebFiltersOrder.AUTHENTICATION)
            .build()

    @Bean
    fun passwordEncoder(): PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
}
*/
