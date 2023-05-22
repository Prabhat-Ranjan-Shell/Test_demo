import Bar from './barChart';
import Donut from './donutChart';


export default function Chart() {
    return (
        <div className='highChart_div'>
           <Bar />
           <Donut />
        </div>
    );
}