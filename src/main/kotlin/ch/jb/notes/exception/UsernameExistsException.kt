package ch.jb.notes.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.Exception

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Username already taken")
class UsernameExistsException(message: String): Exception(message)