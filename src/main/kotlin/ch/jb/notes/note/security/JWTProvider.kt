/*
package ch.jb.notes.note.security

import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import java.io.File
import java.util.*

@Component
class JWTProvider {

    @Value("\${app.jwtExpirationInMs}")
    private var jwtExpirationInMs: Int = 0

    private val jwtSecretStore = File(ClassPathResource("application.properties").file.parentFile.absolutePath + "/jwt_secret.key")

    private val secretKey = if (jwtSecretStore.exists()) {
        Keys.hmacShaKeyFor(jwtSecretStore.readBytes())
    } else {
        val newKey = Keys.secretKeyFor(SignatureAlgorithm.HS512)
        jwtSecretStore.createNewFile()
        jwtSecretStore.writeBytes(newKey.encoded)
        newKey
    }

    private val slf4Logger = LoggerFactory.getLogger(JWTProvider::class.java)

    fun generateToken(principal: UserPrincipal): String {
        val expirationDate = Date(Date().time + jwtExpirationInMs)

        return Jwts.builder()
                .setSubject(principal.id)
                .setIssuedAt(Date())
                .setExpiration(expirationDate)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact()
    }

    fun getUserIdFromJWT(jwt: String): String {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt).body.subject
    }

    fun validateJWT(jwt: String): Boolean {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwt)
            return true
        } catch (ex: SecurityException) {
            slf4Logger.error("Invalid JWT signature")
        } catch (ex: MalformedJwtException) {
            slf4Logger.error("Invalid JWT token")
        } catch (ex: ExpiredJwtException) {
            slf4Logger.error("Expired JWT token")
        } catch (ex: UnsupportedJwtException) {
            slf4Logger.error("Unsupported JWT token")
        } catch (ex: IllegalArgumentException) {
            slf4Logger.error("JWT claims string is empty.")
        }
        return false
    }
}*/
