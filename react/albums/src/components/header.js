// Import a library to help createa  component
import React from 'react';
import { Text, View } from 'react-native';


// Create a component
const Header = (props) => {
	const {textStyle, viewStyle} = styles;
	
	
	return (
	<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
}


const styles = {
	viewStyle: {
		backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		color: 'white',
		fontSize: 20
	}
};

// Make the component available to other parts of the app
export default Header;