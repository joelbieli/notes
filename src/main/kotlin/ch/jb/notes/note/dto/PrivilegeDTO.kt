package ch.jb.notes.note.dto

class PrivilegeDTO(
        var id: String?,
        var authority: String
) {
    constructor(): this(
            null,
            ""
    )
}