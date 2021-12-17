import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import MyPolicies from './MyPolicies';
import AddOns from './AddOns';
import "./MyPolicies.styled";

function Policies(){
    return(
        <div>
            <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                <Tab tabFor="one">My Policies</Tab>
                <Tab tabFor="two">Add-ons</Tab>
                </TabList>

                <TabPanel tabId="one">
                    <MyPolicies></MyPolicies>
                </TabPanel>
                <TabPanel tabId="two">
                    <AddOns></AddOns>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Policies;