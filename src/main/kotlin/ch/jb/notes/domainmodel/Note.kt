package ch.jb.notes.domainmodel

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document
class Note(
        @Id @Field var id: String?,
        @Field var title: String,
        @Field var createdAt: LocalDateTime,
        @Field var lastEdit: LocalDateTime,
        @DBRef var owner: User?,
        @Field var color: Color,
        @Field var content: MutableMap<String, Any>
) {
    constructor(): this(
            null,
            "",
            LocalDateTime.now(),
            LocalDateTime.now(),
            null,
            Color.GREY,
            mutableMapOf()
    )

    override fun toString(): String {
        return "Note(id=$id, title='$title', createdAt=$createdAt, lastEdit=$lastEdit, color=$color, content=$content)"
    }
}