package com.cheep.cheepapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CheepApiApplication

fun main(args: Array<String>) {
    runApplication<CheepApiApplication>(*args)
}
