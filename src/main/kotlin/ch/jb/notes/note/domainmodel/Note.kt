package ch.jb.notes.note.domainmodel

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document
abstract class Note<T: Any>(
        @Id @Field private var id: String?,
        @Field private var title: String,
        @Field private var createdAt: LocalDateTime,
        @Field private var lastEdit: LocalDateTime,
        @Field private var content: T
) {
    override fun toString(): String {
        return "Note(id=$id, title='$title', createdAt=$createdAt, lastEdit=$lastEdit, content=$content)"
    }
}