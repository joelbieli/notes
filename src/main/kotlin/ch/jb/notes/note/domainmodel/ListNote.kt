package ch.jb.notes.note.domainmodel

import java.time.LocalDateTime

class ListNote(
        id: String?,
        title: String,
        createdAt: LocalDateTime,
        lastEdit: LocalDateTime,
        owner: User?,
        content: List<String>
) : Note<List<String>>(id, title, createdAt, lastEdit, owner, content) {
    constructor(): this(
            null,
            "",
            LocalDateTime.now(),
            LocalDateTime.now(),
            null,
            mutableListOf()
    )
}