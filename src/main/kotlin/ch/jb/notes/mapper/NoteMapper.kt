package ch.jb.notes.mapper

import ch.jb.notes.domainmodel.Note
import ch.jb.notes.dto.NoteDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface NoteMapper {
    fun toDTO(user: Note): NoteDTO
    fun fromDTO(userDTO: NoteDTO): Note
    fun toDTOs(users: List<Note>): List<NoteDTO>
    fun fromDTOs(userDTOs: List<NoteDTO>): List<Note>
}