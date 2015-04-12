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
        "spree-ember-core_adapters_spree",
        "spree-ember-core_mixins_storable",
        "spree-ember-core_serializers_spree",
        "spree-ember-core_services_spree",
        "spree-ember-core_stores_spree",
        "spree-ember-core_transforms_array"
    ],
    "allModules": [
        {
            "displayName": "spree-ember-core/adapters/spree",
            "name": "spree-ember-core_adapters_spree",
            "description": "The Spree Adapter is responsible for communicating with your Spree store.  It\nassumes your server has the `spree_ams` gem installed."
        },
        {
            "displayName": "spree-ember-core/mixins/storable",
            "name": "spree-ember-core_mixins_storable",
            "description": "Storable bolts onto an Ember Object and provides functionality for persisting\nkey value pairs to Local Storage."
        },
        {
            "displayName": "spree-ember-core/serializers/spree",
            "name": "spree-ember-core_serializers_spree",
            "description": "The Spree Serializer is based on the `DS.ActiveModelSerializer`, but implements\na stricter `serialize` method."
        },
        {
            "displayName": "spree-ember-core/services/spree",
            "name": "spree-ember-core_services_spree",
            "description": "The Spree service is the central place a Spree Ember developer will interact\nwith Spree, via Spree Ember.  The core object is injected into the host application's\nroutes & controllers, and is responsible for persisting data to Local Storage,\ncommunicating with your Spree backend, Acting as a Registry for other Spree Ember\npackages, and Acting as an Event Bus for your application Frontend, and providing\na seperate Store."
        },
        {
            "displayName": "spree-ember-core/stores/spree",
            "name": "spree-ember-core_stores_spree",
            "description": "The Spree Store is what connects the Spree Serializer & Adapter.  It's injected\nin the `spree` service, so that we can effectively isolate Spree Ember's data from\nthe Host Application's regular Store, Adapter & Serializer.  This is useful\nfor Rails Applications that have Spree added, but have regular endpoints that\ndon't hit the Spree endpoint."
        },
        {
            "displayName": "spree-ember-core/transforms/array",
            "name": "spree-ember-core_transforms_array",
            "description": "A simple `DS` transform for accepting raw server output and leaving as is.  Currently\nthe only use case is for accepting Spree's Order Checkout Steps as a raw array of\nstrings."
        }
    ]
} };
});