import { IStoreState } from 'store'

export const selectState = (state: IStoreState) => {
  return state.ui.pages.schedule.addTrainerDialog
}
