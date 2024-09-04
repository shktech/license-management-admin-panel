import DashboardIcon from '@/assets/icons/dashboard.svg?icon';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import TransactionIcon from '@/assets/icons/transaction.svg?icon';
import MasterMngtIcon from '@/assets/icons/mastermngt.svg?icon';
import MaintenanceIcon from '@/assets/icons/maintenance.svg?icon';
import ReportsIcon from '@/assets/icons/reports.svg?icon';
import SettingsIcon from '@/assets/icons/settings.svg?icon';
import DnsIcon from '@mui/icons-material/Dns';

export const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: <DashboardIcon className="fill-current" />,
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          icon: <TransactionIcon className="fill-current" />,
          label: "Transaction",
          route: "/dashboard/transactions",
        },
        {
          icon: <MasterMngtIcon className="fill-current" />,
          label: "Maintenance",
          route: "#",
          children: [
            { label: "Licenses", route: "/dashboard/assets" },
            { label: "Products", route: "/dashboard/products" },
            { label: "Partners", route: "/dashboard/partners" },
            { label: "References", route: "/dashboard/references" }
          ],
        },
        {
          icon: <ReportsIcon className="fill-current" />,
          label: "Reports",
          route: "#",
        },
        // {
        //   icon: <MaintenanceIcon className="fill-current" />,
        //   label: "Maintenance",
        //   route: "#",
        //   children: [
        //     { label: "License Code", route: "/dashboard/license-code" },
        //     { label: "Setups", route: "/dashboard/lookups" },
        //     { label: "Email Templates", route: "/dashboard/email-templates" },
        //   ],
        // },
        {
          icon: <SettingsIcon className="fill-current" />,
          label: "Setups",
          route: "#",
          children: [
            { label: "User profile", route: "/dashboard/user-profile" },
            { label: "Users", route: "/dashboard/users" },
            { label: "Organizations", route: "/dashboard/organizations" },
            { label: "Notification Templates", route: "/dashboard/notification-templates" },
            { label: "Roles & Permissions", route: "/dashboard/roles" },
            { label: "Organizations", route: "/dashboard/organizations" },
            // { label: "User Account", route: "/dashboard/user-account" },
            // { label: "Organization", route: "/dashboard/organizations" },
          ],
        },
        {
          icon: <DnsIcon fontSize='small'/>,
          label: "Lookups",
          route: "#",
        },
      ],
    }
  ];
  