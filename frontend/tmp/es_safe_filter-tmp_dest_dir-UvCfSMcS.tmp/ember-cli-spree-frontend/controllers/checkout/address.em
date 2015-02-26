class CheckoutAddressController extends Ember.Controller
  useBillingAsShipping: true
  persistOrderAddress: false

  +computed useBillingAsShipping
  showShippingForm: -> not @useBillingAsShipping

  actions:
    saveAndContinue: ->
      @model.billAddress = @billAddress
      @model.shipAddress = if @useBillingAsShipping then @billAddress else @shipAddress

      @model.save().then(
        (order) =>
          debugger
          @spree.advanceOrderState()
        (error) =>
          debugger
      )


`export default CheckoutAddressController`