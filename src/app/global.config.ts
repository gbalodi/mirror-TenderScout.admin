import { AbstractControl, ValidationErrors } from '@angular/forms';

export let GlobalConfig;

// Custom Validation for email...
export class CustomValidators {
    static email(c: AbstractControl): ValidationErrors {
        let isValid = true;
        try {
            const name = c.value;
            // const regex = new RegExp("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")
            const regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i;
            if (!regex.test(name) && name !== '' && name !== null) {
                isValid = false;
            }
        } catch {
            isValid = false;
        }
        const message = { email: true };
        return isValid ? null : message;
    }
}

// Make Slug...
export class makeSlug {
    static make_slug(value) {
        let slug = '';
        try {
            const name = value.trim();
            slug = name.replace(new RegExp(' ', 'g'), '-').toLowerCase();
        } catch {
            slug = '';
        }
        return slug;
    }
}

/**
 * To get file type images from given file name... 
 */
export class FileTypeImage {
    static getFileTypeImage(file_name: string) {
        let fileType = file_name.split('.').pop().toLowerCase()
        switch (fileType) {
            case "pdf": {
                return 'assets/img/pdf-icon.png';
            }
            case "png": {
                return 'assets/img/png-icon.png';
            }
            case "jpg": {
                return 'assets/img/jpg-icon.png';
            }
            case "jpeg": {
                return 'assets/img/jpeg-icon.png';
            }
            case "doc": {
                return 'assets/img/word-icon.png';
            }
            case "docx": {
                return 'assets/img/docx-icon.png';
            }
            case "csv": {
                return 'assets/img/csv-icon.png';
            }
            case "xls": {
                return 'assets/img/xls-icon.png';
            }
            case "xlsx": {
                return 'assets/img/xlsx-icon.png';
            }
            case "pptx": {
                return 'assets/img/pptx-icon.png';
            }
            case "ppt": {
                return 'assets/img/ppt-icon.png';
            }
            default: {
                return 'assets/img/default-icon.png';
            }
        }
    }
}



