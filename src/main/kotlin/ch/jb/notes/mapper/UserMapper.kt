package ch.jb.notes.mapper

import ch.jb.notes.domainmodel.User
import ch.jb.notes.dto.UserDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface UserMapper {
    fun toDTO(user: User): UserDTO
    fun fromDTO(userDTO: UserDTO): User
    fun toDTOs(users: List<User>): List<UserDTO>
    fun fromDTOs(userDTOs: List<UserDTO>): List<User>
}