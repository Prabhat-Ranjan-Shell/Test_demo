const notNullOrUndefined = (val) => val !== null && val !== undefined && val !== '';
const getIcon = (element) => {
	if (
		(Array.isArray(element) && element.includes('red')) ||
		element === 'red'
	) {
		return 'fa-times-circle';
	}
	if (
		(Array.isArray(element) && element.includes('orange')) ||
		element === 'orange'
	) {
		return 'fa-minus-circle ';
	}
	if (
		(Array.isArray(element) && element.includes('green')) ||
		element === 'green'
	) {
		return 'fa-check-circle';
	}
	return 'fa-exclamation-circle';
};

const getBackgroundColor = (element, pathIcon) => {
	if (pathIcon === 'faIcon') {
		return getIcon(element);
	}

	return getbgColor(element);
};

const summaryTabColor = (data) => {
	const obj = {};
	data?.forEach(item => {
		obj[item.id] = (item?.tabsDetails?.technicalFeasibility?.every(itm => itm.selectedColor === 'green')) &&
			(item?.tabsDetails?.valueEconomicScreening?.every(itm => itm.selectedColor === 'green'));
	});

	data?.forEach(item => {
		const itm = { ...item };
		if (!obj[item.id] && item.workflowStatusColor === 'green') {
			itm.workflowStatusColor = 'gray';
		}
	})

	return [...data];
};

// Check empty array or object
const isArrayOrObject = (data) => {
	if ((Array.isArray(data) && data.length) || (typeof data === 'object' && Object.keys(data).length)) {
		return data;
	}

	return false;
};

const comparatorOr = (...rest) => {
	let r = false;
	rest.forEach(item => {
		r = r || item;
	})
	return r;
};

// Return summay details object which has tabDetails present
const tabDetailsObj = (wf) => wf.filter(item => notNullOrUndefined(item.tabsDetails));

export {
    getIcon,
	getBackgroundColor,
	summaryTabColor,
	isArrayOrObject,
	comparatorOr,
	tabDetailsObj
}





