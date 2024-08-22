import { FieldConfig } from '@components/Forms/FormControlWrapper';
import { InitialFieldConfig } from '@components/Forms/InitialFieldConfig';
import { CrudSort } from '@refinedev/core';
import { format } from 'date-fns';
import { MRT_SortingState } from 'material-react-table';

export const getFormattedDate = (timestamp: any) => {
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return formattedDate;
    }
    return timestamp
}

export const getReadableDate = (dateString: any) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
}

export const getTitleCase = (inputString: string) => {
    // Extract the substring after the last dot
    const lastPart = inputString.split('.').pop();

    // Convert the extracted substring to title case
    return lastPart
        ?.split('_')           // Split the string by underscores
        .map(word =>           // Capitalize each word
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');            // Join the words with spaces
}
export const getRealFormFields = (InitialCustomerFormFields: InitialFieldConfig[]) => {
    return InitialCustomerFormFields.map(field => {
        const value: FieldConfig = {
            label: getTitleCase(field.name) as string,
            placeholder: getTitleCase(field.name),
            ...field
        }
        if (!field.type) {
            value.type = "text";
        }
        if (field.required) {
            value.rules = {
                required: `This field is required`
            }
            if (field.required == "email") {
                value.rules.pattern = {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                }
            }
        }
        return value
    })
}

export const getNestedValue = (obj: any, key: string) => {
    if (!obj) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const convertSortingStateToCrudSort = (sortingState: MRT_SortingState): CrudSort[] => {
    return sortingState.map((sort) => ({
        field: sort.id,
        order: sort.desc ? 'desc' : 'asc',
    }));
};

export const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}

export const getDurationFromString = (str: string) => {
    switch (str) {
        case "EA":
            return 0;
        case "1YR":
            return 1;
        case "2YR":
            return 2;
        case "3YR":
            return 3;
        default:
            return 0;
    }
}