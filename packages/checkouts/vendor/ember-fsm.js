!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.Ember||(f.Ember={})).FSM=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var ownPropertiesOf = _dereq_("./utils").ownPropertiesOf;
var toArray = _dereq_("./utils").toArray;
var $ = window.Ember.$;

exports["default"] = Definition;

var ALL_MACRO      = '$all';
var SAME_MACRO     = '$same';
var INITIAL_MACRO  = '$initial';
var INITIALIZED    = 'initialized';
var TRANSITIONS    = ['transition', 'transitions'];
var INITIAL_STATES = ['initialState'];
var KNOWN_STATES   = ['explicitStates', 'knownStates'];
var BEFORES        = ['before', 'beforeEvent'];
var AFTERS         = ['after', 'afterEvent'];
var WILL_ENTERS    = ['willEnter'];
var DID_ENTERS     = ['didEnter', 'enter', 'action'];
var WILL_EXITS     = ['willExit'];
var DID_EXITS      = ['didExit', 'exit'];
var DO_IFS         = ['doIf', 'guard'];
var DO_UNLESSES    = ['doUnless', 'unless'];
var FROMS          = ['from', 'fromState', 'fromStates'];
var TOS            = ['to', 'toState'];

// normalized name, definition names, toArray
var DEFMAP = {
  transition: [
    ['fromStates',  FROMS,       true],
    ['toState',     TOS,         false],
    ['beforeEvent', BEFORES,     true],
    ['afterEvent',  AFTERS,      true],
    ['willEnter',   WILL_ENTERS, true],
    ['didEnter',    DID_ENTERS,  true],
    ['willExit',    WILL_EXITS,  true],
    ['didExit',     DID_EXITS,   true],
    ['doIf',        DO_IFS,      false],
    ['doUnless',    DO_UNLESSES, false]
  ],

  event: [
    ['beforeEvent', BEFORES,     true],
    ['afterEvent',  AFTERS,      true],
    ['transitions', TRANSITIONS, true]
  ],

  states: [
    ['initialState', INITIAL_STATES, false],
    ['knownStates',  KNOWN_STATES,   true]
  ],

  state: [
    ['willEnter', WILL_ENTERS, true],
    ['didEnter',  DID_ENTERS,  true],
    ['willExit',  WILL_EXITS,  true],
    ['didExit',   DID_EXITS,   true]
  ]
};

function Definition(payload) {
  if (!(this instanceof Definition)) {
    throw new TypeError('please use the "new" operator to construct a ' +
    'Definition instance');
  }

  if (typeof payload !== 'object') {
    throw new TypeError('you must pass an object containing and "events" ' +
    'property as the sole argument to the Compiler constructor');
  }

  if (!payload.events) {
    throw new TypeError('"events" must be defined');
  }

  if (typeof payload.events !== 'object') {
    throw new TypeError('"events" must be an object');
  }

  if (payload.states && typeof payload.states !== 'object') {
    throw new TypeError('"states" must be an object');
  }

  this._payload = $.extend(true, {}, payload);
  this._statesDef = destructDefinition(this._payload.states || {}, 'states');
  this._stateByName = {};
  this._statesByPrefix = {};
  this._eventByName = {};
  this._transitionsByEvent = {};
  this._transitionsByEventFromState = {};

  this.isExplicit      = false;
  this.initialState    = this._statesDef.initialState || INITIALIZED;
  this.states          = [];
  this.stateNames      = [];
  this.stateNamespaces = [];
  this.events          = [];
  this.eventNames      = [];
  this.transitions     = [];

  this._compile();
}

// Extracts definition keys and leaves behind "data", for example consider the
// "states" node below:
//
// payload = {
//   states: {
//     initialState: 'ready',
//     knownStates: 'ready',
//
//     ready: {
//       willEnter: 'notifySomeone'
//     }
//   }
// };
//
// definition = destructDefinition(payload.states, 'states');
// definition => { initialState: 'ready', knownStates: ['ready'] }
// payload    => { ready: { willEnter: 'notifySomeone' } }
function destructDefinition(payload, type) {
  var map = DEFMAP[type];
  var def = {};
  var property;
  var aliases;
  var makeArray;
  var value;
  var i, j;

  if (!payload) {
    throw new TypeError('Expected payload object');
  }

  if (!map) {
    throw new TypeError('type is unknown: ' + type);
  }

  for (i = 0; i < map.length; i++) {
    property  = map[i][0];
    aliases   = map[i][1];
    makeArray = map[i][2];

    for (j = 0; j < aliases.length; j++) {
      value = payload[aliases[j]];

      if (value !== undefined) {
        delete payload[aliases[j]];
        break;
      }
    }

    if (makeArray) {
      value = toArray(value);
    }

    def[property] = value;
  }

  return def;
}

function allocState(name, payload) {
  var state = {
    name: name,
    willEnter: [],
    didEnter: [],
    willExit: [],
    didExit: [],
    exitTransitions: [],
    enterTransitions: []
  };

  updateState(state, payload);

  return state;
}

function updateState(state, payload) {
  var definition;
  var property;

  if (!payload) {
    return state;
  }

  definition = destructDefinition(payload, 'state');

  for (property in definition) {
    state[property] = definition[property];
  }

  return state;
}

function allocEvent(name, payload) {
  var definition = destructDefinition(payload, 'event');
  var woundTransitions = definition.transitions;
  var i;
  var event;

  event = {
    name: name,
    beforeEvent: definition.beforeEvent,
    afterEvent: definition.afterEvent,
    _woundTransitions: []
  };

  for (i = 0; i < woundTransitions.length; i++) {
    event._woundTransitions.push(
      allocWoundTransition(event, woundTransitions[i])
    );
  }

  return event;
}

function allocWoundTransition(event, payload) {
  var def  = destructDefinition(payload, 'transition');
  var data = ownPropertiesOf(payload);
  var fromToSpecifiedByName;
  var fromToSpecifiedByKVP;

  fromToSpecifiedByName = def.fromStates.length > 0 && def.toState;
  fromToSpecifiedByKVP  = data.length ? true : false;

  if (fromToSpecifiedByName && fromToSpecifiedByKVP) {
    throw new Error('You must specify transition states using either form: ' +
    '"state", to: "state" or fromState: "toState" not both');
  }

  if (!fromToSpecifiedByName && !fromToSpecifiedByKVP) {
    throw new Error('You must specify states to transition from and to in ' +
    'event transitions.');
  }

  if (fromToSpecifiedByKVP && data.length > 1) {
    throw new Error('only one { fromState: "toState" } pair can be ' +
    'specified per transition: specify multiple event transitions as an ' +
    'array of objects with one { fromState: \'toState\' } per object.');
  }

  if (fromToSpecifiedByKVP) {
    def.fromStates = [data[0]];
    def.toState    = payload[data[0]];
  }

  def.isGuarded = (def.doIf || def.doUnless) ? true : false;

  return def;
}

Definition.prototype = {
  lookupState: function(name) {
    var found;

    if (name === INITIAL_MACRO) {
      name = this.initialState;
    }

    if ((found = this._stateByName[name])) {
      return found;
    }

    throw new Error('the state "' + name + '" is not defined, the defined ' +
    'states are: ' + this.stateNames.join(', '));
  },

  // Returns all states matching the given prefix
  lookupStates: function(prefix) {
    var found = [];
    var state = this._stateByName[prefix];
    var substates = this._statesByPrefix[prefix];
    var i;

    if (state) {
      found.push(state);
    }

    if (substates) {
      for (i = 0; i < substates.length; i++) {
        found.push(substates[i]);
      }
    }

    if (!found.length) {
      throw new Error('there are no states or substates defined matching ' +
      'the prefix: "' + prefix + '"');
    }

    return found;
  },

  lookupEvent: function(name) {
    return this._eventByName[name];
  },

  transitionsFor: function(event, fromState) {
    var _this = this;

    if (fromState === INITIAL_MACRO) {
      fromState = this.initialState;
    }

    function fetch(name, key) {
      var found;

      if ((found = _this[name][key])) {
        return found;
      } else {
        _this[name][key] = [];
        return _this[name][key];
      }
    }

    if (event && fromState) {
      return fetch('_transitionsByEventFromState', event + ':' + fromState);
    } else if (event) {
      return fetch('_transitionsByEvent', event);
    }

    return [];
  },

  _compileStatesDefinition: function() {
    this._allocateExplicitStates();
    this._applyStateDefinitions();
  },

  _allocateExplicitStates: function() {
    var states = this._statesDef.knownStates;
    var i;

    if (!states.length) {
      return;
    }

    this.isExplicit = true;

    if (!this._statesDef.initialState && !states.contains(this.initialState)) {
      throw new Error('an explicit list of known states was defined but it ' +
      'does not contain the default initial state "' + this.initialState +
      '", either change initialState or include "' + this.initialState + '" ' +
      'in the list of known states');
    }

    this._allocateState(this.initialState);

    for (i = 0; i < states.length; i++) {
      this._allocateState(states[i]);
    }
  },

  _applyStateDefinitions: function() {
    var payload = this._payload.states;
    var key;
    var stateName;

    for (key in payload) {
      if (key === INITIAL_MACRO) {
        stateName = this.initialState;
      } else {
        stateName = key;
      }

      this._updateState(stateName, payload[key]);
    }
  },

  _allocateState: function(name, payload) {
    var state;
    var parts;
    var subparts;
    var prefix;
    var i;

    if (state = this._stateByName[name]) {
      return state;
    }

    state = allocState(name, payload);
    parts = name.split('.');

    this.states.push(state);
    this._stateByName[name] = state;
    this.stateNames.push(name);

    if (parts.length > 1) {
      subparts = parts.slice(0, -1);

      for (i = 0; i < subparts.length; i++) {
        prefix = subparts.slice(0, i + 1).join('.');

        if (!this._statesByPrefix[prefix]) {
          this._statesByPrefix[prefix] = [];
        }

        if (this.stateNamespaces.indexOf(prefix) === -1) {
          this.stateNamespaces.push(prefix);
        }

        this._statesByPrefix[prefix].push(state);
      }
    }

    return state;
  },

  _updateState: function(name, payload) {
    var found;

    if ((found = this._stateByName[name])) {
      return updateState(found, payload);
    }

    if (this.isExplicit) {
      throw new Error('' + name + ' is not a defined state, add it to the ' +
      'list of known states');
    }

    return this._allocateState(name, payload);
  },

  _compileEventDefinitions: function() {
    var payload = this._payload.events;
    var eventName;

    for (eventName in payload) {
      this._compileEventDefinition(eventName, payload[eventName]);
    }

    if (!this.events.length) {
      throw new Error('no events specified, at least one event must be ' +
      'specified to compile the state machine, COMMON!');
    }
  },

  _compileEventDefinition: function(name, payload) {
    var event = this._allocateEvent(name, payload);
    this.events.push(event);
    this.eventNames.push(name);
    this._eventByName[name] = event;
  },

  _allocateEvent: function(name, payload) {
    return allocEvent(name, payload);
  },

  _extractStatesFromTransitions: function() {
    var set = {};
    var implicitStates;
    var explicitState;
    var woundTransitions;
    var woundTransition;
    var fromState;
    var i, j, k;

    function addState(stateName) {
      set[stateName] = stateName;
    }

    for (i = 0; i < this.events.length; i++) {
      woundTransitions = this.events[i]._woundTransitions;

      for (j = 0; j < woundTransitions.length; j++) {
        woundTransition = woundTransitions[j];

        if (woundTransition.toState === SAME_MACRO) {
          continue;
        }

        if (woundTransition.toState === INITIAL_MACRO) {
          woundTransition.toState = this.initialState;
        }

        this._updateState(woundTransition.toState);
        addState(woundTransition.toState);

        for (k = 0; k < woundTransition.fromStates.length; k++) {
          fromState = woundTransition.fromStates[k];

          if (fromState === ALL_MACRO) {
            continue;
          }

          if (fromState === INITIAL_MACRO) {
            fromState = this.initialState;
            woundTransition.fromStates[k] = fromState;
          }

          this._updateState(fromState);
          addState(fromState);
        }
      }
    }

    implicitStates = ownPropertiesOf(set);

    if (!implicitStates.contains(this.initialState)) {
      throw new Error('initial state "' + this.initialState + '" is not ' +
      'specified in any transitions');
    }

    if (!this.isExplicit) {
      return;
    }

    for (i = 0; i < this.stateNames.length; i++) {
      explicitState = this.stateNames[i];

      if (!implicitStates.contains(explicitState)) {
        throw new Error('' + explicitState + ' state is not used in any ' +
        'transitions; it is explicitly defined to be used');
      }
    }
  },

  _unwindTransitions: function() {
    var woundTransitions;
    var woundTransition;
    var fromStates;
    var event;
    var eventName;
    var unwoundTransition;
    var fromState;
    var unguardedStatesSet;
    var toState;
    var key;
    var i, j, k;

    function incrUngardedState(name) {
      if (unguardedStatesSet[name] === undefined) {
        unguardedStatesSet[name] = 1;
      } else {
        unguardedStatesSet[name] += 1;
      }
    }

    for (i = 0; i < this.events.length; i++) {
      event              = this.events[i];
      eventName          = event.name;
      woundTransitions   = event._woundTransitions;
      unguardedStatesSet = {};

      for (j = 0; j < woundTransitions.length; j++) {
        woundTransition   = woundTransitions[j];
        fromStates        = woundTransition.fromStates;

        if (fromStates.contains(ALL_MACRO) || fromStates.contains(SAME_MACRO)) {
          fromStates = this.stateNames;
        }

        for (k = 0; k < fromStates.length; k++) {
          fromState = this._stateByName[fromStates[k]];
          unwoundTransition = {};

          if (!woundTransition.isGuarded) {
            incrUngardedState(fromState.name);
          }

          if (!woundTransition.isGuarded && unguardedStatesSet[fromState.name] > 1) {
            throw new Error('you specified to transition from the "' +
            fromState.name + '" state in more than one transition for the "' +
            eventName + '" event');
          }

          if (woundTransition.toState === SAME_MACRO) {
            toState = fromState;
          } else {
            toState = this._stateByName[woundTransition.toState];
          }

          for (key in woundTransition) {
            if (key === 'fromStates') {
              continue;
            }

            unwoundTransition[key] = woundTransition[key];
          }

          unwoundTransition.event     = eventName;
          unwoundTransition.fromState = fromState.name;
          unwoundTransition.toState   = toState.name;

          this.transitions.push(unwoundTransition);
          fromState.exitTransitions.push(unwoundTransition);
          toState.enterTransitions.push(unwoundTransition);
          this.transitionsFor(eventName).push(unwoundTransition);
          this.transitionsFor(eventName, fromState.name).push(unwoundTransition);
        }
      }

      delete event._woundTransitions;
    }
  },

  _compile: function() {
    this._compileStatesDefinition();
    this._compileEventDefinitions();
    this._extractStatesFromTransitions();
    this._unwindTransitions();
  }
};
},{"./utils":7}],2:[function(_dereq_,module,exports){
"use strict";
/*!
ember-fsm
(c) 2014 Carsten Nielsen
License: https://github.com/heycarsten/ember-fsm/blob/master/LICENSE
*/

var Definition = _dereq_("./definition")["default"] || _dereq_("./definition");
var Machine = _dereq_("./machine")["default"] || _dereq_("./machine");
var Transition = _dereq_("./transition")["default"] || _dereq_("./transition");
var Stateful = _dereq_("./stateful")["default"] || _dereq_("./stateful");
var reject = _dereq_("./reject").reject;
var utils = _dereq_("./utils")["default"] || _dereq_("./utils");

exports.Definition = Definition;
exports.Machine = Machine;
exports.Transition = Transition;
exports.Stateful = Stateful;
exports.reject = reject;
exports.utils = utils;
},{"./definition":1,"./machine":3,"./reject":4,"./stateful":5,"./transition":6,"./utils":7}],3:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var computed = window.Ember.computed;
var typeOf = window.Ember.typeOf;
var inspect = window.Ember.inspect;
var on = window.Ember.on;
var capitalCamelize = _dereq_("./utils").capitalCamelize;
var Transition = _dereq_("./transition")["default"] || _dereq_("./transition");
var Definition = _dereq_("./definition")["default"] || _dereq_("./definition");

exports["default"] = Ember.Object.extend({
  isTransitioning:   false,
  events:            null,
  states:            null,
  activeTransitions: null,
  currentState:      null,
  initialState:      null,

  init: function() {
    var target = this.get('target');
    var events = this.get('events');
    var states = this.get('states');

    if (!target) {
      this.set('target', this);
    }

    if (events && !events.error) {
      events.error = { transition: { $all: 'failed' } };
    }

    this.set('activeTransitions', []);

    this.definition = new Definition({
      states: states,
      events: events
    });

    this.set('stateNames',   this.definition.stateNames);
    this.set('eventNames',   this.definition.eventNames);
    this.set('currentState', this.get('initialState') || this.definition.initialState);
  },

  send: function(event) {
    var args = [].slice.call(arguments, 1, arguments.length);
    var fsm = this;
    var transition;
    var promise;
    var sameState;

    if (!this.get('eventNames').contains(event)) {
      throw new Ember.Error(
        'unknown state event "' + event + '" try one of [' +
        this.get('eventNames').join(', ') + ']'
      );
    }

    transition = this.transitionFor(event, args);
    sameState  = transition.toState === this.get('currentState');

    if (this.get('isTransitioning') && !sameState) {
      throw new Ember.Error(
        'unable to transition out of "' + this.get('currentState') + '" ' +
        'state to "' + transition.toState + '" state while transitions are ' +
        'active: ' + inspect(this.get('activeTransitions'))
      );
    }

    promise = transition.perform();

    promise.catch(function(error) {
      fsm.abortActiveTransitions();
      fsm.send('error', {
        error: error,
        transition: transition
      });
    });

    return promise;
  },

  abortActiveTransition: function(transition) {
    if (this.hasActiveTransition(transition)) {
      transition.abort();
      this.removeActiveTransition(transition);
    }
  },

  hasActiveTransition: function(transition) {
    return this.get('activeTransitions').contains(transition);
  },

  abortActiveTransitions: function() {
    var activeTransitions = this.get('activeTransitions');

    while (activeTransitions.length) {
      activeTransitions.popObject().abort();
    }

    this.set('isTransitioning', false);
  },

  pushActiveTransition: function(transition) {
    var activeTransitions = this.get('activeTransitions');

    activeTransitions.pushObject(transition);

    if (activeTransitions.get('length')) {
      this.set('isTransitioning', true);
    }
  },

  removeActiveTransition: function(transition) {
    var activeTransitions = this.get('activeTransitions');

    activeTransitions.removeObject(transition);

    if (!activeTransitions.get('length')) {
      this.set('isTransitioning', false);
    }
  },

  checkGuard: function(guardProperty, isInverse) {
    var target     = this.get('target');
    var guardValue = target.get(guardProperty);
    var result;

    if (guardValue === undefined) {
      throw new Error('expected guard "' + guardProperty + '" on target "' +
      target + '" to be defined');
    } else if (typeOf(guardValue) === 'function') {
      result = guardValue.call(this) ? true : false;
    } else {
      result = guardValue ? true : false;
    }

    return isInverse ? !result : result;
  },

  outcomeOfPotentialTransitions: function(potentials) {
    var target = this.get('target');
    var potential;
    var outcomeParams;
    var i;

    if (!potentials.length) {
      return null;
    }

    for (i = 0; i < potentials.length; i++) {
      potential = potentials[i];

      if (!potential.isGuarded) {
        outcomeParams = potential;
        break;
      }

      if (potential.doIf && this.checkGuard(potential.doIf)) {
        outcomeParams = potential;
        break;
      }

      if (potential.doUnless && this.checkGuard(potential.doUnless, true)) {
        outcomeParams = potential;
        break;
      }
    }

    if (!outcomeParams) {
      return null;
    }

    outcomeParams.machine = this;
    outcomeParams.target  = target;

    return outcomeParams;
  },

  transitionFor: function(event, args) {
    var currentState = this.get('currentState');
    var potentials   = this.definition.transitionsFor(event, currentState);
    var transitionParams;

    if (!potentials.length) {
      throw new Ember.Error('no transition is defined for event "' + event +
      '" in state "' + currentState + '"');
    }

    transitionParams = this.outcomeOfPotentialTransitions(potentials);

    if (!transitionParams) {
      throw new Ember.Error('no unguarded transition was resolved for event "' +
      event + '" in state "' + currentState + '"');
    }

    transitionParams.eventArgs = args;

    return Transition.create(transitionParams);
  },

  inState: function(stateOrPrefix) {
    var currentState = this.definition.lookupState(this.get('currentState'));
    var states       = this.definition.lookupStates(stateOrPrefix);

    return states.contains(currentState);
  },

  canEnterState: function(state) {
    var currentState = this.definition.lookupState(this.get('currentState'));
    var potentials;

    potentials = currentState.exitTransitions.filter(function(t) {
      return t.toState === state;
    });

    return this.outcomeOfPotentialTransitions(potentials) ? true : false;
  },

  _setNewState_: function(transition) {
    this.set('currentState', transition.get('toState'));
  },

  _activateTransition_: function(transition) {
    this.pushActiveTransition(transition);
  },

  _deactivateTransition_: function(transition) {
    this.removeActiveTransition(transition);
  },

  _setupIsStateAccessors: on('init', function() {
    var mixin = {};
    var prefixes = this.definition.stateNamespaces.slice(0);
    var properties = [];
    var prefix;
    var i;

    function addAccessor(prefix) {
      var property = ('isIn' + capitalCamelize(prefix));

      properties.push(property);

      mixin[property] = computed(function() {
        return this.inState(prefix);
      }).property('currentState');
    }

    for (i = 0; i < this.definition.stateNames.length; i++) {
      prefix = this.definition.stateNames[i];

      if (prefixes.indexOf(prefix) !== -1) {
        continue;
      }

      prefixes.push(prefix);
    }

    for (i = 0; i < prefixes.length; i++) {
      addAccessor(prefixes[i]);
    }

    this.isInStateAccessorProperties = properties;
    this.reopen(mixin);
  })
});
},{"./definition":1,"./transition":6,"./utils":7}],4:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

function reject() {
  throw new Ember.Error('rejected transition');
}

exports.reject = reject;
},{}],5:[function(_dereq_,module,exports){
"use strict";
var Mixin = window.Ember.Mixin;
var computed = window.Ember.computed;
var Machine = _dereq_("./machine")["default"] || _dereq_("./machine");

exports["default"] = Mixin.create({
  fsmEvents:    null,
  fsmStates:    null,
  initialState: null,
  isLoading:    computed.oneWay('__fsm__.isTransitioning'),
  currentState: computed.oneWay('__fsm__.currentState'),

  init: function() {
    var params = {};
    var mixin  = {};
    var fsm;

    params.target = this;
    params.events = this.get('fsmEvents');
    params.states = this.get('fsmStates');
    params.initialState = this.get('initialState');

    fsm = Machine.create(params);

    this.set('__fsm__', fsm);

    fsm.isInStateAccessorProperties.forEach(function(prop) {
      mixin[prop] = computed.oneWay('__fsm__.' + prop);
    });

    this.reopen(mixin);

    this._super();
  },

  sendStateEvent: function() {
    var fsm = this.get('__fsm__');
    return fsm.send.apply(fsm, arguments);
  }
});
},{"./machine":3}],6:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var RSVP = window.Ember.RSVP["default"] || window.Ember.RSVP;
var computed = window.Ember.computed;
var inspect = window.Ember.inspect;
var get = window.Ember.get;
var typeOf = window.Ember.typeOf;
var assert = window.Ember.assert;
var Promise = window.Ember.RSVP.Promise;
var withPromise = _dereq_("./utils").withPromise;
var bind = _dereq_("./utils").bind;

var CALLBACKS = [
  'beforeEvent',
  '_activateTransition_',
  'willExit',
  'willEnter',
  '_setNewState_',
  'didExit',
  'didEnter',
  '_deactivateTransition_',
  'afterEvent'
];

var EXT_CALLBACK_SOURCES = {
  willExit: 'fromState',
  didExit: 'fromState',
  willEnter: 'toState',
  didEnter: 'toState',
  beforeEvent: 'event',
  afterEvent: 'event'
};

exports["default"] = Ember.Object.extend({
  target:      null,
  machine:     null,
  fromState:   null,
  toState:     null,
  event:       null,
  eventArgs:   null,
  beforeEvent: null,
  willEnter:   null,
  didEnter:    null,
  willExit:    null,
  didExit:     null,
  afterEvent:  null,
  isAborted:   null,
  isResolving: null,
  isResolved:  computed.not('isResolving'),
  isRejected:  null,

  init: function() {
    this.set('resolutions', {});
    this.set('rejections',  {});
  },

  abort: function() {
    this.set('isAborted', true);
  },

  perform: function() {
    var transition = this;
    var promise;

    promise = new Promise(function(resolve, reject) {
      var currentCallbackIndex = 0;

      function next() {
        var cb = CALLBACKS[currentCallbackIndex++];

        if (!cb) {
          resolve(transition);
        } else {
          transition.callback(cb).then(next, reject);
        }
      }

      next();
    });

    this.set('isResolving', true);

    promise.then(function() {
      transition.set('isRejected', false);
    });

    promise.catch(function() {
      transition.set('isRejected', true);
    });

    promise.finally(function() {
      transition.set('isResolving', false);
    });

    return promise;
  },

  callbacksFor: function(transitionEvent) {
    var callbacks = [];
    var machine   = this.get('machine');
    var def       = machine.definition;
    var target    = this.get('target');
    var sources   = [this];
    var sourceCallbackNames;
    var extSource;
    var source;
    var callbackVia;
    var callbackName;
    var callbackFn;
    var i;
    var j;

    if ((extSource = EXT_CALLBACK_SOURCES[transitionEvent])) {
      if (extSource === 'event') {
        sources.push(def.lookupEvent(this.get(extSource)));
      } else {
        sources.push(def.lookupState(this.get(extSource)));
      }
    }

    for (i = 0; i < sources.length; i++) {
      source = sources[i];
      sourceCallbackNames = (source[transitionEvent] || []);

      for (j = 0; j < sourceCallbackNames.length; j++) {
        callbackName = sourceCallbackNames[j];

        if (typeOf(callbackName) === 'function') {
          callbackFn   = callbackName;
          callbackName = '_inline:' + i + '-' + j + '_';
        } else {
          callbackFn   = get(target, callbackName);
          assert('Callback "' + name + '" on target ' + target + ' should be a function, but is a ' + typeOf(callbackFn), typeOf(callbackFn) === 'function');
        }

        callbackVia  = source === this ? 'transition' : 'state';

        callbacks.push({
          via:  callbackVia,
          name: callbackName,
          fn:   bind(target, callbackFn),
          key:  (callbackVia + ':' + callbackName)
        });
      }
    }

    return callbacks;
  },

  callback: function(name) {
    var transition = this;
    var promises   = {};
    var callbacks;
    var callback;
    var promise;
    var i;

    function promiseCallback(fn) {
      return withPromise(function() {
        if (transition.get('isAborted')) {
          return 'aborted';
        } else {
          return fn(transition);
        }
      });
    }

    function callbackPromiseResolver(cb) {
      return function(result) {
        var resolutions = transition.get('resolutions');

        if (!resolutions[name]) {
          resolutions[name] = {};
        }

        resolutions[name][cb.key] = result;
      };
    }

    function callbackPromiseRejector(cb) {
      return function(error) {
        var rejections = transition.get('rejections');

        if (!rejections[name]) {
          rejections[name] = {};
        }

        rejections[name][cb.key] = error;

        transition.set('rejection', error);
      };
    }

    // Shortcut internal callbacks
    if (name[0] === '_') {
      return RSVP.resolve(this.get('machine')[name](this));
    }

    callbacks = this.callbacksFor(name);

    for (i = 0; i < callbacks.length; i++) {
      callback = callbacks[i];
      promise  = promiseCallback(callback.fn);

      promise.then(
        callbackPromiseResolver(callback),
        callbackPromiseRejector(callback)
      );

      promises[callback.key] = promise;
    }

    return RSVP.hash(promises);
  },

  toString: function() {
    return (
      'Transition {\n' +
      '  event: ' + this.get('event') + ',\n' +
      '  eventArgs: ' + inspect(this.get('eventArgs')) + ',\n' +
      '  fromState: ' + inspect(this.get('fromState')) + ',\n' +
      '  toState: ' + inspect(this.get('toState')) + ',\n' +
      '  isResolved: ' + this.get('isResolved') + ',\n' +
      '  isRejected: ' + this.get('isRejected') + '\n' +
      '}'
    );
  }
});
},{"./utils":7}],7:[function(_dereq_,module,exports){
"use strict";
var capitalize = window.Ember.String.capitalize;
var camelize = window.Ember.String.camelize;
var Promise = window.Ember.RSVP.Promise;
var typeOf = window.Ember.typeOf;
var get = window.Ember.get;

function isThenable(thing) {
  var thingType = typeOf(thing);

  if (thingType === 'object' || thingType === 'instance') {
    return typeOf(get(thing, 'then')) === 'function';
  } else {
    return false;
  }
}

exports.isThenable = isThenable;// Takes a function, calls it, then wraps the result in a promise if it's not
// already a promise. If the function throws an error it is caught and called as
// the rejector of the created promise.
function withPromise(block) {
  var response;
  var exception;

  try {
    response = block();
  } catch(e) {
    exception = e;
  }

  if (isThenable(response)) {
    return response;
  } else {
    return new Promise(function(resolve, reject) {
      if (exception) {
        reject(exception);
      } else {
        resolve(response);
      }
    });
  }
}

exports.withPromise = withPromise;function capitalCamelize(str) {
  return capitalize(camelize(str));
}

exports.capitalCamelize = capitalCamelize;function toArray(thing) {
  if (thing === undefined) {
    return [];
  }

  return typeOf(thing) === 'array' ? thing : [thing];
}

exports.toArray = toArray;function ownPropertiesOf(object) {
  var properties = [];
  var property;

  if (!isObject(object)) {
    throw new TypeError('can\'t determine properties of: ' + object);
  }

  for (property in object) {
    if (object.hasOwnProperty(property) && object[property] !== undefined) {
      properties.push(property);
    }
  }

  return properties;
}

exports.ownPropertiesOf = ownPropertiesOf;function isObject(obj) {
  var type = typeOf(obj);
  return type === 'class' || type === 'instance' || type === 'object';
}

exports.isObject = isObject;function getFirst(obj, properties) {
  var value;
  var i;

  properties = toArray(properties);

  if (!isObject(obj)) {
    return value;
  }

  for (i = 0; i < properties.length; i++) {
    value = obj[properties[i]];

    if (value !== undefined) {
      break;
    }
  }

  return value;
}

exports.getFirst = getFirst;function bind(target, fn) {
  return function() {
    return fn.apply(target, arguments);
  };
}

exports.bind = bind;
},{}]},{},[2])
(2)
});
