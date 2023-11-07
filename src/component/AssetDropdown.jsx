import { useState } from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';

import ou from '../data/ou.json';
import fields from '../data/fields.json';

const selectColor = {
    backgroundColor: 'white',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    outline: 'none',
};

const dataFilter = (d) => {
    const filteredData = {};
    d.forEach(item => {
        filteredData[item.id] = item.name;
    });

    return filteredData;
}

function AssetDropdown() {
    const [opunit, setOpunit] = useState('');
    const [assetFields, setAssetFields] = useState('');
    const ouData = dataFilter(ou);
    const fieldsData = dataFilter(fields);

    return (
        <div style={{display: 'flex'}}>
            <div>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 250, marginLeft: '30px', marginBottom: '40px' }}>
                    <InputLabel id="ou-filled-label">
                        Select Operating Unit
                    </InputLabel>
                    <Select
                        labelId="ou-filled-label"
                        id="ou-select-filled-dropdown"
                        style={selectColor}
                        label="Select Operating Unit"
                        value={opunit}
                        name="Operating Unit"
                        onChange={(e) => {
                            console.log("-----1--------",e.target.value)
                            setOpunit(e.target.value)
                        }}
                    >
                        <MenuItem value="" key="first_Select_ou">
                            Select Operating Unit
                        </MenuItem>
                        {Object.keys(ouData).map(item => <MenuItem key={item} value={item}>{ouData[item]}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="filled" sx={{m: 1, minWidth: 250, marginLeft: '30px', marginBottom: '40px' }}>
                    <InputLabel id="fields-filled-label">
                        Select Asset Field
                    </InputLabel>
                    <Select
                        labelId="fields-filled-label"
                        id="fields-select-filled-dropdown"
                        style={selectColor}
                        label="Select Asset Field"
                        value={assetFields}
                        name="Fields"
                        onChange={(e) => {
                            console.log("------2--------", e.target.value)
                            setAssetFields(e.target.value)
                        }}
                        disabled={!opunit}
                    >
                        <MenuItem value="" key="first_Select_fields">
                            Select Asset Field
                        </MenuItem>
                        {Object.keys(fieldsData).map(item => <MenuItem key={item} value={item}>{fieldsData[item]}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default AssetDropdown;