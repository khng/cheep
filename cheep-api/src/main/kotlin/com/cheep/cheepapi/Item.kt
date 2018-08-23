package com.cheep.cheepapi

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Item(
        @Id @GeneratedValue val id: Long,
        val name: String,
        val price: Double,
        val image: String,
        val valid: Boolean)
