// import Convertor from './component/convertor';
// import Customtabs from './component/tab/customTab';
// import Tabs from './component/tabs';
// import Reacttab from './component/reactTab';
// import PDFGenerator from './component/pdfGenerator';
// import WorkflowCreator from './component/workflow-creator/workflowcreator';
// import Parser from './component/htmlParser';
import Chart from './component/react_chart/chart';
import HighChart from './component/HighChart';
import './App.css';

// const content = "Note: Per Shell Regulatory, BSEE requires a demonstration of fluid compatibility in order to approve a commingle permit. An approved commingle permit has been previously required prior to receive an approved completions APM. BSEE has accepted the following as proof of fluid compatibility. Compatibility of  both hydrocarbons and produced water is required. -Analog data -Geochemical finger printing demonstrating similar fluid properties i.e. similar densities and viscosities -Produced water compatibility testing (if samples exist) -Hydrocarbon compatibility testing (if samples exist) -Scale mitigations to be used if required during commingling-If chemical compatibility is an issue, provide details on compatibility control measure i.e. chemical injection through deep CIM. Evaluate if fluids are suitable for small radius/non-asphaltene scaling. <a href='https://eu001-sp.shell.com/:w:/r/sites/SPO000507/_layouts/15/Doc.aspx?sourcedoc=%7B39CF534D-B660-4205-ABE8-B7A6713E4050%7D&file=test.docx&action=default&mobileredirect=true' style={{textDecoration: 'underlined', color: '#1976d2'}} target='_blank'>Content</a>";

function App() {
  return (
    <div className="App">
      {/* <div style={{display: 'flex', justifyContent: 'space-evenly', padding: '20px'}}>
        <Doughnut />
        <BarChart />
      </div> */}
      <HighChart />
      <Chart />
      {/* <h1>Excel to Json conversion</h1> */}
      {/* <Convertor /> */}
      {/* <Customtabs /> */}
      {/* <Reacttab /> */}
      {/* <PDFGenerator /> */}
      {/* <WorkflowCreator /> */}
      {/* <Parser content={content} /> */}
    </div>
  );
}

export default App;
