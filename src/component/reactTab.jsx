import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Reacttab = () => (
    <Tabs default="rtl">
        <TabList>
            <Tab>Title 1 <i className="fa fa-info-circle"></i></Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 3</Tab>
            <Tab>Title 4</Tab>
        </TabList>

        <TabPanel>
            <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 4</h2>
        </TabPanel>
    </Tabs>
);

export default Reacttab;