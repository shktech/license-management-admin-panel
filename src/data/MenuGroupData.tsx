import DashboardIcon from '@/assets/icons/dashboard.svg?icon';
import TransactionIcon from '@/assets/icons/transaction.svg?icon';
import MasterMngtIcon from '@/assets/icons/mastermngt.svg?icon';
import MaintenanceIcon from '@/assets/icons/maintenance.svg?icon';
import ReportsIcon from '@/assets/icons/reports.svg?icon';
import SettingsIcon from '@/assets/icons/settings.svg?icon';

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
          route: "#",
          children: [
            { label: "Transactions", route: "/dashboard/transactions" },
          ],
        },
        {
          icon: <MasterMngtIcon className="fill-current" />,
          label: "Master Mngt",
          route: "#",
          children: [
            { label: "Assets", route: "/dashboard/assets" },
            { label: "Products", route: "/dashboard/products" },
            { label: "Partners", route: "/dashboard/partners" }
          ],
        },
        {
          icon: <MaintenanceIcon className="fill-current" />,
          label: "Maintenance",
          route: "#",
          children: [
            { label: "License Code", route: "/dashboard/license-code" },
            { label: "Email Templates", route: "/dashboard/email-templates" },
          ],
        },
        {
          icon: <ReportsIcon className="fill-current" />,
          label: "Reports",
          route: "#",
          children: [
            { label: "Business", route: "/dashboard/reports/business" },
            { label: "Logs", route: "/dashboard/reports/logs" },
            { label: "Schedule/View", route: "/dashboard/reports/schedule-view" },
          ],
        },
        {
          icon: <SettingsIcon className="fill-current" />,
          label: "Settings",
          route: "#",
          children: [
            { label: "Profile", route: "/dashboard/profile" },
            { label: "Roles", route: "/dashboard/roles" },
            { label: "User", route: "/dashboard/users" },
            { label: "Org Setup", route: "/dashboard/orgs" },
          ],
        },
      ],
    }
  ];
  