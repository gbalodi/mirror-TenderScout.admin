import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../services/tender.service';
import { TenderObj } from '../../../../model/tender-obj';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IIndustryCode } from '../../../../../../../prehub/src/app/models/interfaces/industry-code.interface';
import { Subscription, from, zip, Subject } from 'rxjs';
import { MainRequestService } from 'app/services/main-request.service';
import { map, switchMap, mergeMap, debounceTime, distinctUntilChanged, pairwise } from 'rxjs/operators';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';
declare var $: any;
declare global {
  interface Window {
    MyNamespace: any;
  }
}

// title: tender.title,
// description: tender.description,
// averageScore: tender.averageScore,
// city: tender.city,
// createdAt: tender.createdAt,
// organization: tender.organization,
// estimatedHighValue
// estimatedLowValue
// industry
// contacts
// submissionDate
// publishedOn
// awardedOn
// reTenderDate
// awards
// awardValue
// answeringDeadline
// naicsesCodes
// ngipsCodes
// nhs_e_classesCodes
// pro_classesCodes
// unspscesCodes
// cpvsCodes
// gsinsCodes
// winnerNames
// classification
// tenderUrls

class abc {
  constructor(tender) {
    return {
      title: tender.title,
      description: tender.description,
      city: tender.city,
      organization: tender.organization,
      estimatedHighValue: tender.estimatedHighValue,
      estimatedLowValue: tender.estimatedLowValue,
      awardValue: tender.awardValue,
      winnerNames: tender.winnerNames,
      classification: tender.classification,
      tenderUrls: tender.tenderUrls ? tender.tenderUrls[0] : '',
      createdAt: tender.createdAt,
      submissionDate: tender.submissionDate,
      publishedOn: tender.publishedOn,
      awardedOn: tender.awardedOn,
      reTenderDate: tender.reTenderDate,
      industry: tender.industry ? tender.industry : '',
      codes: []
    }
  }
};

const NUMBER_TYPE: Array<string> = ['estimated_high_value', 'estimated_low_value', 'award_value'];
const DATE_TYPE: Array<string> = ['created_at', 'submission_date', 'published_on', 'awarded_on', 're_tender_date'];

@Component({
  selector: 'app-tender-edit',
  templateUrl: './tender-edit.component.html',
  styleUrls: ['./tender-edit.component.scss']
})
export class TenderEditComponent implements OnInit {
  public tenderForm: FormGroup;
  public object = Object;
  public tender: any;
  public numberType = NUMBER_TYPE;
  public dateType = DATE_TYPE;
  public bsValue;
  public industryCodes: IIndustryCode[] = [];
  public countries: { [key: string]: string } = {};
  private codesInput$: Subject<string> = new Subject();
  private codes = [];
  public showCodeFinderPopup: boolean = false;
  public bsConfig: {
    dateInputFormat: 'DD/MM/YYYY'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private tenderService: TenderService,
    private formBuilder: FormBuilder,
    private mainRequestService: MainRequestService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    this.tenderForm = this.formBuilder.group({
      title: [''],
      description: [''],
      city: [''],
      organization: [''],
      estimated_high_value: [''],
      estimated_low_value: [''],
      award_value: [''],
      winner_names: [''],
      classification: [''],
      tender_urls: [''],
      created_at: [''],
      submission_date: [''],
      published_on: [''],
      awarded_on: [''],
      re_tender_date: [''],
      industry: [''],
      codes: [[]]
    });
    this.activatedRoute.params.subscribe(param => {
      console.log(param);
      if (param.id) {
        this.tenderService.getTenderDetails(param.id).subscribe((res: TenderObj) => {
          console.log(res);
          let tender = new abc(res);
          this.tender = tender;

          this.tenderForm.patchValue({
            title: this.tender.title,
            description: this.tender.description,
            city: this.tender.city,
            organization: this.tender.organization,
            estimated_high_value: this.tender.estimatedHighValue,
            estimated_low_value: this.tender.estimatedLowValue,
            award_value: this.tender.awardValue,
            winner_names: this.tender.winnerNames,
            classification: this.tender.classification,
            tender_urls: this.tender.tenderUrls,
            created_at: this.tender.createdAt,
            submission_date: this.tender.submissionDate,
            published_on: this.tender.publishedOn,
            awarded_on: this.tender.awardedOn,
            re_tender_date: this.tender.reTenderDate,
            industry: this.tender.industry !== "" ? this.tender.industry : null,
            codes: []
          });

        }, error => {
          console.error(error);
        });
      }
    });

  }

  private routeSub: Subscription = zip(
    this.mainRequestService.getData('v1/dictionaries/countries'),
    this.mainRequestService.getData('v1/dictionaries/industry_codes')
  ).pipe(
    map((res: any) => {
      res[0] = JSON.parse(res[0]);
      res[1] = JSON.parse(res[1]);
      return res;
    }),
    map(
      (
        res: [{ [key: string]: string }, IIndustryCode[]]
      ) => {
        this.countries = res[0];
        this.industryCodes = _.map(res[1], obj => {
          return _.assign(obj, {
            codesDescription: obj.code + ": " + obj.description
          });
        });
        this.industryCodes = res[1];
        return res[0];
      }
    )
  ).subscribe(() => { });

  private codesInputSub: Subscription = this.codesInput$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val: string) => this.mainRequestService.getData(`v1/dictionaries/all_codes?codes=${val}`)),
      map((res: any) => {
        res = JSON.parse(res);
        return res.data;
      })
    ).subscribe((val: IIndustryCode[]) => {
      this.industryCodes = _.map(val, obj => {
        return _.assign(obj.data, {
          codes: obj.code + ": " + obj.description
        });
      });
    });

  public codesInput(value: string): void {
    this.codesInput$.next(value);
  }

  /**
   * To Set Filtered search data into cookies...
   * @param ev
   */
  public setSearch(event) {
    this.tenderForm.controls["codes"].value;
    var codes = [];
    codes = _.flatMap(
      this.tenderForm.controls["codes"].value,
      value => {
        return value.split(": ")[0];
      }
    );
    this.codes = codes;
  }

  public replaceUnderscore(string) {
    return string.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, (key) => { return key.toUpperCase() })
  }

  public typeChecking(key) {
    switch (key) {
      case "description":
        return 'textarea';
      default:
        return 'text'
      // alert('Default case');
    }
  }

  public submitTenderForm() {

    //   {
    //     "tender": {
    //         "title": "Francesco",
    //         "description": "Test",
    //         "published_on": "",
    //         "awarded_on": "",
    //         "submission_date": "",
    //         "deadline_date": "",
    //         "cancelled_on": "",
    //         "organization_name": "",
    //         "tender_urls": ,
    //         "answering_deadline": "",
    //         "questioning_deadline": "",
    //         "tender_cpvs_attributes": [
    //             {
    //                 "cpv_id": 14694,
    //             }
    //         ], 
    //         "tender_naicses_attributes": [
    //             {
    //                 "naics_id": 3174
    //             }
    //         ]
    //         "tender_unspsces_attributes": [
    //             {
    //                 "unspsc_id": 3174
    //             }
    //         ]
    //     }
    // }
    this.tenderService.updateTender({ tender: this.tenderForm.value }).subscribe((res: any) => {
      res = JSON.parse(res);
    }, error => {
      console.error(error);
    });
  }

  public ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.codesInputSub.unsubscribe();
  }

  public codetype: string = "ic_cpvs";

  /**
 * Add/Remove class to hide/show outer vertical scroll while popup is opened...
 */
  public addClassToBody() {
    if (this.showCodeFinderPopup) {
      window.scroll(0, 0);
      setTimeout(() => {
        this.document.body.classList.add("fix-bg-flow");
      }, 100);
    } else {
      this.document.body.classList.remove("fix-bg-flow");
    }
  }



  // ###############################################################################################################################################
  // ###############################################################################################################################################
  // Code to manage code finder all functionalities...
  // ###############################################################################################################################################
  // ###############################################################################################################################################

  public callPopulate(filename) {
    if (filename === "0") {
      this.codetype = "ic_cpvs";
    } else if (filename === "1") {
      this.codetype = "ic_naicses";
    } else if (filename === "2") {
      this.codetype = "ic_unspsces";
    }

    setTimeout(() => {
      this.populate(this.codetype);
    }, 100);
  }

  public codesOfFinder;
  public cb;
  public window: any = window;
  public html;

  public searchStr(str, whole) {
    if (whole) {
      str = "\\b" + str + "\\b"; // string search
    }

    let regx = new RegExp("^.*" + str + ".*$", "gmi"),
      matches = this.codesOfFinder.match(regx);

    if (matches == null) {
      matches = [];
    }
    return matches;
  }

  // Get list of all ancestor codes in heirarchy leading up to cpv.  Include siblings of lowest node only.
  public browseTree1(cpv) {
    let trx;

    cpv = cpv.substr(0, 8).replace(/0{3,6}$/, "");

    if (!cpv || cpv.length == 0) {
      trx = "^..0";
    } else if (cpv.length == 1) {
      trx = "^" + cpv + ".0";
    } else {
      let mask = cpv.substr(0, 5),
        m = mask.split("");

      trx = "^" + m[0] + m[1];
      let i;
      for (i = 2; i < mask.length; i++) {
        trx += "[0" + m[i] + "]";
      }
      if (i < 5) {
        trx += ".0";
      } else {
        trx += "(0|" + cpv.substr(5, 8) + ")";
      }
    }
    trx += ".*";
    let rgxp = new RegExp(trx, "mg"),
      matches = this.codesOfFinder.match(rgxp);

    if (matches == null) matches = [];
    return matches;
  }

  // Get list of all ancestor codes in heirarchy leading up to cpv.  Include all siblings.
  public browseTree2(cpv) {
    let trx;

    cpv = cpv.replace(/0{3,6}$/, "").substr(0, 5);

    trx = "^";

    if (!cpv || cpv.length == 0) {
      trx += "..0";
    } else if (cpv.length == 1) {
      trx += cpv + ".0";
    } else {
      trx += cpv.substring(0, 2) + "(.0";

      for (let i = 3; i <= cpv.length; i++) {
        trx += "|" + cpv.substring(2, i);
        if (i < 5) trx += ".0";
      }

      trx += ")";
    }

    trx += ".*";

    let rgxp = new RegExp(trx, "mg");

    let matches = this.codesOfFinder.match(rgxp);
    if (matches == null) matches = [];
    return matches;
  }

  public hideResults(vals, info) {
    window.MyNamespace.resultsdiv.style.display = "block";
  }

  public displayResults(vals, info) {
    let opts = window.MyNamespace.resultslist.options;

    window.MyNamespace.resultsdiv.style.display = "block";
    window.MyNamespace.resultslabel.innerHTML = "<h4>" + info + "</h4>";
    opts.length = 0;

    for (let i = 0; i < vals.length; i++) {
      let cpv = vals[i].substr(0, 8),
        sep = vals[i].substr(8, 1),
        str = vals[i].substr(9),
        clss = sep == "+" ? "multicpv" : "singlecpv";

      opts[i] = new Option(sep + " " + cpv + " " + str, cpv);
      opts[i].className = clss;
    }
  }

  public displayTree(tree, info, highlightCpv) {
    let html = "",
      lvl = -1,
      obj = {};
    for (let i = 0; i < tree.length; i++) {
      let cpv = tree[i].substr(0, 8),
        sep = tree[i].substr(8, 1),
        str = tree[i].substr(9),
        nLvl = cpv.substr(2, 4).search(/0/);
      if (nLvl < 0) nLvl = 4;
      if (nLvl > lvl) html += "<ul>";
      else if (nLvl < lvl) html += "</ul>";
      lvl = nLvl;

      let hcl = "";
      if (cpv == highlightCpv) hcl = " highlighted";

      if (sep == "+") {
        html +=
          "<li class='multicpv" +
          hcl +
          "'>" +
          `<input class='checked-codes' type="checkbox" id="singlsecpv` +
          cpv +
          `" value="` +
          cpv +
          `" >` +
          "<label for='singlsecpv" +
          cpv +
          "' class='checked-codes'>&nbsp</label>" +
          `<a class="browse-codes" (click)="browseCodes('` +
          cpv +
          `');return false">` +
          cpv +
          ` : ` +
          str +
          `</a>` +
          "</li>\n";
      } else {
        html +=
          "<li class='singlecpv" +
          hcl +
          "'>" +
          `<input class='checked-codes' type="checkbox" id="singlecpv` +
          cpv +
          `" value="` +
          cpv +
          `" >` +
          "<label for='singlecpv" +
          cpv +
          "' class='checked-codes'>" +
          cpv +
          " : " +
          str +
          "</label>" +
          "</li>\n";
      }
      obj = {
        value: cpv,
        description: str
      };
    }
    for (let i = 0; i <= lvl; i++) {
      html += "</ul>";
    }
    setTimeout(() => {
      let parent = this;
      this.elementRef.nativeElement
        .querySelectorAll(".browse-codes")
        .forEach(function (item) {
          let trythy = false;
          item.addEventListener("click", e => {
            parent.browseCodes(item.text, trythy);
            trythy = !trythy;
          });
        });
      //tickCpv
      this.elementRef.nativeElement
        .querySelectorAll(".checked-codes")
        .forEach(function (check_item) {
          check_item.addEventListener("click", e => {
            parent.tickCpv(
              check_item.parentElement.children[0].value,
              check_item.parentElement.children[0].checked
            );
          });
        });
    }, 1000);
    this.html = html;
    window.MyNamespace.treeview.innerHTML = html;
    window.MyNamespace.treelabel.innerHTML = info;
  }

  public tickCpv(cpv, ck) {
    let list = this.readPickList();
    if (ck) {
      list.push(cpv);
      list.sort();
      list = this.weedChildren(list);
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == cpv) {
          list.splice(i, 1);
          break;
        }
      }
    }
    this.writePickList(list, cpv);

    this.reflectSelected();
  }

  public writePickList(list, hCpv) {
    let opts = window.MyNamespace.picklist.options;
    opts.length = 0;
    let str;

    for (let i = 0; i < list.length; i++) {
      let cpv = list[i],
        searchCpv = this.searchStr(cpv, undefined)[0],
        sign = searchCpv.indexOf("+") != -1 ? "+" : "-",
        strArray = searchCpv.split(sign);
      if (strArray[2]) str = strArray[1] + "-" + strArray[2];
      else str = strArray[1];

      str = this.truncateString(str, 40);
      opts[i] = new Option(cpv + ": " + str, cpv);
      if (cpv == hCpv) opts[i].selected = true;
    }
  }

  public truncateString(str, length) {
    return str.length > length ? str.substring(0, length - 3) + "..." : str;
  }

  public readPickList() {
    let list = [],
      opts = window.MyNamespace.picklist.options;

    for (let i = 0; i < opts.length; i++) {
      list[i] = opts[i].value;
    }

    return list;
  }

  public weedChildren(list) {
    let nlist = [],
      rgx,
      cpv;

    while ((cpv = list.shift())) {
      if (!rgx || !cpv.match(rgx)) {
        nlist.push(cpv);
        let stub = cpv.replace(/0{3,6}$/, "");
        rgx = new RegExp("^" + stub);
      }
    }
    return nlist;
  }

  public getCheckStatus(treecpvs, picked) {
    let cks = [],
      pk = picked.shift(),
      rgx,
      stub;

    if (pk) {
      stub = pk.replace(/0{3,6}$/, "");
      rgx = new RegExp("^" + stub);
    }

    for (let i = 0; i < treecpvs.length; i++) {
      let cpv = treecpvs[i];

      if (!pk) {
        cks[i] = 0;
      } else if (pk > cpv) {
        cks[i] = 0;
        stub = cpv.replace(/0{3,6}$/, "");

        if (stub.length < 8) {
          if (pk.substr(0, stub.length) == stub) {
            cks[i] = 2;
          }
        }
      } else if (pk == cpv) {
        cks[i] = 1;
      } else if (cpv.match(rgx)) {
        cks[i] = 3;
      } else if (picked.length > 0) {
        pk = picked.shift();
        if (pk) {
          stub = pk.replace(/0{3,6}$/, "");
          rgx = new RegExp("^" + stub);
        }
        i--;
      } else {
        cks[i] = 0;
      }
    }
    return cks;
  }

  public reflectSelected() {
    let picked = this.readPickList(),
      ckbxs = window.MyNamespace.treeview.getElementsByTagName("INPUT"),
      i = 0,
      j = 0,
      treecpvs = [];

    for (let i = 0; i < ckbxs.length; i++) {
      treecpvs[i] = ckbxs[i].value;
    }

    let cks = this.getCheckStatus(treecpvs, picked);

    for (i = 0; i < ckbxs.length; i++) {
      switch (cks[i]) {
        case 0:
        case 2:
          ckbxs[i].checked = false;
          ckbxs[i].disabled = false;
          break;
        case 1:
          ckbxs[i].checked = true;
          ckbxs[i].disabled = false;
          break;
        case 3:
          ckbxs[i].checked = true;
          ckbxs[i].disabled = true;
          break;
      }

      let li = ckbxs[i].parentNode;
      if (cks[i] == 2 || cks[i] == 1) {
        if (!li.className.match("childselected"))
          li.className += " childselected";
      } else {
        if (li.className.match("childselected"))
          li.className = li.className.replace(/ ?childselected/, "");
      }
    }
  }

  public browseCodes(cpv, narrow) {
    let tree = narrow ? this.browseTree1(cpv) : this.browseTree2(cpv);
    cpv += "00000000";
    cpv = cpv.substr(0, 8);

    let stem = cpv.substr(0, 5) + "000",
      info;
    if (stem.length > 3) info = "Codes stemming from " + stem;
    else info = "Top level codes:";

    this.displayTree(tree, info, cpv);
    this.reflectSelected();
    this.reflectPickedChildren(cpv);
    if (cpv) {
      let element = document.getElementById("singlsecpv" + cpv);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }

  public reflectPickedChildren(cpv) {
    let stub = cpv.replace(/0{3,6}$/, ""),
      rgx = new RegExp("^" + stub),
      opts = window.MyNamespace.picklist;

    for (let i = 0; i < opts.length; i++) {
      opts[i].selected = opts[i].value.search(rgx) == 0;
    }
  }

  //----------------------------------------------------------------------
  //Page functions

  public doSearch(str) {
    if (str.length == 0) {
      this.hideResults(undefined, undefined);
      return this.browseCodes("", true);
    }
    if (!str.match(/[\D]/)) {
      // Numeric search
      this.hideResults(undefined, undefined);
      return this.browseCodes(str, true);
    }

    let matches = this.searchStr(str, window.MyNamespace.searchwhole.checked),
      num = matches.length;

    if (matches.length > 100) matches.length = 100;
    let info,
      text = " matches, select a category";

    if (num == 1) info = "1" + text;
    else info = num + " " + text;
    this.displayResults(matches, info);
  }

  /**
   * To remove selected codes from the lists...
   */
  public removeSelected() {
    let opts = window.MyNamespace.picklist,
      si = -1;

    for (let i = 0; i < opts.length; i++) {
      if (opts[i].selected) {
        opts[i] = null;
        si = i;
        i--;
      }
    }

    if (si >= 0 && opts.length > 0) {
      if (si >= opts.length) si = opts.length - 1;
      opts[si].selected = true;
      this.browseCodes(opts[si].value, undefined);
    } else {
      this.reflectSelected();
    }
  }

  public selectedCodeFinderArray: Array<any> = [];

  /**
   * To save selected code finder codes and set to the form data to show those selected codes...
   */
  public save() {
    this.selectedCodeFinderArray = [];
    let opts = window.MyNamespace.picklist,
      textContent = this.tenderForm.controls["code"].value
        ? this.tenderForm.controls["code"].value
        : [],
      arr = [];
    arr = this.tenderForm.controls["codes"].value
      ? this.tenderForm.controls["codes"].value
      : [];
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value) {
        arr.push(opts[i].value);
        this.selectedCodeFinderArray.push(opts[i].value);
        textContent.push(opts[i].textContent);
      }
    }

    this.codes = arr;
    this.tenderForm.controls["code"].setValue(
      _.uniqBy(textContent)
    );
    this.showCodeFinderPopup = false;
    this.addClassToBody();
  }

  public doSubmit() {
    let list = this.readPickList(),
      str = list;
    $.ajax({
      type: "PUT",
      dataType: "script",
      url: "codes",
      data: {
        cpv_codes: str
      },

      success: function () {
        window.location.reload();
      }
    });
  }

  public doStep2Submit() {
    let list = this.readPickList(),
      str = list;

    $.ajax({
      type: "POST",
      dataType: "script",
      url: "step2",
      data: {
        cpv_codes: str
      }
    });
  }

  public populate(fileName) {
    this.tenderService.getJSON(fileName).subscribe((res: any) => {
      this.codesOfFinder = res.codes;
      window.MyNamespace = window.MyNamespace || {};

      this.window.cb = new Object(); // Global

      // Search Form
      window.MyNamespace.searchtext = document.getElementById("searchtext");
      window.MyNamespace.searchwhole = document.getElementById("searchwhole");
      window.MyNamespace.resultslabel = document.getElementById("resultslabel");
      window.MyNamespace.resultslist = document.getElementById("resultslist");
      window.MyNamespace.resultsdiv = document.getElementById("resultsdiv");
      window.MyNamespace.searchtext.onclick = window.MyNamespace.searchwhole.onclick = window.MyNamespace.searchtext.onkeyup = () => {
        this.doSearch(window.MyNamespace.searchtext.value);
      };
      window.MyNamespace.resultslist.onchange = () => {
        this.browseCodes(
          window.MyNamespace.resultslist.options[
            window.MyNamespace.resultslist.options.selectedIndex
          ].value,
          true
        );
      };
      this.document.getElementById("searchclear").onclick = () => {
        window.MyNamespace.searchtext.value = "";
        this.doSearch("");
      };

      // Tree paths
      window.MyNamespace.treelabel = this.document.getElementById("treelabel");
      window.MyNamespace.treeview = this.document.getElementById("treeview");

      // Pick List
      window.MyNamespace.picklist = this.document.getElementById("picklist");
      window.MyNamespace.picklist.onchange = function () {
        this.browseCodes(
          window.MyNamespace.picklist.options[
            window.MyNamespace.resultslist.options.selectedIndex
          ].value,
          true
        );
      };

      window.MyNamespace.submitform = this.document;
      window.MyNamespace.submitcodes = document.getElementById("submitcodes");

      this.browseCodes("", undefined);
    });
  }

  // One-shot helper to determine which codes have children
  public dumpCodes() {
    let list = this.codesOfFinder.split(/\n/);
    list[list.length] = "xxxxxxxx";

    for (let i = 0; i < list.length - 1; i++) {
      let cpv = list[i].substr(0, 8),
        str = list[i].substr(9),
        stub = cpv.replace(/0{3,6}$/, ""),
        sep = "-";

      if (stub.length <= 5) {
        let rgx = new RegExp("^" + stub);
        if (list[i + 1].match(rgx)) sep = "+";
      }

      this.document.write(cpv + sep + str + "\\n");
    }
  }

}
