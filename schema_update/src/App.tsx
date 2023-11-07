import { useState } from 'react';
import './App.css';
import Data from './data/schema.json';

function App() {
  const [mainTabName, setMainTabName] = useState('');
  const [innerTabName, setInnerTabName] = useState('');
  // const [subTabName, setSubTabName] = useState('');
  const [d, setD] = useState([...Data]);
  const [innerTabLabel, setInnerTabLabel] = useState<{ [key: string]: string }>({});
  const [subTabLabel, setSubTabLabel] = useState<{ [key: string]: string }>({});

  const selectedTab = d.find(item => item.name === mainTabName);
  const innerTabs = selectedTab ? selectedTab.innerTabs : [];

  const selectedInnerTab = innerTabs.find(item => item.name === innerTabName);
  const subTabs = selectedInnerTab ? selectedInnerTab.content : [];

  // const selectedSubTab = innerTabs.filter(item => item.name === subTabName);

  const updateInnerTabLabel = (id: string, val: string) => {
    const updatedTabs = innerTabs.map(item => {
      if (item.id === id) {
        return { ...item, label: val };
      }
      return item;
    });
  
    const updatedLabels = updatedTabs.reduce((acc, item) => {
      (acc as { [key: string]: string })[item.id] = item.label;
      return acc;
    }, {});
  
    setInnerTabLabel(updatedLabels);

    setD(prevData => prevData.map(item => {
      if (item.name === mainTabName) {
        return {
          ...item,
          innerTabs: updatedTabs ?? [],
        };
      }
      return item;
    }));
  }

  const updateSubTabLabel = (id: string, val: string) => {
    const updatedSubTabs = subTabs.map(item => {
      if (item.id === id) {
        return { ...item, label: val };
      }
      return item;
    });
  
    const updatedSubLabels = updatedSubTabs.reduce((acc, item) => {
      (acc as { [key: string]: string | undefined })[item.id] = item.label;
      return acc;
    }, {});
  
    setSubTabLabel(updatedSubLabels);
  
    const t = innerTabs.map(it => {
      if (it.name === innerTabName) {
        return {
          ...it,
          content: [...updatedSubTabs],
        };
      }
      return it;
    });
  
    setD(p => {
      const updatedMainTabs = p.map(item => {
        if (item.name === mainTabName) {
          return { ...item, innerTabs: [...t] };
        }
        return item;
      });
      return [...updatedMainTabs];
    });
  };  

  return (
    <>
      <div>
        <h2>Main Tab</h2>
        <select
          key='mainTab'
          name="mainTab"
          id="mainTab"
          value={mainTabName}
          onChange={(e) => {
            setMainTabName(e.target.value);
            setInnerTabName('');
          }}
        >
          <option value="main-tab">select main tab</option>
          {Data.map(item => (
            <option key={item.id} value={item.name}>
              {item.label}
            </option>
          ))}
        </select>

        {mainTabName && (
          <select
            name="innerTab"
            id="innerTab"
            value={innerTabName}
            onChange={(e) => {
              setInnerTabName(e.target.value);
              // setSubTabName('');
              setInnerTabLabel({});
            }}
          >
            <option value="inner-tab">select inner tab</option>
            {innerTabs.map(item => (
              <option key={item.id} value={item.name}>
                {item.label}
              </option>
            ))}
          </select>
        )}

        {/* {innerTabName && (
          <select
            name="subTab"
            id="subTab"
            value={subTabName}
            onChange={(e) => {
              setSubTabName(e.target.value);
              setSubTabLabel({});
            }}
          >
            <option value="sub-tab">select sub tab</option>
            {subTabs.map(item => (
              <option key={item.id} value={item.name}>
                {item.label}
              </option>
            ))}
          </select>
        )} */}
      </div>
      <div>
        {(mainTabName && !innerTabName) && (
          <div>
            {(innerTabs).map(itn => (
              <textarea
                key={itn.id}
                name={itn.name}
                id={itn.id}
                value={innerTabLabel[itn.id] ?? itn.label}
                onChange={(e) => updateInnerTabLabel(itn.id, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        {innerTabName && (
          <div>
            {subTabs.map(itn => (
              <textarea
                key={itn.id}
                name={itn.name}
                id={itn.id}
                value={subTabLabel[itn.id] ?? itn.label}
                onChange={(e) => updateSubTabLabel(itn.id, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
