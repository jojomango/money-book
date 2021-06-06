import { AnyAction } from 'redux'

import { Record } from '../../types';

type state = {
  records: Array<Record>,
}

const initState: state = {
  records: []
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    default: 
      return state;
      break;
  }
}