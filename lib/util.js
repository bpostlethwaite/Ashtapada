var util = require('util')
var __slice = [].slice

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

exports.forward  = function (receiver, methods, toProvider, requirements) {
  if (!requirements) requirements = []
  methods.forEach(function (methodName) {
    receiver[methodName] = function () {
      var reqs = true
      requirements.forEach( function (req) {
        if (!(req in receiver)) {
          reqs = false
          console.log(req + " is a requirement for " + methodName)
        }
      })
      return reqs ? toProvider[methodName].apply(toProvider, arguments) : false
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


exports.wrapMethods = function(provider, methodNames, wrapFunc){
  methodNames.forEach( function (methodName) {
    var func = provider[methodName]
    provider[methodName] = wrapFunc(func);
  })
}
