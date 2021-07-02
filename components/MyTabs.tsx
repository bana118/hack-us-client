import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Children } from "react";
import { textBlack, textLightgrey } from "../utils/style-variables";

type TabPanelProps = {
  value: number;
  index: number;
  children?: React.ReactNode;
};

const TabPanel = ({ value, index, children }: TabPanelProps): JSX.Element => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

type MyTabsProps = {
  labels: string[];
  children?: React.ReactNode;
};

const MyTabs = ({ labels, children }: MyTabsProps): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue: any
  ) => {
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
        css={{ backgroundColor: "#FFFFFF" }}
      >
        {labels.map((label, index) => (
          <Tab
            label={label}
            key={index}
            css={{
              fontSize: 22,
              color: value === index ? textBlack : textLightgrey,
              fontWeight: "bold",
              textTransform: "none",
            }}
          ></Tab>
        ))}
      </Tabs>

      <Box mx={12.5} p={0}>
        {Children.map(children, (child, index) => {
          return (
            <TabPanel
              value={value}
              index={index}
              key={index}
              css={{ padding: "0px" }}
            >
              <h1>{labels[index]}</h1>
              {child}
            </TabPanel>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default MyTabs;
