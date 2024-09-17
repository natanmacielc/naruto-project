export interface PasswordStrength {
  hasUpperCase: boolean,
  hasLowerCase: boolean,
  hasNumeric: boolean,
  hasSpecialChar: boolean,
  isValidLength: boolean,
}

export interface VisibilityDisplay {
  hidden: boolean,
  visible: boolean
}

export interface DisabilityDisplay extends VisibilityDisplay {
  enabled: boolean,
  disabled: boolean
}

export interface VisibilityConditions {
  displayConditions: Array<boolean>,
  enableConditions?: Array<boolean>,
}

export interface InputValidity {
  'arrow-input': boolean,
  invalid: boolean,
  valid: boolean
}

export interface PasswordValidation {
  key: keyof PasswordStrength,
  message: string;
}
