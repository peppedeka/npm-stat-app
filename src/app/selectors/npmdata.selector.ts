import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectItems = (state: AppState) => state.npmData;

export const getItemByUrl = (url) => createSelector(selectItems, (allItems) => {
  if (allItems) {
    return allItems.find(item => {
      return item.url === url;
    });
  } else {
    return {};
  }
});
