package com.cheep.cheepapi

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@DataJpaTest
class ItemRepositoryTests {

    @Autowired
    lateinit var itemRepository: ItemRepository

    @Test
    fun whenFindByName_shouldReturnItem() {
        val itemName = "new item"
        val item = Item(1, itemName, 9.99, "new image", true)
        itemRepository.save(item)

        val itemReturned = itemRepository.findByName(itemName)
        assertThat(itemReturned).isEqualTo(item)
    }

    @Test
    fun whenFindByNameDoesNotExists_shouldRetunNull() {
        val itemNotFound = itemRepository.findByName("not found")
        assertThat(itemNotFound).isNull()
    }

}