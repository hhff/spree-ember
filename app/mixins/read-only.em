mixin ReadOnly
  serialize: (record, options) ->

    json = @_super.apply(this, arguments)

    record.eachAttribute (name, meta) =>
      if meta.options.readOnly
        delete json[name]

    json

`export default ReadOnly`