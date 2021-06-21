import React, { ReducerAction, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { css } from "@emotion/react";

const tabStyle = css`
  background-color: #1976d2;
  color: #ffffff;
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const MyTabs = (props): JSX.Element => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { background: "white", height: "2px" },
        }}
        textColor="inherit"
        centered
        css={tabStyle}
      >
        {props.labels.map((label) => (
          <Tab label={label}></Tab>
        ))}
      </Tabs>

      <div>
        {props.children.map((child, index) => (
          <TabPanel value={value} index={index}>
            {child}
          </TabPanel>
        ))}
      </div>
    </React.Fragment>
  );
};

export default MyTabs;