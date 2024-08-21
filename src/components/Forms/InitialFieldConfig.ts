export interface InitialFieldConfig {
    name: string;
    required?: 'text' | 'email';
    type?: 'text' | 'date' | 'dropdown' | 'number' | 'switch';
    options?: { value: string; label: string }[];
    resource?: string;
    valueKey?: string;
    labelKey?: string;
    size?: number,
    disabled?: boolean
}