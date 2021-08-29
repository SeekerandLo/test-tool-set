function buildArrayStartLine(key: string | number | null) {
  return {
    type: 'array start',
    valueType: 'token',
    key,
    value: '[',
    showValueQuotation: false,
    showKey: key !== null,
  };
}

function buildArrayEndLine(key: string, addComma: boolean) {
  return {
    type: 'array end',
    valueType: 'token',
    key,
    value: ']',
    showValueQuotation: false,
    showKey: false,
    addComma,
  };
}

function buildObjectStartLine(key: string | number | null) {
  return {
    type: 'object start',
    valueType: 'token',
    key,
    value: '{',
    showValueQuotation: false,
    showKey: key !== null,
  };
}

function buildObjectEndLine(key: string, addComma: boolean) {
  return {
    type: 'object end',
    valueType: 'token',
    key,
    value: '}',
    showValueQuotation: false,
    showKey: false,
    addComma,
  };
}

// 是数组还是对象
function buildContentLine(
  key: string,
  value: unknown,
  belong: string,
  addComma: boolean
) {
  return {
    type: `${belong} content`,
    valueType: 'content',
    key,
    value,
    showValueQuotation: true,
    showKey: true,
    addComma,
  };
}

function buildObjectAllStartLine() {
  return {
    type: 'object all start',
    valueType: 'token',
    key: null,
    value: '{',
    showValueQuotation: false,
    showKey: false,
  };
}

function buildObjectAllEndLine() {
  return {
    type: 'object all end',
    valueType: 'token',
    key: null,
    value: '}',
    showValueQuotation: false,
    showKey: false,
  };
}

function buildArrayAllStartLine() {
  return {
    type: 'array all start',
    valueType: 'token',
    key: null,
    value: '[',
    showValueQuotation: false,
    showKey: false,
  };
}

function buildArrayAllEndLine() {
  return {
    type: 'array all end',
    valueType: 'token',
    key: null,
    value: ']',
    showValueQuotation: false,
    showKey: false,
  };
}

export {
  buildArrayStartLine,
  buildArrayEndLine,
  buildObjectStartLine,
  buildObjectEndLine,
  buildContentLine,
  buildObjectAllStartLine,
  buildObjectAllEndLine,
  buildArrayAllStartLine,
  buildArrayAllEndLine,
};
