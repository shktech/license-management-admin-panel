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
    name: "references",
    list: "/dashboard/references",
    create: "/dashboard/references/create",
    edit: "/dashboard/references/edit/:id",
    show: "/dashboard/references/show/:id",
    meta: {
      canDelete: true,
      label: "References",
      parent: "mastermgmt",
      warnWhenUnsavedChanges: true,
    },
  },
  {
    name: "partners",
    list: "/dashboard/partners",
    create: "/dashboard/partners/create",
    edit: "/dashboard/partners/edit/:id",
    show: "/dashboard/partners/show/:id",
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
    list: "/dashboard/lookups",
    create: "/dashboard/lookups/create",
    edit: "/dashboard/lookups/edit/:id",
    show: "/dashboard/lookups/show/:id",
    meta: {
      label: "Lookups",
      canDelete: true,
      parent: "maintenance",
      warnWhenUnsavedChanges: true,
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
    create: "/dashboard/email-templates/create",
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
    name: "user-account",
    list: "/dashboard/settings/user-account",
    meta: {
      label: "User Account",
      parent: "settings",
    },
  },
  {
    name: "organizations",
    list: "/dashboard/settings/organizations",
    meta: {
      label: "User Account",
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
    name: "orgs",
    list: "/dashboard/orgs",
    create: "/dashboard/orgs/create",
    edit: "/dashboard/orgs/edit/:id",
    meta: {
      label: "Organizations",
      parent: "settings",
      warnWhenUnsavedChanges: true,
      canDelete: true,
    },
  },
  {
    name: "orgs/key/api-keys",
    list: "/dashboard/api-keys",
    create: "/dashboard/api-keys/create",
    edit: "/dashboard/api-keys/edit/:id",
    meta: {
      label: "API Keys",
      parent: "settings",
      warnWhenUnsavedChanges: true,
      canDelete: true,
    },
  },
];
