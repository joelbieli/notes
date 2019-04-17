package ch.jb.notes.note.mapper

import ch.jb.notes.note.domainmodel.Note
import ch.jb.notes.note.dto.NoteDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface NoteMapper {
    fun toDTO(user: Note): NoteDTO
    fun fromDTO(userDTO: NoteDTO): Note
    fun toDTOs(users: List<Note>): List<NoteDTO>
    fun fromDTOs(userDTOs: List<NoteDTO>): List<Note>
}