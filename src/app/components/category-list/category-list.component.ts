import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryList, Page } from 'src/app/models/category-list';
import { ListCategoryService } from 'src/app/services/list-category/list-category.service';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    public tableSize: any;
    public page?: Page;
    public size: any;

    public formCategory = new FormGroup({
        id: new FormControl({ value: 0, disabled: true }),
        titulo: new FormControl('', Validators.required),
        subtitulo: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        imagem: new FormControl('', Validators.required)
    });

    public errormsg: string = '';
    public categoryList: any = [];
    public categoryListPage: any = [];
    public saveResponse: any;
    public editData: any;
    public searchText: string = '';

    constructor(
        private listCategoryService: ListCategoryService,
        private builder: FormBuilder
    ) {
        this.categoryList = [];
    }

    ngOnInit() {
        this.readCategoryPage(0, 100);
    }

    public onSearchTextChanged(searchValue: string) {
        this.searchText = searchValue;
    }

    public pageChaged(event: any) {
        this.tableSize = event.target.value;
        this.readCategoryPage(0, 100);
    }

    // public readCategory() {
    //     this.listCategoryService.getCategoryList().subscribe(data => {
    //         this.categoryList = data;
    //         this.tableSize = this.categoryList.content.legth;
    //     })
    // }

    public readCategoryPage(page: number, size: number) {
        this.listCategoryService.getCategoryPage(page, size).subscribe(data => {
            this.categoryListPage = data;
            this.categoryList = this.categoryListPage.content;
            this.tableSize = this.categoryList;
            console.log("Testando: ", this.tableSize);
        })
    }

    public saveData() {
        if (this.formCategory.valid) {

            this.editData = this.formCategory.getRawValue().id;

            if (this.editData != '' && this.editData != null) {
                this.listCategoryService.updateCategor(this.editData, this.formCategory.getRawValue()).subscribe((result) => {
                    this.saveResponse = result;
                    this.readCategoryPage(0, 100);
                    alert("Categoria Atualizada com sucesso...");
                });
            } else {
                this.listCategoryService.createCategory(this.formCategory.getRawValue()).subscribe((result) => {
                    this.saveResponse = result;
                    this.readCategoryPage(0, 100);
                    alert("Categoria Salve com sucesso...");
                });
            }
        } else {
            this.errormsg = "Entre com dados validos..."
        }
    }

    public oneEdite(code: any) {
        this.listCategoryService.oneCategor(code).subscribe(result => {
            this.editData = result;
            this.formCategory.setValue({
                id: this.editData.id,
                titulo: this.editData.titulo,
                subtitulo: this.editData.subtitulo,
                descricao: this.editData.descricao,
                imagem: this.editData.imagem,
            });
        });
    }

    public deleteCateg(code: CategoryList) {
        if (confirm("Deseja realmente excluir essa categoria ?",)) {
            this.listCategoryService.delete(code).subscribe((result) => {
                this.readCategoryPage(0, 100);
            })
        }
    }
}
