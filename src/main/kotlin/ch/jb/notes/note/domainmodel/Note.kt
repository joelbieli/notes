package ch.jb.notes.note.domainmodel

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document
abstract class Note<T: Any>(
        @Id @Field var id: String?,
        @Field var title: String,
        @Field var createdAt: LocalDateTime,
        @Field var lastEdit: LocalDateTime,
        @DBRef var owner: User?,
        @Field var content: T
) {
    override fun toString(): String {
        return "Note(id=$id, title='$title', createdAt=$createdAt, lastEdit=$lastEdit, content=$content)"
    }
}