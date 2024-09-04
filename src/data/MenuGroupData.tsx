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
        {
          icon: <SettingsIcon className="fill-current" />,
          label: "Setups",
          route: "#",
          children: [
            { label: "User profile", route: "/dashboard/user-profile" },
            { label: "Users", route: "/dashboard/users", is_superuser: true },
            { label: "Organizations", route: "/dashboard/orgs", is_superuser: true },
            { label: "Notification Templates", route: "/dashboard/email-templates" },
            { label: "Roles & Permissions", route: "/dashboard/roles", is_superuser: true },
            { label: "API Keys", route: "/dashboard/api-keys", is_superuser: true },
          ],
        },
        {
          icon: <DnsIcon fontSize='small'/>,
          label: "Lookups",
          route: "/dashboard/lookups",
        },
      ],
    }
  ];
  
  
export const filterSuperUserItems = (groups: any) => {
  return groups.map((group: any) => ({
      ...group,
      menuItems: group.menuItems.map((item: any) => ({
      ...item,
      children: item.children?.filter((child: any) => !child.is_superuser)
    })).filter((item: any) => item.children?.length !== 0 || !item.children)
  }));
}

export const notSuperUserMenu = filterSuperUserItems(menuGroups);