package com.cheep.cheepapi

import com.fasterxml.jackson.databind.ObjectMapper
import javassist.NotFoundException
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@RunWith(SpringRunner::class)
@AutoConfigureMockMvc
@SpringBootTest
@WithMockUser
class ItemControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var json: ObjectMapper

    @MockBean
    lateinit var itemService: ItemServiceInterface

    @Test
    fun shouldReturnAllItems() {
        val item = Item(1, "name", 1.99, "someUrl", true)
        `when`(itemService.getAll()).thenReturn(arrayOf(item))

        val mvcResult = mockMvc.perform(get("/items"))
                .andExpect(status().isOk)
                .andReturn()

        verify(itemService).getAll()
        val body = mvcResult.response.contentAsString
        val actual = json.readValue(body, Array<Item>::class.java)
        assertThat(actual).isEqualTo(arrayOf(item))
    }

    @Test
    fun whenGivenValidName_shouldReturnItem() {
        val GET_ITEM_BY_NAME = "/items/{itemName}"
        val nameOfItem = "itemName"
        val item = Item(1, nameOfItem, 1.99, "someUrl", true)
        `when`(itemService.getByName(nameOfItem)).thenReturn(item)

        val mvcResult = mockMvc.perform(get(GET_ITEM_BY_NAME, nameOfItem))
                .andExpect(status().isOk)
                .andReturn()

        val body = mvcResult.response.contentAsString
        val actual = json.readValue(body, Item::class.java)
        assertThat(actual).isEqualTo(item)
    }

    @Test
    fun whenItemDoesNotExist_ShouldReturnNotFoundException() {
        val itemThatDoesNotExist = "something"
        val GET_ITEM_BY_NAME = "/items/{itemName}"

        `when`(itemService.getByName(anyString())).thenThrow(NotFoundException(itemThatDoesNotExist))

        mockMvc.perform(get(GET_ITEM_BY_NAME, itemThatDoesNotExist))
                .andExpect(status().isNotFound)

    }

    @Test
    fun whenValidPost_shouldSaveItem() {
        val item = Item(1, "name", 10.99, "image", false)
        `when`(itemService.saveItem(item)).thenReturn(item)

        val mvcResult = mockMvc.perform(post("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.writeValueAsString(item)))
                .andExpect(status().isCreated)
                .andReturn()

        verify(itemService).saveItem(item)
        val body = mvcResult.response.contentAsString
        val actual = json.readValue(body, Item::class.java)
        assertThat(actual).isEqualTo(item)
    }
}