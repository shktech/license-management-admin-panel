import GeneralInput from "@components/Input/GeneralInput";
import FormControlWrapper from "../FormControlWrapper";
import DatePicker from "@components/Input/DatePicker";
import Dropdown from "@components/Input/Dropdown";
import { TransactionFormProps } from "./TransactionForm";
import TransactionFormFields from "./TransactionFormFields";

const TransactionInformationForm = ({ control, errors }: TransactionFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {TransactionFormFields.map((field) => (
        <FormControlWrapper
          key={field.name}
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
                    placeholder={field.placeholder}
                    disabled={false}
                  />
                );
              case 'date':
                return (
                  <DatePicker
                    {...fieldProps}
                    label={field.label}
                    placeholder={field.placeholder}
                    disabled={false}
                  />
                );
              case 'dropdown':
                return (
                  <Dropdown
                    {...fieldProps}
                    label={field.label}
                    placeholder={field.placeholder}
                    options={field.options || []}
                    disabled={false}
                  />
                );
              default:
                return <div />;
            }
          }}
        </FormControlWrapper>
      ))}
    </div>
  );
};

export default TransactionInformationForm;
