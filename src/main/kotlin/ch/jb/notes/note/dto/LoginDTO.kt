package ch.jb.notes.note.dto

class LoginDTO(
        val username: String,
        val password: String
) {
    constructor(): this("", "")
}