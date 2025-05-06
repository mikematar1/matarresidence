import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// API
import GetPreferences from "../../api-client/Options/GetPreferences";
import AssignPreferences from "../../api-client/Options/AssignPreferences";

const Preferences = () => {
	const [edit, setEdit] = useState(false);

	const [languages, setLanguages] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [paymentMethods, setPaymentMethods] = useState([]);

	const [changedLanguages, setChangedLanguages] = useState([]);
	const [changedCurrencies, setChangedCurrencies] = useState([]);
	const [changedPaymentMethods, setChangedPaymentMethods] = useState([]);

	const [loading, setLoading] = useState(true);

	const {
		status,
		error,
		data: preferencesData,
	} = useQuery(["preferences_data"], GetPreferences);
	useEffect(() => {
		if (preferencesData) {
			Promise.all(preferencesData).then((results) => {
				setLanguages(results[0]);
				setCurrencies(results[1]);
				setPaymentMethods(results[2]);
				setLoading(false);
			});
		}
	}, [preferencesData, status]);

	const handleCancel = () => {
		setEdit(false);
	};

	const handleLanguageChange = (e, id) => {
		const newLanguages = languages.map((language) => {
			if (language.id === id) {
				language.isavailable = e.target.checked;
				setChangedLanguages([...changedLanguages, language.id]);
			}
			return language;
		});
		setLanguages(newLanguages);
	};

	const handleCurrencyChange = (e, id) => {
		const newCurrencies = currencies.map((currency) => {
			if (currency.id === id) {
				currency.isavailable = e.target.checked;
				setChangedCurrencies([...changedCurrencies, currency.id]);
			}
			return currency;
		});
		setCurrencies(newCurrencies);
	};

	const handlePaymentMethodChange = (e, id) => {
		const newPaymentMethods = paymentMethods.map((paymentMethod) => {
			if (paymentMethod.id === id) {
				paymentMethod.isavailable = e.target.checked;
				setChangedPaymentMethods([...changedPaymentMethods, paymentMethod.id]);
			}
			return paymentMethod;
		});
		setPaymentMethods(newPaymentMethods);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		let isChanged = false;
		const reqData = {};
		if (changedLanguages.length > 0) {
			reqData.languages = changedLanguages;
			isChanged = true;
		}
		if (changedCurrencies.length > 0) {
			reqData.currencies = changedCurrencies;
			isChanged = true;
		}
		if (changedPaymentMethods.length > 0) {
			reqData.payment_methods = changedPaymentMethods;
			isChanged = true;
		}

		if (!isChanged) {
			alert("No changes made");
			return;
		}

		setLoading(true);
		const response = AssignPreferences(reqData);
		response.then((res) => {
			if (
				res[0] === "Success" &&
				res[1] === "Success" &&
				res[2] === "Success"
			) {
				setEdit(false);
				setChangedCurrencies([]);
				setChangedLanguages([]);
				setChangedPaymentMethods([]);
			} else {
				alert("Preferences not updated");
			}
			setLoading(false);
		});
	};

	if (loading) {
		return (
			<div className='container-buffer'>
				<div className='buffer-loader home'></div>
			</div>
		);
	}

	return (
		<div className='container'>
			<form className='edit-container' onSubmit={(e) => handleEdit(e)}>
				<div className='edit-item'>
					<h2>Preferences</h2>
					{!edit && (
						<button className='button' onClick={(e) => setEdit(true)}>
							Edit
						</button>
					)}
					{edit && (
						<>
							<button className='save-button' type='submit'>
								Save
							</button>
							<button
								className='button'
								type='button'
								onClick={() => handleCancel()}>
								Cancel
							</button>
						</>
					)}
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>Languages</label>
						</div>
						<div className='amm-checkbox'>
							{languages.map(
								(language) =>
									(language.isavailable || edit) && (
										<div className='checkbox-item' key={language.id}>
											{edit && language.isdeafult !== 1 && (
												<input
													type='checkbox'
													checked={language.isavailable}
													onChange={(e) => handleLanguageChange(e, language.id)}
												/>
											)}
											<label>{language.name}</label>
											{language.isdeafult === 1 && <span>Default</span>}
										</div>
									),
							)}
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>Currencies</label>
						</div>
						<div className='amm-checkbox currencies'>
							{currencies.map(
								(currency) =>
									(currency.isavailable || edit) && (
										<div className='checkbox-item' key={currency.id}>
											{edit && currency.isdefault !== 1 && (
												<input
													type='checkbox'
													checked={currency.isavailable}
													onChange={(e) => handleCurrencyChange(e, currency.id)}
												/>
											)}
											{(currency.isavailable || edit) && (
												<label>{currency.name}</label>
											)}
											{currency.isdefault === 1 && <span>Default</span>}
										</div>
									),
							)}
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>Payment</label>
						</div>
						<div className='amm-checkbox currencies'>
							{paymentMethods.map(
								(paymentMethod) =>
									(paymentMethod.isavailable || edit) && (
										<div className='checkbox-item' key={paymentMethod.id}>
											{edit && paymentMethod.isdeafult !== 1 && (
												<input
													type='checkbox'
													checked={paymentMethod.isavailable}
													onChange={(e) =>
														handlePaymentMethodChange(e, paymentMethod.id)
													}
												/>
											)}
											<label>{paymentMethod.name}</label>
											{paymentMethod.isdeafult === 1 && <span>Default</span>}
										</div>
									),
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Preferences;
