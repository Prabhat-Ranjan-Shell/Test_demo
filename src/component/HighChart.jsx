import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../App.css';

const getOptions = (type) => ({
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
        text: 'Workflow Analytics',
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
            data: [20, 5, 25, 45, 16, 9],
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
    return (
        <div className='highChart_div'>
            <HighchartsReact highcharts={Highcharts} options={getOptions('bar')} />
            <HighchartsReact highcharts={Highcharts} options={donut('pie')} />
        </div>
    );
}

export default App;