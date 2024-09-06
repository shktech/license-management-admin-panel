import DashboardIcon from '@/assets/icons/dashboard.svg?icon';
import TransactionIcon from '@/assets/icons/transaction.svg?icon';
import MasterMngtIcon from '@/assets/icons/mastermngt.svg?icon';
import ReportsIcon from '@/assets/icons/reports.svg?icon';
import SettingsIcon from '@/assets/icons/settings.svg?icon';
import DnsIcon from '@mui/icons-material/Dns';

// Define types for menu items and groups
type MenuItem = {
  icon: React.ReactNode;
  label: string;
  route: string;
  children?: Array<{
    label: string;
    route: string;
    is_superuser?: boolean;
    is_commonuser?: boolean;
  }>;
};

type MenuGroup = {
  name: string;
  menuItems: MenuItem[];
};

// Define menu groups
export const menuGroups: MenuGroup[] = [
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
          { label: "User profile", route: "/dashboard/user-profile", is_commonuser: true },
          { label: "Users", route: "/dashboard/users", is_superuser: true },
          { label: "Organizations", route: "/dashboard/orgs", is_superuser: true },
          { label: "Notification Templates", route: "/dashboard/email-templates" },
          { label: "Notification Schedules", route: "/dashboard/notification-schedules",is_superuser: true },
          { label: "Roles & Permissions", route: "/dashboard/roles", is_superuser: true },
          { label: "API Keys", route: "/dashboard/api-keys", is_superuser: true },
          { label: "Lookups", route: "/dashboard/lookups" },
        ],
      },
    ],
  }
];

// Helper function to filter menu items
const filterMenuItems = (groups: MenuGroup[], filterKey: 'is_superuser' | 'is_commonuser'): MenuGroup[] => {
  return groups.map(group => ({
    ...group,
    menuItems: group.menuItems
      .map(item => ({
        ...item,
        children: item.children?.filter(child => !child[filterKey])
      }))
      .filter(item => item.children?.length !== 0 || !item.children)
  }));
};

export const CommonMenu = filterMenuItems(menuGroups, 'is_superuser');
export const AdminMenu = filterMenuItems(menuGroups, 'is_commonuser');