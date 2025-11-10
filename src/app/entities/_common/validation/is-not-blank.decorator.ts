import { ValidationArguments, ValidationOptions, ValidatorConstraint, buildMessage, isNotEmpty, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank' })
class IsNotBlankConstraint {
  public validate(value: string): boolean {
    return isNotEmpty(value) && value.trim().length > 0;
  }

  public defaultMessage({ constraints: [validationOptions] }: ValidationArguments): string {
    return buildMessage((eachPrefix) => `${eachPrefix}$property must not be blank!`, validationOptions)();
  }
}

export function IsNotBlank(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, propertyName) {
    if (typeof propertyName === 'symbol') throw new Error('Symbol properties are not supported');

    registerDecorator({
      constraints: [validationOptions],
      propertyName,
      options: validationOptions,
      target: object.constructor,
      validator: IsNotBlankConstraint
    });
  };
}
