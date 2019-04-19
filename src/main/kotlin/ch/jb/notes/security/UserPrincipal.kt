/*
package ch.jb.notes.security

import ch.jb.notes.domainmodel.Role
import ch.jb.notes.domainmodel.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails

class UserPrincipal(
        val id: String?,
        private val userName: String,
        private val passwordHash: String,
        private val roles: MutableSet<Role>
): UserDetails {
    constructor(user: User): this(
            user.id,
            user.userName,
            user.passwordHash,
            user.roles
    )

    @JsonIgnore
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return AuthorityUtils.commaSeparatedStringToAuthorityList(
                roles.joinToString(",") { "ROLE_${it.name}" }
        )
    }

    @JsonIgnore
    override fun isEnabled(): Boolean {
        return true
    }

    override fun getUsername(): String {
        return userName
    }

    @JsonIgnore
    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    @JsonIgnore
    override fun getPassword(): String {
        return passwordHash
    }

    @JsonIgnore
    override fun isAccountNonExpired(): Boolean {
        return true
    }

    @JsonIgnore
    override fun isAccountNonLocked(): Boolean {
        return true
    }
}*/
