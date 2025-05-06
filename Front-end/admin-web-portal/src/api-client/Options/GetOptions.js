import axios from "axios";
import base_url from "../BaseUrl";

export default async function getOptions(tag) {
	if (tag.queryKey[1] === "pf") {
		const faqs = await axios({
			method: "get",
			url: `${base_url}faq/get`,
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
		const policies = await axios({
			method: "get",
			url: `${base_url}policy/get`,
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
		return [faqs, policies];
	}

	if (tag.queryKey[1] === "dr") {
		const response = await axios({
			method: "get",
			url: `${base_url}response/get`,
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});

		const regulations = await axios({
			method: "get",
			url: `${base_url}regulation/get`,
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
		return [response, regulations];
	}
}
