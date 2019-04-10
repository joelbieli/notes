package ch.jb.notes.note.mapper

import ch.jb.notes.note.domainmodel.User
import ch.jb.notes.note.dto.UserDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface UserMapper {
    fun toDTO(user: User): UserDTO
    fun fromDTO(userDTO: UserDTO): User
    fun toDTOs(users: List<User>): List<UserDTO>
    fun fromDTOs(userDTOs: List<UserDTO>): List<User>
}