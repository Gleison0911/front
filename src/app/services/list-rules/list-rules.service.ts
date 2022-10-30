import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RulesList } from 'src/app/models/rules-list';

@Injectable({
  providedIn: 'root'
})
export class ListRulesService {

  public urlGetRule = "http://localhost:3000/api/get-all-roules";
  public urlPostRule = "http://localhost:3000/api/add-rule";
  public urlPutRule = "http://localhost:3000/api/update-rule/";
  public oneRule = "http://localhost:3000/api/one-rule";
  public deleteRule = "http://localhost:3000/api/delete-one-rule";

  constructor(
    private http: HttpClient
  ) { }

  public getRuleList() {
    return this.http.get<ListRulesService>(this.urlGetRule);
  }

  public getRulePage(page: any, size: any): Observable<RulesList> {
    return this.http.get<RulesList>(`http://localhost:3000/api/get-all-roules?page=${page}&size=${size}`);
  }

  public createRule(rule: RulesList): Observable<RulesList> {
    return this.http.post<RulesList>(this.urlPostRule, rule);
  }

  public oneRul(ruleId: any) {
    return this.http.get(this.oneRule + '/' + ruleId);
  }

  public updateRule(ruleId: RulesList, rule: any) {
    return this.http.put(this.urlPutRule + ruleId, rule);
  }

  public delete(ruleId: RulesList) {
    return this.http.delete(this.deleteRule + '/' + ruleId);
  }

}
