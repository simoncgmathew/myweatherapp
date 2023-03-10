import { StatusBar } from 'expo-status-bar';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { Modal } from './components/modal-dialog';
import { OptionsList } from './components/options-list';
import { SimpleButton } from './components/simple-button';
import { colors } from './theme/colors';
import { images } from './theme/images';
import { metrics } from './theme/metrics';
import { useIsMounted } from './utils/common-hooks';

/**
 * Simulate an API call fetching a number. Return a random number after 5 seconds
 */
async function fetchRandomNumber(): Promise<number> {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(Math.trunc(Math.random() * 100));
    }, 1500),
  );
}

/**
 * This will show a number that is "fetched". You can click the random number to "fetch" another number.
 * It takes 5 seconds to fetch this number.
 */
function ShowRandomNumber() {
  const [result, setResult] = useState<number | undefined>();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (result == null) {
      fetchRandomNumber()
        .then((res) => {
          if (isMounted()) {
            setResult(res);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            setResult(undefined);
          }
          console.warn(error);
        });
    }
  }, [result, setResult, isMounted]);

  const onPress = useCallback(() => {
    setResult(undefined);
  }, [setResult]);

  if (result == null) {
    return <Text>Waiting on a number</Text>;
  }

  return <Text onPress={onPress}>{`Random number: ${result}`}</Text>;
}

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

function MyForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const textInputEmailRef = useRef<TextInput>(null);
  const textInputPhoneRef = useRef<TextInput>(null);

  // On component mount
  useEffect(() => {
    textInputEmailRef.current?.focus();
  }, []);

  const isPhoneValid = phone.length >= 1;

  return (
    <>
      <TextInput
        ref={textInputEmailRef}
        style={{
          backgroundColor: colors.lightGrey,
          color: colors.buttonWhite,
          padding: metrics.largerMargin,
          borderRadius: metrics.borderRadius,
          fontSize: metrics.h3FontSize,
          fontWeight: 'bold',
        }}
        returnKeyType={isPhoneValid ? 'done' : 'next'}
        value={email}
        placeholder="Enter email"
        onChangeText={(input) => setEmail(input)}
        onEndEditing={() => {
          // If phone number is invalid focus on the phone input field when hitting 'next'
          if (!isPhoneValid) {
            textInputPhoneRef.current?.focus();
          }
        }}
      />

      <TextInput
        ref={textInputPhoneRef}
        style={{
          backgroundColor: colors.lightGrey,
          color: colors.buttonWhite,
          padding: metrics.largerMargin,
          marginTop: metrics.baseMargin,
          borderRadius: metrics.borderRadius,
          fontSize: metrics.h3FontSize,
          fontWeight: 'bold',
        }}
        returnKeyType="done"
        value={phone}
        placeholder="Enter phone number"
        onChangeText={(input) => setPhone(input)}
        keyboardType="phone-pad"
      />
    </>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);
  const onPress = useCallback(() => setCounter((currentValue) => currentValue + 1), [setCounter]);
  useEffect(() => {
    if (counter % 2 === 0) {
      Alert.alert(`Count: ${counter}`);
    }
  }, [counter]);

  return <Text onPress={onPress}>{`Count: ${counter}`}</Text>;
}

export default function App() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <View style={styles.container}>
      <Accumulator bigArray={[...Array(100000).keys()]} />
      <Counter />
      <MyForm />
      <ShowRandomNumber />
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
