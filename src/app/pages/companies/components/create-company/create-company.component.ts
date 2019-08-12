import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  @ViewChild("inputLogo") public inputLogo: ElementRef;
  public addEditCompanyDetailsForm: FormGroup;
  public allKeywords: Array<string> = [];
  public extraKeywords: Array<string> = [];
  public extraUsers: Array<string> = [];
  public allUsers: Array<any> = [];
  public createdKeywords: Array<any> = [];
  public countries: object;
  public setedCountriesId: Array<any> = [];
  public industries: object;
  public file: UploadFile[] = [];
  public dropDownSettings = {};
  public companyDetail: any;
  public showEditForm: boolean = false;
  public companyId: string;
  public fileTypes: String[] = ["jpg", "jpeg", "png"];

  public usersList$: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getCountryListAsKeyValue();
    this.getIndustriesAsKeyValue();
    this.companyId = this.activatedRoute.snapshot.paramMap.get("id");
    this.addEditCompanyDetailsForm = this.formBuilder.group({
      id: [undefined],
      name: ["", [Validators.required]],
      slogan: [""],
      description: ["", [Validators.required]],
      web_url: [""],
      blog_url: [""],
      founded: ["", [Validators.minLength(4)]],
      company_size: [undefined],
      country_id: [undefined, [Validators.required]],
      industry_id: [undefined],
      twitter_url: [""],
      linkedin_url: [""],
      // contact_email: ["", Utilities.emailValidation],
      location: ["", [Validators.required]],
      marketplace: [false],
      keywords_attributes: [[]],
      companies_users_attributes: [[]],
      logo: [null],
      logoUrl: [],
      headquarter_location: [""],
      headquarter_country: [""],
      target_markets: [[]]
    });
    this.getCompaniesInfo();
    this.getKeywords();
    this.getUsersInfo();
    this.dropDownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "country",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      // itemsShowLimit: 20,
      allowSearchFilter: true
    };

    this.companyService.getMarketplaceUsers().subscribe(res => {
      this.usersList$.next(JSON.parse(res));
    });
  }

  public getCompaniesInfo() {
    this.companyService.getCompaniesInfo().subscribe(
      (res: any) => {
        res = JSON.parse(res)
        if (res.logo) {
          this.companyDetail = res;
          setTimeout(() => {
            this.patchFormData();
          }, 500);
        } else {
          this.showEditForm = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public patchFormData() {
    this.addEditCompanyDetailsForm.controls["id"].setValue(
      this.companyDetail.id
    );
    this.addEditCompanyDetailsForm.controls["blog_url"].setValue(
      this.companyDetail.blog_url
    );
    this.addEditCompanyDetailsForm.controls["company_size"].setValue(
      this.companyDetail.company_size
    );
    // this.addEditCompanyDetailsForm.controls["contact_email"].setValue(
    //   this.companyDetail.contact_email
    // );
    this.addEditCompanyDetailsForm.controls["country_id"].setValue(
      this.companyDetail.country_id
    );
    this.addEditCompanyDetailsForm.controls["description"].setValue(
      this.companyDetail.description
    );
    this.addEditCompanyDetailsForm.controls["founded"].setValue(
      this.companyDetail.founded
    );
    this.addEditCompanyDetailsForm.controls["headquarter_country"].setValue(
      this.companyDetail.headquarter_country
    );
    this.addEditCompanyDetailsForm.controls["headquarter_location"].setValue(
      this.companyDetail.headquarter_location
    );
    this.addEditCompanyDetailsForm.controls["industry_id"].setValue(
      this.companyDetail.industry_id
    );
    this.addEditCompanyDetailsForm.controls["linkedin_url"].setValue(
      this.companyDetail.linkedin_url
    );
    this.addEditCompanyDetailsForm.controls["location"].setValue(
      this.companyDetail.location
    );
    this.addEditCompanyDetailsForm.controls["logoUrl"].setValue(
      this.companyDetail.logo.url
    );
    this.addEditCompanyDetailsForm.controls["name"].setValue(
      this.companyDetail.name
    );
    this.addEditCompanyDetailsForm.controls["slogan"].setValue(
      this.companyDetail.slogan
    );
    this.addEditCompanyDetailsForm.controls["twitter_url"].setValue(
      this.companyDetail.twitter_url
    );
    this.addEditCompanyDetailsForm.controls["web_url"].setValue(
      this.companyDetail.web_url
    );
    this.addEditCompanyDetailsForm.controls["marketplace"].setValue(
      this.companyDetail.marketplace
    );
    let target_markets: Array<any> = [];
    this.companyDetail.target_markets.forEach(element => {
      target_markets.push({ id: element, country: this.countries[element] });
    });
    this.addEditCompanyDetailsForm.controls["target_markets"].setValue(
      target_markets,
      { onlySelf: true, emitEvent: true }
    );

    let companies_users_attributes: Array<any> = [];
    this.companyDetail.companies_users_attributes.forEach(attribute => {
      this.allUsers.forEach(user => {
        if (user.id === attribute.user_id) {
          companies_users_attributes.push({
            display: user.name,
            value: user.name,
            id: user.id
          });
        }
      });
    });
    this.addEditCompanyDetailsForm.controls[
      "companies_users_attributes"
    ].setValue(companies_users_attributes);

    let keywords_attributes: Array<any> = [];
    this.companyDetail.keywords_attributes.forEach(element => {
      keywords_attributes.push({ display: element.name, value: element.name });
      let getIndex: number = this.extraKeywords.indexOf(element.name);
      this.extraKeywords.splice(getIndex, 1);
    });
    this.addEditCompanyDetailsForm.controls["keywords_attributes"].setValue(
      keywords_attributes
    );

    this.showEditForm = true;
  }

  public getCountryListAsKeyValue() {
    this.companyService.getCountryListAsKeyValue().subscribe(() => {
      this.countries = this.companyService.countriesKeyValue;
      this.setedCountriesId = _.map(this.countries, (country, id) => ({
        id,
        country
      }));
    });
  }

  public getIndustriesAsKeyValue() {
    this.companyService.getIndustriesAsKeyValue().subscribe(() => {
      this.industries = this.companyService.industriesKeyValue;
    });
  }

  public onSelectAll(items: any) {
    console.log(items);
  }

  /**
   * Omit special character for given tag input field...
   * @param event
   */
  public omit_special_char(event) {
    let k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 44 ||
      (k >= 48 && k <= 57)
    );
  }

  /**
   * API service call to get all tags...
   */
  public getKeywords() {
    this.companyService.getKeywords().subscribe(
      (res: any) => {
        res = JSON.parse(res)
        if (res) {
          var arr = [];
          res.forEach(element => {
            arr.push(element.name);
          });
          this.extraKeywords = arr;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public getUsersInfo() {
    this.companyService.getUsersInfo().subscribe(
      (res: any) => {
        res = JSON.parse(res)
        this.allUsers = res.data;
        var arr = [];
        res.data.forEach(element => {
          arr.push(element.name);
        });
        this.extraUsers = arr;
      },
      error => {
        this.extraUsers = [];
        console.log(error);
      }
    );
  }

  /**
   * ADD new tags...
   * @param event
   */
  public onAddKewwords(event) {
    this.allKeywords.forEach((element: any) => {
      if (element.name === event.value) {
        this.onItemSelect(event);
      }
    });

    let lastTag: any = this.addEditCompanyDetailsForm.controls[
      "keywords_attributes"
    ].value[
      this.addEditCompanyDetailsForm.controls["keywords_attributes"].value
        .length - 1
    ];
    lastTag = lastTag.value.split(",");
    

    if (lastTag.length > 1) {
      lastTag = lastTag.filter(function(item, pos) {
        return lastTag.indexOf(item) == pos;
    })

      this.addEditCompanyDetailsForm.controls[
        "keywords_attributes"
      ].value.pop(); // this.selectedKeywords.pop();
      lastTag.forEach(element => {
        if (element !== "") {
          let keywords_attributes = this.addEditCompanyDetailsForm.controls[
            "keywords_attributes"
          ].value
            ? this.addEditCompanyDetailsForm.controls["keywords_attributes"]
                .value
            : [];
          keywords_attributes.push({ display: element, value: element });
          this.addEditCompanyDetailsForm.controls[
            "keywords_attributes"
          ].setValue(keywords_attributes);
          this.createdKeywords.push({ display: element, value: element });
        }
      });
    }
  }

  public onItemSelect(item: any) {
    var tag_id;

    this.allKeywords.forEach((element: any) => {
      if (element.name === item.value) {
        tag_id = element.id;
      }
    });

    this.addEditCompanyDetailsForm.controls[
      "keywords_attributes"
    ].value.forEach((element, index) => {
      if (element.value === item.value) {
        element.id = tag_id;
      }
    });
  }

  /**
   * Remove selected tabs from the items array...
   * @param event
   */
  public onItemRemoved(event) {
    this.selectTag(event.display, "remove", undefined);
    let indx = this.createdKeywords.find((element, index) => {
      if (element.display === event.display) {
        return element;
      }
    });

    this.createdKeywords.splice(indx, 1);
  }

  /**
   * Push selected tag name to items array...
   * @param name
   */
  public selectTag(name, param, id) {
    let updatedItem: any = this.extraKeywords.find((element: any) => {
      if (element.name === name) {
        return element;
      }
    });
    if (updatedItem && param === "add") {
      let keywords_attributes = this.addEditCompanyDetailsForm.controls[
        "keywords_attributes"
      ].value;
      keywords_attributes.push({
        display: updatedItem.name,
        value: updatedItem.name,
        id: id
      });
      this.addEditCompanyDetailsForm.controls["keywords_attributes"].setValue(
        keywords_attributes
      );
    }
  }

  /**
   * Remove selected users from the items array...
   * @param event
   */
  public onUserRemoved(event) {
    this.selectUser(event.display, "remove", undefined);
  }

  /**
   * Push selected tag name to items array...
   * @param name
   */
  public selectUser(name, param, id) {
    let updatedItem: any = this.extraUsers.find((element: any) => {
      if (element.name === name) {
        return element;
      }
    });
    if (updatedItem && param === "add") {
      let companies_users_attributes = this.addEditCompanyDetailsForm.controls[
        "companies_users_attributes"
      ].value;
      companies_users_attributes.push({
        display: updatedItem.name,
        value: updatedItem.name,
        id: id
      });
      this.addEditCompanyDetailsForm.controls[
        "companies_users_attributes"
      ].setValue(companies_users_attributes);
    }
  }

  /**
   * Dropped file event...
   * @param event
   */
  public dropped(event: UploadEvent) {
    this.file = event.files;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          let getExtension = file.name.split(".");
          if (
            this.fileTypes.find(
              fileType =>
                fileType ===
                getExtension[getExtension.length - 1].toLocaleLowerCase()
            ) !== undefined
          ) {
            if (file.size <= 20971520) {
              this.addEditCompanyDetailsForm.controls["logo"].setValue(file);
              console.log(
                this.addEditCompanyDetailsForm.controls["logo"].value
              );
              this.uploadCompanyLogo();
            } else {
              this.toastrService.warning(
                `${"File Size should be upto 20MB"}`,
                "Warning"
              );
              this.addEditCompanyDetailsForm.controls["logo"].setValue(null);
            }
          } else {
            this.toastrService.warning(
              `${'File type should be any of these "xls,xlsx, jpg, jpeg, png, pdf, csv, doc, docx, pptx, ppt"'}`,
              "Warning"
            );
            this.addEditCompanyDetailsForm.controls["logo"].setValue(null);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  /**
   * Drag and drop...
   * @param event
   */
  public fileOver(event) {
    console.log(event);
  }

  /**
   * Drag and Drop...
   * @param event
   */
  public fileLeave(event) {
    console.log(event);
  }

  call(event) {
    var found = this.allUsers.find(function(element) {
      return element.name === event.value;
    });
    console.log(
      event,
      found,
      this.addEditCompanyDetailsForm.controls["companies_users_attributes"]
        .value
    );
    let companies_users_attributes = this.addEditCompanyDetailsForm.controls[
      "companies_users_attributes"
    ].value[
      this.addEditCompanyDetailsForm.controls["companies_users_attributes"]
        .value.length - 1
    ];
    this.addEditCompanyDetailsForm.controls[
      "companies_users_attributes"
    ].value.pop();
    companies_users_attributes.id = found.id;
    this.addEditCompanyDetailsForm.controls[
      "companies_users_attributes"
    ].value.push(companies_users_attributes);
    this.addEditCompanyDetailsForm.controls[
      "companies_users_attributes"
    ].setValue(
      this.addEditCompanyDetailsForm.controls["companies_users_attributes"]
        .value
    );
  }

  /**
   * to Handle the selected file...
   * @param files
   */
  public handleFileInput(files: File) {
    let getExtension = files[0].name.split(".");
    if (
      this.fileTypes.find(
        fileType =>
          fileType === getExtension[getExtension.length - 1].toLocaleLowerCase()
      ) !== undefined
    ) {
      if (files[0].size <= 20971520) {
        this.addEditCompanyDetailsForm.controls["logo"].setValue(files[0]);
        this.uploadCompanyLogo();
      } else {
        this.toastrService.warning(
          `${"File Size should be upto 20MB"}`,
          "Warning"
        );
        this.addEditCompanyDetailsForm.controls["logo"].setValue(null);
      }
    } else {
      this.toastrService.warning(
        `${'File type should be any of these "xls,xlsx, jpg, jpeg, png, pdf, csv, doc, docx, .pptx, .ppt"'}`,
        "Warning"
      );
      this.addEditCompanyDetailsForm.controls["logo"].setValue(null);
    }
  }

  /**
   * Create New Company Profile...
   */
  public save() {
    console.log(this.addEditCompanyDetailsForm);

    const formData: FormData = new FormData();
    let company: any = {};

    Object.keys(this.addEditCompanyDetailsForm.value).forEach((key: string) => {
      if (this.addEditCompanyDetailsForm.controls[key].value) {
        if (Array.isArray(this.addEditCompanyDetailsForm.controls[key].value)) {
          if (this.addEditCompanyDetailsForm.controls[key].value.length > 0) {
            console.log("array");
            if (key === "target_markets") {
              let target_markets: Array<any> = [];
              this.addEditCompanyDetailsForm.controls[key].value.forEach(
                element => {
                  formData.append(`company[${key}]`, element.id);
                  target_markets.push(element.id);
                }
              );
              company[key] = target_markets;
            } else if (key === "companies_users_attributes") {
              let companies_users_attributes: Array<any> = [];
              this.addEditCompanyDetailsForm.controls[key].value.forEach(
                element => {
                  formData.append(`company[${key}][][user_id]`, element.id);
                  companies_users_attributes.push({ user_id: element.id });
                }
              );
              company[key] = companies_users_attributes;
            } else if (key === "keywords_attributes") {
              let keywords_attributes: Array<any> = [];
              this.addEditCompanyDetailsForm.controls[key].value.forEach(
                element => {
                  formData.append(`company[${key}][][name]`, element.value);
                  keywords_attributes.push({ name: element.value });
                }
              );
              company[key] = keywords_attributes;
            }
          }
        } else {
          // // console.log("value");
          // formData.append(
          //   `company[${key}]`,
          //   this.addEditCompanyDetailsForm.controls[key].value
          // );
          company[key] = this.addEditCompanyDetailsForm.controls[key].value;
        }
      } else {
        // if (key === "marketplace") {
        company[key] = this.addEditCompanyDetailsForm.controls[key].value;
        // }
      }
    });

    console.log(company);

    let api: string = this.companyId ? "updateCompanyProfile" : "createCompany";
    this.companyService[api]({ company: company }).subscribe(
      (res: any) => {
        res= JSON.parse(res)
        this.router.navigate(["/company-profile"]);
        let message: string = this.companyId
          ? "Company details are successfully updated."
          : "Successfully created company profile.";
        this.toastrService.success(`${message}`, "Success");
      },
      error => {
        console.log(error);
      }
    );
  }

  public uploadCompanyLogo() {
    const formData: FormData = new FormData();
    formData.append(
      `company[logo]`,
      this.addEditCompanyDetailsForm.controls["logo"].value
    );
    this.companyService.uploadCompanyLogo(formData).subscribe(
      (res: any) => {
        res = JSON.parse(res)
        this.addEditCompanyDetailsForm.controls["logoUrl"].setValue(
          res.logo.url
        );
        this.toastrService.success(
          `${"Company Logo Uploaded Successfully."}`,
          "Success"
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  public deleteLogo() {
    this.companyService.deleteCompanyLogo().subscribe(
      (res: any) => {
        res = JSON.parse(res)
        this.addEditCompanyDetailsForm.controls["logoUrl"].setValue(null);
        this.addEditCompanyDetailsForm.controls["logo"].setValue(null);
        this.toastrService.success(
          `${"Successfully deleted company logo."}`,
          "Success"
        );
        this.inputLogo.nativeElement.value = "";
      },
      error => {
        console.log(error);
      }
    );
  }

}
