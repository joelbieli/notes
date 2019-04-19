/*
package ch.jb.notes.security

import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails

class JWTAuthenticationToken(
        authorities: MutableCollection<out GrantedAuthority>
): AbstractAuthenticationToken(authorities), Authentication {
    private var userDetails: UserDetails? = null
    private lateinit var jwt: String

    constructor(jwt: String): this(
            AuthorityUtils.NO_AUTHORITIES
    ) {
        this.jwt = jwt
    }

    constructor(userDetails: UserDetails, jwt: String, authorities: MutableCollection<out GrantedAuthority>): this(
            authorities
    ) {
        this.jwt = jwt
        this.userDetails = userDetails
        isAuthenticated = true
    }

    override fun getCredentials(): Any {
        return jwt
    }

    override fun getPrincipal(): Any? {
        return userDetails
    }
}*/
