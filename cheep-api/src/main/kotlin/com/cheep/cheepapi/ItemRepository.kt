package com.cheep.cheepapi

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
@Transactional
interface ItemRepository: JpaRepository<Item, Long> {
    fun findByName(itemName: String): Item?
}