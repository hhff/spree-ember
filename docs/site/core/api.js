YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "SpreeEmber.Adapter",
        "SpreeEmber.RawTransform",
        "SpreeEmber.Serializer",
        "SpreeEmber.Spree",
        "SpreeEmber.Storable",
        "SpreeEmber.Store"
    ],
    "modules": [
        "ember-cli-spree-core_adapters_spree",
        "ember-cli-spree-core_mixins_storable",
        "ember-cli-spree-core_serializers_spree",
        "ember-cli-spree-core_services_spree",
        "ember-cli-spree-core_stores_spree",
        "ember-cli-spree-core_transforms_array"
    ],
    "allModules": [
        {
            "displayName": "ember-cli-spree-core/adapters/spree",
            "name": "ember-cli-spree-core_adapters_spree",
            "description": "The Spree Adapter is responsible for communicating with your Spree store.  It\nassumes your server has the `spree_ams` gem installed."
        },
        {
            "displayName": "ember-cli-spree-core/mixins/storable",
            "name": "ember-cli-spree-core_mixins_storable",
            "description": "Storable bolts onto an Ember Object and provides functionality for persisting\nkey value pairs to Local Storage."
        },
        {
            "displayName": "ember-cli-spree-core/serializers/spree",
            "name": "ember-cli-spree-core_serializers_spree",
            "description": "The Spree Serializer is based on the `DS.ActiveModelSerializer`, but implements\na stricter `serialize` method."
        },
        {
            "displayName": "ember-cli-spree-core/services/spree",
            "name": "ember-cli-spree-core_services_spree",
            "description": "The Spree service is the central place a Spree Ember developer will interact\nwith Spree, via Spree Ember.  The core object is injected into the host application's\nroutes & controllers, and is responsible for persisting data to Local Storage,\ncommunicating with your Spree backend, Acting as a Registry for other Spree Ember\npackages, and Acting as an Event Bus for your application Frontend, and providing\na seperate Store."
        },
        {
            "displayName": "ember-cli-spree-core/stores/spree",
            "name": "ember-cli-spree-core_stores_spree",
            "description": "The Spree Store is what connects the Spree Serializer & Adapter.  It's injected\nin the `spree` service, so that we can effectively isolate Spree Ember's data from\nthe Host Application's regular Store, Adapter & Serializer.  This is useful\nfor Rails Applications that have Spree added, but have regular endpoints that\ndon't hit the Spree endpoint."
        },
        {
            "displayName": "ember-cli-spree-core/transforms/array",
            "name": "ember-cli-spree-core_transforms_array",
            "description": "A simple `DS` transform for accepting raw server output and leaving as is.  Currently\nthe only use case is for accepting Spree's Order Checkout Steps as a raw array of\nstrings."
        }
    ]
} };
});