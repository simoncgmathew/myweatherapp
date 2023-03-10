import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Modal } from './components/modal-dialog';
import { OptionsList } from './components/options-list';
import { SimpleButton } from './components/simple-button';
import { images } from './theme/images';

interface HelloWorldProps {
  shouldRenderWorld: boolean;
}

function HelloWorld(props: HelloWorldProps) {
  return (
    <View style={helloWorldStyles.container}>
      <Text style={helloWorldStyles.text}>Hello</Text>
      {props.shouldRenderWorld && <Text style={helloWorldStyles.text}>World</Text>}
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld shouldRenderWorld />
      <OptionsList
        title="Settings"
        rows={[
          { title: 'Notifications', leftIcon: images.favIcon },
          { title: 'Sounds & Haptics', leftIcon: images.favIcon },
          { title: 'Focus', leftIcon: images.favIcon },
          { title: 'Screen Time', leftIcon: images.favIcon },
        ]}
      />
      <StatusBar style="auto" />
      <SimpleButton title="Do the thing!" disabled={false} />

      <Modal
        title="Custom Success"
        content={{
          type: 'custom',
          element: (
            <OptionsList
              title="Settings"
              rows={[
                { title: 'Notifications', leftIcon: images.favIcon },
                { title: 'Sounds & Haptics', leftIcon: images.favIcon },
              ]}
            />
          ),
        }}
        show
      />
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

const helloWorldStyles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
});
