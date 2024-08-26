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
  // {
  //   name: "organization",
  //   create: "/authenticate/"
  // },
  {
    name: "transactions",
    list: "/dashboard/transactions",
    create: "/dashboard/transactions/create",
    edit: "/dashboard/transactions/edit/:id",
    show: "/dashboard/transactions/show/:id",
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
    list: "/dashboard/assets",
    create: "/dashboard/assets/create",
    edit: "/dashboard/assets/edit/:id",
    show: "/dashboard/assets/show/:id",
    meta: {
      canDelete: true,
      label: "Licenses",
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
      label: "License Details",
      parent: "assets",
      hide: true,
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "products",
    list: "/dashboard/products",
    create: "/dashboard/products/create",
    edit: "/dashboard/products/edit/:id",
    show: "/dashboard/products/show/:id",
    meta: {
      canDelete: true,
      label: "Products",
      parent: "mastermgmt",
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "partners",
    list: "/dashboard/partners",
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
    list: "/dashboard/maintenance/lookups",
    meta: {
      label: "Lookups",
      parent: "maintenance",
    },
  },
  {
    name: "licensecode",
    list: "/dashboard/maintenance/license-code",
    meta: {
      label: "License Code",
      parent: "maintenance",
    },
  },
  {
    name: "email-templates",
    list: "/dashboard/email-templates",
    meta: {
      label: "Email Templates",
      parent: "maintenance",
    },
  },
  {
    name: "unsubscribe",
    list: "/dashboard/maintenance/unsubscribe",
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
    list: "/dashboard/settings/profile",
    meta: {
      label: "Profile",
      parent: "settings",
    },
  },
  {
    name: "roles",
    list: "/dashboard/roles",
    create: "/dashboard/roles",
    edit: "/dashboard/roles/:id",
    meta: {
      label: "Roles",
      parent: "settings",
    },
  },
  {
    name: "users",
    list: "/dashboard/users",
    meta: {
      label: "User",
      parent: "settings",
    },
  },
  {
    name: "orgsetup",
    list: "/dashboard/orgs",
    create: "/dashboard/orgs",
    edit: "/dashboard/orgs/:id",
    meta: {
      label: "Org Setup",
      parent: "settings",
    },
  },
];
