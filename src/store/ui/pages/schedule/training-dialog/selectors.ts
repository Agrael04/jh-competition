import { IStoreState } from 'store'
import { createSelector } from 'reselect'

export const selectState = (state: IStoreState) => {
  return state.ui.pages.schedule.trainingDialog
}

export const selectTrainingId = createSelector(
  selectState,
  (state) => state._id
)

// export const selectResourceForm = createSelector(
//   selectState,
//   (state) => state.resourceForm
// )

// export const selectResourceFormId = createSelector(
//   selectState,
//   (state) => state.resourceForm._id
// )

// export const selectIsResourceFormActive = createSelector(
//   selectResourceForm,
//   (form) => form.isActive
// )

export const selectTrainingForm = createSelector(
  selectState,
  (state) => state.trainingForm
)

export const selectRecordForm = createSelector(
  selectState,
  (state) => state.recordForm
)

export const selectRecordFormId = createSelector(
  selectRecordForm,
  (form) => form._id
)

export const selectIsRecordFormActive = createSelector(
  selectRecordForm,
  (form) => form.isActive
)
