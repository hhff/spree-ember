import DS from 'ember-data';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    billAddress: {
      serialize: 'records',
      deserialize: 'id'
    },
    shipAddress: {
      serialize: 'records',
      deserialize: 'id'
    },
    shipments: {
      serialize: 'records',
      deserialize: 'id'
    }
  }
});