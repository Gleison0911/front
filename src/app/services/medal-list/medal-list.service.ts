import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedalList } from 'src/app/models/medal-list';

@Injectable({
  providedIn: 'root'
})
export class MedalListService {

  public urlGetMedal = "http://localhost:3000/api/get-all-medals";
  public urlPostMedal = "http://localhost:3000/api/add-medal";
  public urlPutMedal = "http://localhost:3000/api/update-medal/";
  public oneMedal = "http://localhost:3000/api/one-medal";
  public deleteMedal = "http://localhost:3000/api/delete-one-medal";

  constructor(private http: HttpClient) { }

  public getMedalList() {
    return this.http.get<MedalListService>(this.urlGetMedal);
  }

  public getMedalPage(page: any, size: any): Observable<MedalList> {
    return this.http.get<MedalList>(`http://localhost:3000/api/get-all-medals?page=${page}&size=${size}`);
  }

  public createMedal(medal: MedalList): Observable<MedalList> {
    return this.http.post<MedalList>(this.urlPostMedal, medal);
  }

  public oneMed(medalId: any) {
    return this.http.get(this.oneMedal + '/' + medalId);
  }

  public updateMed(medalId: MedalList, medal: any) {
    return this.http.put(this.urlPutMedal + medalId, medal);
  }

  public delete(medalId: MedalList) {
    return this.http.delete(this.deleteMedal + '/' + medalId);
  }

}
