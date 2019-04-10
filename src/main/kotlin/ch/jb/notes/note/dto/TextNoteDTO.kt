package ch.jb.notes.note.dto

import java.time.LocalDateTime

class TextNoteDTO(
        var id: String? = null,
        var title: String,
        var createdAt: LocalDateTime = LocalDateTime.now(),
        var lastEdit: LocalDateTime = LocalDateTime.now(),
        var content: String = ""
) {
    private val type = "TEXT"

    constructor(): this(title = "")
}