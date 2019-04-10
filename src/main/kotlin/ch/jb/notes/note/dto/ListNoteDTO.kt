package ch.jb.notes.note.dto

import java.time.LocalDateTime

class ListNoteDTO(
        var id: String? = null,
        var title: String,
        var createdAt: LocalDateTime = LocalDateTime.now(),
        var lastEdit: LocalDateTime = LocalDateTime.now(),
        var content: List<String> = mutableListOf()
) {
    private val type = "LIST"

    constructor(): this(title = "")
}