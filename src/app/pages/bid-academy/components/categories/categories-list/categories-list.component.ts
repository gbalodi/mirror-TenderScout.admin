import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IButton } from 'app/model/headerButton.interface';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../categories.service';
import { ICategory } from 'app/model/pathway-category.interface';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @ViewChild('createCategoryModal') createCategoryModal: ElementRef;
  public categoryForm: FormGroup;
  public bsModalRef: BsModalRef;
  public loading: boolean = false;
  public buttons: IButton[] = [{ name: 'Create Category', usePurpose: 'modal', params: ['createCategoryModal', undefined] }];
  public categories: ICategory[] = [];

  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._getPathwayCategories();
  }

  private _getPathwayCategories() {
    this.categoriesService.getPathwayCategories().subscribe((res: any) => {
      res = JSON.parse(res);
      this.categories = res;
    }, error => {
      console.error(error);
    });
  }

  public openModal(template: TemplateRef<any>, item: any) {
    this.categoryForm.reset();
    if (item) {
      this.categoryForm.patchValue({
        id: item.id,
        name: item.name
      });
    }
    this.bsModalRef = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }

  public submit() {
    this.loading = true;
    let method: string = !this.categoryForm.value.id ? 'createPathwayCategory' : 'updatePathwayCategory';
    let req = { ...this.categoryForm.value };
    delete req.id;

    this.categoriesService[method]({ story_category: req }, this.categoryForm.value.id ? this.categoryForm.value.id : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.loading = false;
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getPathwayCategories();
    }, error => {
      console.error(error);
    });
  }

  public deleteCategory() {
    this.categoriesService.deletePathwayCategory(this.categoryForm.value.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getPathwayCategories();
    }, error => {
      console.error(error);
    });
  }

}
