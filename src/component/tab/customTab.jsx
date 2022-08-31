import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import TabItem from "./tabItem";
import Tab from "./tab";
import Tabtitle from "./tabTitle";

const data = [
    { tabHeadingTitle: "Technical Fesability"},
    { value: "1", name: "Regulatory Screening", subtitle: "Title 1", info: "first", tooltip: "tooltip text 1", color: "orange" },
    { value: "2", name: "Minimun case sizing", subtitle: "Title 2", info: "Minimun case sizing", tooltip: "tooltip text 2", color: "red" },
    { value: "3", name: "TLP Sureface control unit", subtitle: "Title 3", info: "TLP Sureface control unit", tooltip: "tooltip text 3", color: "green" },
    { tabHeadingTitle: "Value Economic Screening"},
    { value: "4", name: "TLP Sureface control unit 2", subtitle: "Title 4", info: "TLP Sureface control unit 2", tooltip: "tooltip text 4", color: "green" },
    { value: "5", name: "TLP Sureface control unit 3", subtitle: "Title 5", info: "TLP Sureface control unit 3", tooltip: "tooltip text 5", color: "green" },
    { value: "6", name: "TLP Sureface control unit 4", subtitle: "Title 6", info: "TLP Sureface control unit 4", tooltip: "tooltip text 6", color: "green" },
    { value: "7", name: "TLP Sureface control unit 5", subtitle: "Title 5", info: "TLP Sureface control unit 5", tooltip: "tooltip text 7", color: "green" },
    { value: "8", name: "TLP Sureface control unit 6", subtitle: "Title 6", info: "TLP Sureface control unit 6", tooltip: "tooltip text 8", color: "green" },
    { value: "9", name: "TLP Sureface control unit 7", subtitle: "Title 7", info: "TLP Sureface control unit 7", tooltip: "tooltip text 9", color: "green" },
];

const Customtab = () => {

    const [tabData] = useState(data);
    const [currentTab, setCurrentTab] = useState(1);

    const handleClick = (currentTab) => {
        setCurrentTab(currentTab);
    }

    return (
        <div className="tab-wrapper">
            {/* <h2>Vertical Tabs</h2>
            <p>Click on the buttons inside the tabbed menu:</p> */}
            <div className="tab">
                {tabData.map(item => {
                    if(item.tabHeadingTitle) {
                        return <div key={item.tabHeadingTitle} className="tabone_title">{item.tabHeadingTitle}</div>
                    }
                    return (
                        <Tab key={`${item.label}${item.value}`} label={item.label} value={item.value} tabHandler={handleClick}>
                            <Tabtitle>
                                <div className='tab-title'>
                                    <span style={{ color: item.color, fontWeight: 700 }}>{item.subtitle}</span>
                                    <Tooltip title={item.tooltip} placement="left-start" arrow>
                                        <i className="fa fa-info-circle"></i>
                                    </Tooltip>
                                </div>
                                <div className='tab-label'>{item.name}</div>
                            </Tabtitle>
                        </Tab>
                    )
                })}
            </div>

            <div className="tab-content">
                <TabItem value="1" currentTab={currentTab}>
                    <h3>Tab One</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="2" currentTab={currentTab}>
                    <h3>Tab Two</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="3" currentTab={currentTab}>
                    <h3>Tab Three</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="4" currentTab={currentTab}>
                    <h3>Tab Four</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="5" currentTab={currentTab}>
                    <h3>Tab Five</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="6" currentTab={currentTab}>
                    <h3>Tab Six</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="7" currentTab={currentTab}>
                    <h3>Tab Seven</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="8" currentTab={currentTab}>
                    <h3>Tab Eight</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
                <TabItem value="9" currentTab={currentTab}>
                    <h3>Tab Nine</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis ratione, earum soluta vitae error quae ea repudiandae accusamus
                        optio veritatis est asperiores facilis natus placeat!
                        Dicta necessitatibus voluptatem nostrum blanditiis!</p>
                </TabItem>
            </div>
        </div>
    )
}

export default Customtab;