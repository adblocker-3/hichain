import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import Status from './Status';

function Health(){
    return(
        <div>
            <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                <Tab tabFor="one">My Status</Tab>
                </TabList>

                <TabPanel tabId="one">
                    <Status></Status>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Health;