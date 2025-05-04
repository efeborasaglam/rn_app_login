import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import TextCustom from "../components/TextCustom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const {signout, user} = useAuth()

  return (
    <SafeAreaView>
      <TouchableOpacity 
            style={styles.button} 
            onPress={signout}
            >
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      <View style={styles.container}>
          <TextCustom fontSize={36}>Hello {user.name}</TextCustom>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,

  },
  headline:{
    paddingVertical:20
  },
  button: {
      backgroundColor: 'black',
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
      margin:20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
})
