package ch.jb.notes.dto

class PrivilegeDTO(
        var id: String?,
        var authority: String
) {
    constructor(): this(
            null,
            ""
    )
}