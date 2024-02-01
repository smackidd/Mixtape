import { StyleSheet } from 'react-native';
import theme from '../styles/theme.style.js';

const tapeColor = (id) => {
    let backgroundColor; 

    switch (id) {
      case 1: 
        backgroundColor = theme.TAPE1_BACKGROUND;
        break;
      case 2: 
        backgroundColor = theme.TAPE2_BACKGROUND;
        break;
      case 3: 
        backgroundColor = theme.TAPE3_BACKGROUND;
        break;
      default: 
        backgroundColor = theme.TAPE1_BACKGROUND;
    }
    

    return StyleSheet.create({
      container: {
        backgroundColor: backgroundColor
      }
    })
}

export default tapeColor;