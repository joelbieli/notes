package ch.jb.notes.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Authentication token invalid")
class InvalidJWTException(message: String): Exception(message)