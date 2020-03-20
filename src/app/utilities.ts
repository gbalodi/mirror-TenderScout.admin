import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Utilities {

    static emailValidation(c: AbstractControl): ValidationErrors {
        let isValid = true;
        try {
            const name = c.value;
            const regex = new RegExp(
                "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$"
                // /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
            );
            if (!regex.test(name) && name !== "" && name !== null) {
                isValid = false;
            }
        } catch {
            isValid = false;
        }
        const message = { email: true };
        return isValid ? null : message;
    }

}
