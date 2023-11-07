import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles'; // required for vite
import domtoimage from 'dom-to-image';
// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import {
	IconButton,
	Typography,
	Grid,
	Container,
	Box,
	Button,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { jsPDF as JSPdf } from "jspdf";
import autoTable from 'jspdf-autotable';
import MZ from './workflows/MZ.png';
import StackCommingle from './workflows/stack_commingle.png';
import SmartWell from './workflows/smart_well.png';
import OpenHole from './workflows/OH_horizontal.png';
import StackSelective from './workflows/stack_selective.png';
import SingleChgp from './workflows/single_CHGP.png';
import {
	getIcon,
	getBackgroundColor,
	summaryTabColor,
	isArrayOrObject,
	comparatorOr,
	tabDetailsObj,
} from './utils';
import Loader from './Loader';
import {
	SummaryPageRoot,
	SummaryPageClasses as classes,
} from './SummaryPage.styles';
import Data from './data.json';


const ImageMapper = {
	'Single CHGP': SingleChgp,
	'Stack Selective CHGP': StackSelective,
	'Open Hole Horizontal': OpenHole,
	'Smart Well': SmartWell,
	'Stack Commingle CHGP': StackCommingle,
	'Multi Zone System': MZ
}

const isApprover = false;
const approvalMessage = 'Owner';
const isOwner = true;
const owner = 'Prabhat.P.Ranjan2@shell.com';

const tabTitleStyle = {
	fontSize: '1rem',
	fontWeight: 'bold',
}

const tabTitleColor = {
	color: 'white'
}

function BoxComp({ tabId, selectedColor, tabLabel, selectedLabel }) {
	return <Box
		key={tabId}
		sx={{ display: 'flex', marginBottom: '20px' }}
	>
		<Box
			component="span"
			className={classes.IconStyles}
			sx={{ backgroundColor: selectedColor }}
		>
			<i
				className={`fa ${getIcon(selectedColor)}`}
			/>
		</Box>
		<div>
			<Typography style={{ fontWeight: 'bold' }}>
				{tabLabel}
			</Typography>
			<Typography style={{ fontSize: '13px' }}>
				{selectedLabel}
			</Typography>
		</div>
	</Box>
}

const renderButtons = (approvalMessage, ...rest) => {
	const [isApprover, openApprovalCommentBox, isOwner] = rest;
	if ((approvalMessage === 'inprogress') && isApprover) {
		return <Button
			variant="contained"
			color="warning"
			style={{ marginRight: '10px' }}
			onClick={() => openApprovalCommentBox("change")}
		>
			Suggest change
		</Button>
	}
	if ((approvalMessage === 'default') && isOwner) {
		return <Button
			disabled={approvalMessage !== 'default'}
			variant="contained"
			color="warning"
			style={{ marginRight: '10px' }}
			onClick={() => openApprovalCommentBox("confirm")}
		>
			Send for Confirmation
		</Button>
	}
	return null
}

const CustomAccordion = (props) => {
	const [expand, setExpand] = useState(false);

	const handleExpand = () => {
		setExpand(res => !res);
	}

	return <Accordion
		style={{ margin: '15px 0', borderRadius: '5px' }}
		expanded={props.expanded || expand}
		onChange={handleExpand}
	>
		{...props.children}
	</Accordion>
}

function SummaryPage() {
	const { id: projectId } = { id: 'fd889c4c-447b-410d-b3b0-2eefcf47f2bb' };
	const [expandAcc, setExpandAcc] = useState(false);
	const [reorderSeq, setReorderSeq] = useState('');

	const [summaryData, setSummaryData] = useState(null);
	const [dataErr, serError] = useState(null);
	const [closeApproveDropdown] = useState(false);
	const [pageLoad] = useState(true);

	// download content image
	const downloadContentImage = () => {

		domtoimage.toJpeg(document.getElementById('generateImagePdf'), { quality: 0.95 })
			.then(function (dataUrl) {
				const link = document.createElement('a');
				link.download = 'generateImagePdf.jpeg';
				link.href = dataUrl;
				link.click();
		});

		// htmlToImage.toJpeg(document.getElementById('generateImagePdf'), { quality: 0.95 })
		// 	.then(function (dataUrl) {
		// 		const link = document.createElement('a');
		// 		link.download = 'my-image-name.jpeg';
		// 		link.href = dataUrl;
		// 		link.click();
		// 	});

	}

	//  Approval comment box handler
	const openApprovalCommentBox = (val = '') => {
		// setOpenAppComBox(true);
	}

	// Toggle All accordian state
	const toggleAccordianState = () => {
		setExpandAcc(prev => !prev);
	}

	const summaryDataFormatting = () => {
		const d = structuredClone(Data);
		d.workflows = summaryTabColor(d?.workflows);
		return d;
	}

	const updateSummaryData = () => {
		const seq = [...new Set(reorderSeq.split(',').map(item => parseInt(item)))]; // [3,2,5,6,1,4] // [3,4]
		const d = JSON.parse(JSON.stringify(summaryData));
		const result = [];
		const wf = d?.workflows;
		const indexes = Array(wf.length).fill(0).map((_item, i) => i + 1);
		const leftIndex = indexes.filter(item => !seq.includes(item));

		if (seq.length) {
			console.log("------------", seq, leftIndex);
			for (let s of seq) {
				if (typeof s === 'number' && (s >= 0 && s <= wf.length)) {
					result.push(wf[s - 1]);
				}
			}

			for (let s of leftIndex) {
				result.push(wf[s - 1]);
			}

			setSummaryData({
				...summaryData,
				workflows: [...result]
			});
		}
	}

	const getSummaryDetails = () => {
		try {
			if (isArrayOrObject(Data)) {
				setSummaryData({ ...summaryDataFormatting() });
			}
		} catch (err) {
			serError(err);
		}
	}

	useEffect(() => {
		getSummaryDetails();
	}, []);

	// Get selected value and approve the Project
	const getSelectedValues = (val) => {
		if (val) {
			openApprovalCommentBox();
			setApproveTypo(true);
		}
	}

	const handleClickOpen = (name) => {
		// setimgVal({ imageName: name, image: ImageMapper[name] });
	};

	const addPageResetHeightCond = (idx, item, tf, ves) =>
		(idx + 1 < tabDetailsObj(summaryData?.workflows).length && item?.tabsDetails && (comparatorOr(tf?.length, ves?.length)))

	// Generating PDF using summary content  --------------------------------------
	const generatePDF = useCallback(() => {
		const pdf = new JSPdf({
			orientation: 'p',
			unit: 'pt',
			format: 'a4',
		});

		let pageWidth = 595;
		let pageHeight = 842;
		const pageMargin = 20;

		pageWidth -= pageMargin * 2;
		pageHeight -= pageMargin * 2;

		const cellMargin = 5;
		const cellWidth = 575;
		const cellHeight = 20;

		let startX = pageMargin;
		let startY = pageMargin;

		const writePdf = (content) => {
			if ((startY - pageHeight) >= pageMargin) {
				pdf.addPage();
				startY = pageMargin // Restart height position
			}

			pdf.text(content, startX, startY);
			const nextPosX = startX + cellWidth + cellMargin;

			if (nextPosX > pageWidth) {
				startX = pageMargin;
				startY += cellHeight;
			} else {
				startX = nextPosX;
			}
		}

		const splitTextandWrite = (content) => {
			const coArr = pdf.splitTextToSize(content, 500);
			coArr.forEach(ct => {
				writePdf(ct);
			});
		}

		pdf.setFont(undefined, "bold");
		pdf.setTextColor('black');
		pdf.setFontSize(16);
		writePdf("\r\n");
		pdf.text('Basic Project Info', startX, startY);
		autoTable(pdf, {
			startY: startY + 15,
			theme: "grid",
			body: [
				['Project Name', summaryData.projectName],
				['Project ID', projectId],
				['Project Owner', comparatorOr(owner, 'Admin')],
				['Time of PDF generation', `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`]
			],
			bodyStyles: { fontStyle: 'bold' },
		});

		writePdf("\r\n");
		startY = pdf.lastAutoTable.finalY + 35
		pdf.text('Color Code Details', startX, startY);
		autoTable(pdf, {
			startY: startY + 15,
			head: [['COLOR', 'DETAILS']],
			theme: "grid",
			body: [
				[{ content: 'Grey', styles: { fillColor: 'gray', textColor: 'white' } }, { content: 'Incomplete' }],
				[{ content: 'Amber', styles: { fillColor: 'orange', textColor: 'white' } }, { content: 'Warning (confirm before proceeding)' }],
				[{ content: 'Red', styles: { fillColor: 'red', textColor: 'white' } }, { content: 'Technical feasibility is void' }],
				[{ content: 'Purple', styles: { fillColor: 'purple', textColor: 'white' } }, { content: 'No economic benefit' }],
				[{ content: 'Green', styles: { fillColor: 'green', textColor: 'white' } }, { content: 'Technically Feasible' }],
			],
			bodyStyles: { fontStyle: 'bold' },
		});
		pdf.addPage();
		startY = pageMargin // Restart height position

		writePdf("\r\n");
		summaryData?.workflows?.forEach(item => {
			pdf.setFont(undefined, "bold");
			pdf.setTextColor(comparatorOr(item?.workflowStatusColor, 'gray'));
			pdf.setFontSize(16);
			splitTextandWrite(item.workflowName);

			pdf.setFont(undefined, "bold");
			pdf.setTextColor(comparatorOr(item?.technicalFeasibilityColor, 'gray'));
			pdf.setFontSize(14);
			writePdf('  Technical Feasibility');
			pdf.setTextColor(comparatorOr(item?.valueEconomicScreeningColor, 'gray'))
			writePdf('  Value Economic Screening');
			writePdf("\r\n");
		});

		const linkText = 'LC concepts summary PDF';
		pdf.setTextColor("blue");
		pdf.textWithLink(linkText, startX, startY,
			{ url: 'https://eu001-sp.shell.com/:f:/r/sites/SPO000507/Shared%20Documents/LC%20Concept%20Descriptions?csf=1&web=1&e=hBWNeB' });
		pdf.text(new Array(linkText.length + 1).join("_"), startX, startY);
		pdf.setFontSize(9);
		pdf.setTextColor("black");
		pdf.text("Note: (CTRL + clik) to open in new window", startX, startY + 20);

		pdf.addPage();
		startY = pageMargin // Restart height position

		tabDetailsObj(summaryData?.workflows).forEach((item, idx) => {
			const tf = item?.tabsDetails?.technicalFeasibility?.filter(it => it.tabLabel);
			const ves = item?.tabsDetails?.valueEconomicScreening?.filter(it => it.tabLabel);

			if (comparatorOr(tf?.length, ves?.length)) {
				pdf.setFont(undefined, "bold");
				pdf.setTextColor(comparatorOr(item?.workflowStatusColor, 'gray'));
				pdf.setFontSize(16);
				writePdf("\r\n");
				splitTextandWrite(item.workflowName);
				writePdf("______________________________________________________________________________")
				writePdf("\r\n");
			}

			if (tf?.length) {
				pdf.setFont(undefined, "bold");
				pdf.setTextColor('black');
				pdf.setFontSize(14);
				splitTextandWrite('Technical Feasibility');

				tf.forEach((itm) => {
					pdf.setFont(undefined, "bold");
					pdf.setFontSize(12);
					pdf.setTextColor(itm.selectedColor);
					splitTextandWrite(itm.tabLabel);
					pdf.setFont(undefined, "normal");
					pdf.setFontSize(12);
					pdf.setTextColor('black');
					splitTextandWrite(comparatorOr(itm.selectedLabel, ""));
				})
			}

			writePdf("\r\n");
			if (ves?.length) {
				pdf.setFont(undefined, "bold");
				pdf.setTextColor('black');
				pdf.setFontSize(14);
				splitTextandWrite('Value Economic Screening');

				ves.forEach((itm) => {
					pdf.setFont(undefined, "bold");
					pdf.setFontSize(12);
					pdf.setTextColor(itm.selectedColor);
					splitTextandWrite(itm.tabLabel);
					pdf.setFont(undefined, "normal");
					pdf.setFontSize(12);
					pdf.setTextColor('black');
					splitTextandWrite(comparatorOr(itm.selectedLabel, ""));
				})
			}

			if (addPageResetHeightCond(idx, item, tf, ves)) {
				pdf.addPage();
				startY = pageMargin // Restart height position
			}
		})
		pdf.save(`Summary_${projectId}.pdf`);
		const dataSrc = pdf.output("datauristring");
		const embed = `<embed width='100%' height='100%' src='${dataSrc}'/>`
		const xp = window.open(URL.createObjectURL(pdf.output("blob")));
		xp.document.open();
		xp.document.write(embed);
		xp.document.close();
	});

	if (!summaryData) {
		return <Loader message="Loading Data" />;
	}

	if (dataErr) {
		return <h1>There is some error in server. Please refresh the page</h1>;
	}

	return (
		pageLoad ?
			<SummaryPageRoot>
				<Container maxWidth="xxl" style={{ padding: '30px' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<p>Summary Page</p>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							{renderButtons(approvalMessage, isApprover, openApprovalCommentBox, summaryData, getSelectedValues, closeApproveDropdown, isOwner)}
							<Button variant="contained" onClick={generatePDF} sx={{ marginLeft: '5px' }}>
								<i className="fa fa-download" aria-hidden="true" style={{ marginRight: '10px' }} />
								Summary
							</Button>
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
						<Button variant="contained" onClick={toggleAccordianState}>{expandAcc ? 'Collapse All' : 'Expand All'}</Button>
						<TextField id="reorder-summary" label="Reorder sequence" variant="standard" sx={{ width: '400px' }} onChange={(e) => setReorderSeq(e.target.value || '')} />
						<Button variant="contained" onClick={updateSummaryData}>Reorder Summary</Button>
						<Button variant="contained" onClick={downloadContentImage}>Download summary image</Button>
					</div>
					<div id="generateImagePdf" style={{ marginTop: '75px', paddingBottom: '20px' }}>
						<div style={{ display: 'flex', overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'space-between' }}>
							{summaryData?.workflows.map((element) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={3}
									key={`${element.id}workflows`}
									style={{ minHeight: '300px', maxWidth: '380px', padding: '0 20px' }}
									id="summary-grid"
								>
									<div className={classes.IconWrapper}>
										<Box
											component="span"
											className={classes.selectedBarColor}
											sx={{
												background: element.workflowStatusColor || 'gray',
											}}
										>
											<i
												className={`fa ${getBackgroundColor(
													element.workflowStatusColor,
													'faIcon'
												)}`}
											/>
										</Box>
										<Typography
											sx={{ fontWeight: 'bold', textAlign: 'center' }}
										>
											{element.workflowName}
										</Typography>
										<IconButton
											style={{ padding: '6px' }}
											className={classes.IconButton}
											onClick={() => handleClickOpen(element.workflowName)}
										>
											<i style={{ cursor: 'pointer', color: 'black' }} className="fa fa-picture-o" />
										</IconButton>
									</div>
									{element?.tabsDetails?.technicalFeasibility ? (
										<CustomAccordion expanded={expandAcc}>
											<AccordionSummary
												style={{
													backgroundColor: element.technicalFeasibilityColor
												}}
												expandIcon={<ExpandMoreIcon />}
											>
												<Typography style={{ ...tabTitleStyle, ...tabTitleColor }} className="tabone_title">Technical Feasibility</Typography>
											</AccordionSummary>
											<AccordionDetails>
												{element?.tabsDetails?.technicalFeasibility?.map(
													(ele) => (
														BoxComp(ele)
													)
												)}
											</AccordionDetails>
										</CustomAccordion>
									) : (
										<>
											<h2 style={{ fontSize: '18px', color: '#66b58e' }}>
												Technical Feasibility
											</h2>
											<Typography style={{ fontWeight: 'bold' }}>
												No Data Available
											</Typography>
										</>
									)}
									{element?.tabsDetails?.valueEconomicScreening ? (
										<CustomAccordion expanded={expandAcc}>
											<AccordionSummary
												style={{
													backgroundColor: element.valueEconomicScreeningColor
												}}
												expandIcon={<ExpandMoreIcon />}
											>
												<Typography style={{ ...tabTitleStyle, ...tabTitleColor }} className="tabone_title">Value Economic Screening</Typography>
											</AccordionSummary>
											<AccordionDetails>
												{element?.tabsDetails?.valueEconomicScreening?.map(
													(ele) => (
														BoxComp(ele)
													)
												)}
											</AccordionDetails>
										</CustomAccordion>
									) : (
										<>
											<h2 style={{ fontSize: '18px', color: '#66b58e' }}>
												Value Economic Screening
											</h2>
											<Typography style={{ fontWeight: 'bold' }}>
												No Data Available
											</Typography>
										</>
									)}
								</Grid>
							))}
						</div>
					</div>
				</Container>
			</SummaryPageRoot> : <Loader />
	);
}

export default SummaryPage;
