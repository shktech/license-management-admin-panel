import React, { forwardRef } from "react";
import { BaseInputProps } from "./InputProps";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";

export const IOSSwitch = styled(
  forwardRef((props: SwitchProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref}>
      <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
      />
    </div>
  ))
)(({ theme }) => ({
  width: 46,
  height: 25,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(21px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const GeneralSwitch = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, onChange, value, ...props }, ref) => {
    const handleChange = (e: any) => {
      onChange?.({
        target: {
          name: props.name,
          value: e.target.checked,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <FormControlLabel
        control={
          <IOSSwitch
            ref={ref} // Added ref here
            onChange={handleChange}
            checked={value as boolean || false}
            sx={{ mx: 1 }}
            disabled={props.disabled}
          />
        }
        label={label}
      />
    );
  }
);

export default GeneralSwitch;
