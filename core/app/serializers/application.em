`import DS from 'ember-data'`
`import ReadOnly from '../mixins/read-only'`

class ApplicationSerializer extends DS.ActiveModelSerializer with ReadOnly

`export default ApplicationSerializer`