package ch.jb.notes.note.dto

import ch.jb.notes.note.domainmodel.Role

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