const checkEqual = (reqData, data) => {
	for (let prop in reqData) {
		if (reqData[prop] === data[prop]) {
			delete reqData[prop];
		} else {
			if (reqData.password === "") delete reqData.password;
		}
	}
	if (Object.keys(reqData).length > 0) {
		return reqData;
	} else {
		return false;
	}
};
export default checkEqual;
