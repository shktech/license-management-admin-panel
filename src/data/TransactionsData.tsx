import { Transaction } from "@/types/types";

const transactionData: Transaction[] = [
    {
        id: 1,
        organization: 'PAI',
        txn_number: 42560,
        txn_date: '4-Feb-24',
        txn_source: 'LOV1',
        txn_type: 'LOV2',
        txn_action: 'LOV4',
        src_ref_number: 1,
        src_ref_date: '4-Feb-24',
        src_ref_id: '51234',
        txn_status: '',
        notification_date: '',
        error_message: ''
    },
    {
        id: 2,
        organization: 'CEF',
        txn_number: 52465,
        txn_date: '12-Dec-24',
        txn_source: 'LOV1',
        txn_type: 'LOV2',
        txn_action: 'LOV4',
        src_ref_number: 1,
        src_ref_date: '12-Dec-24',
        src_ref_id: '15236',
        txn_status: '',
        notification_date: '',
        error_message: ''
    },
    {
        id: 3,
        organization: 'QWC',
        txn_number: 75315,
        txn_date: '1-Jul-24',
        txn_source: 'LOV1',
        txn_type: 'LOV2',
        txn_action: 'LOV4',
        src_ref_number: 1,
        src_ref_date: '1-Jul-24',
        src_ref_id: '45962',
        txn_status: '',
        notification_date: '',
        error_message: ''
    }
];

export default transactionData;