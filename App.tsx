import { StatusBar } from 'expo-status-bar';
import { ReactElement, useCallback, useMemo, useState } from 'react';
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

interface AccumulatorProps {
  bigArray: number[];
}

function Accumulator(props: AccumulatorProps): ReactElement<AccumulatorProps> {
  const allAdded = useMemo(
    // Reduce will take an array, and turn it into a single value of the same type. In this case, it's summing all numbers in the array
    () => props.bigArray.reduce((a, b) => a + b, 0),
    // The dependency array says only recalculate when props.bigArray changes
    [props.bigArray],
  );

  return <Text>{allAdded}</Text>;
}

function Counter() {
  const [counter, setCounter] = useState(0);

  const onPress = useCallback(() => setCounter((currentValue) => currentValue + 1), [setCounter]);

  return <Text onPress={onPress}>{`Count: ${counter}`}</Text>;
}

export default function App() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <View style={styles.container}>
      <Accumulator bigArray={[...Array(100000).keys()]} />
      <Counter />
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
      <SimpleButton title="Show dialog" onPress={() => setShowDialog(true)} />
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
        show={showDialog}
        dismissButton={{ onDismiss: () => setShowDialog(false), title: 'Dismiss' }}
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
