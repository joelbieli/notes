package ch.jb.notes.security

import ch.jb.notes.domainmodel.Role
import ch.jb.notes.domainmodel.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails

class UserPrincipal(user: User) : UserDetails {
    val id: String? = user.id
    private val username: String = user.username
    private val password: String = user.password
    private val roles: MutableSet<Role> = user.roles

    @JsonIgnore
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = AuthorityUtils
            .commaSeparatedStringToAuthorityList(roles.joinToString(",") { "ROLE_${it.name}" })

    override fun getUsername() = username

    @JsonIgnore
    override fun getPassword() = password

    @JsonIgnore
    override fun isCredentialsNonExpired() = true

    @JsonIgnore
    override fun isAccountNonExpired() = true

    @JsonIgnore
    override fun isAccountNonLocked() = true

    @JsonIgnore
    override fun isEnabled() = true
}
