// import { getValue } from "@testing-library/user-event/dist/utils"
import { useState } from "react";
import './creator.css';

const WorkflowCreator = () => {
    const [opt, setOpt] = useState("technicalFeasibility");
    const [innerTabVal, setInnerTabVal] = useState({
        "tf": "",
        "ves": ""
    });
    const [num, setTabsNum] = useState("");
    const [schema, setSchema] = useState([
        {
            "id": "technicalFeasibility",
            "name": "technicalFeasibility",
            "label": "Technical Feasibility",
            "innerTabs": []
        },
        {
            "id": "valueEconomicScreening",
            "name": "valueEconomicScreening",
            "label": "Value Economic Screening",
            "innerTabs": []
        }
    ]);

    const [tabs, setTabs] = useState({
        "id": "",
        "name": "",
        "type": "tab",
        "label": "",
        "tooltip": "",
        "content": [],
        "comment": {
            "id": "",
            "name": "",
            "type": "commentbox"
        }
    })
    const [ques, setQues] = useState({
        "name": "",
        "id": "",
        "label": "",
        "type": "question",
        "tooltip": "",
        "condition": "",
        "dwfsUrl": "",
        "dwfsTab": "",
        "options": [
            {
                "name": "",
                "label": "",
                "value": ""
            },
            {
                "name": "",
                "label": "",
                "value": ""
            }
        ]
    });

    const [res, setRes] = useState({
        "id": "",
        "name": "",
        "type": "resultbox",
        "label": "",
        "enableColor": "",
        "disableColor": "incomplete",
        "condition": ""
    });

    const [statement, setStatement] = useState({
        "id": "",
        "name": "",
        "label": "",
        "type": "statement"
    });

    const setSchemaValue = (tabs) => {
        const tfi = schema[0]?.innerTabs?.findIndex(item => item.id === tabs.id);
        const vesi = schema[1]?.innerTabs?.findIndex(item => item.id === tabs.id);

        if (opt === "technicalFeasibility" && tfi === -1) {
            schema[0]?.innerTabs?.push(tabs);
        } else if (opt === "valueEconomicScreening" && vesi === -1) {
            schema[1]?.innerTabs?.push(tabs)
        }
        setSchema([...schema]);
    }

    const setTabValue = (e) => {
        const val = e.target.value;
        let id = val.split(' ').join('');
        let name = id;


        setTabs({
            ...tabs, ...{
                id,
                name,
                label: val,
                comment: {
                    "id": `${id}-comment`,
                    "name": `${id}-comment`,
                    "type": "comment"
                }
            }
        });
    }

    const setTabOptions = (val) => {
        setTabsNum("");
        setOpt(val);
    }

    const copyToClipBoard = (e) => {
        const copyText = document.getElementById("schemaDisplay");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
    }

    // console.log("opt-------", num, innerTabVal);
    return (
        <>
            <label htmlFor="Tabs"> Select Tab type: </label>
            <select name="Tabs" id="Tabs" onChange={e => setTabOptions(e.target.value)}>
                <option value="technicalFeasibility">Technical Feasibility</option>
                <option value="valueEconomicScreening">Value Economic Screening</option>
            </select>
            <div style={{ marginTop: '10px' }}>
                <label htmlFor="tabType"> Enter no of tabs: </label>
                <input name="tabType" type="text" value={num} placeholder="Enter no of tabs"
                onFocus={(e)=> e.target.value = ""}
                onChange={(e) => setTabsNum(Number(e.target.value))} />
            </div>
            <div style={{ marginTop: '10px' }}>
                {Array(num || 0).fill(1).map((_, i) => {
                    return (<div style={{ marginTop: '10px' }} key={`Tab_${i}_group`}>
                        <label key={`Tab_${i}_label`} htmlFor={`Tab_${i}`}> Enter tab name: </label>
                        <input key={`Tab_${i}_value`} name={`Tab_${i}`} type="text" onChange={(e) => {
                            setTabValue(e);
                        }}
                            onBlur={() => setSchemaValue(tabs)}
                        />
                    </div>)
                })}
            </div>
            <h3>Technical Feasibility</h3>
            <div style={{ marginTop: '10px' }}>
                {schema[0]?.innerTabs?.length ?
                    <>
                        <label htmlFor="InnerTabs"> Select Inner Tab type: </label>
                        <select name="Tabs" id="Tabs" onChange={e => setInnerTabVal({...innerTabVal, tf: e.target.value })}>
                            <option value="default_tf">Select a option</option>
                            {
                                schema[0].innerTabs?.map(item => {
                                    return <option value={item.id}>{item.label}</option>
                                })
                            }
                        </select></> : null}
            </div>

            <h3>Value Economic Screening</h3>
            <div style={{ marginTop: '10px' }}>
                {schema[1]?.innerTabs?.length ? <> <label htmlFor="InnerTabs"> Select Inner Tab type: </label>
                    <select name="Tabs" id="Tabs" onChange={e => setInnerTabVal({...innerTabVal, ves: e.target.value })}>
                        <option value="default_ves">Select a option</option>
                        {
                            schema[1].innerTabs?.map(item => {
                                return <option value={item.id}>{item.label}</option>
                            })
                        }
                    </select></> : null}
            </div>

            <h3>Workflow Schema Created</h3>
            <div>
                <label htmlFor="schemaValue" />
                <textarea id="schemaDisplay" name="schemaValue" cols='80' rows='30' style={{ marginTop: '10px', resize: 'none' }} value={JSON.stringify(schema, undefined, 4)} readOnly />
                <button className="clip-copy" onClick={(e) => copyToClipBoard(e)}>Copy</button>
            </div>
            {/* <div>
                <button>press me</button>
                <span contenteditable="true">{schema}</span>
            </div> */}
        </>
    )
}

export default WorkflowCreator;