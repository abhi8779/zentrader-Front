import React from "react";
import api from "../../services/trader";
import UserItemsContext from "./UserItemsContext";

const CartContext = React.createContext({});

function CartContextProvider({ children }) {
	const [cartItems, setCartItems] = React.useState([]);
	const { getOrders } = React.useContext(UserItemsContext);

	const updateItemInCart = (strike, quantity) => {
		setCartItems(cartItems => {
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				if (item.strike.id == strike.id) {
					if (quantity == 0) {
						cartItems.splice(i, 1);
					} else {
						item.quantity = quantity;
					}
					return [...cartItems];
				}
			}

			if (quantity > 0) {
				cartItems.push({
					quantity: quantity,
					strike: strike
				});
			}

			return [...cartItems];
		});
	};

	const getCartCount = strike_id => {
		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			if (item.strike.id == strike_id) return item.quantity;
		}
		return 0;
	};

	const getCartIndexForStrike = strike => {
		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			if (item.strike.id == strike.id) return i;
		}
	};

	const createOrdersFromCart = async () => {
		await api.OptionSell.StrikeMeasure.createBulkOrders(getOrderPayload());
		await getOrders();
		setCartItems([]);
	};

	const getOrderPayload = () => {
		let payload = [];
		for (let i = 0; i < cartItems.length; i++) {
			const cItem = cartItems[i];
			payload.push({
				strike: cItem.strike.id,
				quantity: cItem.quantity
			});
		}
		return payload;
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				updateItemInCart,
				getCartCount,
				getCartIndexForStrike,
				createOrdersFromCart
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export default CartContext;
export { CartContextProvider };
