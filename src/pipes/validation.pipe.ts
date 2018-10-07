import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
// import {} from "class-validator";
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const constraints = errors.map(m => m.constraints);
      if (constraints.length > 0) {
        const constraint = constraints[0];
        const messages = Object.keys(constraint).map(key => constraint[key]);
        throw new BadRequestException(messages[messages.length - 1]);
      }
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

export function IsComparePassword(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    if (validationOptions == null) {
      validationOptions = {};
      validationOptions.message = 'Password not match.';
    }
    registerDecorator ({
      name: 'IsComparePassword',
      target: object.constructor,
      propertyName: (propertyName),
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return  args.object[property] === value;
        },
      },
    });
   };
}