/**
  A replacement for #each that provides an index value (and other helpful values) for each iteration.
  Unless using `foo in bar` format, the item at each iteration will be accessible via the `item` variable.

  Simple Example
  --------------
  ```
  {{#eachIndexed bar in foo}}
    {{index}} - {{bar}}
  {{/#eachIndexed}}
  ```

  Helpful iteration values
  ------------------------
    * index: The current iteration index (zero indexed)
    * index_1: The current iteration index (one indexed)
    * first: True if this is the first item in the list
    * last: True if this is the last item in the list
    * even: True if it's an even iteration (0, 2, 4, 6)
    * odd: True if it's an odd iteration (1, 3, 5)
*/
Ember.Handlebars.registerHelper('eachIndexed', function eachHelper(path, options) {
  var keywordName = 'item',
      fn;

  // Process arguments (either #earchIndexed bar, or #earchIndexed foo in bar)
  if (arguments.length === 4) {
    Ember.assert('If you pass more than one argument to the eachIndexed helper, it must be in the form #eachIndexed foo in bar', arguments[1] === 'in');
    Ember.assert(arguments[0] +' is a reserved word in #eachIndexed', $.inArray(arguments[0], ['index', 'index+1', 'even', 'odd']));
    keywordName = arguments[0];

    options = arguments[3];
    path = arguments[2];
    options.hash.keyword = keywordName;
    if (path === '') { path = 'this'; }
  }

  if (arguments.length === 1) {
    options = path;
    path = 'this';
  }

  // Wrap the callback function in our own that sets the index value
  fn = options.fn;
  function eachFn(){
    var keywords = arguments[1].data.keywords,
        view = arguments[1].data.view,
        index = view.contentIndex,
        list = view._parentView.get('content') || [],
        len = list.length;

    // Set indexes
    keywords['index'] = index;
    keywords['index_1'] = index + 1;
    keywords['first'] = (index === 0);
    keywords['last'] = (index + 1 === len);
    keywords['even'] = (index % 2 === 0);
    keywords['odd'] = !keywords['even'];
    arguments[1].data.keywords = keywords;

    return fn.apply(this, arguments);
  }
  options.fn = eachFn;

  // Render
  options.hash.dataSourceBinding = path;
  if (options.data.insideGroup && !options.hash.groupedRows && !options.hash.itemViewClass) {
    new Ember.Handlebars.GroupedEach(this, path, options).render();
  } else {
    return Ember.Handlebars.helpers.collection.call(this, 'Ember.Handlebars.EachView', options);
  }
});