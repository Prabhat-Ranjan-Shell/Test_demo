import React from 'react';

const Tabitem = ({ value, currentTab, children }) => {
    if (parseInt(currentTab, 10) === parseInt(value, 10)) {
        return(
            <div> 
                {children}
            </div>
        );
    }
    return null;
};

export default Tabitem;