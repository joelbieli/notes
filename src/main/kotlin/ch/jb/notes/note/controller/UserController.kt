/*
package ch.jb.notes.note.controller

import ch.jb.notes.note.dto.UserDTO
import ch.jb.notes.note.mapper.UserMapper
import ch.jb.notes.note.repository.UserRepository
import ch.jb.notes.note.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity.ok
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/users")
class UserController {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var userMapper: UserMapper

    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @PostMapping
    fun save(@RequestBody userDTO: UserDTO): Mono<Any> {
        return userRepository
                .save(userMapper.fromDTO(userDTO.also { it.passwordHash = passwordEncoder.encode(it.passwordHash) }))
                .thenReturn(ok())
    }

    @PutMapping
    fun update(@RequestBody userDTO: UserDTO): Mono<UserDTO> {
        return userRepository.save(userMapper.fromDTO(userDTO)).map { userMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return userService.delete(id)
    }
}*/
