import type {
  Json,
  OnHomePageHandler,
  OnRpcRequestHandler,
  OnSignatureHandler,
  SignTypedDataV3Signature,
  SignTypedDataV4Signature,
} from '@metamask/snaps-sdk';
import {
  copyable,
  divider,
  heading,
  panel,
  row,
  SeverityLevel,
  text,
} from '@metamask/snaps-sdk';

// Signature Insight view
export const onSignature: OnSignatureHandler = async ({
  signature,
  signatureOrigin,
}) => {
  console.log(signature);
  switch (signature.signatureMethod) {
    case 'eth_sign':
      return null;
    case 'personal_sign':
      return null;
    case 'eth_signTypedData':
      return null;
    default:
      console.log('typedData Signature detected');
      // this is a typedData based signature now , as that's the only left option here
      console.log(signature);

      // Store this signature information in the storage unencrypted
      const data = signature.data as Object;

      const action = {
        ...data,
        timestamp: Date.now(),
        from: signature.from,
      };

      // @ts-ignore
      await addActionToStorage(action);

      return null;
  }
};

// Home Page view
// NOTE : also store the from entity in the storage to show the actions only for a certain account
// Add timestamp to the action storage as well
export const onHomePage: OnHomePageHandler = async () => {
  // Retrieve all the actions from storage
  const actions = (await getData()) as any[];

  // Parse the records
  console.log(actions);

  // Render in the home page
  // Important data
  // 1. name of the domain , chainId , maybe verifyingContract
  // 2. primaryType i.e. actionName
  // 3. Timestamp
  return {
    content: panel([
      heading('Actions History!'),
      ...actions.map(
        (action) =>
          action &&
          panel([
            divider(),
            heading(`Action : ${action.primaryType}`),
            row(action.domain.name, text(`${action.domain.chainId}`)),
            text(`Timestamp : ${action.timestamp}`),
            copyable(JSON.stringify(action.message)),
          ]),
      ),
    ]),
  };
};

type ActionType = Json;

// Utils

const addActionToStorage = async (newAction: Json) => {
  // take in the new Action Object
  // get the current state ( array of Actions )
  const actions = await getData();

  console.log('Adding new action to storage', newAction);
  // push the new Action
  actions.push(newAction);

  // store new State
  await storeData(actions);
};

const storeData = async (newActions: ActionType[]) => {
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: {
        actions: newActions,
      },
      encrypted: false,
    },
  });
};

const getData = async () => {
  const persistedData = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
      encrypted: false,
    },
  });

  return persistedData ? (persistedData.actions as ActionType[]) : [];
};
