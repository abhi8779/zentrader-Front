import React from "react";

const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
	const [isLoading, setLoading] = React.useState(true);

	return (
		<AppContext.Provider
			value={{
				isLoading,
				setLoading
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
export { AppContextProvider };
