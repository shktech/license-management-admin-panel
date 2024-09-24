import { Box, Fade, styled, Tab, Tabs } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bg-white"
    >
      <Fade in={value === index} timeout={300}>
        <Box sx={{ py: 3 }}>{children}</Box>
      </Fade>
    </div>
  );
};

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    // borderBottom: "2px solid #1f325c", // Add border bottom
    backgroundColor: "transparent"
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    // backgroundColor: '#635ee7',
    backgroundColor: "transparent"
  },
});

interface StyledTabProps {
  label: React.ReactNode;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} sx={{
    mt: '1rem',
  }}/>
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(17),
  padding: "0.75rem 1rem",
  marginRight: theme.spacing(4),
  color: "#96a3ab",
  borderTopLeftRadius: "8px", // Set top left radius
  borderTopRightRadius: "8px", // Set top right radius
  "&.Mui-selected": {
    color: "#1f325c",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #1f325c", // Add border top
    borderLeft: "1px solid #1f325c", // Add border left
    borderRight: "1px solid #1f325c", // Add border right
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
