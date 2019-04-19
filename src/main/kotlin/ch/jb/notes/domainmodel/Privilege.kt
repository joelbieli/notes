package ch.jb.notes.domainmodel

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Field

class Privilege(
        @Id @Field var id: String?,
        @Field var authority: String
) {
    constructor(): this(
            null,
            ""
    )
}