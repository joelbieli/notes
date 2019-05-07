package ch.jb.notes

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MockMvcBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import java.io.File

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureWebTestClient
class GenerateSwaggerDoc {

    @Autowired
    private lateinit var webTestClient: WebTestClient

    @Test
    fun generateSwagger() {
        webTestClient
                .get()
                .uri("/v2/api-docs")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk
                .expectBody().consumeWith { File("/docs/swagger.json").writeText(String(it.responseBody!!)) }
    }
}