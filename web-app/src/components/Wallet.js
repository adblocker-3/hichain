import React from 'react';
import Navbar from '../Navbar';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import Balance from './Balance';
import History from './History';

function Wallet(){
    return(
        <div>
            <Navbar></Navbar>
            <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                <Tab tabFor="one">Balance</Tab>
                <Tab tabFor="two">History</Tab>
                </TabList>

                <TabPanel tabId="one">
                    <Balance></Balance>
                </TabPanel>
                <TabPanel tabId="two">
                    <History></History>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Wallet;