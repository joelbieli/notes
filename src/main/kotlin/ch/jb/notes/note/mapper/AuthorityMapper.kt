package ch.jb.notes.note.mapper

import ch.jb.notes.note.domainmodel.Privilege
import ch.jb.notes.note.dto.PrivilegeDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface AuthorityMapper {
    fun toDTO(privilege: Privilege): PrivilegeDTO
    fun fromDTO(privilegeDTO: PrivilegeDTO): Privilege
    fun toDTOs(privileges: List<Privilege>): List<PrivilegeDTO>
    fun fromDTOs(privilegeDTOS: List<PrivilegeDTO>): List<Privilege>
}