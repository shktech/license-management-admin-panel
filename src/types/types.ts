export interface Product {
    id: string;
    organization: string;
    osc_product_id?: number;
    osc_part_number: string;
    product_type?: string;
    product_name?: string;
    product_description?: string;
    duration?: string;
    vendor_name?: string;
    vendor_part_number?: string;
    license_source_set?: string;
    source_name?: string;
    attribute1?: string;
    attribute2?: string;
    attribute3?: string;
    attribute4?: string;
    attribute5?: string;
    eval_set_name?: string;
    renewal_set_name?: string;
    new_set_name?: string;
    active: boolean;
    creation_date: string;
    created_by: number;
    last_update_date: string;
    last_updated_by: number;
    created: string;
    updated: string;
}

export interface Asset {
    id: string;
    active_seats: number;
    created_by: number;
    creation_date: string;
    active: boolean;
    end_date: string;
    expired_seats: number;
    license_key: string;
    license_server_seat_count: number;
    organization: string;
    osc_seat_count: number;
    renewal_seats: number;
    revoked_seats: number;
    start_date: string;
    suspended_seats: number;
    terminated_seats: number;
    status: string;
    status_update_date: string;
    last_transaction: Partial<Transaction>;
    osc_product: Partial<Product>;
    seats?: Seat[];
}

export interface Seat {
    seat_id: string;
    seat_number: string;
    osc_license_status: string;
    osc_start_date: string;
    osc_end_date: string;
    license_server_status: string;
    license_server_start_date: string;
    license_server_end_date: string;
}

export type SeatStatus = {
    seat_id?: number
    vendor_part_number?: number,
    osc_start_date?: string,
    osc_end_date?: string,
    osc_license_status?: string,
    lic_start_date?: string,
    lic_end_date?: string,
    license_status?: string,
    status_update_date?: string,
};

export type AssetTransaction = {
    txn_number?: string
    txn_date?: string,
    vendor_part?: string,
    osc_part_number?: string,
    seat_count?: number,
    start_date?: string,
    end_date?: string,
};

export interface EmailTemplate {
    id?: string
    title?: string;
    subject?: string;
    cc?: string;
    bcc?: string;
    body?: string;
};

export interface User {
    user_id?: string;
    username?: string;
    email?:string;
    first_name?:string;
    last_name?:string;
    organization?:string;
    active?:boolean;
    groups?: string[]
};

export interface Role {
    id?: string;
    name?: string;
    description?: string;
    permission?: any
};

export interface Transaction {
    id: string;
    organization: string;
    transaction_number: number;
    transaction_date: string;
    transaction_source?: string;
    transaction_type?: string;
    transaction_action?: string;
    source_reference_id?: string;
    source_reference_number?: string;
    source_reference_date: string;
    reference?: number;
    bill_customer_id?: number;
    bill_customer_account?: string;
    bill_customer_name?: string;
    bill_address1?: string;
    bill_address2?: string;
    bill_city?: string;
    bill_state?: string;
    bill_postal_code?: string;
    bill_country?: string;
    bill_address_id?: number;
    bill_contact_first_name?: string;
    bill_contact_last_name?: string;
    bill_contact_phone?: string;
    bill_contact_email?: string;
    bill_contact_id?: number;
    ship_customer_id?: number;
    ship_customer_account?: string;
    ship_customer_name?: string;
    ship_address1?: string;
    ship_address2?: string;
    ship_city?: string;
    ship_state?: string;
    ship_postal_code?: string;
    ship_country?: string;
    ship_address_id?: number;
    ship_contact_first_name?: string;
    ship_contact_last_name?: string;
    ship_contact_phone?: string;
    ship_contact_email?: string;
    ship_contact_id?: number;
    notification_date: string;
    quantity?: number;
    start_date: string;
    end_date: string;
    reference_code?: string;
    transaction_status?: string;
    error_message?: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    asset?: Partial<Asset>;
    osc_product?: Partial<Product>;
}