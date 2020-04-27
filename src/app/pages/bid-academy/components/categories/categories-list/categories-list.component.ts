import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IButton } from 'app/model/headerButton.interface';
import { ToastrService } from 'ngx-toastr';

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
  public categories: any = [];

  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.categoryForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit() { }

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
    let method: string = !this.categoryForm.value.id ? 'createStories' : 'updateStories';
    let req = { ...this.categoryForm.value };
    delete req.id;

    // this.groupService[method]({ story: req }, this.categoryForm.value.id ? this.categoryForm.value.id : undefined).subscribe((res: any) => {
    //   res = JSON.parse(res);
    //   this.loading = false;
    //   this.toastrService.success(res.success, 'Success');
    //   this.bsModalRef.hide();
    //   this._getAllGroups();
    // }, error => {
    //   console.error(error);
    // });
  }

  public deleteCategory() {
    // this.groupService.deleteStories(this.categoryForm.value.id).subscribe((res: any) => {
    //   res = JSON.parse(res);
    //   this.toastrService.success(res.success, 'Success');
    //   this.bsModalRef.hide();
    //   this._getAllGroups();
    // }, error => {
    //   console.error(error);
    // });
  }

}
