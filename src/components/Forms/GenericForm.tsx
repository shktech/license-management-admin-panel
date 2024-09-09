import React from "react";
import GeneralInput from "@components/Input/GeneralInput";
import FormControlWrapper from "./FormControlWrapper";
import DatePicker from "@components/Input/DatePicker";
import Dropdown from "@components/Input/Dropdown";
import { FieldConfig } from "./FormControlWrapper";
import GeneralSwitch from "@components/Input/GeneralSwitch";

interface GenericFormProps {
  control: any;
  errors: any;
  fields: FieldConfig[];
}

const GenericForm: React.FC<GenericFormProps> = ({
  control,
  errors,
  fields,
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
      {fields?.map((field) => (
        <div key={field.name} className={field.size == 2 ? "col-span-2" : ""}>
          <FormControlWrapper
            name={field.name2 ? field.name2 : field.name}
            control={control}
            rules={field.rules}
            error={errors[field.name]?.message?.toString()}
          >
            {(fieldProps) => {
              switch (field.type) {
                case "text":
                case "number":
                case "password":
                  return (
                    <GeneralInput
                      {...fieldProps}
                      type={field.type}
                      label={field.label}
                      required={!!field.rules}
                      disabled={field.disabled}
                      // placeholder={field.placeholder}
                    />
                  );
                case "switch":
                  return (
                    <GeneralSwitch
                      {...fieldProps}
                      type={field.type}
                      label={field.label}
                      disabled={field.disabled}
                      // placeholder={field.placeholder}
                    />
                  );
                case "date":
                  return (
                    <DatePicker
                      {...fieldProps}
                      label={field.label}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      required={!!field.rules}
                    />
                  );
                case "dropdown":
                  return (
                    <Dropdown
                      {...fieldProps}
                      label={field.label}
                      placeholder={field.placeholder}
                      name2={field.name2}
                      options={field.options || []}
                      resource={field.resource}
                      valueKey={field.valueKey}
                      labelKey={field.labelKey}
                      disabled={field.disabled}
                      required={!!field.rules}
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
