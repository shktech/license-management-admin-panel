import { ResourceProps } from "@refinedev/core";

export const dashboardResources: ResourceProps[] = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      isDashboard: true,
      label: "Dashboard",
    },
  },
  {
    name: "transaction",
    meta: {
      label: "Transaction",
    },
  },
  {
    name: "transactions",
    list: "/transactions",
    create: "/transactions/create",
    edit: "/transactions/edit/:id",
    show: "/transactions/show/:id",
    meta: {
      canDelete: true,
      label: "Transactions",
      parent: "transaction",
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "collections",
    list: "/transactions/collections",
    meta: {
      parent: "transaction",
      label: "Collection",
      disabled: true,
      hide: true,
    },
  },
  {
    name: "mastermgmt",
    meta: {
      label: "Master MGMT",
    },
  },
  {
    name: "assets",
    list: "/assets",
    create: "/assets/create",
    edit: "/assets/edit/:id",
    show: "/assets/show/:id",
    meta: {
      canDelete: true,
      label: "Assets",
      parent: "mastermgmt",
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "assets_details",
    list: "/assets/show/:id",
    create: "/assets/show/:assetid/assets_details/create",
    edit: "/assets/show/:assetid/assets_details/edit/:detailsid",
    show: "/assets/show/:assetid/assets_details/show/:detailsid",
    meta: {
      canDelete: true,
      label: "Assets Details",
      parent: "assets",
      hide: true,
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "products",
    list: "/products",
    create: "/products/create",
    edit: "/products/edit/:id",
    show: "/products/show/:id",
    meta: {
      canDelete: true,
      label: "Products",
      parent: "mastermgmt",
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "partners",
    list: "/partners",
    meta: {
      label: "Partners",
      parent: "mastermgmt",
      disabled: true,
      hide: true,
    },
  },
  {
    name: "maintenance",
    meta: {
      label: "Maintenance",
      disabled: true,
      hide: true,
    },
  },
  {
    name: "lookups",
    list: "/maintenance/lookups",
    meta: {
      label: "Lookups",
      parent: "maintenance",
    },
  },
  {
    name: "licensecode",
    list: "/maintenance/license-code",
    meta: {
      label: "License Code",
      parent: "maintenance",
    },
  },
  {
    name: "email-templates",
    // list: "/email-templates",
    meta: {
      label: "Email Templates",
      parent: "maintenance",
    },
  },
  {
    name: "unsubscribe",
    list: "/maintenance/unsubscribe",
    meta: {
      label: "Unsubscribe",
      parent: "maintenance",
    },
  },
  {
    name: "reports",
    meta: {
      label: "Reports",
      disabled: true,
      hide: true,
    },
  },
  {
    name: "business",
    list: "/reports/business",
    meta: {
      label: "Business",
      parent: "reports",
    },
  },
  {
    name: "logs",
    list: "/reports/logs",
    meta: {
      label: "Logs",
      parent: "reports",
    },
  },
  {
    name: "scheduleview",
    list: "/reports/schedule-view",
    meta: {
      label: "Schedule View",
      parent: "reports",
    },
  },
  {
    name: "settings",
    meta: {
      label: "Settings",
      disabled: true,
      hide: true,
    },
  },
  {
    name: "profile",
    list: "/settings/profile",
    meta: {
      label: "Profile",
      parent: "settings",
    },
  },
  {
    name: "roles",
    list: "/roles",
    meta: {
      label: "Roles",
      parent: "settings",
    },
  },
  {
    name: "users",
    list: "/users",
    meta: {
      label: "User",
      parent: "settings",
    },
  },
  {
    name: "orgsetup",
    list: "/settings/org-setup",
    meta: {
      label: "Org Setup",
      parent: "settings",
    },
  },
];
