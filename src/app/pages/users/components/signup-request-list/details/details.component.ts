import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainRequestService } from '../../../../../services/main-request.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { UploadFileService } from '../upload-file/upload-file.service';
import * as Highcharts from 'highcharts';
import { UsersService } from '../../services/users.service';
import { KeyValuePipe } from '../../../../../pipe/key-value.pipe';
import * as _ from 'lodash';

@Component({
    selector: 'app-request-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [
        KeyValuePipe
    ]
})
export class DetailsComponent implements ViewCell, OnInit {
    @ViewChild('resetPasswordModal') resetPasswordModal;
    @ViewChild('uploadResultsModal') public uploadResultsModal: ModalDirective;
    @ViewChild('userStatisticsModal') public userStatisticsModal: ModalDirective;
    @ViewChild('selectFile') selectFile: ElementRef;
    @Input() value;
    @Input() rowData: any;
    @Output() save: EventEmitter<any> = new EventEmitter();
    public reqData;
    public blockBtn: boolean = false;
    public show: boolean = false;
    public resetPasswordForm: FormGroup;
    public statisticFilterForm: FormGroup;
    public matchedPassword: boolean;
    public lengthPassword: boolean;
    public fileToUpload: File = null;
    public thisIsCSV: boolean = true;
    public underFileSize: boolean = true;
    public uploadFileLoading: boolean = false;
    public rowDataObj: any;
    public uploadToOrbidal: boolean = false;
    public userStatisticsData: any;
    public highChartSeriesData: Array<number> = [];
    public highChartSeriesCategoriesType: Array<string> = [];
    public profileType: Array<any> = [
        { name: 'consultant' },
        { name: 'company' },
        { name: 'buyer' },
    ];
    public fileTypes: String[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];

    constructor(
        private formBuilder: FormBuilder,
        private mainRequestService: MainRequestService,
        private toasterService: ToastrService,
        private uploadFileService: UploadFileService,
        private usersService: UsersService,
        private changeDetectorRef: ChangeDetectorRef,
        private keyValuePipe: KeyValuePipe
    ) { }

    ngOnInit() {
        this.statisticFilterForm = this.formBuilder.group({
            filter: ['all', [Validators.required]],
        });
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
            userId: ['', Validators.required]
        });

        if (this.rowData && this.rowData.onlyProfile) {
            this.rowDataObj = this.rowData;
            for (let elem in this.rowData.profile) {
                if (this.rowData.profile[elem] == null || !this.rowData.profile[elem].length || this.rowData.profile[elem] == undefined) {
                    delete this.rowData.profile[elem];
                }
            }
            if (!this.rowData.profile) {
                this.blockBtn = true;
            } else {
                this.reqData = Object.keys(this.rowData.profile);
                this.resetPasswordForm.controls['userId'].setValue(this.rowDataObj.id);
                this.rowData = this.rowData.profile;
            }
        } else {
            this.reqData = Object.keys(this.rowData);
        }

        this.statisticFilterForm.valueChanges.subscribe(
            data => {
                console.log('Username changed:' + data);
                data.filter === '30days' ? this.getUserSessions(30) : this.getUserSessions('');
            }
        );
    }

    /**
     * API service call to get a user session info by it's id...
     */
    public getUserSessions(param) {
        this.highChartSeriesData = [];
        this.highChartSeriesCategoriesType = [];
        this.usersService.getUserSessions(this.rowDataObj.id, param).subscribe((res: any) => {
            this.userStatisticsData = this.keyValuePipe.transform(JSON.parse(res));

            this.userStatisticsData.forEach(element => {
                if (element.key !== 'user_id') {
                    this.highChartSeriesData.push(element.value);
                    // this will replace the underscore with space and first later to uppercase...
                    this.highChartSeriesCategoriesType.push((element.key.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, (key) => { return key.toUpperCase() })));
                }
            });

            this.userStatisticsModal.show();
            this.highcharts = Highcharts;
            this.chartOptions = {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 250,
                    y: 100,
                    floating: true,
                    borderWidth: 1,

                    backgroundColor: (
                        (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
                        '#FFFFFF'), shadow: true
                },
                xAxis: {
                    categories: this.highChartSeriesCategoriesType,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0, title: {
                        // text: 'Population (millions)', 
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    // valueSuffix: ' '
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        showInLegend: false,
                        name: ' ',
                        data: this.highChartSeriesData
                    }
                ]
            };
            this.changeDetectorRef.detectChanges();
        }, error => {
            console.log(error);
        });
    }

    /**
     * Check whether password is matched with password confirmation...
     * @param param 
     */
    public matchPassword(param) {
        if (this.resetPasswordForm.controls['password_confirmation'].value && this.resetPasswordForm.controls['password'].value !== this.resetPasswordForm.controls['password_confirmation'].value) {
            this.matchedPassword = false;
        } else if (this.resetPasswordForm.controls['password'].value === this.resetPasswordForm.controls['password_confirmation'].value) {
            this.matchedPassword = true;
        }
    }


    /**
     * Service call to update reset Password of the specific user...
     */
    public changePassword() {
        console.log(this.resetPasswordForm.value);
        this.mainRequestService.updateUserPassword(this.resetPasswordForm.value).subscribe((res: any) => {
            res = JSON.parse(res);
            this.toasterService.success(res.success, 'Success');
            this.resetPasswordModal.hide();
        }, error => {
            console.log(error);
        })
    }

    /**
     * Event for file upload 
     * @param files 
     */
    public handleFileInput(files: FileList) {
        this.fileToUpload = File = null;
        if (!this.uploadToOrbidal) {
            var a = files.item(0).type;
            if (files.item(0).type === 'text/csv' || files.item(0).type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                if (files[0].size <= 44743292) {
                    this.fileToUpload = files.item(0);
                    this.thisIsCSV = true;
                    this.underFileSize = true;
                } else {
                    this.underFileSize = false;
                }
            } else {
                this.thisIsCSV = false;
            }
        } else {
            let getExtension = files[0].name.split('.');
            if (this.fileTypes.find(fileType => fileType === getExtension[getExtension.length - 1].toLocaleLowerCase()) !== undefined) {
                if (files[0].size <= 44743292) {
                    this.fileToUpload = files.item(0);
                    this.thisIsCSV = true;
                    this.underFileSize = true;
                } else {
                    this.underFileSize = false;
                }
            } else {
                this.thisIsCSV = false;
            }
        }
        console.log('this.fileToUpload', this.fileToUpload)
    }

    /**
     * Service call to upload to the server...
     */
    public uploadFile() {
        this.uploadFileLoading = true;
        const formData: FormData = new FormData();
        if (!this.uploadToOrbidal) {
            formData.append('import[file]', this.fileToUpload);
            formData.append('import[user_id]', this.rowDataObj.id);
        } else {
            formData.append('orbidal_document[file]', this.fileToUpload);
            formData.append('orbidal_document[user_id]', this.rowDataObj.id);
        }
        let callService = this.uploadToOrbidal ? 'uploadOrbidalDocuments' : 'importCSV_XLS';
        this.uploadFileService[callService](formData).subscribe((res: any) => {
            res = JSON.parse(res);
            this.uploadFileLoading = false;
            if (res.success) {
                this.toasterService.success(`${res.success}`, 'Success');
            } else if (res.warning) {
                this.toasterService.warning(`${res.warning}`, 'Warning');
            }
            this.selectFile.nativeElement.value = '';
            this.uploadResultsModal.hide();
        }, error => {
            console.log(error);
        })
    }


    // #################### For HighChart #####################

    public highcharts = Highcharts;
    public chartOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 250,
            y: 100,
            floating: true,
            borderWidth: 1,

            backgroundColor: (
                (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
                '#FFFFFF'), shadow: true
        },
        xAxis: {
            categories: [], title: {
                text: null
            }
        },
        yAxis: {
            min: 0, title: {
                // text: 'Population (millions)', 
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            // valueSuffix: ' '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                name: ' ',
                data: this.highChartSeriesData
            }
        ]
    };
}
