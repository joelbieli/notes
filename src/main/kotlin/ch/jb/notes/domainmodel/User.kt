package ch.jb.notes.domainmodel

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document
open class User(
        @Id @Field var id: String?,
        @Field var username: String,
        @Field var password: String,
        @Field var roles: MutableSet<Role>
) {

    constructor(): this(
            null,
            "",
            "",
            mutableSetOf()
    )

    constructor(user: User): this(
            user.id,
            user.username,
            user.password,
            user.roles
    )
}