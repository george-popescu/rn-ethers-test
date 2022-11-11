import 'react-native-quick-base64';
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import 'fast-text-encoding';
import 'react-native-randombytes';
// import '@ethersproject/shims';
import * as Crypto from 'react-native-quick-crypto';

global.crypto = Crypto;

import React from 'react';
import {Provider} from 'react-native-paper';
import TestCrypto from './src/TestCrypto';

const App = () => {
  return (
    <Provider>
      <TestCrypto />
    </Provider>
  );
};

export default App;
