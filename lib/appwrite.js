import {Client, Account} from "react-native-appwrite";
import {Platform} from "react-native";

const client = new Client()
    .setEndpoint(processColor.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(processColor.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID

switch (Platform.OS) {
    case "ios":
        client.setPlatform(processColor.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID); // Use this only on dev mode with self-signed certificates
        break;
    case "android":
        client.setPlatform(processColor.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME); // Use this only on dev mode with self-signed certificates
        break;
    
}

const account = new Account(client);

export {account};