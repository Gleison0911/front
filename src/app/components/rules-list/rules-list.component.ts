import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RulesList } from 'src/app/models/rules-list';
import { ListRulesService } from 'src/app/services/list-rules/list-rules.service';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.scss']
})
export class RulesListComponent implements OnInit {

  public tableSize: number = 0;

  public mockType: any = [
    {
      id: 1,
      type: "Checkin"
    },
    {
      id: 2,
      type: "Purchases"
    },
    {
      id: 3,
      type: "Amount spent"
    }
  ]

  public formRule = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    titulo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    medal_id: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    qtyd: new FormControl('', Validators.required)
  });

  public errormsg: string = '';
  public ruleList: any = [];
  public rulePage: any = [];
  public saveResponse: any;
  public editData: any;
  public page = this.ruleList;
  public typeValue: any;
  public searchText: string = '';

  constructor(
    private ruleService: ListRulesService,
    private builder: FormBuilder
  ) {
    this.ruleList = [];
    for (let i = 1; i <= 200; i++) {
      this.ruleList.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.readRulePage(0, 100);
  }

  public onSearchTextChanged(searchValue: string) {
    this.searchText = searchValue;
  }


  public pageChaged(event: any) {
    this.tableSize = event.target.value;
    this.readRulePage(0, 100);
  }

  // public readRule() {
  //   this.ruleService.getRuleList().subscribe(data => {
  //     this.ruleList = data;
  //   })
  // }

  public readRulePage(page: any, size: any) {
    this.ruleService.getRulePage(page, size).subscribe(data => {
      this.rulePage = data;
      this.ruleList = this.rulePage.content;
      this.tableSize = this.tableSize;
    })
  }

  public saveData() {
    if (this.formRule.valid) {
      this.editData = this.formRule.getRawValue().id;
      if (this.editData != '' && this.editData != null) {
        this.ruleService.updateRule(this.editData, this.formRule.getRawValue()).subscribe((result) => {
          this.saveResponse = result;
          this.readRulePage(0, 100);
          alert("Medalha Atualizada com sucesso...");
        });
      } else {
        this.ruleService.createRule(this.formRule.getRawValue()).subscribe((result) => {
          this.saveResponse = result;
          this.readRulePage(0, 100);
          alert("Medalha Salve com sucesso...");
        });
      }
    } else {
      this.errormsg = "Entre com dados validos..."
    }
  }

  public oneEdite(code: RulesList) {
    this.ruleService.oneRul(code).subscribe(result => {
      this.editData = result;
      this.formRule.setValue({
        id: this.editData.id,
        titulo: this.editData.titulo,
        descricao: this.editData.descricao,
        medal_id: this.editData.medal_id,
        type: this.editData.type,
        qtyd: this.editData.qtyd,
      });
    });
  }

  public deleteRule(code: RulesList) {
    if (confirm("Deseja realmente excluir essa regra ?",)) {
      this.ruleService.delete(code).subscribe((result) => {
        this.readRulePage(0, 100);
      })
    }
  }

  public changeType(e: any) {
    this.typeValue = e.target.value;
  }
}
