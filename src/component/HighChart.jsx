import { useState } from 'react';
import dayjs from 'dayjs';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import CustomDatePicker from './customDatePicker';
import '../App.css';

const selectColor = {
    backgroundColor: 'white',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    outline: 'none',
};

const projectsType = ['confirmed', 'inprogress', 'default'];

const getBackDate = (c) => {
    const now = new Date();

    switch (c) {
        case "Last Month":
            return {
                dt1: new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1),
                dt2: new Date(now.getFullYear(), now.getMonth(), 0)
            }
        case "Last 3 Months":
            return {
                dt1: new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 3 + 12) % 12, 1),
                dt2: new Date(now.getFullYear(), now.getMonth(), 0)
            }
        case "Last 6 Months":
            return {
                dt1: new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 6 + 12) % 12, 1),
                dt2: new Date(now.getFullYear(), now.getMonth(), 0)
            }
        case "Year to date":
            return {
                dt1: new Date(now.getFullYear(), 0, 1),
                dt2: new Date()
            }
        default:
            return {
                dt1: new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() + 12) % 12, 1),
                dt2: new Date()
            }
    }
}

const data = (mapper) => {
    const data = {
        confirmed: [25, 50, 2, 35, 15, 9],
        inprogress: [10, 30, 37, 20, 39, 7],
        default: [40, 19, 15, 50, 4, 24]
    }

    return data[mapper];
}

const getOptions = (type, mapper) => ({
    accessibility: {
        enabled: false
    },
    plotOptions: {
        series: {
            pointWidth: 30
        }
    },
    chart: {
        type,
        width: 500,
        height: 400,
    },
    title: {
        text: `Workflow Analytics ${mapper.charAt(0).toUpperCase() + mapper.slice(1)}`,
    },
    xAxis: {
        categories: ['Smart Well', 'Single CHGP', 'Stack Selective', 'Stack Commingle', 'Open Hole HZ', 'Multizone']
    },
    yAxis: {
        title: {
            text: '',
        },
    },
    series: [
        {
            name: 'Workflow Count',
            data: data(mapper) || [10, 20, 30, 40, 50, 45],
            color: 'rgb(25, 118, 210)'
        }
    ],
    credits: {
        enabled: false
    }
});

const colors = ['green', 'orange', 'rgb(25, 118, 210)'];

const donut = (type) => ({
    colors,
    accessibility: {
        enabled: false
    },
    chart: {
        type,
        width: 500,
        height: 300,
    },
    title: {
        text: 'Project Analytics',
    },
    yAxis: {
        colors,
        title: {
            text: 'Values',
        },
    },
    series: [
        {
            name: 'Project Count',
            data: [["Confirmed", 9], ["InProgress", 3], ["Default", 6]],
            innerSize: '50%',
        }
    ],
    credits: {
        enabled: false
    }
});

const lineChart = (months) => ({

    title: {
        text: 'Line Chart',
        align: 'center'
    },

    xAxis: {
        type: 'linear',
        // startOnTick: true,
        // categories: [0, 5, 10, 15, 20, 25, 30],
        // tickInterval: 5,
        categories: [...months],
        accessibility: {
            rangeDescription: 'Months'
        },
        // title: {
        //     text: 'Months'
        // },
        labels: {
            style: {
                fontWeight: 'bold'
            }
        }
    },

    yAxis: {
        type: 'linear',
        gridLineWidth: 2,
        tickInterval: 20,
        tickmarkPlacement: 'on',
        title: {
            text: 'Workflows Count'
        },
        labels: {
            style: {
                fontWeight: 'bold'
            }
        },
        floor: 0,
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    // plotOptions: {
    //     series: {
    //         label: {
    //             connectorAllowed: false
    //         },
    //         pointStart: 0
    //     }
    // },

    series: [{
        lineWidth: 2,
        name: 'Smart Well',
        data: [43, 48, 65, 65, 87, 75]
    }, {
        lineWidth: 2,
        name: 'Stack Selective',
        data: [24, 67, 29, 24, 37, 49]
    }, {
        lineWidth: 2,
        name: 'Stack Commingle',
        data: [1, 30, 16, 11, 67, 16]
    }, {
        lineWidth: 2,
        name: 'Single Chgp',
        data: [2, 55, 71, 21, 59, 81]
    }, {
        lineWidth: 2,
        name: 'Open Hole Horizontal',
        data: [11, 19, 10, 20, 50, 71]
    }, {
        lineWidth: 2,
        name: 'Multizone System',
        data: [21, 55, 81, 21, 25, 76]
    }],

    // series: [{
    //     lineWidth: 2,
    //     name: 'Smart Well',
    //     data: [87, 75]
    // }, {
    //     lineWidth: 2,
    //     name: 'Stack Selective',
    //     data: [24, 49]
    // }, {
    //     lineWidth: 2,
    //     name: 'Stack Commingle',
    //     data: [67, 16]
    // }, {
    //     lineWidth: 2,
    //     name: 'Single Chgp',
    //     data: [2, 81]
    // }, {
    //     lineWidth: 2,
    //     name: 'Open Hole Horizontal',
    //     data: [11, 71]
    // }, {
    //     lineWidth: 2,
    //     name: 'Multizone System',
    //     data: [21, 76]
    // }],

    // series: [{
    //     lineWidth: 2,
    //     name: 'Smart Well',
    //     data: [65, 65, 87]
    // }, {
    //     lineWidth: 2,
    //     name: 'Stack Selective',
    //     data: [29, 44, 37]
    // }, {
    //     lineWidth: 2,
    //     name: 'Stack Commingle',
    //     data: [16, 11, 67]
    // }, {
    //     lineWidth: 2,
    //     name: 'Single Chgp',
    //     data: [71, 21, 59]
    // }, {
    //     lineWidth: 2,
    //     name: 'Open Hole Horizontal',
    //     data: [10, 30, 50]
    // }, {
    //     lineWidth: 2,
    //     name: 'Multizone System',
    //     data: [81, 51, 25]
    // }],

    credits: {
        enabled: false
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 900
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
})

function App() {
    // const [projectType, setProjectType] = useState('default');
    const [value1, setValue1] = useState(dayjs(getBackDate('Month to date').dt1.toLocaleDateString()));
    const [value2, setValue2] = useState(dayjs(new Date().toLocaleDateString()));
    const [customDate, setCustomDate] = useState('Month to date');
    const [disableCal, setDisableCal] = useState(true);

    const handleChange = (event) => {
        if (event.target.value === 'Custom range') {
            setDisableCal(false);
        } else {
            setDisableCal(true);
        }
        setCustomDate(event.target.value);
        setValue1(dayjs(getBackDate(event.target.value).dt1.toLocaleDateString()));
        setValue2(dayjs(getBackDate(event.target.value).dt2.toLocaleDateString()));
    };

    console.log("date values 1: ", new Date(value1).toLocaleDateString());
    console.log("date values 2: ", new Date(value2).toLocaleDateString());

    return (
        <div className='highChart_div'>
            {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 200, marginLeft: '30px', marginBottom: '40px' }}>
                <InputLabel id="demo-simple-select-filled-label">
                    Select Project Type
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled_edm-region-dropdown}"
                    style={selectColor}
                    label="Select Region"
                    value={projectType}
                    name="Region"
                    onChange={(e) => {
                        setProjectType(e.target.value);
                    }}
                >
                    <MenuItem value="" key="first_Select_edm-region">
                        Select Project Type
                    </MenuItem>
                    {projectsType.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl> */}
            {/* <HighchartsReact highcharts={Highcharts} options={getOptions('bar', projectType)} />
            <HighchartsReact highcharts={Highcharts} options={donut('pie')} /> */}
            <div>
                <CustomDatePicker
                    value1={value1}
                    value2={value2}
                    customDate={customDate}
                    setValue1={setValue1}
                    setValue2={setValue2}
                    setCustomDate={setCustomDate}
                    handleChange={handleChange}
                    disableCal={disableCal}
                />
            </div>
            <div><HighchartsReact highcharts={Highcharts} options={lineChart(['Mar','Apr','May','Jun','Jul', 'Aug'])} /></div>
        </div>
    );
}

export default App;