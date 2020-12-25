import { IStoreState } from 'store'
import { createSelector } from 'reselect'

export const selectState = (state: IStoreState) => {
  return state.ui.pages.schedule.page
}

export const selectPageFilters = createSelector(
  selectState,
  state => state.filters
)