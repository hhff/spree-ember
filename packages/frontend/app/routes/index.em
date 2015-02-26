`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`
`import PaginatedRouteMixin from 'ember-cli-pagination/remote/route-mixin'`

class IndexRoute extends Ember.Route with SpreeRouteSetup, PaginatedRouteMixin

  perPage: 12
  model: (params) ->
    @findPaged 'product', params

  spreeFrontend:
    sidebarPartial: "shared/taxonomies"

`export default IndexRoute`