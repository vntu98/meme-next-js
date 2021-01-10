import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

type TypeCurrentUser = {
  USERID: string,
  email: string,
  gender: string,
  description: string,
  fullname: string,
  status: string,
  profilepicture: string,
  permission: string
}

type TypeCategories = {
  text: string,
  id: number
}

type TypeInitState = {
  token?: string,
  currentUser: TypeCurrentUser | null,
  categories: TypeCategories[]
}

const initialState: TypeInitState = { 
  token: '',
  categories: [],
  currentUser: null
};

const { useGlobalState } = createGlobalState(initialState);

export {
  useGlobalState
}