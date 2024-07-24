import { useList } from "@refinedev/core";

interface DropdownOption {
  value: string;
  label: string;
}

export const useFetchOptions = (resource: string, valueKey: string, labelKey: string): { options: DropdownOption[], loading: boolean } => {
    const { data, isLoading } = useList({
        resource,
    });

    const options = data?.data.map((item: any) => ({
        value: item[valueKey],
        label: item[labelKey],
    })) || [];

    return { options, loading: isLoading };
};
