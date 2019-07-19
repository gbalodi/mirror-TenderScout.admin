import { AbstractControl, ValidationErrors } from '@angular/forms';

export let GlobalConfig;

// Custom Validation for email...
export class CustomValidators {
    static email(c: AbstractControl): ValidationErrors {
        let isValid = true;
        try {
            const name = c.value;
            // const regex = new RegExp("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")
            const regex =/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i;
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



