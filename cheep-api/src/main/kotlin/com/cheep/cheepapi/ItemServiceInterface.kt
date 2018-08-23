package com.cheep.cheepapi

import javassist.NotFoundException

interface ItemServiceInterface {
    fun getAll(): Array<Item>
    @Throws(NotFoundException::class) fun getByName(itemName: String): Item
    fun saveItem(item: Item): Item
}