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
            { label: "Transactions", route: "/transactions" },
          ],
        },
        {
          icon: <MasterMngtIcon className="fill-current" />,
          label: "Master Mngt",
          route: "#",
          children: [
            { label: "Assets", route: "/assets" },
            { label: "Products", route: "/products" },
            { label: "Partners", route: "/partners" }
          ],
        },
        {
          icon: <MaintenanceIcon className="fill-current" />,
          label: "Maintenance",
          route: "#",
          children: [
            { label: "Lookups", route: "/lookups" },
            { label: "License Code", route: "/license-code" },
            { label: "Email Templates", route: "/email-templates" },
            { label: "Un-Subscribe", route: "/un-subscribe" }
          ],
        },
        {
          icon: <ReportsIcon className="fill-current" />,
          label: "Reports",
          route: "#",
          children: [
            { label: "Business", route: "/reports/business" },
            { label: "Logs", route: "/reports/logs" },
            { label: "Schedule/View", route: "/reports/schedule-view" },
          ],
        },
        {
          icon: <SettingsIcon className="fill-current" />,
          label: "Settings",
          route: "#",
          children: [
            { label: "Profile", route: "/profile" },
            { label: "Roles", route: "/roles" },
            { label: "User", route: "/users" },
            { label: "Org Setup", route: "/org-setup" },
          ],
        },
      ],
    }
  ];
  