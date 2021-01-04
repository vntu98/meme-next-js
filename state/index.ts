import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { 
  currentUser: null
};

const { useGlobalState } = createGlobalState(initialState);

export {
  useGlobalState
}