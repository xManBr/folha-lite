import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidations {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {

            const totalChedked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);
            return totalChedked >= min ? null : { requered: true };
        };
        return validator;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField === null) {
                throw new Error('É preciso informar 1 campo.');
            }
            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }
            const field = (<FormGroup>formControl.root).get(otherField);
            if (!field) {
                throw new Error('É preciso informar 1 campo válido.');
            }
            if (field.value !== formControl.value) {
                return { equalsTo: otherField };
            }
            return null;
        };
        return validator;
    }

    static demissaoMenorQueAdmissao(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField === null) {
                throw new Error('É preciso informar 1 campo.');
            }
            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }
            const field = (<FormGroup>formControl.root).get(otherField);
            if (!field) {
                throw new Error('É preciso informar 1 campo válido.');
            }
            if (formControl.value < field.value) {
                return { dateLessThan: otherField };
            }
            return null;
        };
        return validator;
    }
    static diasFeriasDiasAbonoEntre1e30(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField === null) {
                throw new Error('É preciso informar 1 campo.');
            }
            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }
            const field = (<FormGroup>formControl.root).get(otherField);
            if (!field) {
                throw new Error('É preciso informar 1 campo válido.');
            }
            if (((+formControl.value + (+field.value)) < 1) || ((+formControl.value + (+field.value)) > 30)) {
                return { diasFeriasDiasAbonoEntre1e30: otherField };
            }
            return null;
        };
        return validator;
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const length = validatorValue != null ? validatorValue.requiredLength : '0';
        const min = validatorValue != null ? validatorValue.min : 0;
        const max = validatorValue != null ? validatorValue.max : 0;
        const config = {
            'required': `${fieldName} é necessário.`,
            'minlength': `Para ${fieldName} ${length} caracteres, no MÍNIMO.`,
            'maxlength': `Para ${fieldName} ${length} caracteres, no MAXÍMO.`,
            'min': `Para ${fieldName} valor mínimo é ${min}.`,
            'max': `Para ${fieldName} valor máximo é ${max}.`,
            'email': 'Email inválido.',
            'equalsTo': 'Os campos não conferem.',
            'pattern': 'Campos inválidos.',
            'dateLessThan': 'Data de Demissão Menor que Data de Admissão.',
            'diasFeriasDiasAbonoEntre1e30': 'A soma de dias de fériase abono deve estar entre 1 e 30.'
        };
        return config[validatorName];
    }
}
