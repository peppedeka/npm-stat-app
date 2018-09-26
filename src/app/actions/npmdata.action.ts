import { Action } from '@ngrx/store';
import { NpmData } from './../models/npmdata.model';

export const ADD_NPMDATA       = '[NPMDATA] Add';

export class AddNpmData implements Action {
    readonly type = ADD_NPMDATA;

    constructor(public payload: NpmData) {}
}

export type Actions = AddNpmData;
