mixin KeyFilter
  serialize: (record, options) ->
    json = @_super.apply(this, arguments)

    record.eachAttribute (name, meta) =>
      if meta.options.exclude
        delete json[name]

    json

`export default KeyFilter`