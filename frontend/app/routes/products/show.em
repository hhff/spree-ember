class ProductsShowRoute extends Ember.Route

  model: (params) ->
    @store.findBySlug('product', params.slug)

`export default ProductsShowRoute;`