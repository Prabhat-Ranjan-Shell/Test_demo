import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import '../App.css';

const selectColor = {
	backgroundColor: 'white',
	borderBottomLeftRadius: '4px',
	borderBottomRightRadius: '4px',
	outline: 'none',
};

const projectsType = ['confirmed', 'inprogress', 'default'];

const data = (mapper) => {
    const data =  {
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

function App() {
    const [projectType, setProjectType] = useState('default');

    console.log("edmvalue", projectType);

    return (
        <div className='highChart_div'>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 200, marginLeft: '30px', marginBottom: '40px' }}>
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
            </FormControl>
            <HighchartsReact highcharts={Highcharts} options={getOptions('bar', projectType)} />
            <HighchartsReact highcharts={Highcharts} options={donut('pie')} />
        </div>
    );
}

export default App;