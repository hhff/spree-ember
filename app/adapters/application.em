`import DS from 'ember-data'`
`import config from '../config/environment'`


if config.environment is 'test'
  class ApplicationAdapter extends DS.ActiveModelAdapter
    namespace: 'api/ams'

else
  # TODO This is because Pretender can't request full URLS.  Will
  # fix this when mock server is available in test
  class ApplicationAdapter extends DS.ActiveModelAdapter
    namespace: 'api/ams'
    host: config.spreeApiHost

`export default ApplicationAdapter`