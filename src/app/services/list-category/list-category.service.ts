import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoryList, Page } from 'src/app/models/category-list';

@Injectable({
  providedIn: 'root'
})
export class ListCategoryService {

  public urlGetCategory = "http://localhost:3000/api/get-categorys/";
  public urlPostCategory = "http://localhost:3000/api/add-category";
  public urlPutCategory = "http://localhost:3000/api/update-category/";
  public oneCateg = "http://localhost:3000/api/one-category";
  public deleteCateg = "http://localhost:3000/api/delete-one-category";

  constructor(
    private http: HttpClient
  ) { }

  public getCategoryList() {
    return this.http.get<ListCategoryService>(this.urlGetCategory);
  }

  public getCategoryPage(page: any, size: any): Observable<CategoryList> {
    return this.http.get<CategoryList>(`http://localhost:3000/api/get-categorys?page=${page}&size=${size}`);
  }

  public createCategory(category: CategoryList): Observable<CategoryList> {
    return this.http.post<CategoryList>(this.urlPostCategory, category);
  }

  public oneCategor(categId: any) {
    return this.http.get(this.oneCateg + '/' + categId);
  }

  public updateCategor(categId: CategoryList, category: any) {
    return this.http.put(this.urlPutCategory + categId, category);
  }

  public delete(categId: CategoryList) {
    return this.http.delete(this.deleteCateg + '/' + categId);
  }
}
