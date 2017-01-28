const identity = a => a;
const alwaysUndef = _ => undefined;


export const createNamespace = ns => str => `${ns}/${str}`;


export const fsa = function(type, payload, meta) {
  let action = {type};

  if (typeof payload !== 'undefined') action.payload = payload;
  if (payload instanceof Error) action.error = true;
  if (typeof meta !== 'undefined') action.meta = meta;

  Object.defineProperty(action, 'toString', {
    value: () => type.toString(),
    enumerable: false
  });

  return action;
};


export const fsaCreator = function(type, payloadCreator = identity, metaCreator = alwaysUndef) {
  const actionCreator = (...args) => {
    const payload = payloadCreator(...args);
    const meta = metaCreator(...args);

    return fsa(type, payload, meta);
  };

  actionCreator.toString = () => type.toString();

  return actionCreator;
};
