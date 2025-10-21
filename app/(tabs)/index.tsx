import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Text>This is my home screen</Text>
        <Link style={styles.button} href="/app/(tabs)/streaks">Login Page</Link>
    </View>
  );
}

const styles = StyleSheet.create(
    {
        view: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            marginTop: 20,
            padding: 10,
            backgroundColor: "blue",
            borderRadius: 5,
        }
    }
)

