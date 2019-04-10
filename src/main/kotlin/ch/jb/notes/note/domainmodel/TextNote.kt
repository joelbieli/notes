package ch.jb.notes.note.domainmodel

import java.time.LocalDateTime

class TextNote(
        id: String?,
        title: String,
        createdAt: LocalDateTime,
        lastEdit: LocalDateTime,
        owner: User?,
        content: String
) : Note<String>(id, title, createdAt, lastEdit, owner, content) {
    constructor(): this(
            null,
            "",
            LocalDateTime.now(),
            LocalDateTime.now(),
            null,
            ""
    )
}