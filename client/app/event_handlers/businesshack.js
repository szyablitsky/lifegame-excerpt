import initDeleteButton from './businesshack/delete'
import initBusinesshackStepsNavigation from './businesshack/scroll'
import initPublishButton from './businesshack/publish'
import initPaymentButton from './businesshack/payment'
import initOrderButton from './businesshack/order'
import initWritePopup from './businesshack/write'

$(document).on('turbolinks:load', () => {
  if ($('.hack-show').length === 0) return

  initDeleteButton()
  initBusinesshackStepsNavigation()
  initPublishButton()
  initPaymentButton()
  initOrderButton()
  initWritePopup()
})
