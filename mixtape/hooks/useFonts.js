import {useFonts} from "expo-font";
 
export default function LoadFonts() {
    const [fontsLoaded] = useFonts({
        'LoveYa': require('../assets/fonts/LoveYaLikeASister-Regular.ttf'),
    });

    return fontsLoaded;
}
   

