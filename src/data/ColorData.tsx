export const TxtTypeColor: { [key: string]: string } = {
    "Sales": '#11ba82',
    "Rental": '#fac107',
    "Eval": '#fac107',
    "Subscription": '#11ba82',
}

export const TxtActionColor: { [key: string]: string } = {
    "New": '#4580ff',
    "Update": '#4580ff',
    "Renewal": '#4580ff',
    "Revoke": '#4580ff',
}

export const AssetStatusColor = (status: boolean) => status ? '#11ba82' : '#c2c2c2'

export const TxtStatusColor: { [key: string]: string } = {
    "Draft": "#db3545",
    "Waiting for validation": "#fac107",
    "Waiting for license update": "#fac107",
    "Waiting for source update": "#fac107",
    "Completed": "#11ba82",
    "Error": "#db3545",
    "Cancelled": "#db3545",
    "Hold": "#fac107",
}

export const RoleColors = [
    'bg-[#3d50e0]',  // Primary
    'bg-[#11ba82]', // Secondary
    'bg-[#003133]', //Dark
    'bg-[#dc3545]' //Danger
]