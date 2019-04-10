package ch.jb.notes.note.mapper

import ch.jb.notes.note.domainmodel.TextNote
import ch.jb.notes.note.dto.TextNoteDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface TextNoteMapper {
    fun toDTO(note: TextNote): TextNoteDTO
    fun fromDTO(noteDTO: TextNoteDTO): TextNote
    fun toDTOs(notes: List<TextNote>): List<TextNoteDTO>
    fun fromDTOs(noteDTOs: List<TextNoteDTO>): List<TextNote>
}