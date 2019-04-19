package ch.jb.notes.dto

import ch.jb.notes.domainmodel.Role

class UserDTO(
        var id: String?,
        var userName: String,
        var passwordHash: String,
        var roles: Set<Role>
) {
    constructor(): this(
            null,
            "",
            "",
            mutableSetOf()
    )
}