import { createTheme } from '@mui/material/styles';

// A custom theme for this app check below url for more details
// https://mui.com/customization/default-theme/
const theme = createTheme({
	palette: {},
	typography: {
		// fontFamily: 'Open Sans, sans-serif',
	},
	overrides: {
		MuiInputLabel: {},
		MuiInput: {},
		MuiAlert: {},
	},
	custom: {
		color: {
			apple: '#73B241',
			black: '#000000',
			white: '#FFFFFF',
			pewter: '#969696',
			gainsboro: '#D9D9D9',
			blackRussian: '#1E1F21',
			mortar: '#585858',
			silver: '#B8B8B8',
		},
		border: {
			primary: '1px solid rgba(224, 224, 224, 0.5)',
			secondary: '1px solid #D9D9D9',
			tab: '4px solid #D9D9D9',
		},
		boxShadow: {
			primary: '0 2px 40px -4px rgba(0,0,0,0.15)',
		},
		linkHover: {
			color: '#CC5000',
		},
	},
});

export default theme;
