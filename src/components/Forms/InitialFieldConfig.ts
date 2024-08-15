export interface InitialFieldConfig {
    name: string;
    required?: boolean;
    type?: 'text' | 'date' | 'dropdown' | 'number' | 'switch';
    options?: { value: string; label: string }[];
    resource?: string;
    valueKey?: string;
    labelKey?: string;
    size?: number,
    disabled?: boolean
}

export interface SecondInitialFieldConfig {
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