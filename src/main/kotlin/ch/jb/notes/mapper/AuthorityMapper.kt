package ch.jb.notes.mapper

import ch.jb.notes.domainmodel.Privilege
import ch.jb.notes.dto.PrivilegeDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface AuthorityMapper {
    fun toDTO(privilege: Privilege): PrivilegeDTO
    fun fromDTO(privilegeDTO: PrivilegeDTO): Privilege
    fun toDTOs(privileges: List<Privilege>): List<PrivilegeDTO>
    fun fromDTOs(privilegeDTOS: List<PrivilegeDTO>): List<Privilege>
}