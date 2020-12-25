import { useDispatch, useSelector } from 'store'

import { closePassForm } from 'store/ui/dialogs/check-dialog/actions'

import PassForm from 'containers/pass-form'

import getClientLabel from 'utils/get-client-label'

import { updateCacheOnCreate } from '../graphql/create-training-pass'
import useGetContactDetailsQuery from '../graphql/get-contact-details'

export default function PaymentBlock() {
  const dispatch = useDispatch()
  const passForm = useSelector(state => state.ui.dialogs.checkDialog.passForm)

  const { data } = useGetContactDetailsQuery()

  const variables = useSelector(state => ({
    _id: state.ui.dialogs.checkDialog.params.contact?.link,
  }))

  const close = () => dispatch(closePassForm())

  const boundUpdateCacheOnCreate = updateCacheOnCreate(variables)

  if (passForm.isActive) {
    return (
      <PassForm
        mode='create'
        initialForm={passForm.defaultValues || null}
        close={close}
        disabledOpenType={true}
        disabledContact={true}
        disabledCreatedAt={true}
        disabledCapacity={true}
        disabledPrice={true}
        disabledActivation={true}
        disabledDuration={true}
        initialContactFilter={getClientLabel(data?.client)}
        updateCacheOnCreate={boundUpdateCacheOnCreate}
      />
    )
  }

  return (
    null
  )
}
