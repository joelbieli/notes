package ch.jb.notes.dto

import java.time.LocalDateTime

class NoteDTO(
        var id: String? = null,
        var title: String,
        var createdAt: LocalDateTime = LocalDateTime.now(),
        var lastEdit: LocalDateTime = LocalDateTime.now(),
        var content: MutableMap<String, Any> = mutableMapOf()
) {
    constructor(): this(title = "")
}