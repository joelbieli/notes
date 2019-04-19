package ch.jb.notes.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No notes found")
class NoNotesFoundException(message: String): Exception(message)