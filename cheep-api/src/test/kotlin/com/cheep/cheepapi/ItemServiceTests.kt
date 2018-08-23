package com.cheep.cheepapi

import javassist.NotFoundException
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class ItemServiceTests {

    @MockBean
    lateinit var itemRepository: ItemRepository

    @Autowired
    lateinit var itemService: ItemService

    @Test
    fun shouldReturnArrayOfItems() {
        val item = Item(1, "name", 10.99, "image", true)
        `when`(itemRepository.findAll()).thenReturn(listOf(item))

        val items = itemService.getAll()

        verify(itemRepository).findAll()
        assertThat(items).isEqualTo(arrayOf(item))
    }

    @Test
    fun whenNameOfItemExists_shouldReturnItem() {
        val itemName = "item name"
        val item = Item(1, itemName, 10.99, "image", true)
        `when`(itemRepository.findByName(itemName)).thenReturn(item)

        val actualItem = itemService.getByName(itemName)

        verify(itemRepository).findByName(itemName)
        assertThat(actualItem).isEqualTo(item)
    }

    @Test(expected = NotFoundException::class)
    fun whenNameOfItemDoesNotExist_shouldThrowNotFoundException() {
        `when`(itemRepository.findByName(anyString())).thenReturn(null)

        itemService.getByName("not important")
    }

    @Test
    fun shouldReturnItemOnSuccessfulSave() {
        val item = Item(1, "name", 10.99, "image", true)
        `when`(itemRepository.save(item)).thenReturn(item)

        val actualItem = itemService.saveItem(item)

        verify(itemRepository).save(any(Item::class.java))
        assertThat(item).isEqualTo(actualItem)
    }

}