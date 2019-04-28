package ch.jb.notes.dto

import ch.jb.notes.domainmodel.Role

class UserDTO(
        var id: String? = null,
        var username: String,
        var password: String,
        var roles: Set<Role> = mutableSetOf(Role.USER)
) {
    constructor(): this(
            username = "",
            password = ""
    )
}