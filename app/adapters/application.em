`import DS from 'ember-data'`
`import config from '../config/environment'`

class ApplicationAdapter extends DS.ActiveModelAdapter
  namespace: 'api/ams'
  host: config.spreeApiHost

`export default ApplicationAdapter`