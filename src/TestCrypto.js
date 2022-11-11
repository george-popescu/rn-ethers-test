/* eslint-disable */

import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, StatusBar, Alert, useColorScheme} from 'react-native';
import {Button, Card, Divider, Text} from 'react-native-paper';
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

import {ethers} from 'ethers';

const TestCrypto = () => {
  const [ethersWallet, setEthersWallet] = useState();
  const [ethError, setEthError] = useState();
  const [encryptedWallet, setEncryptedWallet] = useState();
  const [decryptedWallet, setDecryptedWallet] = useState();
  const [ethLoading, setEthLoading] = useState(false);
  const [ethAction, setEthAction] = useState('creating');

  const createWallet = useCallback(async () => {
    setEthLoading(true);
    setEthAction('creating');
    try {

      const wallet = ethers.Wallet.fromMnemonic(
        'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
      )
      //  wallet = ethers.wallet
      setEthersWallet(wallet);
    } catch (error) {
      setEthError(error.message);
    } finally {
      setEthLoading(false);
    }
  }, []);

  const encryptWallet = useCallback(async () => {
    setEthLoading(true);
    setEthAction('encrypting');
    try {
      if (ethersWallet) {
        const encryptedWallet = await ethersWallet.encrypt('password');
        console.log('encryptedWallet', encryptedWallet);
        setEncryptedWallet(encryptedWallet);
      } else {
        console.log('error', 'no wallet');
      }
       
    } catch (error) {
      setEthError(error.message);
      console.log('error', error);
    } finally {
      setEthLoading(false);
    }
  }, [ethersWallet]);

  const decryptWallet = useCallback(async () => {
    setEthLoading(true);
    setEthAction('decrypting');
    try {
      if (encryptedWallet) {
        const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
          encryptedWallet,
          'password',
        );
        console.log('decryptedWallet', decryptedWallet);
        setDecryptedWallet(decryptedWallet);
      } else {
        console.log('error', 'no wallet');
      }
    } catch (error) {
      setEthError(error.message);
       console.log('error', 'no encrypted wallet');
    } finally {
      setEthLoading(false);
    }
  }, [encryptedWallet]);
  

  
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1, }}>
        <Card>
          <Card.Title titleVariant="headlineSmall" title="Ethers Wallet" />
          <Card.Content>
            <Text style={{ color: ethersWallet ? "lightgreen" : "black" }} variant="bodyLarge">Status: {ethersWallet ? `created ${ethersWallet.address}`  : 'N/A'}</Text>
            <Text style={{ color: encryptedWallet ? "lightgreen" : "black" }} variant="bodyLarge">Encrypted: {encryptedWallet ? 'true': 'false'}</Text>
            <Text style={{ color: decryptedWallet ? "lightgreen" : "black" }} variant="bodyLarge">Decrypted: {decryptedWallet ? 'true' : 'false'}</Text>
          </Card.Content>
          <Card.Actions>
            <Button disabled={!!ethersWallet} loading={ethLoading && ethAction == "creating"} mode="contained-tonal" onPress={() => createWallet()}>
              {ethersWallet ? "Created" : "Create"}
            </Button>
            <Button mode="contained-tonal" onPress={() => encryptWallet()}>Encrypt</Button>
            <Button loading={ethLoading && ethAction == "decrypting"} mode="contained-tonal" onPress={() => decryptWallet()}>Decrypt</Button>
            <Text>{ethLoading ? "Loading" : "Sleeping"}</Text>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default TestCrypto;
