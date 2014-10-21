`import DS from 'ember-data'`
`import KeyFilter from '../mixins/key-filter'`

class ApplicationSerializer extends DS.ActiveModelSerializer with KeyFilter

`export default ApplicationSerializer`