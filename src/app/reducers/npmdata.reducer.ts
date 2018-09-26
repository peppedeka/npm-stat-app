import { NpmData } from './../models/npmdata.model';
import * as NpmDataActions from './../actions/npmdata.action';

const initialState: NpmData = {
  data: {},
  details: [],
  url: 'http://google.com'
};

export function reducer(state: NpmData[] = [initialState], action: NpmDataActions.Actions) {

    switch (action.type) {
        case NpmDataActions.ADD_NPMDATA:
            return [...state, action.payload];
        default:
            return state;
    }
}
