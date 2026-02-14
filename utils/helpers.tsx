// import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
export const prettyDate = (iso: string) =>
    moment.parseZone(iso).local().calendar(null, {
        sameDay: "[today] h:mma",
        nextDay: "[tomorrow] h:mma",
        lastDay: "[yesterday] h:mma",
        nextWeek: "dddd h:mma",
        lastWeek: "dddd h:mma",
        sameElse: "Do MMMM h:mma" // e.g., 30th August 3:00pm
    });

export async function isUserLoggedIn(): Promise<boolean> {
    // const user = await AsyncStorage.getItem('user');

    // if (user) {
    //     return user
    // } else {
    //     return null
    // }
    return false
}