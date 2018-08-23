import {Injectable} from '@angular/core';
import {IItem} from "../models/item.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ItemsService {

  saveEventSource = new Subject();
  baseUrl = environment.api

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<IItem[]> {
    // const header = new HttpHeaders();
    // header.set("Authorization", "Basic " + btoa("user:4dab72d6-0a9a-4dd2-8eb7-ed3a0b689c6b"))
    return this.httpClient.get<IItem[]>(this.baseUrl + "/items")
  }

  saveItem(name: string, price: number, image: string) {
    let item = {
      name: name,
      price: price,
      image: image,
      valid: true
    };

    let options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }
      )
    };

    return this.httpClient.post(this.baseUrl + "/items", item, options)
  }

  notifyGetEvent() {
    this.saveEventSource.next();
  }

  saveEvent() {
    return this.saveEventSource.asObservable()
  }
}
