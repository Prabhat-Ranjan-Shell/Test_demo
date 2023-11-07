import { styled } from '@mui/material/styles';

const PREFIX = 'SummaryPage';
const SummaryPageClasses = {
	root: `${PREFIX}-root`,
	IconWrapper: `${PREFIX}-IconWrapper`,
	IconButton: `${PREFIX}-IconButton`,
	selectedBarColor: `${PREFIX}-selectedBarColor`,
	headStyle: `${PREFIX}-headStyle`,
	IconStyles: `${PREFIX}-IconStyles`,
};
const SummaryPageRoot = styled('div')(({ theme }) => ({
	[`&.${SummaryPageClasses.root}`]: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.primary.main,
	},
	[`& .${SummaryPageClasses.IconButton}`]: {
		background: '#ddd',
		fontSize: '15px',
		borderRadius: 'inherit',
	},
	[`& .${SummaryPageClasses.selectedBarColor}`]: {
		display: 'flex',
		height: '30px',
		width: '30px',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		border: "2px solid #fff"
	},
	[`& .${SummaryPageClasses.IconWrapper}`]: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	[`& .${SummaryPageClasses.headStyle}`]: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	[`& .${SummaryPageClasses.IconStyles}`]: {
		display: 'flex',
		minWidth: '30px',
		justifyContent: 'center',
		height: 'auto',
		alignItems: 'center',
		marginRight: '8px',
		color: 'white',
	},
	[`& .MuiAccordionSummary-expandIconWrapper`]: {
		color: 'white'
	}
}));

export { SummaryPageRoot, SummaryPageClasses };
