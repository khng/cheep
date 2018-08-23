package com.cheep.cheepapi

import javassist.NotFoundException
import org.springframework.stereotype.Service

@Service
class ItemService(private val itemRepository: ItemRepository): ItemServiceInterface {

    override fun getAll(): Array<Item> {
        return itemRepository.findAll().toTypedArray()
    }

    @Throws(NotFoundException::class) override fun getByName(itemName: String): Item {
        return itemRepository.findByName(itemName) ?: throw NotFoundException(itemName)
    }

    override fun saveItem(item: Item): Item {
        return itemRepository.save(item)
    }

}