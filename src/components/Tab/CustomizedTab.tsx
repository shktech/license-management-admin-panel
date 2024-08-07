import { Box, Fade, styled, Tab, Tabs } from "@mui/material";

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
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            </Fade>
        </div>
    );
}

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
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        // maxWidth: 100,
        width: '100%',
        backgroundColor: '#4580ff',
    },
});

interface StyledTabProps {
    label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(17),
    padding: "1.375rem 0rem",
    marginRight: theme.spacing(4),
    color: '#96a3ab',
    '&.Mui-selected': {
        color: '#4580ff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));