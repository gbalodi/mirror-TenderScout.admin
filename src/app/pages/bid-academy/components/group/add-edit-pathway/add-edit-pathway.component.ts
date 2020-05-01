import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { ICategory } from 'app/model/pathway-category.interface';

@Component({
  selector: 'app-add-edit-pathway',
  templateUrl: './add-edit-pathway.component.html',
  styleUrls: ['./add-edit-pathway.component.scss']
})
export class AddEditPathwayComponent implements OnInit {
  public groupForm: FormGroup;
  public loading: boolean = false;
  public pathwayId: number;
  public categories: ICategory[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.groupForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      story_category_id: [''],
      archive: [false],
      approach: ['', Validators.required],
      target_audience: ['', Validators.required],
      curriculum_overview: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.pathwayId = params.id;
        this.groupService.getStoriesById(params['id']).subscribe((res: any) => {
          let item = JSON.parse(res);
          this.groupForm.patchValue({
            id: item.id,
            name: item.name,
            description: item.description,
            story_category_id: item.story_category ? item.story_category.id : '',
            archive: item.archive,
            approach: item.approach,
            target_audience: item.target_audience,
            curriculum_overview: item.curriculum_overview
          });
        });
      }
    });

    this.categoriesService.getPathwayCategories().subscribe((res: any) => {
      res = JSON.parse(res);
      this.categories = res;
    }, error => {
      console.error(error);
    });
  }

  public submitGroup() {
    this.loading = true;
    let method: string = !this.groupForm.value.id ? 'createStories' : 'updateStories';
    let req = { ...this.groupForm.value };
    delete req.id;

    this.groupService[method]({ story: req }, this.groupForm.value.id ? this.groupForm.value.id : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.loading = false;
      this.toastrService.success(res.success, 'Success');
      this.router.navigate(['/bid-academy/pathway-list']);
    }, error => {
      console.error(error);
    });
  }

}
