import React from "react";
import api from "../../services/trader";
import CartContext from "./CartContext";
import UserItemsContext from "./UserItemsContext";

const RiskContext = React.createContext({});

function RiskContextProvider({ children }) {
	const [risk, setRisk] = React.useState({
		position: {},
		order: {},
		cart: {}
	});
	const [totalRisk, setTotalRisk] = React.useState({
		CE: 0,
		PE: 0
	});
	const { cartItems } = React.useContext(CartContext);
	const { orders } = React.useContext(UserItemsContext);

	React.useEffect(() => {
		setTotalRisk(getTotalRisk());
	}, [risk]);

	React.useEffect(() => {
		getCartRisk();
	}, [cartItems]);

	React.useEffect(() => {
		getOrderRisk();
	}, [orders]);

	const getCartRisk = () => {
		let total = {
			CE: 0,
			PE: 0
		};
		for (let i = 0; i < cartItems.length; i++) {
			const cItem = cartItems[i];
			total[cItem.strike.derivative.type] +=
				cItem.strike.risk_per_lot *
				(cItem.quantity / cItem.strike.derivative.instrument.lot_size);
		}
		setRiskByType("cart", total);
		return total;
	};

	const getOrderRisk = () => {
		let total = {
			CE: 0,
			PE: 0
		};
		if (orders)
			for (let i = 0; i < orders.length; i++) {
				const order = orders[i];
				total[order.derivative.type] += order.risk;
				// order.strike_measurement.risk_per_lot *
				// (order.quantity / order.derivative.instrument.lot_size);
			}
		setRiskByType("order", total);
	};

	const getTotalRisk = () => {
		let total = {
			CE: 0,
			PE: 0
		};
		for (const key in risk) {
			if (Object.hasOwnProperty.call(risk, key)) {
				const element = risk[key];
				for (const type in element) {
					if (Object.hasOwnProperty.call(element, type)) {
						total[type] += element[type];
					}
				}
			}
		}
		return total;
	};

	const setRiskByType = (type, value) => {
		setRisk(risk => {
			if (!risk) risk = {};
			risk[type] = value;
			return { ...risk };
		});
	};

	return (
		<RiskContext.Provider
			value={{
				risk,
				totalRisk,
				getTotalRisk,
				setRiskByType
			}}
		>
			{children}
		</RiskContext.Provider>
	);
}

export default RiskContext;
export { RiskContextProvider };
