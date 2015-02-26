`import DS from 'ember-data'`
`import ApplicationSerializer from './application'`

class OrderSerializer extends ApplicationSerializer with DS.EmbeddedRecordsMixin
  attrs:
    billAddress:
      serialize: 'records'
      deserialize: 'id'

    shipAddress:
      serialize: 'records'
      deserialize: 'id'


`export default OrderSerializer`