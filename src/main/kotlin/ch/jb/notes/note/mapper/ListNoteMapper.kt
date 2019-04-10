package ch.jb.notes.note.mapper

import ch.jb.notes.note.domainmodel.ListNote
import ch.jb.notes.note.dto.ListNoteDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface ListNoteMapper {
    fun toDTO(note: ListNote): ListNoteDTO
    fun fromDTO(noteDTO: ListNoteDTO): ListNote
    fun toDTOs(notes: List<ListNote>): List<ListNoteDTO>
    fun fromDTOs(noteDTOs: List<ListNoteDTO>): List<ListNote>
}