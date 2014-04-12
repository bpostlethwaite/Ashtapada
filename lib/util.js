var util = require('util')
var __slice = [].slice
function noopIt () { return function () {} }


exports.inherits = util.inherits

exports.extend = function () {
  var consumer = arguments[0],
      providers = __slice.call(arguments, 1),
      key,
      i,
      provider,
      except;

  for (i = 0; i < providers.length; ++i) {
    provider = providers[i]
    except = provider['except'] || []
    except.push('except')
    for (key in provider) {
      if (except.indexOf(key) < 0 && provider.hasOwnProperty(key)) {
        consumer[key] = provider[key]
      }
    }
  }
  return consumer
}

exports.forward  = function (receiver, methods, toProvider) {
  methods.forEach(function (methodName) {
    if (!(methodName in toProvider)) return
    receiver[methodName] = function () {
      return toProvider[methodName].apply(toProvider, arguments)
    };
  });

  return receiver;
};


exports.forwardProperty  = function (receiver, methods, propertyName) {
  methods.forEach(function (methodName) {
    receiver[methodName] = function () {
      var toProvider = receiver[propertyName]
      return toProvider[methodName].apply(toProvider, arguments);
    };
  });

  return receiver;
};

exports.delegate = function (receiver, methods, toProvider) {
  methods.forEach(function (methodName) {
    receiver[methodName] = function () {
      return toProvider[methodName].apply(receiver, arguments);
    };
  });

  return receiver;
};


exports.extendPrivately = function (receiver, template) {
  var methodName
  var privateState = {}
  for (methodName in template) {
    if (template.hasOwnProperty(methodName)) {
      receiver[methodName] = template[methodName].bind(privateState);
    };
  };
  return receiver;
};

exports.rebindMethodState = function (receiver, methods, stateObject) {
  var methodName
  methods.forEach(function (methodName) {
    receiver[methodName] = receiver[methodName].bind(stateObject);
  })
  return receiver;
};


exports.noopMethods = function (receiver, methodNames) {
  if (!methodNames) methodNames = Object.keys(receiver)
  methodNames.forEach( function (methodName) {
    if (typeof receiver[methodName] === 'function')
      receiver[methodName] = noopIt()
  })
}

exports.wrapMethods = function(provider, methodNames, wrapFunc){
  methodNames.forEach( function (methodName) {
    var func = provider[methodName]
    provider[methodName] = wrapFunc(func);
  })
}

exports.run = function (generator) {
  var iterator = generator(resume);
  var data = null, yielded = false;

  iterator.next();
  yielded = true;
  check();

  function check() {
    while (data && yielded) {
      var err = data[0], item = data[1];
      data = null;
      yielded = false;
      if (err) return iterator.throw(err);
      iterator.next(item);
      yielded = true;
    }
  }

  function resume() {
    data = arguments;
    check();
  }
}
