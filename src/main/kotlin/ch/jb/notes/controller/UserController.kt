package ch.jb.notes.controller

import ch.jb.notes.dto.UserDTO
import ch.jb.notes.exception.UsernameTakenException
import ch.jb.notes.mapper.UserMapper
import ch.jb.notes.repository.UserRepository
import ch.jb.notes.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
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
    @PreAuthorize("permitAll()")
    fun save(@RequestBody userDTO: UserDTO): Mono<ResponseEntity<Any>> {
        return userRepository
                .save(userMapper.fromDTO(userDTO.also { it.password = passwordEncoder.encode(it.password) }))
                .onErrorResume { throw UsernameTakenException("Username ${userDTO.username} is already taken") }
                .map { ResponseEntity<Any>(HttpStatus.OK) }
    }

    @PutMapping
    fun update(@RequestBody userDTO: UserDTO): Mono<UserDTO> {
        return userRepository.save(userMapper.fromDTO(userDTO)).map { userMapper.toDTO(it) }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return userService.delete(id)
    }
}
