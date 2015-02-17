`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`

class ProductsShowRoute extends Ember.Route with SpreeRouteSetup

  model: (params) ->
    @store.findBySlug('product', params.slug)

`export default ProductsShowRoute;`