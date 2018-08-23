package com.cheep.cheepapi

import javassist.NotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController()
@RequestMapping("/items")
class ItemController(private val itemService: ItemServiceInterface) {

    @CrossOrigin(origins = ["http://localhost:4200"])
    @GetMapping()
    fun getAllItems(): ResponseEntity<Array<Item>> {
        return ResponseEntity(itemService.getAll(), HttpStatus.OK)
    }

    @GetMapping("/{itemName}")
    fun getItemWithName(@PathVariable itemName: String): ResponseEntity<Item> {
        try {
            itemService.getByName(itemName)
        } catch (error: NotFoundException) {
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }

        return ResponseEntity(itemService.getByName(itemName), HttpStatus.OK)
    }

    @CrossOrigin(origins = ["http://localhost:4200"])
    @PostMapping()
    fun saveItem(@RequestBody item: Item): ResponseEntity<Item> {
        return ResponseEntity(itemService.saveItem(item), HttpStatus.CREATED)
    }
}