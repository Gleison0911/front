import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedalList } from 'src/app/models/medal-list';
import { ListCategoryService } from 'src/app/services/list-category/list-category.service';
import { MedalListService } from 'src/app/services/medal-list/medal-list.service';

@Component({
  selector: 'app-medal-list',
  templateUrl: './medal-list.component.html',
  styleUrls: ['./medal-list.component.scss']
})
export class MedalListComponent implements OnInit {

  public tableSize: number = 0;

  public formMedal = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    titulo: new FormControl('', Validators.required),
    subtitulo: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    imagem_1: new FormControl('', Validators.required),
    imagem_2: new FormControl('', Validators.required)
  });

  public errormsg: string = '';
  public medalList: any = [];
  public medalPage: any = [];
  public saveResponse: any;
  public editData: any;
  public page = this.medalList;
  public searchText: string = '';

  constructor(
    private medalListSevice: MedalListService,
    private builder: FormBuilder
  ) {
    this.medalList = [];
  }

  ngOnInit() {
    this.readMedalPage(0, 100);
  }

  public onSearchTextChanged(searchValue: string) {
    this.searchText = searchValue;
  }

  // public readMedal() {
  //   this.medalListSevice.getMedalList().subscribe(data => {
  //     this.medalList = data;
  //   })
  // }

  public readMedalPage(page: any, size: any) {
    this.medalListSevice.getMedalPage(page, size).subscribe(data => {
      this.medalPage = data;
      this.medalList = this.medalPage.content;
      this.tableSize = this.tableSize;
    })
  }

  public pageChaged(event: any) {
    this.tableSize = event.target.value;
    this.readMedalPage(0, 100);
  }

  saveData() {
    if (this.formMedal.valid) {

      this.editData = this.formMedal.getRawValue().id;

      if (this.editData != '' && this.editData != null) {
        this.medalListSevice.updateMed(this.editData, this.formMedal.getRawValue()).subscribe((result) => {
          this.saveResponse = result;
          this.readMedalPage(0, 100);
          alert("Medalha Atualizada com sucesso...");
        });
      } else {
        this.medalListSevice.createMedal(this.formMedal.getRawValue()).subscribe((result) => {
          this.saveResponse = result;
          this.readMedalPage(0, 100);
          alert("Medalha Salve com sucesso...");
        });
      }
    } else {
      this.errormsg = "Entre com dados validos..."
    }
  }

  oneEdite(code: any) {
    this.medalListSevice.oneMed(code).subscribe(result => {
      this.editData = result;
      this.formMedal.setValue({
        id: this.editData.id,
        titulo: this.editData.titulo,
        subtitulo: this.editData.subtitulo,
        category_id: this.editData.category_id,
        descricao: this.editData.descricao,
        imagem_1: this.editData.imagem_1,
        imagem_2: this.editData.imagem_2,
      });
    });
  }

  deleteCateg(code: MedalList) {
    if (confirm("Deseja realmente excluir essa medalha ?",)) {
      this.medalListSevice.delete(code).subscribe((result) => {
        this.readMedalPage(0, 100);
      })
    }
  }
}