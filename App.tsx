import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

interface HelloWorldProps {
  shouldRenderWorld: boolean;
}

function HelloWorld(props: HelloWorldProps) {
  return (
    <View>
      <Text>Hello</Text>
      {props.shouldRenderWorld && <Text>World</Text>}
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld shouldRenderWorld />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
