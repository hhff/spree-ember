import Ember from 'ember';

/**
  Include this mixin into any model that sends nested attributes to the Spree 
  server.  Currently this is only for the `order` model.

  ```js
  errors: {
    ship_address.firstname: ["can't be blank"]
    ship_address.country: ["can't be blank"]
  }
  ```

  Will look for the model named "shipAddress" related to the model, and apply
  errors to it.

  @class HandlesNestedServerErrors
  @namespace Mixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    Overrides the `DS.Model#adapterDidInvalidate` call to apply appropriate
    errors to related nested objects.

    @method adapterDidInvalidate
    @param {Object} errors A normalized error object returned from the
    serializer's `extractErrors` method.
  */
  adapterDidInvalidate: function(errors) {
    var recordErrors = Ember.get(this, 'errors');
    var nestedRecordErrors = {};

    for (var key in errors) {
      if (!errors.hasOwnProperty(key)) {
        continue;
      }
      if (key === "payments.Credit Card") {
        var creditCardErrors = this._transformCreditCardErrors(errors[key]);
        nestedRecordErrors["activePayment.source"] = creditCardErrors;
      } else if (key.indexOf(".") > -1) {
        var info = this._infoForNestedErrorKey(key);
        nestedRecordErrors[info.path] = nestedRecordErrors[info.path] || {};
        nestedRecordErrors[info.path][info.attribute] = errors[key];
      } else {
        recordErrors.add(key, errors[key]);
      }
    }
    for (var errorKey in nestedRecordErrors) {
      var nested = this.get(errorKey);
      if (nested) {
        nested.adapterDidInvalidate(nestedRecordErrors[errorKey]);
      }
    }
    this._saveWasRejected();
  },

  /**
    Massages the strange error response that Spree provides for Credit Card
    errors.

    @method _transformCreditCardErrors
    @private
  */
  _transformCreditCardErrors: function(errorArray) {
    var errors = {};

    for (var i = 0; i < errorArray.length; i++) {
      var attribute, error;
      var string = errorArray[i];
      var splat  = string.split(" ");

      if (/^Verification Value/.test(string)) {
        attribute = Ember.String.camelize((splat.shift() + " " + splat.shift()).toLowerCase());
      } else {
        attribute = splat.shift().toLowerCase();
      }
      error = [splat.join(" ")];
      errors[attribute] = error;
    }
    return errors;
  },

  /**
    Interprets error keys that contain a dot.

    @method _infoForNestedKey
    @private
  */
  _infoForNestedErrorKey: function(key) {
    var path      = "";
    var splat     = key.split('.');
    var attribute = splat.pop();

    for (var i = 0; i < splat.length; i++) {
      path += Ember.String.camelize(splat[i]);
    }

    return {
      path: path, 
      attribute: attribute
    };
  }
});
