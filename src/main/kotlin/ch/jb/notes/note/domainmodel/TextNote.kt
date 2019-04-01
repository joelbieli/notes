package ch.jb.notes.note.domainmodel

import java.time.LocalDateTime

class TextNote(
        id: String?,
        title: String,
        createdAt: LocalDateTime,
        lastEdit: LocalDateTime,
        content: String
) : Note<String>(id, title, createdAt, lastEdit, content)