package ch.jb.notes.note.domainmodel

import java.time.LocalDateTime

class ListNote(
        id: String?,
        title: String,
        createdAt: LocalDateTime,
        lastEdit: LocalDateTime,
        content: List<String>
) : Note<List<String>>(id, title, createdAt, lastEdit, content)