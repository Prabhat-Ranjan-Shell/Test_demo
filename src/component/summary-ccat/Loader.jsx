import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({ message }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{message && <div>{message}</div>}

			<CircularProgress />
		</Box>
	);
}
