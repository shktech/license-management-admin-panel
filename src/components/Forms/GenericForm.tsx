import React from "react";
import GeneralInput from "@components/Input/GeneralInput";
import FormControlWrapper from "./FormControlWrapper";
import DatePicker from "@components/Input/DatePicker";
import Dropdown from "@components/Input/Dropdown";
import { FieldConfig } from "./FormControlWrapper";

interface GenericFormProps {
  control: any;
  errors: any;
  fields: FieldConfig[];
}

const GenericForm: React.FC<GenericFormProps> = ({ control, errors, fields }) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
      {fields.map((field) => (
        <div key={field.name} className={field.size == 2 ? 'col-span-2' : ''}>
          <FormControlWrapper
            name={field.name}
            control={control}
            rules={field.rules}
            error={errors[field.name]?.message?.toString()}
          >
            {(fieldProps) => {
              switch (field.type) {
                case 'text':
                case 'number':
                  return (
                    <GeneralInput
                      {...fieldProps}
                      type={field.type}
                      label={field.label}
                      disabled={field.disabled}
                      // placeholder={field.placeholder}
                    />
                  );
                case 'date':
                  return (
                    <DatePicker
                      {...fieldProps}
                      label={field.label}
                      placeholder={field.placeholder}
                    />
                  );
                case 'dropdown':
                  return (
                    <Dropdown
                      {...fieldProps}
                      label={field.label}
                      placeholder={field.placeholder}
                      options={field.options || []}
                      resource={field.resource}
                      valueKey={field.valueKey}
                      labelKey={field.labelKey}
                      // fetchOptions={field.fetchOptions}
                    />
                  );
                default:
                  return <div />;
              }
            }}
          </FormControlWrapper>
        </div>
      ))}
    </div>
  );
};

export default GenericForm;