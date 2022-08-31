import React from 'react';

const Tab = ({ label, value, tabHandler, children }) => (
    <button type="button" key={`${label}${value}`} className="tablinks" onClick={() => tabHandler(value)}>
        {children}
    </button>
);

export default Tab;