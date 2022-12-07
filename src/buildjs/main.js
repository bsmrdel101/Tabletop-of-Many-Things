var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString2 = Object.prototype.toString;
    var kindOf = function(cache2) {
      return function(thing) {
        var str = toString2.call(thing);
        return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString2.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString2.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i2 = 0, l = obj.length; i2 < l; i2++) {
          fn.call(null, obj[i2], i2, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
        forEach(arguments[i2], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i2;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i2 = props.length;
        while (i2-- > 0) {
          prop = props[i2];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position2) {
      str = String(str);
      if (position2 === void 0 || position2 > str.length) {
        position2 = str.length;
      }
      position2 -= searchString.length;
      var lastIndex = str.indexOf(searchString, position2);
      return lastIndex !== -1 && lastIndex === position2;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i2 = thing.length;
      if (isUndefined(i2))
        return null;
      var arr = new Array(i2);
      while (i2-- > 0) {
        arr[i2] = thing[i2];
      }
      return arr;
    }
    var isTypedArray = function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode3(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url2, params, paramsSerializer) {
      if (!params) {
        return url2;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts2 = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts2.push(encode3(key) + "=" + encode3(v));
          });
        });
        serializedParams = parts2.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url2.indexOf("#");
        if (hashmarkIndex !== -1) {
          url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url2;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value2, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value2;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value2) {
        if (value2 === null)
          return "";
        if (utils.isDate(value2)) {
          return value2.toISOString();
        }
        if (utils.isArrayBuffer(value2) || utils.isTypedArray(value2)) {
          return typeof Blob === "function" ? new Blob([value2]) : Buffer.from(value2);
        }
        return value2;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value2, key) {
            if (utils.isUndefined(value2))
              return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value2 && !parentKey && typeof value2 === "object") {
              if (utils.endsWith(key, "{}")) {
                value2 = JSON.stringify(value2);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value2))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value2, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value2, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value2));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url2) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i2;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i2 = line.indexOf(":");
        key = utils.trim(line.substr(0, i2)).toLowerCase();
        val = utils.trim(line.substr(i2 + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url2) {
        var href = url2;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module) {
    "use strict";
    module.exports = function parseProtocol(url2) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value2) {
            resolve(value2);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol4 = parseProtocol(fullPath);
        if (protocol4 && ["http", "https", "file"].indexOf(protocol4) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol4 + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/helpers/null.js
var require_null = __commonJS({
  "node_modules/axios/lib/helpers/null.js"(exports, module) {
    module.exports = null;
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value2) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value2;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_null()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value2) {
      return !!(value2 && value2.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value2, opt, opts) {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value2, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i2 = keys.length;
      while (i2-- > 0) {
        var opt = keys[i2];
        var validator = schema[opt];
        if (validator) {
          var value2 = options[opt];
          var result = value2 === void 0 || validator(value2, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url2, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url: url2,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url2, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url: url2,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i2;
        var l = token._listeners.length;
        for (i2 = 0; i2 < l; i2++) {
          token._listeners[i2](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios7 = createInstance(defaults);
    axios7.Axios = Axios;
    axios7.CanceledError = require_CanceledError();
    axios7.CancelToken = require_CancelToken();
    axios7.isCancel = require_isCancel();
    axios7.VERSION = require_data().version;
    axios7.toFormData = require_toFormData();
    axios7.AxiosError = require_AxiosError();
    axios7.Cancel = axios7.CanceledError;
    axios7.all = function all(promises) {
      return Promise.all(promises);
    };
    axios7.spread = require_spread();
    axios7.isAxiosError = require_isAxiosError();
    module.exports = axios7;
    module.exports.default = axios7;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// src/scripts/tools/utils.ts
var canUseHotkey = true;
var ready = (fn, selector) => {
  const target = document.querySelector("body");
  const observer = new MutationObserver(function() {
    if (document.querySelector(selector)) {
      fn();
      observer.disconnect();
    }
  });
  const config = { childList: true };
  observer.observe(target, config);
  setTimeout(() => {
    const div = document.createElement("div");
    div.id = "new-div";
    document.body.append(div);
    document.getElementById("new-div").remove();
  }, 0.1);
};
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
var findCell = (x, y) => {
  for (const cell of Array.from(document.querySelectorAll(".grid__cell"))) {
    if (cell.getAttribute("x") === x.toString() && cell.getAttribute("y") === y.toString()) {
      return cell;
    }
  }
};
var findRelativeCell = (elmt, offsetX, offsetY) => {
  const cellWidth = elmt.clientWidth;
  const cellHeight = elmt.clientHeight;
  const numXCells = Math.ceil(offsetX / cellWidth) - 1;
  const numYCells = Math.ceil(offsetY / cellHeight) - 1;
  return findCell(elmt.getAttribute("x") - numXCells, elmt.getAttribute("y") - numYCells);
};
var checkForElement = (arr, selector) => {
  const el = document.querySelector(selector);
  if (arr.includes(el)) {
    return true;
  } else {
    return false;
  }
};
var makeDraggable = (el, selector) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(selector)) {
    document.querySelector(selector).onmousedown = dragMouseDown;
  } else {
    el.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};
var disableHotkeys = () => {
  for (let input of Array.from(document.querySelectorAll("input"))) {
    input.addEventListener("focusin", () => {
      canUseHotkey = false;
    });
    input.addEventListener("focusout", () => {
      canUseHotkey = true;
    });
  }
};

// src/controllers/userController.ts
var import_axios = __toESM(require_axios2());
var getUser = async () => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };
    const res = await import_axios.default.get("/api/user", config);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
var registerUser = async (payload) => {
  try {
    await import_axios.default.post("/api/user/register", payload);
    window.location.pathname = "login";
  } catch (err) {
    console.log(err);
  }
};
var loginUser = async (payload) => {
  try {
    await import_axios.default.post("/api/user/login", payload);
    window.location.pathname = "game";
  } catch (err) {
    console.log(err);
  }
};
var logout = async () => {
  try {
    await import_axios.default.post("/api/user/logout");
    window.location.pathname = "login";
  } catch (err) {
    console.log(err);
  }
};

// src/views/loginPage.ts
function loginPage() {
  ready(() => {
    bindEventToFormSubmit();
  }, ".login-page");
  const bindEventToFormSubmit = () => {
    const usernameInput = document.getElementById("login-user-username");
    const passwordInput = document.getElementById("login-user-password");
    document.getElementById("login-user-btn").addEventListener("click", (e) => {
      e.preventDefault();
      loginUser({ username: usernameInput.value, password: passwordInput.value });
    });
  };
  return `
        <div class="login-page">
            <div class="box__form box__form--login-user-form">
                <center>
                    <form>
                        <h1>Login</h1>
                        <label class="box__form--login-username">Username
                            <input placeholder="name" id="login-user-username" required>
                        </label>
                        <label>Password
                            <input placeholder="password" type="password" id="login-user-password" required>
                        </label>
                        <button id="login-user-btn">Submit</button>
                    </form>
                    <a href="/register">Register</a>
                </center>
            </div>
        </div>
    `;
}

// src/views/registerPage.ts
function registerPage() {
  ready(() => {
    bindEventToFormSubmit();
  }, ".register-page");
  const bindEventToFormSubmit = () => {
    const usernameInput = document.getElementById("register-user-username");
    const passwordInput = document.getElementById("register-user-password");
    document.getElementById("register-user-btn").addEventListener("click", (e) => {
      e.preventDefault();
      registerUser({ username: usernameInput.value, password: passwordInput.value });
    });
  };
  return `
        <div class="register-page">
            <div class="box__form box__form--register-user-form">
                <center>
                    <form>
                        <h1>Register</h1>
                        <label class="box__form--register-username">Username
                            <input placeholder="name" id="register-user-username" required>
                        </label>
                        <label>Password
                            <input placeholder="password" type="password" id="register-user-password" required>
                        </label>
                        <button id="register-user-btn">Submit</button>
                    </form>
                    <a href="/login">Login</a>
                </center>
            </div>
        </div>
    `;
}

// src/controllers/dashboardController.ts
var import_axios2 = __toESM(require_axios2());
var getGames = async () => {
  try {
    const res = await import_axios2.default.get("/api/dashboard");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
var getGame = async (code) => {
  try {
    const res = await import_axios2.default.get(`/api/dashboard/game/${code}`);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
};
var getGamesHistory = async () => {
  try {
    const res = await import_axios2.default.get("/api/dashboard/history");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
var addGame = async (payload) => {
  try {
    await import_axios2.default.post("/api/dashboard", payload);
    getGames();
  } catch (err) {
    console.log(err);
  }
};
var addGameToHistory = async (payload) => {
  try {
    await import_axios2.default.post("/api/dashboard/history", payload);
  } catch (err) {
    console.log(err);
  }
};

// src/components/gameCard.ts
function gameCard({ game }) {
  return `
        <a class="game-list__item" data-game-code="${game.code}" id="game-list__item-${game.id}">
            ${game.name}
        </a>
    `;
}

// src/components/gamesList.ts
var gameFormOpen = false;
var toggleGameForm = () => {
  gameFormOpen = !gameFormOpen;
  if (gameFormOpen) {
    document.querySelector(".games-list__content")?.insertAdjacentHTML("beforeend", `
            <form class="form--add-game">
                <input id="game-name-input" placeholder="name" required>
                <button class="button--submit btn--hover">Submit</button>
            </form>
        `);
    bindEventToGamesListForm();
  } else {
    document.querySelector(".form--add-game")?.remove();
  }
};
var renderGamesList = async () => {
  const gamesList2 = await getGames();
  const gameListContent = document.querySelector(".games-list__content");
  gameListContent.innerHTML = "";
  gamesList2.forEach((game) => {
    gameListContent.insertAdjacentHTML("beforeend", gameCard({ game }));
    bindEventToGameCard(game);
  });
  gameListContent.insertAdjacentHTML("beforeend", `
        <button class="games-list__button btn--hover">Create Campaign</button>
    `);
};
var bindEventToCreateCampaign = () => {
  document.querySelector(".games-list__button")?.addEventListener("click", () => {
    toggleGameForm();
  });
};
var bindEventToGamesListForm = () => {
  document.querySelector(".form--add-game")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const gameNameInput = document.getElementById("game-name-input");
    addGame({ name: gameNameInput.value });
    renderGamesList();
  });
};
var bindEventToGameCard = (game) => {
  document.getElementById(`game-list__item-${game.id}`).addEventListener("click", () => {
    joinDM(game.code);
  });
};
function gamesList() {
  ready(async () => {
    await renderGamesList();
    bindEventToCreateCampaign();
  }, ".games-list__content");
  return `
        <div class="games-list games-list__content"></div>
    `;
}

// src/components/gameHistoryList.ts
function gamesHistoryList() {
  ready(async () => {
    const gamesHistory = await getGamesHistory();
    renderGamesHistoryList(gamesHistory);
    bindEventToGameCard2();
  }, ".games-history-list__content");
  const renderGamesHistoryList = (gamesHistory) => {
    const gameListContent = document.querySelector(".games-history-list__content");
    gameListContent.innerHTML = "";
    gamesHistory.forEach((game) => {
      gameListContent.insertAdjacentHTML("beforeend", gameCard({ game }));
    });
  };
  const bindEventToGameCard2 = () => {
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-game-code]")) {
        joinPlayer(e.target.dataset.gameCode);
      }
    });
  };
  return `
        <div class="games-list games-history-list__content"></div>
    `;
}

// src/controllers/mapsController.ts
var import_axios3 = __toESM(require_axios2());
var maps;
var getMaps = async () => {
  try {
    const res = await import_axios3.default.get("/api/maps");
    maps = res.data;
  } catch (err) {
    console.log(err);
  }
};

// src/controllers/charactersController.ts
var import_axios4 = __toESM(require_axios2());
var characters;
var character;
var skills;
var updateCharacter = (data) => character = data;
var updateCharacterSkills = (data) => skills = data;
var getCharacters = async () => {
  try {
    const res = await import_axios4.default.get("/api/characters");
    characters = res.data;
  } catch (err) {
    console.log(err);
  }
};
var getCharacter = async (id) => {
  try {
    const res = await import_axios4.default.get(`/api/characters/${id}`);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
};
var getCharacterSkills = async (id) => {
  try {
    const res = await import_axios4.default.get(`/api/characters/skills/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
var addCharacter = async (payload) => {
  try {
    await import_axios4.default.post("/api/characters", payload);
  } catch (err) {
    console.log(err);
  }
};
var addCharacterSkill = async (payload) => {
  try {
    await import_axios4.default.post("/api/characters/skills", { id: character.id, ...payload });
  } catch (err) {
    console.log(err);
  }
};
var setHealth = async (payload) => {
  try {
    await import_axios4.default.put("/api/characters/health", payload);
    character = await getCharacter(payload.id);
  } catch (err) {
    console.log(err);
  }
};
var setTempHealth = async (payload) => {
  try {
    await import_axios4.default.put("/api/characters/temp", payload);
    character = await getCharacter(payload.id);
  } catch (err) {
    console.log(err);
  }
};
var setInspiration = async (payload) => {
  try {
    await import_axios4.default.put("/api/characters/inspiration", payload);
    character = await getCharacter(payload.id);
  } catch (err) {
    console.log(err);
  }
};
var setCharacterSkill = async (payload) => {
  try {
    await import_axios4.default.put("/api/characters/skills", payload);
    skills = await getCharacterSkills(payload.characterId);
  } catch (err) {
    console.log(err);
  }
};

// src/scripts/statsCalculations.ts
var getAbilityScoreModifiers = () => {
  const strMod = Math.floor((character.str - 10) / 2);
  const dexMod = Math.floor((character.dex - 10) / 2);
  const conMod = Math.floor((character.con - 10) / 2);
  const intMod = Math.floor((character.int - 10) / 2);
  const wisMod = Math.floor((character.wis - 10) / 2);
  const charMod = Math.floor((character.char - 10) / 2);
  return { strMod, dexMod, conMod, intMod, wisMod, charMod };
};

// src/scripts/tools/stringUtils.ts
var indexConverter = (text) => {
  return text.replace(/\s+/g, "-").toLowerCase();
};
var removeUnitFromString = (string) => {
  if (string)
    return parseInt(string.split(" ")[0]);
};
var removeExtraCustomData = (array, name) => {
  let result = [];
  if (name) {
    for (let i2 = 0; i2 < array.length - 1; i2++) {
      if (!result.some((item) => array[i2].name === item.name)) {
        result.push(array[i2]);
      }
    }
  } else {
    for (let i2 = 0; i2 < array.length - 1; i2++) {
      if (!result.some((item) => array[i2] === item)) {
        result.push(array[i2]);
      }
    }
  }
  return result;
};

// src/components/characterSheet/character.SheetSkills.ts
var renderCharacterSheetSkillsPage = (sheetContent) => {
  setCharacterSheetPage("skills");
  sheetContent.insertAdjacentHTML("beforeend", characterSheetSkillsPageHtml());
  fillCharacterSheetSkillsTableBody();
  bindEventsToCharacterSheetSkillsPage();
};
var bindEventsToCharacterSheetSkillsPage = () => {
};
var characterSheetSkillsPageHtml = () => `
    <div class="character-sheet__header">
        <h3 class="character-sheet__header--title">Skills</h3>
    </div>
    <div class="character-sheet__skills-table">
        <table>
            <thead>
                <tr class="character-sheet__skills-table--header">
                    <th>Name</th>
                    <th>Value</th>
                    <th>Proficient</th>
                </tr>
            </thead>
            <tbody class="character-sheet__skills-table-body"></tbody>
        </table>
    </div>
`;
var fillCharacterSheetSkillsTableBody = () => {
  const tableBody = document.querySelector(".character-sheet__skills-table-body");
  skills.forEach((skill) => {
    const skillModifier = getSkillModifier(skill);
    tableBody.insertAdjacentHTML("beforeend", skillRowInnerHtml(skill, skillModifier));
    bindEventToSkills(skill);
  });
};
var skillRowInnerHtml = (skill, skillModifier) => `
    <tr>
        <td>${skill.name} <span class="character-sheet__skills-table--skill-type">(${skill.type})</span></td>
        <td class="${indexConverter(skill.name)}-mod">${skillModifier < 0 ? "" : "+"}${skillModifier}</td>
        <td class="${indexConverter(skill.name)}-prof">${skill.proficient ? `<i class="fa-solid fa-circle"><input class="skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle"><input class="skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox"></input></i>`}</td>
    </tr>
`;
var getSkillModifier = (skill) => {
  const { strMod, dexMod, conMod, intMod, wisMod, charMod } = getAbilityScoreModifiers();
  let value2 = 0;
  if (skill.proficient)
    value2 += character.prof_bonus;
  switch (skill.type) {
    case "str":
      value2 += strMod + skill.bonus_mod;
      break;
    case "dex":
      value2 += dexMod + skill.bonus_mod;
      break;
    case "con":
      value2 += conMod + skill.bonus_mod;
      break;
    case "int":
      value2 += intMod + skill.bonus_mod;
      break;
    case "wis":
      value2 += wisMod + skill.bonus_mod;
      break;
    case "char":
      value2 += charMod + skill.bonus_mod;
      break;
    default:
      return skill.bonus_mod || 0;
  }
  return value2;
};
var bindEventToSkills = (skill) => {
  const profCheckbox = document.querySelector(`.skill-proficient-checkbox-${skill.id}`);
  profCheckbox.addEventListener("change", (e) => {
    ;
    setCharacterSkill({ id: skill.id, characterId: character.id, name: skill.name, type: skill.type, bonus_mod: skill.bonus_mod, proficient: e.target.checked });
    const skillMod = document.querySelector(`.${indexConverter(skill.name)}-mod`);
    const skillProf = document.querySelector(`.${indexConverter(skill.name)}-prof`);
    const profIcon = skillProf.childNodes[0];
    const updatedSkill = {
      name: skill.name,
      type: skill.type,
      bonus_mod: skill.bonus_mod,
      proficient: e.target.checked
    };
    const skillModifier = getSkillModifier(updatedSkill);
    skillMod.innerHTML = `${skillModifier < 0 ? "" : "+"}${skillModifier}`;
    if (profIcon.classList.contains("fa-solid")) {
      profIcon.classList.remove("fa-solid");
      profIcon.classList.add("fa-regular");
    } else {
      profIcon.classList.add("fa-solid");
      profIcon.classList.remove("fa-regular");
    }
  });
};

// src/scripts/characterStatEvents.ts
var damageHp = (value2) => {
  const healthContainer = document.querySelector(".character-sheet__health");
  const tempHealthContainer = document.querySelector(".character-sheet__health--temp");
  let dmgAmount = value2;
  let tmpHpValue = character.temp_health;
  tmpHpValue -= dmgAmount;
  if (tmpHpValue < 0)
    tmpHpValue = 0;
  dmgAmount -= character.temp_health;
  if (dmgAmount < 0)
    dmgAmount = 0;
  const newHealth = character.current_health - dmgAmount;
  setTempHealth({ id: character.id, health: tmpHpValue });
  setHealth({ id: character.id, health: newHealth });
  healthContainer.innerHTML = "";
  tempHealthContainer.innerHTML = "";
  healthContainer.insertAdjacentHTML("beforeend", `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
  tempHealthContainer.insertAdjacentHTML("beforeend", `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${tmpHpValue}</p>
    `);
  document.getElementById("dmg-player-hp-input").value = "";
};
var healHp = (value2) => {
  const elmt = document.querySelector(".character-sheet__health");
  const healAmount = value2;
  let newHealth = character.current_health + healAmount;
  if (newHealth > character.max_health) {
    newHealth = character.max_health;
    setHealth({ id: character.id, health: newHealth });
  } else {
    setHealth({ id: character.id, health: newHealth });
  }
  elmt.innerHTML = "";
  elmt.insertAdjacentHTML("beforeend", `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
  document.getElementById("heal-player-hp-input").value = "";
};
var addTempHp = (value2) => {
  const elmt = document.querySelector(".character-sheet__health--temp");
  const newTempHealth = character.temp_health + value2;
  setTempHealth({ id: character.id, health: newTempHealth });
  elmt.innerHTML = "";
  elmt.insertAdjacentHTML("beforeend", `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${newTempHealth}</p>
    `);
  document.getElementById("temp-player-hp-input").value = "";
};

// src/components/characterSheet/characterSheetMain.ts
var renderCharacterSheetMainPage = (sheetContent) => {
  setCharacterSheetPage("main");
  const modifiers = getAbilityScoreModifiers();
  sheetContent.insertAdjacentHTML("beforeend", characterSheetMainPageHtml(modifiers));
  bindEventsToCharacterSheetMainPage();
};
var characterSheetMainPageHtml = (modifiers) => `
    ${characterSheetMainPageHeaderHtml()}
    <div class="character-sheet__main">
        ${characterSheetMainStatsHtml()}
    </div>
    <div class="character-sheet__small-stat-blocks">
        ${characterSheetSmStatBlocksHtml()}
    </div>
    <div class="character-sheet__scores">
        ${characterSheetScoresHtml(modifiers)}
    </div>
        ${characterSheetHealth()}
`;
var characterSheetMainPageHeaderHtml = () => `
    <div class="character-sheet__header">
        <img class="character-sheet__image" src="${character.image}">
        <div class="character-sheet__header--block">
            <h2>${character.name}</h2>
            <p>${character.race} ${character.class}, ${character.background}</p>
        </div>
    </div>
`;
var characterSheetMainStatsHtml = () => `
    <p><span class="bold">Level</span> ${character.level}</p>
    <p><span class="bold">Prof bonus</span> +${character.prof_bonus}</p>
    <p><span class="bold">Hit dice</span> 1d${character.hit_dice}</p>
    <p class="character-sheet__inspiration"><span class="bold">Inspiration</span> ${characterInspirationIcon(character.inspiration)}</p>
`;
var bindEventsToCharacterSheetMainPage = () => {
  document.querySelector(".character-sheet__inspiration").addEventListener("click", (e) => {
    toggleInspiration(e);
  });
  document.getElementById("character-sheet-health--dmg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value2 = parseInt(document.getElementById("dmg-player-hp-input").value);
    damageHp(value2);
  });
  document.getElementById("character-sheet-health--heal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value2 = parseInt(document.getElementById("heal-player-hp-input").value);
    healHp(value2);
  });
  document.getElementById("character-sheet-health--temp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value2 = parseInt(document.getElementById("temp-player-hp-input").value);
    addTempHp(value2);
  });
};
var toggleInspiration = (e) => {
  e.preventDefault();
  const { inspiration, id } = character;
  const newInspiration = !inspiration;
  setInspiration({ newInspiration, id });
  document.querySelector(".character-sheet__inspiration").innerHTML = `<span class="bold">Inspiration</span> ${characterInspirationIcon(newInspiration)}`;
};
var characterInspirationIcon = (inspired) => {
  if (inspired) {
    return `<img class="inspiration-icon" src="../images/star-filled.png" draggable="false">`;
  } else {
    return `<img class="inspiration-icon" src="../images/star-empty.png" draggable="false">`;
  }
};
var characterSheetSmStatBlocksHtml = () => `
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">AC</span></p>
        <p>${character.ac}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Init</span></p>
        <p>${character.initiative < 0 ? "" : "+"}${character.initiative}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Speed</span></p>
        <p>${character.walk_speed} ft</p>
    </div>
`;
var characterSheetScoresHtml = (modifiers) => {
  const { strMod, dexMod, conMod, intMod, wisMod, charMod } = modifiers;
  return `
        <div class="character-sheet__score-box">
            <p class="bold">Str</p>
            <p>${strMod < 0 ? "" : "+"}${strMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.str}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Dex</p>
            <p>${dexMod < 0 ? "" : "+"}${dexMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.dex}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Con</p>
            <p>${conMod < 0 ? "" : "+"}${conMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.con}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Int</p>
            <p>${intMod < 0 ? "" : "+"}${intMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.int}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Wis</p>
            <p>${wisMod < 0 ? "" : "+"}${wisMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.wis}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Char</p>
            <p>${charMod < 0 ? "" : "+"}${charMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.char}</p>
            </div>
        </div>
    `;
};
var characterSheetHealth = () => `
    <div class="character-sheet__health--temp">
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${character.temp_health}</p>
    </div>
    <div class="character-sheet__health">
        <p class="hp"><img src="../images/heart-red.png">${character.current_health} / ${character.max_health}</p>
    </div>
    <div class="character-sheet__health-tracker">
        <form id="character-sheet-health--dmg-form"><p><span class="bold">Damage</span> <button type="submit">-</button><input id="dmg-player-hp-input" type="number"></p></form>
        <form id="character-sheet-health--heal-form"><p><span class="bold">Heal</span> <button type="submit">+</button><input id="heal-player-hp-input" type="number"></p></form>
        <form id="character-sheet-health--temp-form"><p><span class="bold">Temp Hp</span> <button type="submit">+</button><input id="temp-player-hp-input" type="number"></p></form>
    </div>
`;

// src/components/characterSheet/characterSheetSidebar.ts
var sidebarOpen = true;
var toggleCharacterSheetSidebar = () => {
  sidebarOpen = !sidebarOpen;
  const sidebar2 = document.querySelector(".character-sheet__sidebar");
  const toggleBtn = document.querySelector(".character-sheet__sidebar-btn--toggle");
  document.querySelectorAll(".character-sheet__sidebar-btn").forEach((btn) => {
    btn.classList.toggle("hidden");
  });
  sidebar2.classList.toggle("character-sheet__sidebar--hidden");
  if (sidebarOpen) {
    toggleBtn.innerHTML = "<";
  } else {
    toggleBtn.innerHTML = ">";
  }
};
var characterSheetSidebarHtml = () => `
    <div class="character-sheet__sidebar">
        ${characterSheetSidebarButtons()}
    </div>
`;
var handleCharacterSheetSidebarState = () => {
  if (!sidebarOpen) {
    const sidebar2 = document.querySelector(".character-sheet__sidebar");
    const toggleBtn = document.querySelector(".character-sheet__sidebar-btn--toggle");
    document.querySelectorAll(".character-sheet__sidebar-btn").forEach((btn) => {
      btn.classList.toggle("hidden");
    });
    sidebar2.classList.toggle("character-sheet__sidebar--hidden");
    if (sidebarOpen) {
      toggleBtn.innerHTML = "<";
    } else {
      toggleBtn.innerHTML = ">";
    }
  }
  bindEventsToSidebarButtons();
};
var characterSheetSidebarButtons = () => `
    <button class="character-sheet__sidebar-btn--toggle"><</button>
    <button class="character-sheet__sidebar-btn" id="sidebar-btn--main">Main</button>
    <button class="character-sheet__sidebar-btn" id="sidebar-btn--skills">Skills</button>
`;
var bindEventsToSidebarButtons = () => {
  document.getElementById("sidebar-btn--main").addEventListener("click", () => {
    determineCharacterSheetPage("main");
  });
  document.getElementById("sidebar-btn--skills").addEventListener("click", () => {
    determineCharacterSheetPage("skills");
  });
  document.querySelector(".character-sheet__sidebar-btn--toggle").addEventListener("click", () => {
    toggleCharacterSheetSidebar();
  });
  document.getElementById("character-sheet-close-btn").addEventListener("click", () => {
    toggleCharacterSheet();
  });
};

// src/components/characterSheet/characterSheet.ts
var sheetOpen = false;
var characterSheetPage = "main";
var setCharacterSheetPage = (page) => characterSheetPage = page;
var toggleCharacterSheet = () => {
  sheetOpen = !sheetOpen;
  if (sheetOpen) {
    renderCharacterSheet();
    determineCharacterSheetPage(characterSheetPage);
  } else {
    document.getElementById("character-sheet-modal").remove();
  }
};
var renderCharacterSheet = () => {
  const sheetWindow = document.querySelector("body").appendChild(document.createElement("div"));
  sheetWindow.classList.add("character-sheet");
  sheetWindow.id = "character-sheet-modal";
  sheetWindow.insertAdjacentHTML("beforeend", characterSheetSidebarHtml());
  sheetWindow.insertAdjacentHTML("beforeend", `
        <button class="btn--modal-close" id="character-sheet-close-btn">X</button>
        <div class="character-sheet-content"></div>
    `);
  handleCharacterSheetSidebarState();
};
var determineCharacterSheetPage = (page) => {
  const sheetContent = document.querySelector(".character-sheet-content");
  sheetContent.innerHTML = "";
  switch (page) {
    case "main":
      renderCharacterSheetMainPage(sheetContent);
      break;
    case "skills":
      renderCharacterSheetSkillsPage(sheetContent);
      break;
    default:
      break;
  }
  disableHotkeys();
  makeDraggable(document.getElementById("character-sheet-modal"), ".character-sheet__header");
};

// src/controllers/creaturesController.ts
var import_axios5 = __toESM(require_axios2());

// src/scripts/standardCreatureRes.ts
var separateStandardCreatureResponse = (res) => {
  const proficiencies = getCreatureProficiencies(res.proficiencies);
  const condition_immunities = getCreatureConditionImmunities(res.condition_immunities);
  const senses = getCreatureSenses(res.senses);
  const special_abilities = getCreatureAbilities(res.special_abilities);
  const actions = getCreatureActions(res.actions);
  const legendary_actions = getCreatureLegendaryActions(res.legendary_actions);
  return { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions };
};
var getCreatureProficiencies = (_proficiencies) => {
  let proficiencies = [];
  if (_proficiencies.length > 0) {
    _proficiencies.forEach((prof) => {
      proficiencies.push({ name: prof.proficiency.name, value: prof.value });
    });
  }
  return proficiencies;
};
var getCreatureConditionImmunities = (_condition_immunities) => {
  let condition_immunities = [];
  if (_condition_immunities.length > 0) {
    _condition_immunities.forEach((immunity) => {
      condition_immunities.push(immunity.name);
    });
  }
  return condition_immunities;
};
var getCreatureSenses = (_senses) => {
  let senses = [];
  if (_senses.darkvision)
    senses.push({ name: "Darkvision", value: removeUnitFromString(_senses.darkvision) });
  if (_senses.blindsight)
    senses.push({ name: "Blindsight", value: removeUnitFromString(_senses.blindsight) });
  if (_senses.tremorsense)
    senses.push({ name: "Tremorsense", value: removeUnitFromString(_senses.tremorsense) });
  if (_senses.truesight)
    senses.push({ name: "Truesight", value: removeUnitFromString(_senses.truesight) });
  if (_senses.passive_perception)
    senses.push({ name: "Passive Perception", value: _senses.passive_perception });
  return senses;
};
var getCreatureAbilities = (_special_abilities) => {
  let special_abilities = [];
  if (_special_abilities.length > 0) {
    _special_abilities.forEach((ability) => {
      special_abilities.push({ name: ability.name, desc: ability.desc, damage: standardCreatureDamage(ability.damage) });
    });
  }
  return special_abilities;
};
var getCreatureActions = (_actions) => {
  let actions = [];
  if (_actions.length > 0) {
    _actions.forEach((action) => {
      actions.push({ name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage) });
    });
  }
  return actions;
};
var getCreatureLegendaryActions = (_legendary_actions) => {
  let legendary_actions = [];
  if (_legendary_actions.length > 0) {
    _legendary_actions.forEach((action) => {
      legendary_actions.push({ name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage) });
    });
  }
  return legendary_actions;
};
var standardCreatureDamage = (damage) => {
  let damages = [];
  if (damage) {
    damage.forEach((dmg) => {
      if (dmg.from) {
        dmg.from.options.forEach((dmg2) => {
          damages.push({ damageDice: dmg2.damage_dice, damageType: dmg2.damage_type.index });
        });
      } else {
        damages.push({ damageDice: dmg.damage_dice, damageType: dmg.damage_type.index });
      }
    });
  }
  return damages;
};

// src/scripts/tools/statTools.ts
var getActionDesc = (_string) => {
  let string = _string;
  let rolls = [];
  let toHit = "";
  while (string.includes("{{")) {
    toHit = string.split("{{")[1].split("}}")[0];
    string = string.replace("{{", "").replace("}}", "");
  }
  while (toHit.includes("+")) {
    toHit = toHit.replace("+", "");
  }
  while (string.includes("[[")) {
    rolls.push(string.split("[[")[1].split("]]")[0]);
    string = string.replace("[[", "").replace("]]", "");
  }
  return { rolls, desc: string, toHit };
};
var separateDmgRoll = (dmg) => {
  const [damageDice, damageType] = dmg.split(" ");
  return { damageDice, damageType };
};
var separateProf = (string, value2, name) => {
  const save = string.split("Saving Throw: ");
  const skill = string.split("Skill: ");
  if (save[0] === "") {
    const name2 = save[1].split(value2);
    return name2[0].toString();
  } else if (skill[0] === "") {
    const name2 = skill[1].split(value2);
    return name2[0].toString();
  }
  return name;
};

// src/scripts/customCreatureRes.ts
var separateCreatureResponse = (res) => {
  let { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = getInitialCreatureArrays(res);
  proficiencies = removeExtraCustomData(proficiencies, true);
  vulnerabilities = removeExtraCustomData(vulnerabilities, false);
  resistances = removeExtraCustomData(resistances, false);
  damageImmunities = removeExtraCustomData(damageImmunities, false);
  conditionImmunities = removeExtraCustomData(conditionImmunities, false);
  senses = removeExtraCustomData(senses, true);
  abilities = removeExtraCustomData(abilities, true);
  actions = removeExtraCustomData(actions, true);
  legActions = removeExtraCustomData(legActions, true);
  let modifiedAbilities = [];
  abilities.forEach((ability) => {
    if (ability.name && ability.desc) {
      const abilityData = getActionDesc(ability.desc);
      modifiedAbilities.push({ name: ability.name, desc: abilityData.desc, damage: [separateDmgRoll(abilityData.rolls.toString())] });
    }
  });
  abilities = modifiedAbilities;
  let modifiedActions = [];
  actions.forEach((action) => {
    if (action.name && action.desc) {
      const actionData = getActionDesc(action.desc);
      modifiedActions.push({ name: action.name, desc: actionData.desc, attack_bonus: actionData.toHit, damage: [separateDmgRoll(actionData.rolls.toString())] });
    }
  });
  actions = modifiedActions;
  let modifiedLegActions = [];
  legActions.forEach((action) => {
    if (action.name && action.desc) {
      const legActionData = getActionDesc(action.desc);
      modifiedLegActions.push({ name: action.name, desc: legActionData.desc, attack_bonus: legActionData.toHit, damage: [separateDmgRoll(legActionData.rolls.toString())] });
    }
  });
  legActions = modifiedLegActions;
  const { _proficiencies, _resistances, _vulnerabilities, _senses } = emptyNullArrays(proficiencies, resistances, vulnerabilities, senses);
  return { proficiencies: _proficiencies, vulnerabilities: _vulnerabilities, resistances: _resistances, damageImmunities, conditionImmunities, senses: _senses, abilities, actions, legActions };
};
var getInitialCreatureArrays = (res) => {
  let proficiencies = [];
  let vulnerabilities = [];
  let resistances = [];
  let damageImmunities = [];
  let conditionImmunities = [];
  let senses = [];
  let abilities = [];
  let actions = [];
  let legActions = [];
  for (let stat of res) {
    proficiencies.push({ name: stat.prof_name, value: stat.prof_value });
    vulnerabilities.push(stat.vul_name);
    resistances.push(stat.res_name);
    senses.push({ name: stat.sense_name, value: stat.sense_value });
    abilities.push({ name: stat.ability_name, desc: stat.ability_desc });
    actions.push({ name: stat.action_name, desc: stat.action_desc });
    legActions.push({ name: stat.leg_action_name, desc: stat.leg_action_desc });
    if (stat.immune_type === "damage") {
      damageImmunities.push(stat.immune_name);
    } else if (stat.immune_type === "condition") {
      conditionImmunities.push(stat.immune_name);
    }
  }
  return { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions };
};
var emptyNullArrays = (proficiencies, resistances, vulnerabilities, senses) => {
  if (proficiencies.length > 0) {
    let exists = false;
    proficiencies.forEach((prof) => {
      if (prof.name && prof.value)
        exists = true;
    });
    if (!exists)
      proficiencies = [];
  }
  if (resistances.length > 0) {
    let exists = false;
    resistances.forEach((resistance) => {
      if (resistance)
        exists = true;
    });
    if (!exists)
      resistances = [];
  }
  if (vulnerabilities.length > 0) {
    let exists = false;
    vulnerabilities.forEach((vul) => {
      if (vul)
        exists = true;
    });
    if (!exists)
      vulnerabilities = [];
  }
  if (senses.length > 0) {
    let exists = false;
    senses.forEach((sense) => {
      if (sense.name && sense.value)
        exists = true;
    });
    if (!exists)
      senses = [];
  }
  return { _proficiencies: proficiencies, _resistances: resistances, _vulnerabilities: vulnerabilities, _senses: senses };
};

// src/scripts/creatureDataHandler.ts
var modifyResponseStandardCreature = (res) => {
  const { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions } = separateStandardCreatureResponse(res.data);
  const modifiedRes = new Creature(
    null,
    null,
    res.data.index,
    res.data.name,
    res.data.size,
    res.data.type,
    res.data.alignment,
    res.data.armor_class,
    res.data.hit_points,
    res.data.hit_dice,
    res.data.strength,
    res.data.dexterity,
    res.data.constitution,
    res.data.intelligence,
    res.data.wisdom,
    res.data.charisma,
    res.data.challenge_rating,
    res.data.xp,
    res.data.languages,
    removeUnitFromString(res.data.speed.walk),
    removeUnitFromString(res.data.speed.swim),
    removeUnitFromString(res.data.speed.burrow),
    removeUnitFromString(res.data.speed.fly),
    removeUnitFromString(res.data.speed.climb),
    proficiencies,
    res.data.damage_vulnerabilities,
    res.data.damage_resistances,
    res.data.damage_immunities,
    condition_immunities,
    senses,
    special_abilities,
    actions,
    legendary_actions
  );
  return modifiedRes;
};
var modifyResponseCreature = (res) => {
  const { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = separateCreatureResponse(res.data);
  const modifiedRes = new Creature(
    res.data[0].id,
    res.data[0].user_id,
    res.data[0].index,
    res.data[0].name,
    res.data[0].size,
    res.data[0].type,
    res.data[0].alignment,
    res.data[0].ac,
    res.data[0].hit_points,
    res.data[0].hit_dice,
    res.data[0].str,
    res.data[0].dex,
    res.data[0].con,
    res.data[0].int,
    res.data[0].wis,
    res.data[0].char,
    res.data[0].cr,
    res.data[0].xp,
    res.data[0].list,
    res.data[0].walk_speed,
    res.data[0].swim_speed,
    res.data[0].burrow_speed,
    res.data[0].fly_speed,
    res.data[0].climb_speed,
    proficiencies,
    vulnerabilities,
    resistances,
    damageImmunities,
    conditionImmunities,
    senses,
    abilities,
    actions,
    legActions
  );
  return modifiedRes;
};
var Creature = class {
  id;
  user_id;
  index;
  name;
  size;
  type;
  alignment;
  ac;
  hit_points;
  hit_dice;
  str;
  dex;
  con;
  int;
  wis;
  char;
  cr;
  xp;
  languages;
  speeds;
  proficiencies;
  vulnerabilities;
  resistances;
  damageImmunities;
  conditionImmunities;
  senses;
  abilities;
  actions;
  legActions;
  constructor(id, user_id, index, name, size, type, alignment, ac, hit_points, hit_dice, str, dex, con, int, wis, char, cr, xp, languages, walk_speed, swim_speed, burrow_speed, fly_speed, climb_speed, proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions) {
    this.id = id;
    this.user_id = user_id;
    this.index = index;
    this.name = name;
    this.size = size;
    this.type = type;
    this.alignment = alignment;
    this.ac = ac;
    this.hit_points = hit_points;
    this.hit_dice = hit_dice;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.char = char;
    this.cr = cr;
    this.xp = xp;
    this.languages = languages;
    this.speeds = [
      { name: "Walk", value: walk_speed },
      { name: "Swim", value: swim_speed },
      { name: "Burrow", value: burrow_speed },
      { name: "Fly", value: fly_speed },
      { name: "Climb", value: climb_speed }
    ], this.proficiencies = proficiencies;
    this.vulnerabilities = vulnerabilities;
    this.resistances = resistances;
    this.damageImmunities = damageImmunities;
    this.conditionImmunities = conditionImmunities;
    this.senses = senses;
    this.abilities = abilities;
    this.actions = actions;
    this.legActions = legActions;
  }
};

// src/controllers/creaturesController.ts
var getCreatures = async () => {
  try {
    const res = await import_axios5.default.get("https://www.dnd5eapi.co/api/monsters");
    return res.data.results;
  } catch (err) {
    console.log(err);
  }
};
var getCreatureByIndex = async (index, custom) => {
  try {
    if (custom) {
      const res = await import_axios5.default.get(`/api/creatures/${index}`);
      if (res.data.length === 0)
        return;
      return modifyResponseCreature(res);
    } else {
      const res = await import_axios5.default.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
      if (res.data.length === 0)
        return;
      return modifyResponseStandardCreature(res);
    }
  } catch (err) {
    console.log(err);
  }
};
var getCustomCreatures = async () => {
  try {
    const res = await import_axios5.default.get("/api/creatures");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
var addCreature = async (payload) => {
  console.log(payload);
  try {
    await import_axios5.default.post("/api/creatures", payload);
    const res = await import_axios5.default.get("/api/creatures");
    let creatureId = res.data[res.data.length - 1].id;
    for (let prof of payload.proficiencies) {
      await import_axios5.default.post("/api/creatures/prof", { id: creatureId, data: { name: prof.name, value: prof.value } });
    }
    if (payload.proficiencies.length === 0)
      await import_axios5.default.post("/api/creatures/prof", { id: creatureId, data: { name: null, value: null } });
    await import_axios5.default.post("/api/creatures/vul", { id: creatureId, data: { name: payload.vul } });
    await import_axios5.default.post("/api/creatures/res", { id: creatureId, data: { name: payload.res } });
    await import_axios5.default.post("/api/creatures/immunities", { id: creatureId, data: { dmgImmune: true, name: payload.dmgImmune } });
    await import_axios5.default.post("/api/creatures/immunities", { id: creatureId, data: { conImmune: true, name: payload.conImmune } });
    for (let sense of payload.senses) {
      await import_axios5.default.post("/api/creatures/senses", { id: creatureId, data: { name: sense.name, value: sense.value } });
    }
    if (payload.senses.length === 0)
      await import_axios5.default.post("/api/creatures/senses", { id: creatureId, data: { name: null, value: null } });
    await import_axios5.default.post("/api/creatures/languages", { id: creatureId, data: { name: payload.languages } });
    for (let ability of payload.abilities) {
      await import_axios5.default.post("/api/creatures/abilities", { id: creatureId, data: { name: ability.name, desc: ability.desc } });
    }
    if (payload.abilities.length === 0)
      await import_axios5.default.post("/api/creatures/abilities", { id: creatureId, data: { name: null, desc: null } });
    for (let action of payload.actions) {
      await import_axios5.default.post("/api/creatures/actions", { id: creatureId, data: { name: action.name, desc: action.desc } });
    }
    if (payload.actions.length === 0)
      await import_axios5.default.post("/api/creatures/actions", { id: creatureId, data: { name: null, desc: null } });
    for (let action of payload.legActions) {
      await import_axios5.default.post("/api/creatures/leg-actions", { id: creatureId, data: { name: action.name, desc: action.desc } });
    }
    if (payload.legActions.length === 0)
      await import_axios5.default.post("/api/creatures/leg-actions", { id: creatureId, data: { name: null, desc: null } });
  } catch (err) {
    console.log(err);
  }
};
var deleteCreature = async (id) => {
  try {
    await import_axios5.default.delete(`/api/creatures/${id}`);
  } catch (err) {
    console.log(err);
  }
};

// src/components/modal.ts
function modal(id, header) {
  return `
        <div class="modal" id="${id}-modal">
            <button class="btn--modal-close" id="${id}-modal-close-btn">X</button>
            ${header}
            <div id="${id}-modal__body"></div>
        </div>
    `;
}

// src/components/creaturesModal/creatureAbilities.ts
function creatureAbilities(creature) {
  ready(() => {
    if (creature.abilities.length > 0) {
      creature.abilities.forEach((ability) => {
        document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML("beforeend", `
                    <div class="special-abilities__box">
                        <p class="special-abilities__name"><span class="bold">${ability.name}.</span> ${ability.desc}</p>
                    </div>
                `);
      });
    }
  }, `#special-abilities--${creature.index}`);
  return `
        <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
    `;
}

// src/scripts/creatureStatsHandler.ts
var getCreatureSpeedData = (creature) => {
  let speeds = [];
  creature.speeds.forEach((speed) => {
    if (speed.value) {
      speeds.push(speed);
    }
  });
  return speeds;
};
var getCreatureScoresData = (creature) => {
  let scoreNames = ["Str", "Dex", "Con", "Int", "Wis", "Char"];
  let scoreValues = [
    creature.str,
    creature.dex,
    creature.con,
    creature.int,
    creature.wis,
    creature.char
  ];
  return { scoreNames, scoreValues };
};
var getCreatureProficiencyData = (creature) => {
  let otherSkills = [];
  let proficiencies = "", skills2 = "";
  creature.proficiencies.forEach((proficiency) => {
    const modifiedProf = separateProf(proficiency.name + proficiency.value, proficiency.value, proficiency.name);
    if (proficiency.name.includes("Saving")) {
      proficiencies += ` ${modifiedProf} +${proficiency.value},`;
    } else {
      otherSkills.push({ name: modifiedProf, value: proficiency.value });
    }
  });
  proficiencies = proficiencies.replace(/,*$/, "");
  otherSkills.forEach((skill) => {
    skills2 += ` ${skill.name} +${skill.value},`;
  });
  skills2 = skills2.replace(/,*$/, "");
  return { proficiencies, skills: skills2 };
};
var getCreatureVulResData = (creature) => {
  let vul = getVulnerabilities(creature);
  let res = getResistances(creature);
  let dmgImmune = getDmgImmune(creature);
  let conImmune = getConImmune(creature);
  return { vul, res, dmgImmune, conImmune };
};
var getVulnerabilities = (creature) => {
  if (creature.vulnerabilities.length > 0) {
    let string = "";
    creature.vulnerabilities.forEach((stat) => {
      string += ` ${stat},`;
    });
    return string.replace(/,*$/, "");
  }
  return "";
};
var getResistances = (creature) => {
  if (creature.resistances.length > 0) {
    let string = "";
    creature.resistances.forEach((stat) => {
      string += ` ${stat},`;
    });
    return string.replace(/,*$/, "");
  }
  return "";
};
var getDmgImmune = (creature) => {
  if (creature.damageImmunities.length > 0) {
    let string = "";
    creature.damageImmunities.forEach((stat) => {
      string += ` ${stat},`;
    });
    return string.replace(/,*$/, "");
  }
  return "";
};
var getConImmune = (creature) => {
  if (creature.conditionImmunities.length > 0) {
    let string = "";
    creature.conditionImmunities.forEach((stat) => {
      string += ` ${stat},`;
    });
    return string.replace(/,*$/, "");
  }
  return "";
};
var getCreatureSensesData = (creature) => {
  let string = "";
  creature.senses.forEach((sense) => {
    if (sense.name.includes("passive") || sense.name.includes("Passive")) {
      string += ` ${sense.name} ${sense.value},`;
    } else {
      string += ` ${sense.name} ${sense.value} ft.,`;
    }
  });
  return string.replace(/,*$/, "");
};

// src/components/creaturesModal/creatureAbilityScores.ts
function creatureAbilityScores(creature) {
  ready(() => {
    const { scoreNames, scoreValues } = getCreatureScoresData(creature);
    for (let i2 = 0; i2 < 6; i2++) {
      let modifier = Math.floor((scoreValues[i2] - 10) / 2);
      document.getElementById(`scores--${creature.index}`).insertAdjacentHTML("beforeend", `
                <div class="score-box">
                    <span class="bold"><p>${scoreNames[i2]}</p></span>
                    <p>${modifier < 0 ? "" : "+"}${modifier}</p>
                    <div class="score-box--modifier">
                        <p>${scoreValues[i2]}</p>
                    </div>
                </div>
            `);
    }
  }, `#scores--${creature.index}`);
  return `
        <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
    `;
}

// src/components/creaturesModal/creatureActions.ts
var renderCreatureActions = (creature) => {
  let i2 = 0;
  creature.actions.forEach((action) => {
    document.getElementById(`actions--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ""}
                <span id="${creature.index}-${action.name}-${i2}"></span>
            </div>
        `);
    i2++;
  });
  i2 = 0;
  creature.actions.forEach((action) => {
    let element = document.getElementById(`${creature.index}-${action.name}-${i2}`);
    element.classList.add("actions__box--dmg_dice");
    action.damage.forEach((dmg) => {
      element.insertAdjacentHTML("beforeend", `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
    });
    i2++;
  });
};
function creatureActions(creature) {
  ready(() => {
    renderCreatureActions(creature);
  }, `#actions--${creature.index}`);
  return `
        <div class="creatures-window__body--actions">
            <h4>Actions</h4>
            <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
        </div>
    `;
}

// src/components/creaturesModal/creatureLegActions.ts
var renderCreatureLegActions = (creature) => {
  let i2 = 0;
  creature.legActions.forEach((action) => {
    document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ""}
                <span id="${creature.index}-${action.name}-${i2}"></span>
            </div>
        `);
    i2++;
  });
  i2 = 0;
  creature.legActions.forEach((action) => {
    let element = document.getElementById(`${creature.index}-${action.name}-${i2}`);
    element.classList.add("legendary-actions__box--dmg_dice");
    action.damage.forEach((dmg) => {
      if (dmg.damageDice) {
        element.insertAdjacentHTML("beforeend", `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
      }
    });
    i2++;
  });
};
function creatureLegActions(creature) {
  ready(() => {
    renderCreatureLegActions(creature);
  }, `#legendary-actions--${creature.index}`);
  return `
        <div class="creatures-window__body--actions">
            <h4>Legendary Actions</h4>
            <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
        </div>
    `;
}

// src/components/creaturesModal/creatureProficiencies.ts
function creatureProficiencies(creature) {
  ready(() => {
    const { proficiencies, skills: skills2 } = getCreatureProficiencyData(creature);
    document.getElementById(`proficiencies--${creature.index}`).insertAdjacentHTML("beforeend", `
            ${proficiencies && `<p><span class="bold">Saving Throws</span> ${proficiencies}</p>`}
        `);
    document.getElementById(`skills--${creature.index}`).insertAdjacentHTML("beforeend", `
            ${skills2 && `<p><span class="bold">Skills</span> ${skills2}</p>`}
        `);
  }, `#skills--${creature.index}`);
  return `
        <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
        <div class="creature-stats-window__proficiencies" id="skills--${creature.index}"></div>
    `;
}

// src/components/creaturesModal/creatureSenses.ts
function creatureSenses(creature) {
  ready(() => {
    const senses = getCreatureSensesData(creature);
    document.getElementById(`senses--${creature.index}`).insertAdjacentHTML("beforeend", `
            ${senses && `<p><span class="bold">Senses</span> ${senses}</p>`}
        `);
  }, `#senses--${creature.index}`);
  return `
        <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
    `;
}

// src/components/creaturesModal/creatureSpeeds.ts
function creatureSpeeds(creature) {
  ready(() => {
    const speeds = getCreatureSpeedData(creature);
    const text = document.getElementById(`speed--${creature.index}`).appendChild(document.createElement("p"));
    text.insertAdjacentHTML("beforeend", `<span class="bold">Speed </span>`);
    speeds.forEach((speed) => {
      text.insertAdjacentHTML("beforeend", `
                ${speed.name} ${speed.value} ft.,
            `);
    });
  }, `#speed--${creature.index}`);
  return `
        <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
    `;
}

// src/components/creaturesModal/creatureVulRes.ts
function creatureVulRes(creature) {
  ready(() => {
    const { vul, res, dmgImmune, conImmune } = getCreatureVulResData(creature);
    document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML("beforeend", `
            ${vul && `<p><span class="bold">Vulnerabilities</span> ${vul}</p>`}
            ${res && `<p><span class="bold">Resistances</span> ${res}</p>`}
            ${dmgImmune && `<p><span class="bold">Damage Immunities</span> ${dmgImmune}</p>`}
            ${conImmune && `<p><span class="bold">Condition Immunities</span> ${conImmune}</p>`}
        `);
  }, `#vul-res--${creature.index}`);
  return `
        <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
    `;
}

// src/components/creaturesModal/creatureStats.ts
var creatureIndexList = [];
var openCreatureStatsWindow = async (index, custom) => {
  for (let listItem of creatureIndexList) {
    if (listItem === index) {
      document.getElementById(`${index}-modal`).remove();
      creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
      return;
    }
  }
  creatureIndexList.push(index);
  let creature = await getCreatureByIndex(index, custom);
  renderCreatureStatsWindow(creature);
  bindEventsToCreatureStatsWindow(creature);
};
var renderCreatureStatsWindow = (creature) => {
  document.querySelector("body").insertAdjacentHTML("beforeend", modal(creature.index, creatureStatsWindowHeader(creature)));
  const creatureStatsModal = document.getElementById(`${creature.index}-modal`);
  const modalBody = document.getElementById(`${creature.index}-modal__body`);
  creatureStatsModal.classList.add("modal--offset");
  modalBody.classList.add("creature-stats-window");
  modalBody.classList.add(`creature-stats-window--${creature.index}`);
  modalBody.insertAdjacentHTML("beforeend", creatureStatsWindow(creature));
  makeDraggable(creatureStatsModal, `#creature-stats-window--${creature.index}__header`);
};
var bindEventsToCreatureStatsWindow = (creature) => {
  document.getElementById(`${creature.index}-modal-close-btn`).addEventListener("click", () => {
    document.getElementById(`${creature.index}-modal`).remove();
    creatureIndexList.splice(creatureIndexList.indexOf(creature.index), 1);
  });
};
var creatureStatsWindowHeader = (creature) => `
    <div class="creature-stats-window__header" id="creature-stats-window--${creature.index}__header">
        <h3>${creature.name}</h3>
        <p>${creature.size ? `${creature.size}` : ""}${creature.type ? ` ${creature.type}` : ""}${creature.alignment ? `, ${creature.alignment}` : ""}</p>
    </div>
`;
var creatureStatsWindow = (creature) => `
    <div class="creature-stats-content">
        <div class="creature-stats-window__body">
            <p><span class="bold">Armor Class</span> ${creature.ac}</p>
            <p><span class="bold">Health</span> ${creature.hit_points} ${creature.hit_dice ? `(${creature.hit_dice})` : ""}</p>
            ${creatureSpeeds(creature)}
            <div class="creatures-window__body--general-stats">
                ${creatureAbilityScores(creature)}
                ${creatureProficiencies(creature)}
                ${creatureVulRes(creature)}
                ${creatureSenses(creature)}
                <div class="creature-stats-window__languages">
                    ${creature.languages ? `<p><span class="bold">Languages</span> ${creature.languages}</p>` : ``}
                </div>
                <div class="creature-stats-window__body">
                    <p><span class="bold">Challenge</span> ${creature.cr ? creature.cr : "-"} (${creature.xp ? creature.xp : 0} XP)</p>
                </div>
            </div>
            ${creatureAbilities(creature)}
            ${creature.actions.length > 0 ? creatureActions(creature) : ""}
            ${creature.legActions.length > 0 ? creatureLegActions(creature) : ""}
        </div>
    </div>
`;

// src/components/creaturesModal/creatureRow.ts
var bindEventsToCreatureRow = (creature, creatureId, custom) => {
  const creatureRow2 = document.getElementById(`${creatureId}`);
  if (custom) {
    document.getElementById(`${creatureId}-trash`).addEventListener("click", () => {
      deleteCreature(creature.id);
      creatureRow2.remove();
    });
  }
  creatureRow2.addEventListener("click", () => {
    openCreatureStatsWindow(creature.index, custom);
  });
};
var renderCreatureRowContent = (creature, creatureId, custom) => {
  const creatureRow2 = document.getElementById(creatureId);
  creatureRow2.insertAdjacentHTML("beforeend", `
        <p>${creature.name}</p>
        ${custom ? `<i class="fa-solid fa-trash-can creature-row__delete-btn" id="${creatureId}-trash"></i>` : ""}
    `);
};
function creatureRow({ creature, custom, index }) {
  const creatureId = `creature-${index}`;
  ready(() => {
    renderCreatureRowContent(creature, creatureId, custom);
    bindEventsToCreatureRow(creature, creatureId, custom);
  }, `#${creatureId}`);
  return `
        <div class="creature-row" id="${creatureId}"></div>
    `;
}

// src/scripts/submitNewCreature.ts
var submitCreatureForm = (e) => {
  e.preventDefault();
  const { proficiencies, senses, abilities, actions, legActions } = getArrayInputValues();
  const { creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb } = getInputValues();
  toggleNewCreatureForm();
  const newCreature = new CreatureFormData(indexConverter(creatureFormName), "https://www.dandwiki.com/w/images/3/37/BreadSpawn.jpg", creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, parseInt(creatureFormAc), parseInt(creatureFormHitPoints), creatureFormHitDice, parseInt(creatureFormStr), parseInt(creatureFormDex), parseInt(creatureFormCon), parseInt(creatureFormInt), parseInt(creatureFormWis), parseInt(creatureFormChar), creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, parseInt(creatureFormCr), parseInt(creatureFormXp), parseInt(creatureFormWalk), parseInt(creatureFormSwim), parseInt(creatureFormBurrow), parseInt(creatureFormFly), parseInt(creatureFormClimb), proficiencies, senses, abilities, actions, legActions);
  addCreature(newCreature);
};
var getArrayInputValues = () => {
  let proficiencies = [];
  let senses = [];
  let abilities = [];
  let actions = [];
  let legActions = [];
  let proficiencyName = document.getElementsByClassName("creature-inputs__proficiency-name");
  let proficiencyValue = document.getElementsByClassName("creature-inputs__proficiency-value");
  let senseName = document.getElementsByClassName("creature-inputs__sense-name");
  let senseValue = document.getElementsByClassName("creature-inputs__sense-value");
  let abilityName = document.getElementsByClassName("creature-inputs__ability-name");
  let abilityDesc = document.getElementsByClassName("creature-inputs__ability-desc");
  let actionName = document.getElementsByClassName("creature-inputs__action-name");
  let actionDesc = document.getElementsByClassName("creature-inputs__action-desc");
  let legActionName = document.getElementsByClassName("creature-inputs__leg-action-name");
  let legActionDesc = document.getElementsByClassName("creature-inputs__leg-action-desc");
  for (let i2 = 0; i2 < proficiencyName.length; i2++) {
    if (proficiencyName[i2].value !== "" || proficiencyValue[i2].value !== "") {
      proficiencies.push({ name: proficiencyName[i2].value, value: proficiencyValue[i2].value });
    }
  }
  for (let i2 = 0; i2 < senseName.length; i2++) {
    if (senseName[i2].value !== "" || senseValue[i2].value !== "") {
      senses.push({ name: senseName[i2].value, value: senseValue[i2].value });
    }
  }
  for (let i2 = 0; i2 < abilityName.length; i2++) {
    if (abilityName[i2].value !== "" || abilityDesc[i2].value !== "") {
      abilities.push({ name: abilityName[i2].value, desc: abilityDesc[i2].value });
    }
  }
  for (let i2 = 0; i2 < actionName.length; i2++) {
    if (actionName[i2].value !== "" || actionDesc[i2].value !== "") {
      actions.push({ name: actionName[i2].value, desc: actionDesc[i2].value });
    }
  }
  for (let i2 = 0; i2 < legActionName.length; i2++) {
    if (legActionName[i2].value !== "" || legActionDesc[i2].value !== "") {
      legActions.push({ name: legActionName[i2].value, desc: legActionDesc[i2].value });
    }
  }
  return { proficiencies, senses, abilities, actions, legActions };
};
var getInputValues = () => {
  let creatureFormName, creatureFormSize = "medium", creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb;
  creatureFormName = document.getElementById("new-creature-input--name").value;
  creatureFormSize = document.getElementById("new-creature-input--size").value;
  creatureFormType = document.getElementById("new-creature-input--type").value;
  creatureFormAlignment = document.getElementById("new-creature-input--alignment").value;
  creatureFormAc = document.getElementById("new-creature-input--ac").value;
  creatureFormHitPoints = document.getElementById("new-creature-input--hit-points").value;
  creatureFormHitDice = document.getElementById("new-creature-input--hit-dice").value;
  creatureFormStr = document.getElementById("new-creature-input--str").value;
  creatureFormDex = document.getElementById("new-creature-input--dex").value;
  creatureFormCon = document.getElementById("new-creature-input--con").value;
  creatureFormInt = document.getElementById("new-creature-input--int").value;
  creatureFormWis = document.getElementById("new-creature-input--wis").value;
  creatureFormChar = document.getElementById("new-creature-input--char").value;
  creatureFormVul = document.getElementById("new-creature-input--vul").value;
  creatureFormRes = document.getElementById("new-creature-input--res").value;
  creatureFormDmgImmune = document.getElementById("new-creature-input--dmg-immune").value;
  creatureFormConImmune = document.getElementById("new-creature-input--dmg-immune").value;
  creatureFormLanguages = document.getElementById("new-creature-input--languages").value;
  creatureFormCr = document.getElementById("new-creature-input--cr").value;
  creatureFormXp = document.getElementById("new-creature-input--xp").value;
  creatureFormWalk = document.getElementById("new-creature-input--walk").value;
  creatureFormSwim = document.getElementById("new-creature-input--swim").value;
  creatureFormBurrow = document.getElementById("new-creature-input--burrow").value;
  creatureFormFly = document.getElementById("new-creature-input--fly").value;
  creatureFormClimb = document.getElementById("new-creature-input--climb").value;
  return { creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb };
};
var CreatureFormData = class {
  index;
  image;
  name;
  size;
  type;
  alignment;
  ac;
  hp;
  hitDice;
  str;
  dex;
  con;
  int;
  wis;
  char;
  vul;
  res;
  dmgImmune;
  conImmune;
  languages;
  cr;
  xp;
  speeds;
  proficiencies;
  senses;
  abilities;
  actions;
  legActions;
  walk;
  swim;
  burrow;
  fly;
  climb;
  constructor(index, image, name, size, type, alignment, ac, hp, hitDice, str, dex, con, int, wis, char, vul, res, dmgImmune, conImmune, languages, cr, xp, walk, swim, burrow, fly, climb, proficiencies, senses, abilities, actions, legActions) {
    this.index = index;
    this.image = image;
    this.name = name;
    this.size = size;
    this.type = type;
    this.alignment = alignment;
    ac || ac === 0 ? this.ac = ac : this.ac = 0;
    hp || hp === 0 ? this.hp = hp : this.hp = 0;
    this.hitDice = hitDice;
    str || str === 0 ? this.str = str : this.str = 10;
    dex || dex === 0 ? this.dex = dex : this.dex = 10;
    con || con === 0 ? this.con = con : this.con = 10;
    int || int === 0 ? this.int = int : this.int = 10;
    wis || wis === 0 ? this.wis = wis : this.wis = 10;
    char || char === 0 ? this.char = char : this.char = 10;
    this.vul = vul;
    this.res = res;
    this.dmgImmune = dmgImmune;
    this.conImmune = conImmune;
    this.languages = languages;
    this.cr = cr;
    this.xp = xp;
    this.walk = walk;
    this.swim = swim;
    this.fly = fly;
    this.burrow = burrow;
    this.climb = climb;
    this.proficiencies = proficiencies;
    this.senses = senses;
    this.abilities = abilities;
    this.actions = actions;
    this.legActions = legActions;
  }
};

// src/components/newCreatureForm.ts
var creatureFormOpen = false;
var toggleNewCreatureForm = () => {
  creatureFormOpen = !creatureFormOpen;
  if (creatureFormOpen) {
    renderNewCreatureFormModal();
    bindEventsToNewCreatureForm();
  } else {
    document.querySelector(".creatures-window-form").remove();
  }
};
var bindEventsToNewCreatureForm = () => {
  document.getElementById("new-creature-form-modal-close-btn").addEventListener("click", () => {
    toggleNewCreatureForm();
  });
  document.getElementById("creatures-window-form").addEventListener("submit", (e) => {
    submitCreatureForm(e);
  });
};
var renderNewCreatureFormModal = () => {
  document.querySelector("body").insertAdjacentHTML(
    "beforeend",
    modal("new-creature-form", newCreatureFormHeaderHtml())
  );
  const window2 = document.getElementById("new-creature-form-modal");
  const modalBody = document.getElementById("new-creature-form-modal__body");
  window2.classList.add("creatures-window-form");
  modalBody.insertAdjacentHTML("beforeend", creatureFormBodyHtml());
  disableHotkeys();
  makeDraggable(window2, ".creatures-window-form__header");
};
var newCreatureFormHeaderHtml = () => `
    <div class="creatures-window-form__header modal__header">
        <h2>New Creature</h2>
    </div>
`;
var creatureFormBodyHtml = () => `
    <div class="creatures-content">
        <form class="creatures-window-form__body" id="creatures-window-form">
            <label>Token
                <input type="file">
            </label>
            <div class="creatures-window-form__body--box">
                <label>Name
                    <input required id="new-creature-input--name">
                </label>
                <label>Size
                    <select id="new-creature-input--size">
                        <option value="tiny">Tiny</option>
                        <option value="small">Small</option>
                        <option value="medium" selected>Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                        <option value="gargantuan">Gargantuan</option>
                    </select>
                </label>
                <label>Type
                    <input class="input--md" id="new-creature-input--type">
                </label>
                <label>Alignment
                    <input class="input--sm" id="new-creature-input--alignment">
                </label>
                <label>AC
                    <input class="input--sm" type="number" id="new-creature-input--ac">
                </label>
                <label>Hit Points
                    <input class="input--sm" type="number" id="new-creature-input--hit-points">
                </label>
                <label>Hit Dice
                    <input class="input--sm" id="new-creature-input--hit-dice">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--speed">
                        <label>Movement
                            <div class="flex-container">
                                <p>Walk</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--walk">
                            </div>
                            <div class="flex-container">
                                <p>Swim</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--swim">
                            </div>
                            <div class="flex-container">
                                <p>Burrow</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--burrow">
                            </div>
                            <div class="flex-container">
                                <p>Fly</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--fly">
                            </div>
                            <div class="flex-container">
                                <p>Climb</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--climb">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Str
                    <input class="input--sm" type="number" id="new-creature-input--str" placeholder="10">
                </label>
                <label>Dex
                    <input class="input--sm" type="number" id="new-creature-input--dex" placeholder="10">
                </label>
                <label>Con
                    <input class="input--sm" type="number" id="new-creature-input--con" placeholder="10">
                </label>
                <label>Int
                    <input class="input--sm" type="number" id="new-creature-input--int" placeholder="10">
                </label>
                <label>Wis
                    <input class="input--sm" type="number" id="new-creature-input--wis" placeholder="10">
                </label>
                <label>Char
                    <input class="input--sm" type="number" id="new-creature-input--char" placeholder="10">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--proficiency">
                        <label>Proficiencies
                            <div class="flex-container">
                                <input placeholder="Perception" class="input--md creature-inputs__proficiency-name">
                                <input placeholder="6" type="number" class="input--sm creature-inputs__proficiency-value">
                            </div>
                        </label>
                    </div>
                    <button type="button" onclick="addInputs('proficiency')" class="creature-form__btn--input">Add proficiency</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Vulnerabilities
                    <textarea rows="3" cols="40" placeholder="fire, thunder" id="new-creature-input--vul"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Resistances
                    <textarea rows="3" cols="40" placeholder="poison, bludgeoning" id="new-creature-input--res"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Damage Immunities
                    <textarea rows="3" cols="40" placeholder="nonmagical slashing" id="new-creature-input--dmg-immune"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Condition Immunities
                    <textarea rows="3" cols="40" placeholder="prone, restrained" id="new-creature-input--con-immune"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--sense">
                        <label>Senses
                            <div class="flex-container">
                                <input placeholder="Darkvision" class="input--md creature-inputs__sense-name">
                                <input placeholder="60" type="number" class="input--sm creature-inputs__sense-value">
                            </div>
                        </label>
                    </div>
                    <button type="button" onclick="addInputs('sense')" class="creature-form__btn--input">Add sense</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Languages
                    <textarea rows="3" cols="40" id="new-creature-input--languages"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>CR
                    <input type="number" class="input--sm" id="new-creature-input--cr">
                </label>
                <label>XP
                    <input type="number" class="input--sm" id="new-creature-input--xp">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--ability">
                        <label>Special Abilities
                            <input placeholder="Ability name" class="input--md creature-inputs__ability-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__ability-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('ability')" class="creature-form__btn--input">Add ability</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--action">
                        <label>Actions
                            <input placeholder="Action name" class="input--md creature-inputs__action-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__action-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('action')" class="creature-form__btn--input">Add action</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--leg-action">
                        <label>Legendary Actions
                            <input placeholder="Action name" class="input--md creature-inputs__leg-action-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__leg-action-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('leg-action')" class="creature-form__btn--input">Add Legendary action</button>
                </div>
            </div>
            <br/>
            <button type="submit">Add Creature</button>
        </form>
    </div>
`;

// src/components/creaturesModal/creaturesModal.ts
var creaturesOpen = false;
var toggleCreaturesModal = () => {
  creaturesOpen = !creaturesOpen;
  if (creaturesOpen) {
    renderCreaturesModal();
    renderCreatureRows("all");
    bindEventsToModal();
  } else {
    document.getElementById("creatures-modal").remove();
  }
};
var creaturesBodyHeaderHtml = () => `
    <div class="creatures-modal__header modal__header">
        <h2>Creatures</h2>
    </div>
    <div class="modal__filters">
        <label>
            <select id="creatures-list-filter">
                <option value="all">All creatures</option>
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
            </select>
        </label>
        <form id="creatures-modal-search-submit">
            <label class="relative">
                <input placeholder="search" id="creatures-modal-search">
                <button type="submit" class="btn--search"><i class="fa-solid fa-magnifying-glass"></i></button>
            </label>
        </form>
        <button class="btn--hover" id="new-creature-btn">New Creature</button>
    </div>
`;
var renderCreaturesModal = () => {
  document.querySelector("body").insertAdjacentHTML("beforeend", modal("creatures", creaturesBodyHeaderHtml()));
  const window2 = document.getElementById("creatures-modal");
  disableHotkeys();
  makeDraggable(window2, ".creatures-modal__header");
};
var renderCreatureRows = async (value2) => {
  let index = 0;
  if (value2 === "all" || value2 === "custom") {
    const customCreatures = await getCustomCreatures();
    customCreatures.forEach((creature) => {
      document.getElementById("creatures-modal__body").insertAdjacentHTML(
        "beforeend",
        creatureRow({ creature, custom: true, index })
      );
      index += 1;
    });
  }
  if (value2 === "all" || value2 === "standard") {
    const creatures = await getCreatures();
    creatures.forEach((creature) => {
      document.getElementById("creatures-modal__body").insertAdjacentHTML(
        "beforeend",
        creatureRow({ creature, custom: false, index })
      );
      index += 1;
    });
  }
};
var filterCreaturesList = async () => {
  let index = 0;
  document.getElementById("creatures-modal__body").innerHTML = "";
  const selectedFilter = document.getElementById("creatures-list-filter").value;
  const value2 = document.getElementById("creatures-modal-search").value;
  if (selectedFilter === "all" || selectedFilter === "custom") {
    const customCreatures = await getCustomCreatures();
    customCreatures.forEach((creature) => {
      if (creature.name.toLowerCase().includes(value2.toLowerCase())) {
        document.getElementById("creatures-modal__body").insertAdjacentHTML(
          "beforeend",
          creatureRow({ creature, custom: true, index })
        );
        index += 1;
      }
    });
  }
  if (selectedFilter === "all" || selectedFilter === "standard") {
    const creatures = await getCreatures();
    creatures.forEach((creature) => {
      if (creature.name.toLowerCase().includes(value2.toLowerCase())) {
        document.getElementById("creatures-modal__body").insertAdjacentHTML(
          "beforeend",
          creatureRow({ creature, custom: false, index })
        );
        index += 1;
      }
    });
  }
};
var bindEventsToModal = () => {
  document.getElementById("creatures-modal-close-btn").addEventListener("click", () => {
    toggleCreaturesModal();
  });
  document.getElementById("creatures-list-filter").addEventListener("change", () => {
    filterCreaturesList();
  });
  document.getElementById("creatures-modal-search-submit").addEventListener("submit", (e) => {
    e.preventDefault();
    filterCreaturesList();
  });
  document.getElementById("new-creature-btn").addEventListener("click", () => {
    toggleNewCreatureForm();
  });
};

// src/controllers/tokensController.ts
var import_axios6 = __toESM(require_axios2());
var tokens;
var getTokens = async () => {
  try {
    const res = await import_axios6.default.get("/api/tokens");
    tokens = res.data;
  } catch (err) {
    console.log(err);
  }
};

// src/components/tokensMenu.ts
var toggleTokenMenu = () => {
  setMenuOpenValue(!menuOpen);
  if (menuOpen) {
    setSelectedMenuValue("tokens");
    document.querySelector(".game-page").insertAdjacentHTML("beforeend", `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
    document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu("tokens"));
    getTokenBodyData();
  } else {
    closeMenu("tokens");
  }
};
var getTokenBodyData = async () => {
  await getTokens();
  let i2 = 0;
  tokens.forEach((token) => {
    if (token.creature) {
      document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" id="token-${i2}" relative=${token.creature}>
                    <button class="menu__item--circle-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                </div>
            `);
    } else {
      document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" id="token-${i2}">
                </div>
            `);
    }
    document.getElementById(`token-${i2}`).addEventListener("dragstart", (e) => {
      placeToken(e.target, token.size);
    });
    i2++;
  });
};
var placeToken = (token, size) => {
  token.classList.add("token--dragging");
  token.setAttribute("size", `${size}`);
};
var resetTokenBodyData = () => {
  const deleteList = [];
  Array.from(document.getElementsByClassName("menu__item")).forEach((token) => {
    deleteList.push(token);
  });
  Array.from(document.getElementsByClassName("menu__item--circle-btn")).forEach((btn) => {
    deleteList.push(btn);
  });
  Array.from(document.getElementsByClassName("menu__body--container")).forEach((box) => {
    deleteList.push(box);
  });
  deleteList.forEach((el) => {
    el.remove();
  });
  getTokenBodyData();
};

// node_modules/engine.io-parser/build/esm/commons.js
var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = { type: "error", data: "parser error" };

// node_modules/engine.io-parser/build/esm/encodePacket.browser.js
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
var encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ""));
};
var encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};
var encodePacket_browser_default = encodePacket;

// node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i2 = 0; i2 < chars.length; i2++) {
  lookup[chars.charCodeAt(i2)] = i2;
}
var decode = (base64) => {
  let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// node_modules/engine.io-parser/build/esm/decodePacket.browser.js
var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
var decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};
var decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer2) {
    const decoded = decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
var mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data;
  }
};
var decodePacket_browser_default = decodePacket;

// node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket_browser_default(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
var decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket_browser_default(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
var protocol = 4;

// node_modules/@socket.io/component-emitter/index.mjs
function Emitter(obj) {
  if (obj)
    return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};

// node_modules/engine.io-client/build/esm/globalThis.browser.js
var globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();

// node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
var NATIVE_SET_TIMEOUT = setTimeout;
var NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = clearTimeout.bind(globalThisShim);
  }
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0, length2 = 0;
  for (let i2 = 0, l = str.length; i2 < l; i2++) {
    c = str.charCodeAt(i2);
    if (c < 128) {
      length2 += 1;
    } else if (c < 2048) {
      length2 += 2;
    } else if (c < 55296 || c >= 57344) {
      length2 += 3;
    } else {
      i2++;
      length2 += 4;
    }
  }
  return length2;
}

// node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
};
var Transport = class extends Emitter {
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }
    return this;
  }
  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
    }
  }
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  onData(data) {
    const packet = decodePacket_browser_default(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
};

// node_modules/engine.io-client/build/esm/contrib/yeast.js
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
var length = 64;
var map = {};
var seed = 0;
var i = 0;
var prev;
function encode(num) {
  let encoded = "";
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
function yeast() {
  const now = encode(+new Date());
  if (now !== prev)
    return seed = 0, prev = now;
  return now + "." + encode(seed++);
}
for (; i < length; i++)
  map[alphabet[i]] = i;

// node_modules/engine.io-client/build/esm/contrib/parseqs.js
function encode2(obj) {
  let str = "";
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
}
function decode2(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
    let pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

// node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
}
var hasCORS = value;

// node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
function XHR(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {
  }
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/polling.js
function empty() {
}
var hasXHR2 = function() {
  const xhr = new XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
var Polling = class extends Transport {
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  onData(data) {
    const callback = (packet) => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({ description: "transport closed by the server" });
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {
      }
    }
  }
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    const encodedQuery = encode2(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
};
var Request = class extends Emitter {
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = void 0 !== opts.data ? opts.data : null;
    this.create();
  }
  create() {
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;
    const xhr = this.xhr = new XHR(opts);
    try {
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e) {
      }
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {
      }
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        if (4 !== xhr.readyState)
          return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  }
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  abort() {
    this.cleanup();
  }
};
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request.requests) {
    if (Request.requests.hasOwnProperty(i2)) {
      Request.requests[i2].abort();
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
var nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
var usingBrowserWebSocket = true;
var defaultBinaryType = "arraybuffer";

// node_modules/engine.io-client/build/esm/transports/websocket.js
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var WS = class extends Transport {
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
    this.addEventListeners();
  }
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = (closeEvent) => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket_browser_default(packet, this.supportsBinary, (data) => {
        const opts = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        try {
          if (usingBrowserWebSocket) {
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";
    if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    const encodedQuery = encode2(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  check() {
    return !!WebSocket;
  }
};

// node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
  websocket: WS,
  polling: Polling
};

// node_modules/engine.io-client/build/esm/contrib/parseuri.js
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(str) {
  const src = str, b = str.indexOf("["), e = str.indexOf("]");
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
  }
  let m = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m[i2] || "";
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.substr(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.substr(path.length - 1, 1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

// node_modules/engine.io-client/build/esm/socket.js
var Socket = class extends Emitter {
  constructor(uri, opts = {}) {
    super();
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parse(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: true
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
    if (typeof this.opts.query === "string") {
      this.opts.query = decode2(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        addEventListener("beforeunload", () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        }, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = protocol;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    });
    return new transports[name](opts);
  }
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
  }
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed)
              return;
            if ("closed" === this.readyState)
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport.open();
  }
  onOpen() {
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
      let i2 = 0;
      const l = this.upgrades.length;
      for (; i2 < l; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {
    }
  }
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
      const data = this.writeBuffer[i2].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i2 > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i2);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  onError(err) {
    Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
};
Socket.protocol = protocol;

// node_modules/engine.io-client/build/esm/index.js
var protocol2 = Socket.protocol;

// node_modules/socket.io-client/build/esm/url.js
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parse(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  Decoder: () => Decoder,
  Encoder: () => Encoder,
  PacketType: () => PacketType,
  protocol: () => protocol3
});

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/is-binary.js
var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
var isView2 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l = obj.length; i2 < l; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/binary.js
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = void 0;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num];
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/index.js
var protocol3 = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
var Encoder = class {
  constructor(replacer) {
    this.replacer = replacer;
  }
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }
    return [this.encodeAsString(obj)];
  }
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
};
var Decoder = class extends Emitter {
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  decodeString(str) {
    let i2 = 0;
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === void 0) {
      throw new Error("unknown packet type " + p.type);
    }
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    if ("/" === str.charAt(i2 + 1)) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if ("," === c)
          break;
        if (i2 === str.length)
          break;
      }
      p.nsp = str.substring(start, i2);
    } else {
      p.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if ("" !== next && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if (null == c || Number(c) != c) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = this.tryParse(str.substr(i2));
      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === "object";
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }
};
var BinaryReconstructor = class {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
};

// node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

// node_modules/socket.io-client/build/esm/socket.js
var RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1
});
var Socket2 = class extends Emitter {
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    if (this.io._autoConnect)
      this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if ("open" === this.io._readyState)
      this.onopen();
    return this;
  }
  open() {
    return this.connect();
  }
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {
    } else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  _registerAckCallback(id, ack) {
    const timeout = this.flags.timeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this.packet({ type: PacketType.CONNECT, data });
      });
    } else {
      this.packet({ type: PacketType.CONNECT, data: this.auth });
    }
  }
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
  }
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          const id = packet.data.sid;
          this.onconnect(id);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
  }
  ack(id) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id,
        data: args
      });
    };
  }
  onack(packet) {
    const ack = this.acks[packet.id];
    if ("function" === typeof ack) {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
    }
  }
  onconnect(id) {
    this.id = id;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  close() {
    return this.disconnect();
  }
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
};

// node_modules/socket.io-client/build/esm/contrib/backo2.js
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff.prototype.setMax = function(max) {
  this.max = max;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};

// node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || esm_exports;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v;
    return this;
  }
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket(this.uri, this.opts);
    const socket2 = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket2, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const errorSub = on(socket2, "error", (err) => {
      self2.cleanup();
      self2._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        self2.maybeReconnectOnOpen();
      }
    });
    if (false !== this._timeout) {
      const timeout = this._timeout;
      if (timeout === 0) {
        openSubDestroy();
      }
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        socket2.close();
        socket2.emit("error", new Error("timeout"));
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  connect(fn) {
    return this.open(fn);
  }
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket2 = this.engine;
    this.subs.push(on(socket2, "ping", this.onping.bind(this)), on(socket2, "data", this.ondata.bind(this)), on(socket2, "error", this.onerror.bind(this)), on(socket2, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error");
    }
  }
  ondecoded(packet) {
    this.emitReserved("packet", packet);
  }
  onerror(err) {
    this.emitReserved("error", err);
  }
  socket(nsp, opts) {
    let socket2 = this.nsps[nsp];
    if (!socket2) {
      socket2 = new Socket2(this, nsp, opts);
      this.nsps[nsp] = socket2;
    }
    return socket2;
  }
  _destroy(socket2) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket3 = this.nsps[nsp];
      if (socket3.active) {
        return;
      }
    }
    this._close();
  }
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
  }
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
};

// node_modules/socket.io-client/build/esm/index.js
var cache = {};
function lookup2(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup2, {
  Manager,
  Socket: Socket2,
  io: lookup2,
  connect: lookup2
});

// src/scripts/socket-io.ts
var socket = lookup2();
var emitServerEvent = (event, params) => {
  socket.emit(event, ...params);
};
var onServerEvent = (event, fn) => {
  socket.on(event, fn);
};

// src/scripts/token.ts
var mousePos = { x: 0, y: 0 };
var lastPos;
var Token = class {
  id;
  image;
  size;
  relative;
  constructor(id, image, size, relative) {
    this.id = id;
    this.image = image;
    this.size = size;
    this.relative = relative;
  }
};
var addTokenToBoard = (selectedCell) => {
  const menuToken = document.querySelector(".token--dragging");
  menuToken.classList.remove("token--dragging");
  const newToken = new Token(parseInt(menuToken.id), menuToken.getAttribute("src"), parseInt(menuToken.getAttribute("size")), menuToken.getAttribute("relative"));
  if (!parseInt(selectedCell.getAttribute("x"))) {
    menuToken.classList.remove("menu__item");
    menuToken.classList.remove("menu__item--token");
    socketPlaceToken({ x: lastPos.x, y: lastPos.y }, newToken, user.username, room);
  }
  if (!(selectedCell.childNodes.length > 0)) {
    menuToken.classList.remove("menu__item");
    menuToken.classList.remove("menu__item--token");
    socketPlaceToken({ x: parseInt(selectedCell.getAttribute("x")), y: parseInt(selectedCell.getAttribute("y")) }, newToken, user.username, room);
  }
};
var socketPlaceToken = (coords, tokenData, username, room2) => {
  emitServerEvent("PLACE_TOKEN", [coords, tokenData, username, room2]);
};
var addTokenEvents = (token, relative) => {
  token.addEventListener("dragstart", (e) => {
    const tokenPos = token.getBoundingClientRect();
    mousePos = {
      x: e.x - tokenPos.x,
      y: e.y - tokenPos.y
    };
    placeToken(token, parseInt(token.getAttribute("size")));
    const cell = token.parentNode;
    lastPos = { x: parseInt(cell.getAttribute("x")), y: parseInt(cell.getAttribute("y")) };
  });
  token.addEventListener("dragend", () => {
    emitServerEvent("REMOVE_TOKEN", [lastPos, room]);
    const size = parseInt(token.getAttribute("size"));
    emitServerEvent("REMOVE_OCCUPIED_TOKEN_SPACE", [lastPos.x, lastPos.y, size, room]);
  });
};
var occupyTokenSpace = (cellX, cellY, size) => {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = findCell(cellX + x, cellY + y);
      cell.classList.add("occupied--enemy");
      cell.classList.add("occupied");
    }
  }
};
var removeOccupyTokenSpace = (cellX, cellY, size) => {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = findCell(cellX + x, cellY + y);
      cell.classList.remove("occupied--enemy");
      cell.classList.remove("occupied");
    }
  }
};

// src/scripts/gridEvents.ts
var zoomMin = 4;
var zoomMax = 64;
var addGridEvents = (grid2) => {
  let selectedCell;
  grid2.addEventListener("dragover", (e) => {
    selectedCell = e.target;
  });
  document.addEventListener("dragend", () => {
    const relativeCell = findRelativeCell(selectedCell, mousePos.x, mousePos.y);
    const menuToken = document.querySelector(".token--dragging");
    if (menuToken.classList.contains("menu__item")) {
      addTokenToBoard(selectedCell);
    } else {
      addTokenToBoard(relativeCell || selectedCell);
    }
  });
};
var zoomIn = () => {
  const grid2 = document.querySelector(".grid");
  const rs = getComputedStyle(grid2);
  const zoomValue = parseInt(rs.getPropertyValue("--size"));
  grid2.style.setProperty("--size", `${clamp(zoomValue + 4, zoomMin, zoomMax)}px`);
};
var zoomOut = () => {
  const grid2 = document.querySelector(".grid");
  const rs = getComputedStyle(grid2);
  const zoomValue = parseInt(rs.getPropertyValue("--size"));
  grid2.style.setProperty("--size", `${clamp(zoomValue - 4, zoomMin, zoomMax)}px`);
};

// src/scripts/gridInput.ts
var canScale = false;
var targetPosX;
var targetPosY;
var movedPosX;
var movedPosY;
var mouseStartX;
var mouseStartY;
var dragging = false;
var position;
var bindEventsToGrid = () => {
  handleGridKeyEvents();
  handleGridMouseEvents();
  handleGridWheelEvents();
};
var handleGridKeyEvents = () => {
  document.addEventListener("keydown", (e) => {
    if (canUseHotkey) {
      switch (true) {
        case (e.key === "Meta" || e.key === "Control"):
          canScale = true;
          break;
        case e.key === "Delete":
          for (const _token of Array.from(document.getElementsByClassName("token"))) {
            if (_token.classList.contains("token--selected"))
              _token.remove();
          }
          break;
        case e.key === "1":
          clientType === "dm" ? toggleMapMenu() : toggleCharacterMenu();
          break;
        case e.key === "2":
          clientType === "dm" ? toggleTokenMenu() : toggleCharacterSheet();
          break;
        case e.key === "3":
          clientType === "dm" ? toggleCreaturesModal() : console.warn("Menu doesn't exist");
          break;
        default:
          break;
      }
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (true) {
      case (e.key === "Meta" || e.key === "ControlLeft"):
        canScale = false;
        break;
      default:
        break;
    }
  });
};
var handleGridMouseEvents = () => {
  document.addEventListener("mousedown", (e) => {
    switch (true) {
      case e.which === 2:
        mouseStartX = e.x;
        mouseStartY = e.y;
        targetPosX = movedPosX ? movedPosX : 0;
        targetPosY = movedPosY ? movedPosY : 0;
        dragging = true;
        break;
      default:
        break;
    }
  });
  document.addEventListener("mouseup", (e) => {
    dragging = false;
    switch (true) {
      case e.which === 2:
        const grid2 = document.querySelector(".grid");
        const { transformX, transformY } = getTransformValues(grid2);
        movedPosX = transformX;
        movedPosY = transformY;
        document.querySelector(".game-page").classList.remove("panning");
        break;
      default:
        break;
    }
  });
  document.addEventListener("mousemove", (e) => {
    const mousePosX = -(mouseStartX - e.x);
    const mousePosY = -(mouseStartY - e.y);
    targetPosX = movedPosX ? movedPosX : 0;
    targetPosY = movedPosY ? movedPosY : 0;
    if (dragging) {
      const grid2 = document.querySelector(".grid");
      position = { x: mousePosX + targetPosX, y: mousePosY + targetPosY };
      grid2.style.transform = `translate(${position.x}px, ${position.y}px)`;
      document.querySelector(".game-page").classList.add("panning");
    }
  });
};
var getTransformValues = (grid2) => {
  let style = window.getComputedStyle(grid2);
  let matrix = new DOMMatrixReadOnly(style.transform);
  return { transformX: matrix.m41, transformY: matrix.m42 };
};
var handleGridWheelEvents = () => {
  document.addEventListener("wheel", (e) => {
    if (!checkForElement(e.path, ".grid-container"))
      return;
    if (e.deltaY > 0 && !canScale) {
      zoomOut();
    } else {
      zoomIn();
    }
  });
};

// src/components/grid.ts
var user;
var setupGrid = (width, height) => {
  const grid2 = document.querySelector(".grid");
  grid2.style.setProperty("--grid-x", width);
  grid2.style.setProperty("--grid-y", height);
  createGridClickDetection(width + 1, height + 1, grid2);
  addGridEvents(grid2);
};
var createGridClickDetection = (width, height, grid2) => {
  resetBoard();
  for (let y = 1; y < height; y++) {
    for (let x = 1; x < width; x++) {
      grid2.insertAdjacentHTML("beforeend", `
                <div class="grid__cell cell" x="${x}" y="${y}"></div>
            `);
    }
  }
};
var resetBoard = () => {
  document.querySelectorAll(".grid__cell").forEach((cell) => {
    cell.remove();
  });
  document.querySelectorAll(".token").forEach((token) => {
    token.remove();
  });
};
onServerEvent("PLACE_TOKEN", (selectedCell, menuToken, username) => {
  const { x, y } = selectedCell;
  const { image, relative, size } = menuToken;
  const token = document.createElement("img");
  const cell = findCell(x, y);
  token.classList.add("token");
  token.setAttribute("src", image);
  token.setAttribute("relative", relative);
  token.setAttribute("user", username);
  token.setAttribute("size", `${size}`);
  cell.appendChild(token);
  token.style.setProperty("height", `calc(var(--size) * ${size})`);
  token.style.setProperty("width", `calc(var(--size) * ${size})`);
  token.style.setProperty("--row", `${x}`);
  token.style.setProperty("--column", `${y}`);
  if (size > 1) {
    occupyTokenSpace(x, y, size);
  } else {
    cell.classList.add("occupied--enemy");
    cell.classList.add("occupied");
  }
  addTokenEvents(token, relative);
  resetTokenBodyData();
});
onServerEvent("REMOVE_OCCUPIED_TOKEN_SPACE", (lastPosX, lastPosY, size) => {
  if (size > 1) {
    removeOccupyTokenSpace(lastPosX, lastPosY, size);
  } else {
    findCell(lastPosX, lastPosY).classList.remove("occupied--enemy");
    findCell(lastPosX, lastPosY).classList.remove("occupied");
  }
});
onServerEvent("REMOVE_TOKEN", (cell) => {
  const newCell = findCell(cell.x, cell.y);
  newCell.innerHTML = "";
});
function grid() {
  ready(async () => {
    user = await getUser();
    emitServerEvent("SET_NAME", [user.username]);
    emitServerEvent("UPDATE_PLAYER_LIST", [room]);
    setupGrid(25, 25);
    bindEventsToGrid();
  }, ".grid");
  return `
        <div class="grid"></div>
    `;
}

// src/components/mapsMenu.ts
var toggleMapMenu = () => {
  setMenuOpenValue(!menuOpen);
  if (menuOpen) {
    setSelectedMenuValue("maps");
    document.querySelector(".game-page").insertAdjacentHTML("beforeend", `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
    document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu("maps"));
    getMapBodyData();
  } else {
    closeMenu("maps");
  }
};
var getMapBodyData = async () => {
  await getMaps();
  maps.forEach((map2) => {
    document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
            <div>
                <img src=${map2.image} class="menu__item menu__item--map" id=${map2.id}>
                <p class="menu__item--name">${map2.name}</p>
            </div>
        `);
    document.getElementById(`${map2.id}`).addEventListener("dblclick", (e) => selectMap(e.target));
  });
  document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
        <div class="menu__item menu__item--map">
            <button class="btn--new-item" id="new-map-btn">New Map</button>
        </div>
    `);
};
var selectMap = (target) => {
  maps.forEach((map2) => {
    if (map2.id === parseInt(target.getAttribute("id"))) {
      emitServerEvent("SELECT_MAP", [{ width: target.clientWidth, height: target.clientHeight }, map2, room]);
    }
  });
};
onServerEvent("SELECT_MAP", (target, map2) => {
  if (map2.name === "Default Map") {
    document.querySelector(".grid").style.setProperty("--map-background", `rgb(237 237 237 / 52%)`);
    setupGrid(25, 25);
  } else {
    document.querySelector(".grid").style.setProperty("--map-background", `url('${map2.image}')`);
    setupGrid(target.width / 2, target.height / 2);
  }
});

// src/scripts/menuManager.ts
var menuOpen = false;
var selectedMenu;
var setMenuOpenValue = (value2) => menuOpen = value2;
var setSelectedMenuValue = (value2) => selectedMenu = value2;
var closeMenu = (menuName) => {
  if (selectedMenu == menuName) {
    document.querySelector(".menu").remove();
    menuOpen = false;
  } else {
    document.querySelector(".menu").remove();
    menuOpen = false;
    switch (menuName) {
      case "tokens":
        toggleTokenMenu();
        break;
      case "maps":
        toggleMapMenu();
        break;
      case "characters":
        toggleCharacterMenu();
        break;
      default:
        break;
    }
  }
};

// src/components/newCharacterForm/newCharacterFormSidebar.ts
var newCharacterFormSidebarOpen = true;
var toggleNewCharacterFormSidebar = () => {
  const sidebar2 = document.querySelector(".new-character-form__sidebar");
  const toggleBtn = document.querySelector(".new-character-form__sidebar-btn--toggle");
  newCharacterFormSidebarOpen = !newCharacterFormSidebarOpen;
  document.querySelectorAll(".new-character-form__sidebar-btn").forEach((btn) => {
    btn.classList.toggle("hidden");
  });
  sidebar2.classList.toggle("new-character-form__sidebar--hidden");
  if (newCharacterFormSidebarOpen) {
    toggleBtn.innerHTML = "<";
  } else {
    toggleBtn.innerHTML = ">";
  }
};
var handleNewCharacterFormSidebarState = () => {
  const toggleBtn = document.querySelector(".new-character-form__sidebar-btn--toggle");
  if (newCharacterFormSidebarOpen) {
    toggleBtn.innerHTML = "<";
  } else {
    toggleBtn.innerHTML = ">";
  }
  bindEventsToNewCharacterFormSidebarButtons();
};
var newCharacterFormSidebarHtml = () => `
    <div class="new-character-form__sidebar">
        ${newCharacterFormSidebarButtons()}
    </div>
`;
var newCharacterFormSidebarButtons = () => `
    <button class="new-character-form__sidebar-btn--toggle" id="new-character-form__sidebar--toggle"><</button>
    <button class="new-character-form__sidebar-btn" id="new-character-sidebar-btn--main">Main</button>
    <button class="new-character-form__sidebar-btn" id="new-character-sidebar-btn--skills">Skills</button>
`;
var bindEventsToNewCharacterFormSidebarButtons = () => {
  document.getElementById("new-character-form__sidebar--toggle").addEventListener("click", () => {
    toggleNewCharacterFormSidebar();
  });
  document.getElementById("new-character-sidebar-btn--main").addEventListener("click", () => {
    determineNewCharacterFormPage("main");
  });
  document.getElementById("new-character-sidebar-btn--skills").addEventListener("click", () => {
    determineNewCharacterFormPage("skills");
  });
};

// src/components/newCharacterForm/newCharacterMain.ts
var renderNewCharacterFormMainPage = (sheetContent) => {
  setNewCharacterFormPage("main");
  sheetContent.insertAdjacentHTML("beforeend", newCharacterFormMainPageHtml());
  bindEventsToFormMainPage();
};
var bindEventsToFormMainPage = () => {
  $("#nc-image").on("change", (e) => {
    newCharacterData.image = e.target.value;
  });
  $("#nc-name").on("change", (e) => {
    newCharacterData.name = e.target.value;
  });
  $("#nc-level").on("change", (e) => {
    newCharacterData.level = e.target.value;
  });
  $("#nc-class").on("change", (e) => {
    newCharacterData.class = e.target.value;
  });
  $("#nc-race").on("change", (e) => {
    newCharacterData.race = e.target.value;
  });
  $("#nc-background").on("change", (e) => {
    newCharacterData.background = e.target.value;
  });
  $("#nc-hit-dice").on("change", (e) => {
    newCharacterData.hit_dice = e.target.value.split("d")[1] || e.target.value;
  });
  $("#nc-ac").on("change", (e) => {
    newCharacterData.ac = e.target.value;
  });
  $("#nc-speed").on("change", (e) => {
    newCharacterData.walk_speed = e.target.value;
  });
  $("#nc-max-health").on("change", (e) => {
    newCharacterData.max_health = e.target.value;
  });
  $("#nc-str").on("change", (e) => {
    newCharacterData.str = e.target.value;
  });
  $("#nc-dex").on("change", (e) => {
    newCharacterData.dex = e.target.value;
  });
  $("#nc-con").on("change", (e) => {
    newCharacterData.con = e.target.value;
  });
  $("#nc-int").on("change", (e) => {
    newCharacterData.int = e.target.value;
  });
  $("#nc-wis").on("change", (e) => {
    newCharacterData.wis = e.target.value;
  });
  $("#nc-char").on("change", (e) => {
    newCharacterData.char = e.target.value;
  });
};
var newCharacterFormMainPageHtml = () => `
    <form class="new-character__form">
        <div class="new-character-form__header">
            <h2>New Character</h2>
            <input id="nc-image" type="file" accept="image/png, image/jpeg">
        </div>
        <div class="new-character-form__section">
            <div class="nc-input-box">
                <label for="nc-name">Name</label>
                <input id="nc-name" placeholder="Steve" value="${newCharacterData.name}">
            </div>
            <div class="nc-input-box">
                <label for="nc-level">Level</label>
                <input class="input--sm" id="nc-level" placeholder="1" type="number" value="${newCharacterData.level}">
            </div>
            <div class="nc-input-box">
                <label for="nc-class">Class</label>
                <input id="nc-class" placeholder="Barbarian" value="${newCharacterData.class}">
            </div>
            <div class="nc-input-box">
                <label for="nc-race">Race</label>
                <input id="nc-race" placeholder="Goliath" value="${newCharacterData.race}">
            </div>
            <div class="nc-input-box">
                <label for="nc-background">Background</label>
                <input id="nc-background" placeholder="Noble" value="${newCharacterData.background}">
            </div>
            <div class="nc-input-box">
                <label for="nc-hit-dice">Hit dice</label>
                <input class="input--sm" id="nc-hit-dice" placeholder="1d12" value="${newCharacterData.hit_dice}">
            </div>
        </div>
        <div class="character-sheet__main">
            ${newCharacterFormMainStatsHtml()}
        </div>
        <div class="character-sheet__scores">
            ${newCharacterFormScoresHtml()}
        </div>
    </form>
`;
var newCharacterFormMainStatsHtml = () => `
    <div class="character-sheet__small-stat-blocks">
        ${newCharacterFormSmStatBlocksHtml()}
    </div>
`;
var newCharacterFormSmStatBlocksHtml = () => `
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-ac">AC</label>
        <input class="input--sm" id="nc-ac" placeholder="12" type="number" value="${newCharacterData.ac}">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-speed">Speed</label>
        <input class="input--sm" id="nc-speed" placeholder="30" type="number" value="${newCharacterData.walk_speed}">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-max-health">Max Health</label>
        <input class="input--sm" id="nc-max-health" placeholder="20" type="number" value="${newCharacterData.max_health}">
    </div>
`;
var newCharacterFormScoresHtml = () => `
    <div class="new-character-form__scores">
        <div class="character-sheet__score-box">
            <label for="nc-str">Str</label>
            <input class="input--sm" id="nc-str" placeholder="10" type="number" value="${newCharacterData.str}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-dex">Dex</label>
            <input class="input--sm" id="nc-dex" placeholder="10" type="number" value="${newCharacterData.dex}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-con">Con</label>
            <input class="input--sm" id="nc-con" placeholder="10" type="number" value="${newCharacterData.con}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-int">Int</label>
            <input class="input--sm" id="nc-int" placeholder="10" type="number" value="${newCharacterData.int}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-wis">Wis</label>
            <input class="input--sm" id="nc-wis" placeholder="10" type="number" value="${newCharacterData.wis}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-char">Char</label>
            <input class="input--sm" id="nc-char" placeholder="10" type="number" value="${newCharacterData.char}">
        </div>
    </div>
`;

// src/components/newCharacterForm/newCharacterSkills.ts
var latestNewCharacterSkillID;
var newCharacterSkills;
var renderNewCharacterFormSkillsPage = (sheetContent) => {
  setNewCharacterFormPage("skills");
  sheetContent.insertAdjacentHTML("beforeend", newCharacterFormSkillsPageHtml());
  fillNewCharacterFormSkillsTableBody();
  bindEventToFormSkillsPage();
};
var newCharacterFormSkillsPageHtml = () => `
    <form class="new-character-form__form" id="new-character-form-skills">
        <div class="new-character-form__header">
            <h2>Skills</h2>
        </div>
        <div class="new-character-form__skills-table">
            <table>
                <thead>
                    <tr class="new-character-form__skills-table--header">
                        <th>Name</th>
                        <th>Value</th>
                        <th>Proficient</th>
                    </tr>
                </thead>
                <tbody class="new-character-form__skills-table-body"></tbody>
            </table>
            <button type="button" class="add-new-character-skill-row-btn">Add row</button>
        </div>
        <button type="submit">Submit</button>
    </form>
`;
var fillNewCharacterFormSkillsTableBody = () => {
  const tableBody = document.querySelector(".new-character-form__skills-table-body");
  newCharacterSkills.forEach((skill) => {
    let skillModifier = getNewCharacterFormSkillModifier(skill);
    tableBody.insertAdjacentHTML("beforeend", newCharacterFormSkillInputRowInnerHtml(skill, skillModifier));
    bindEventToNewCharacterFormProf(skill);
  });
};
var newCharacterFormSkillInputRowInnerHtml = (skill, skillModifier) => {
  if (skill) {
    return `
            <tr>
                <td><input type="text" class="input--md" placeholder="Skill name" value="${skill.name}"><input type="text" class="input--sm new-creature-form--skill-type" onchange="updateNewCharacterSkillType(${skill.id}, event.target.value)" placeholder="Type" value="${skill.type}"></td>
                <td><input class="input--sm i-${skill.id}-new-skill-mod" placeholder="Value" type="number" value="${skillModifier}"></td>
                <td>${skill.proficient ? `<i class="fa-solid fa-circle i-${skill.id}-prof-icon"><input class="new-skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle i-${skill.id}-prof-icon"><input class="new-skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox"></input></i>`}</td>
                <td><button id="${skill.id}-new-skill-delete-btn"><i class="fa fa-trash delete-new-character-form-skill-row-btn" aria-hidden="true"></i></button></td>
            </tr>
        `;
  }
  const id = latestNewCharacterSkillID += 1;
  newCharacterSkills.push(new Skill(id, "Untitled skill", "str", 0, false));
  return `
        <tr>
            <td><input type="text" class="input--md" placeholder="Skill name" value="${newCharacterSkills[id].name}"><input type="text" class="input--sm new-creature-form--skill-type" placeholder="Type" value="${newCharacterSkills[id].type}"></td>
            <td><input class="input--sm i-${id}-new-skill-mod" placeholder="Value" type="number" value="${newCharacterSkills[id].bonus_mod}"></td>
            <td>${newCharacterSkills[id].proficient ? `<i class="fa-solid fa-circle i-${newCharacterSkills[id].id}-prof-icon"><input class="character-sheet__skills-table--checkbox new-skill-proficient-checkbox-${newCharacterSkills[id].id}" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle i-${newCharacterSkills[id].id}-prof-icon"><input class="character-sheet__skills-table--checkbox new-skill-proficient-checkbox-${newCharacterSkills[id].id}" type="checkbox"></input></i>`}</td>
            <td><button id="${id}-new-skill-delete-btn"><i class="fa fa-trash delete-new-character-form-skill-row-btn" aria-hidden="true"></i></button></td>
        </tr>
    `;
};
var bindEventToFormSkillsPage = () => {
  const skillsModInputs = [];
  const tableBody = document.querySelector(".new-character-form__skills-table-body");
  document.querySelector(".add-new-character-skill-row-btn").addEventListener("click", () => {
    tableBody.insertAdjacentHTML("beforeend", newCharacterFormSkillInputRowInnerHtml(null, null));
    bindEventToNewCharacterFormProf(newCharacterSkills[latestNewCharacterSkillID]);
  });
  document.getElementById("new-character-form-skills").addEventListener("submit", (e) => {
    e.preventDefault();
    submitNewCharacter();
  });
  newCharacterSkills.forEach((skill, i2) => {
    skillsModInputs.push(document.querySelector(`.i-${skill.id}-new-skill-mod`).value);
    $(`.i-${skill.id}-new-skill-mod`).on("input", (e) => {
      skill.bonus_mod = parseInt(e.target.value) - skillsModInputs[i2];
    });
  });
};
var bindEventToNewCharacterFormProf = (skill) => {
  document.querySelector(`.new-skill-proficient-checkbox-${skill.id}`).addEventListener("change", (e) => {
    const skillMod = document.querySelector(`.i-${skill.id}-new-skill-mod`);
    skill.proficient = e.target.checked;
    skillMod.value = getNewCharacterFormSkillModifier(skill).toString();
    const profIcon = document.querySelector(`.i-${skill.id}-prof-icon`);
    if (profIcon.classList.contains("fa-solid")) {
      profIcon.classList.remove("fa-solid");
      profIcon.classList.add("fa-regular");
    } else {
      profIcon.classList.add("fa-solid");
      profIcon.classList.remove("fa-regular");
    }
  });
};
var resetNewCharacterSkills = () => {
  latestNewCharacterSkillID = 17;
  newCharacterSkills = [
    new Skill(0, "Athletics", "str", 0, false),
    new Skill(1, "Acrobatics", "dex", 0, false),
    new Skill(2, "Slight of Hand", "dex", 0, false),
    new Skill(3, "Stealth", "dex", 0, true),
    new Skill(4, "Arcana", "int", 0, false),
    new Skill(5, "History", "int", 0, false),
    new Skill(6, "Investigation", "int", 0, false),
    new Skill(7, "Nature", "wis", 0, false),
    new Skill(8, "Religion", "wis", 0, false),
    new Skill(9, "Animal Handling", "wis", 0, false),
    new Skill(10, "Insight", "wis", 0, false),
    new Skill(11, "Medicine", "wis", 0, false),
    new Skill(12, "Perception", "wis", 0, true),
    new Skill(13, "Survival", "wis", 0, false),
    new Skill(14, "Deception", "char", 0, false),
    new Skill(15, "Intimidation", "char", 0, true),
    new Skill(16, "Performance", "char", 0, false),
    new Skill(17, "Persuasion", "char", 0, false)
  ];
};
var getNewCharacterFormSkillModifier = (skill) => {
  let value2 = 0;
  if (skill.proficient)
    value2 += getProfBonusFromLevel(newCharacterData.level);
  switch (skill.type) {
    case "str":
      value2 += newCharacterData.str + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    case "dex":
      value2 += newCharacterData.dex + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    case "con":
      value2 += newCharacterData.con + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    case "int":
      value2 += newCharacterData.int + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    case "wis":
      value2 += newCharacterData.wis + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    case "char":
      value2 += newCharacterData.char + skill.bonus_mod || skill.bonus_mod || 0;
      break;
    default:
      return value2 + skill.bonus_mod || 0;
  }
  return value2;
};
var Skill = class {
  id;
  name;
  type;
  bonus_mod;
  proficient;
  constructor(id, name, type, bonus_mod, proficient) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.bonus_mod = bonus_mod;
    this.proficient = proficient;
  }
};

// src/components/newCharacterForm/newCharacter.ts
var newCharacterOpen = false;
var newCharacterFormPage = "main";
var newCharacterData = {
  name: "",
  class: "",
  race: "",
  background: "",
  alignment: "",
  level: 1,
  ac: 10,
  max_health: 0,
  current_health: 0,
  temp_health: 0,
  prof_bonus: 2,
  initiative: 0,
  inspiration: false,
  hit_dice: "",
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  char: 10,
  image: "",
  walk_speed: 30,
  swim_speed: 0,
  burrow_speed: 0,
  fly_speed: 0,
  climb_speed: 0
};
var setNewCharacterFormPage = (page) => newCharacterFormPage = page;
var toggleNewCharacterWindow = () => {
  newCharacterOpen = !newCharacterOpen;
  if (newCharacterOpen) {
    renderNewCharacterForm();
    resetNewCharacterSkills();
    determineNewCharacterFormPage(newCharacterFormPage);
    bindEventsToNewCharacterForm();
  } else {
    document.querySelector(".new-character-form").remove();
  }
};
var renderNewCharacterForm = () => {
  const sheetWindow = document.querySelector("body").appendChild(document.createElement("div"));
  sheetWindow.classList.add("new-character-form");
  sheetWindow.insertAdjacentHTML("beforeend", `
        <button class="btn--modal-close" id="new-character-form-btn--toggle">X</button>
    `);
  sheetWindow.insertAdjacentHTML("beforeend", newCharacterFormSidebarHtml());
  sheetWindow.insertAdjacentHTML("beforeend", '<div class="new-character-form-content"></div>');
  handleNewCharacterFormSidebarState();
};
var bindEventsToNewCharacterForm = () => {
  document.getElementById("new-character-form-btn--toggle").addEventListener("click", () => {
    toggleNewCharacterWindow();
  });
};
var determineNewCharacterFormPage = (page) => {
  const sheetContent = document.querySelector(".new-character-form-content");
  sheetContent.innerHTML = "";
  switch (page) {
    case "main":
      renderNewCharacterFormMainPage(sheetContent);
      break;
    case "skills":
      renderNewCharacterFormSkillsPage(sheetContent);
      break;
    default:
      break;
  }
  disableHotkeys();
  makeDraggable(document.querySelector(".new-character-form"), ".new-character-form__header");
};
var submitNewCharacter = async () => {
  await addCharacter(newCharacterData);
  newCharacterSkills.forEach((skill) => {
    addCharacterSkill(skill);
  });
};
var getProfBonusFromLevel = (level) => {
  if (level <= 4)
    return 2;
  if (level <= 8)
    return 3;
  if (level <= 12)
    return 4;
  if (level <= 16)
    return 5;
  if (level <= 20)
    return 6;
};

// src/components/characterMenu.ts
var toggleCharacterMenu = () => {
  setMenuOpenValue(!menuOpen);
  if (menuOpen) {
    setSelectedMenuValue("characters");
    document.querySelector(".game-page").insertAdjacentHTML("beforeend", `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
    document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu("characters"));
    getCharacterBodyData();
  } else {
    closeMenu("characters");
  }
};
var bindEventsToCharacterMenu = () => {
  document.getElementById("create-new-character-btn").addEventListener("click", () => {
    toggleNewCharacterWindow();
  });
};
var getCharacterBodyData = async () => {
  await getCharacters();
  characters.forEach((character2) => {
    document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
            <div class="menu__item menu__item--character" id="character-menu-item-${character2.id}">
                <img src=${character2.image}>
                <div>
                    <p>${character2.level} ${character2.name} ${character2.class}</p>
                </div>
            </div>
        `);
    document.getElementById(`character-menu-item-${character2.id}`).addEventListener("click", () => {
      selectCharacter(character2.id);
    });
  });
  document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
        <div class="menu__item menu__item--character-btn">
            <button class="btn--new-item" id="create-new-character-btn">New Character</button>
        </div>
    `);
  bindEventsToCharacterMenu();
};
var selectCharacter = async (id) => {
  const characterData = await getCharacter(id);
  updateCharacter(characterData);
  const skillsData = await getCharacterSkills(id);
  updateCharacterSkills(skillsData);
  toggleCharacterMenu();
};

// src/components/sidebar.ts
var bindEventsToSidebar = () => {
  if (clientType === "dm") {
    document.getElementById("maps-menu-btn").addEventListener("click", () => {
      toggleMapMenu();
    });
    document.getElementById("tokens-menu-btn").addEventListener("click", () => {
      toggleTokenMenu();
    });
    document.getElementById("creatures-modal-btn").addEventListener("click", () => {
      toggleCreaturesModal();
    });
  } else {
    document.getElementById("characters-menu-btn").addEventListener("click", () => {
      toggleCharacterMenu();
    });
    document.getElementById("character-sheet-modal-btn").addEventListener("click", () => {
      toggleCharacterSheet();
    });
  }
};
var sidebarInnerHtml = () => {
  if (clientType === "dm") {
    return `
            <button class="sidebar__btn btn--hover" id="maps-menu-btn">Maps</button>
            <button class="sidebar__btn btn--hover" id="tokens-menu-btn">Tokens</button>
            <button class="sidebar__btn btn--hover" id="creatures-modal-btn">Creatures</button>
            <button class="sidebar__btn btn--hover" id="encounters-modal-btn">Encounters</button>
            <button class="sidebar__btn btn--hover" id="loot-modal-btn">Loot</button>
            <button class="sidebar__btn btn--hover" id="items-modal-btn">Items</button>
            <button class="sidebar__btn btn--hover" id="shops-modal-btn">Shops</button>
        `;
  } else {
    return `
            <button class="sidebar__btn btn--hover" id="characters-menu-btn">Characters</button>
            <button class="sidebar__btn btn--hover" id="character-sheet-modal-btn">Character Sheet</button>
        `;
  }
};
function sidebar() {
  ready(() => {
    bindEventsToSidebar();
  }, ".sidebar");
  return `
        <div class="sidebar">${sidebarInnerHtml()}</div>
    `;
}

// src/components/toolbar.ts
var leaveRoom = () => {
  emitServerEvent("USER_DISCONNECT", [room, socket.id]);
  socket.disconnect();
  location.reload();
};
var bindEventsToToolbar = () => {
  document.getElementById("leave-game-btn").addEventListener("click", () => {
    leaveRoom();
  });
};
function toolbar() {
  ready(() => {
    bindEventsToToolbar();
  }, ".toolbar");
  return `
        <div class="toolbar">
            <button class="toolbar__btn" onclick="zoomIn()">+</button>
            <button class="toolbar__btn" onclick="zoomOut()">-</button>
            <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
            <p class="toolbar__text">Room: ${room}</p>
            <a class="toolbar__leave-btn" id="leave-game-btn">Leave Game</a>
        </div>
    `;
}

// src/views/gamePage.ts
function gamePage() {
  ready(async () => {
    await getCustomCreatures();
    await getCreatures();
  }, ".game-page");
  return `
        <div class="game-page">
            ${sidebar()}
            <div class="game-content">
                ${toolbar()}
                <div class="grid-container">
                    ${grid()}
                </div>
            </div>
        </div>
    `;
}

// src/views/dashboardPage.ts
var room;
var clientType;
var socketId2;
var joinPlayer = (roomCode) => {
  room = roomCode;
  emitServerEvent("JOIN_ROOM", ["player", roomCode, (roomExists, newClient) => {
    if (roomExists) {
      clientType = newClient.clientType;
      socketId2 = newClient.id;
      renderGamePage();
      handlePushGameToHistory(roomCode);
      toggleCharacterMenu();
    } else {
      console.warn("room doesn't exist");
    }
  }]);
};
var joinDM = (roomCode) => {
  room = roomCode;
  emitServerEvent("JOIN_ROOM", ["dm", roomCode, (roomExists, newClient) => {
    if (roomExists) {
      clientType = newClient.clientType;
      socketId2 = newClient.id;
      renderGamePage();
    } else {
      console.warn("game already started");
    }
  }]);
};
var renderGamePage = () => {
  document.querySelector(".dashboard-page").remove();
  const container = document.querySelector(".container");
  container.insertAdjacentHTML("beforeend", gamePage());
};
var handlePushGameToHistory = async (roomCode) => {
  const game = await getGame(roomCode);
  const gamesHistory = await getGamesHistory();
  if (checkGameExists(game, gamesHistory))
    return;
  addGameToHistory(game);
};
var checkGameExists = (newGame, gamesHistory) => {
  let gameExists = false;
  gamesHistory.forEach((game) => {
    if (game.code === newGame.code)
      gameExists = true;
  });
  return gameExists;
};
function dashboardPage() {
  let roomCode;
  ready(async () => {
    if (!await getUser())
      window.location.pathname = "login";
    bindEventsToForm();
  }, ".dashboard-page");
  const bindEventsToForm = () => {
    document.getElementById("join-room-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      roomCode = document.getElementById("room-code-input").value;
      joinPlayer(roomCode);
    });
    document.getElementById("dashboard-logout-btn")?.addEventListener("click", () => {
      logout();
    });
  };
  return `
        <div class="dashboard-page">
            <h1 class="page-title">Dashboard</h1>
            <div class="dashboard-container">
                <form id="join-room-form" class="form--join-room">
                    <input id="room-code-input" placeholder="room code" value="" required>
                    <button type="submit">Join Room</button>
                </form>
                ${gamesList()}
                ${gamesHistoryList()}
                <button id="dashboard-logout-btn" class="button btn--hover btn--logout">Log out</button>
            </div>
        </div>
    `;
}

// src/main.ts
var routeManager = () => {
  switch (window.location.pathname) {
    case "/":
      window.location.pathname = "/game";
    case "/login":
      return loginPage();
    case "/register":
      return registerPage();
    case "/game":
      return dashboardPage();
    default:
      return "<h1>404 Not Found</h1>";
  }
};
document.querySelector("#app").insertAdjacentHTML("beforeend", `
  <div class="container">
    ${routeManager()}
  </div>
`);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwgIi4uL3NjcmlwdHMvdG9vbHMvdXRpbHMudHMiLCAiLi4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCAiLi4vdmlld3MvbG9naW5QYWdlLnRzIiwgIi4uL3ZpZXdzL3JlZ2lzdGVyUGFnZS50cyIsICIuLi9jb250cm9sbGVycy9kYXNoYm9hcmRDb250cm9sbGVyLnRzIiwgIi4uL2NvbXBvbmVudHMvZ2FtZUNhcmQudHMiLCAiLi4vY29tcG9uZW50cy9nYW1lc0xpc3QudHMiLCAiLi4vY29tcG9uZW50cy9nYW1lSGlzdG9yeUxpc3QudHMiLCAiLi4vY29udHJvbGxlcnMvbWFwc0NvbnRyb2xsZXIudHMiLCAiLi4vY29udHJvbGxlcnMvY2hhcmFjdGVyc0NvbnRyb2xsZXIudHMiLCAiLi4vc2NyaXB0cy9zdGF0c0NhbGN1bGF0aW9ucy50cyIsICIuLi9zY3JpcHRzL3Rvb2xzL3N0cmluZ1V0aWxzLnRzIiwgIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyU2hlZXQvY2hhcmFjdGVyLlNoZWV0U2tpbGxzLnRzIiwgIi4uL3NjcmlwdHMvY2hhcmFjdGVyU3RhdEV2ZW50cy50cyIsICIuLi9jb21wb25lbnRzL2NoYXJhY3RlclNoZWV0L2NoYXJhY3RlclNoZWV0TWFpbi50cyIsICIuLi9jb21wb25lbnRzL2NoYXJhY3RlclNoZWV0L2NoYXJhY3RlclNoZWV0U2lkZWJhci50cyIsICIuLi9jb21wb25lbnRzL2NoYXJhY3RlclNoZWV0L2NoYXJhY3RlclNoZWV0LnRzIiwgIi4uL2NvbnRyb2xsZXJzL2NyZWF0dXJlc0NvbnRyb2xsZXIudHMiLCAiLi4vc2NyaXB0cy9zdGFuZGFyZENyZWF0dXJlUmVzLnRzIiwgIi4uL3NjcmlwdHMvdG9vbHMvc3RhdFRvb2xzLnRzIiwgIi4uL3NjcmlwdHMvY3VzdG9tQ3JlYXR1cmVSZXMudHMiLCAiLi4vc2NyaXB0cy9jcmVhdHVyZURhdGFIYW5kbGVyLnRzIiwgIi4uL2NvbXBvbmVudHMvbW9kYWwudHMiLCAiLi4vY29tcG9uZW50cy9jcmVhdHVyZXNNb2RhbC9jcmVhdHVyZUFiaWxpdGllcy50cyIsICIuLi9zY3JpcHRzL2NyZWF0dXJlU3RhdHNIYW5kbGVyLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVBYmlsaXR5U2NvcmVzLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVBY3Rpb25zLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVMZWdBY3Rpb25zLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVQcm9maWNpZW5jaWVzLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVTZW5zZXMudHMiLCAiLi4vY29tcG9uZW50cy9jcmVhdHVyZXNNb2RhbC9jcmVhdHVyZVNwZWVkcy50cyIsICIuLi9jb21wb25lbnRzL2NyZWF0dXJlc01vZGFsL2NyZWF0dXJlVnVsUmVzLnRzIiwgIi4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVTdGF0cy50cyIsICIuLi9jb21wb25lbnRzL2NyZWF0dXJlc01vZGFsL2NyZWF0dXJlUm93LnRzIiwgIi4uL3NjcmlwdHMvc3VibWl0TmV3Q3JlYXR1cmUudHMiLCAiLi4vY29tcG9uZW50cy9uZXdDcmVhdHVyZUZvcm0udHMiLCAiLi4vY29tcG9uZW50cy9jcmVhdHVyZXNNb2RhbC9jcmVhdHVyZXNNb2RhbC50cyIsICIuLi9jb250cm9sbGVycy90b2tlbnNDb250cm9sbGVyLnRzIiwgIi4uL2NvbXBvbmVudHMvdG9rZW5zTWVudS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29tbW9ucy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZW5jb2RlUGFja2V0LmJyb3dzZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXIvaW5kZXgubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9nbG9iYWxUaGlzLmJyb3dzZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3V0aWwuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi95ZWFzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9wYXJzZXFzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2hhcy1jb3JzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3htbGh0dHByZXF1ZXN0LmJyb3dzZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvcG9sbGluZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy93ZWJzb2NrZXQtY29uc3RydWN0b3IuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy93ZWJzb2NrZXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2V1cmkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3VybC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vYmluYXJ5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9vbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2JhY2tvMi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vbWFuYWdlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiLCAiLi4vc2NyaXB0cy9zb2NrZXQtaW8udHMiLCAiLi4vc2NyaXB0cy90b2tlbi50cyIsICIuLi9zY3JpcHRzL2dyaWRFdmVudHMudHMiLCAiLi4vc2NyaXB0cy9ncmlkSW5wdXQudHMiLCAiLi4vY29tcG9uZW50cy9ncmlkLnRzIiwgIi4uL2NvbXBvbmVudHMvbWFwc01lbnUudHMiLCAiLi4vc2NyaXB0cy9tZW51TWFuYWdlci50cyIsICIuLi9jb21wb25lbnRzL25ld0NoYXJhY3RlckZvcm0vbmV3Q2hhcmFjdGVyRm9ybVNpZGViYXIudHMiLCAiLi4vY29tcG9uZW50cy9uZXdDaGFyYWN0ZXJGb3JtL25ld0NoYXJhY3Rlck1haW4udHMiLCAiLi4vY29tcG9uZW50cy9uZXdDaGFyYWN0ZXJGb3JtL25ld0NoYXJhY3RlclNraWxscy50cyIsICIuLi9jb21wb25lbnRzL25ld0NoYXJhY3RlckZvcm0vbmV3Q2hhcmFjdGVyLnRzIiwgIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyTWVudS50cyIsICIuLi9jb21wb25lbnRzL3NpZGViYXIudHMiLCAiLi4vY29tcG9uZW50cy90b29sYmFyLnRzIiwgIi4uL3ZpZXdzL2dhbWVQYWdlLnRzIiwgIi4uL3ZpZXdzL2Rhc2hib2FyZFBhZ2UudHMiLCAiLi4vbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkLFxuICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIHJlc3BvbnNlICYmICh0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UpO1xufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG52YXIgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG52YXIgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goZnVuY3Rpb24oY29kZSkge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gZnVuY3Rpb24oZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSB7XG4gIHZhciBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxubW9kdWxlLmV4cG9ydHMgPSBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uYWwnKTtcbnZhciB0b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi4vaGVscGVycy90b0Zvcm1EYXRhJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGhlYWRlcnMgJiYgaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICB2YXIgaXNGaWxlTGlzdDtcblxuICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IChpc09iamVjdFBheWxvYWQgJiYgY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcbiAgICAgIHZhciBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcbiAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCkpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICB2YXIgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgIHZhciBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgdmFyIHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcgfHwgKGZvcmNlZEpTT05QYXJzaW5nICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmIGRhdGEubGVuZ3RoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcmVxdWlyZSgnLi9lbnYvRm9ybURhdGEnKVxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcigpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsICIndXNlIHN0cmljdCc7XG5cbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUsIGkpIHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbnZhciBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG9wdCwgb3B0cykge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgdmFyIG9wdCA9IGtleXNbaV07XG4gICAgdmFyIHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2VydE9wdGlvbnM6IGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuL2J1aWxkRnVsbFBhdGgnKTtcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3ZhbGlkYXRvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsO1xuXG4gIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gIHZhciByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB2YXIgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHZhciBwcm9taXNlO1xuXG4gIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcblxuICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgY2hhaW4gPSBjaGFpbi5jb25jYXQocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcblxuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICB2YXIgbmV3Q29uZmlnID0gY29uZmlnO1xuICB3aGlsZSAocmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgdmFyIG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKTtcbiAgICB2YXIgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdHJ5IHtcbiAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG9uUmVqZWN0ZWQoZXJyb3IpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0KG5ld0NvbmZpZyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxuXG4gIHdoaWxlIChyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG5cbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbCA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgIH1cbiAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbihvbmZ1bGZpbGxlZCkge1xuICAgIHZhciBfcmVzb2x2ZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsICJleHBvcnQgbGV0IGNhblVzZUhvdGtleSA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCByZWFkeSA9IChmbjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIC8vIENyZWF0ZSBhIG5ldyBvYnNlcnZlciBpbnN0YW5jZTpcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNldCBjb25maWd1cmF0aW9uIG9iamVjdDpcbiAgICBjb25zdCBjb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSB9O1xuICAgIFxuICAgIC8vIFN0YXJ0IHRoZSBvYnNlcnZlclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBtdXRhdGlvbiB3ZSBhcmUgbGlzdGVuaW5nIG91dCBmb3JcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaWQgPSAnbmV3LWRpdic7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGRpdik7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctZGl2JykucmVtb3ZlKCk7XG4gICAgfSwgMC4xKTtcbn07XG5cbi8vIENsYW1wIG51bWJlciBiZXR3ZWVuIHR3byB2YWx1ZXNcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChudW06IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihNYXRoLm1heChudW0sIG1pbiksIG1heCk7XG5cbi8vIFdpbGwgZmluZCBhbmQgcmV0dXJuIGEgY2VsbCB3aXRoIHRoZSBwYXJhbWV0ZXJzIGdpdmVuXG5leHBvcnQgY29uc3QgZmluZENlbGwgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcbiAgICBmb3IgKGNvbnN0IGNlbGwgb2YgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZF9fY2VsbCcpKSkge1xuICAgICAgICBpZiAoY2VsbC5nZXRBdHRyaWJ1dGUoJ3gnKSA9PT0geC50b1N0cmluZygpICYmIGNlbGwuZ2V0QXR0cmlidXRlKCd5JykgPT09IHkudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIDxIVE1MRWxlbWVudD5jZWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZmluZFJlbGF0aXZlQ2VsbCA9IChlbG10OiBhbnksIG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY2VsbFdpZHRoID0gZWxtdC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBjZWxsSGVpZ2h0ID0gZWxtdC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgbnVtWENlbGxzID0gTWF0aC5jZWlsKG9mZnNldFggLyBjZWxsV2lkdGgpIC0gMTtcbiAgICBjb25zdCBudW1ZQ2VsbHMgPSBNYXRoLmNlaWwob2Zmc2V0WSAvIGNlbGxIZWlnaHQpIC0gMTtcbiAgICByZXR1cm4gZmluZENlbGwoZWxtdC5nZXRBdHRyaWJ1dGUoJ3gnKSAtIG51bVhDZWxscywgZWxtdC5nZXRBdHRyaWJ1dGUoJ3knKSAtIG51bVlDZWxscyk7XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgaWYgaXQgZmluZHMgdGhlIGVsZW1lbnQgaW4gYW4gYXJyYXlcbmV4cG9ydCBjb25zdCBjaGVja0ZvckVsZW1lbnQgPShhcnI6IGFueVtdLCBzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGVsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VEcmFnZ2FibGUgPSAoZWw6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHBvczEgPSAwLCBwb3MyID0gMCwgcG9zMyA9IDAsIHBvczQgPSAwO1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xuICAgICAgLy8gaWYgcHJlc2VudCwgdGhlIGhlYWRlciBpcyB3aGVyZSB5b3UgbW92ZSB0aGUgRElWIGZyb206XG4gICAgICAoPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKS5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyd2lzZSwgbW92ZSB0aGUgRElWIGZyb20gYW55d2hlcmUgaW5zaWRlIHRoZSBESVY6XG4gICAgICBlbC5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGU6IGFueSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gZ2V0IHRoZSBtb3VzZSBjdXJzb3IgcG9zaXRpb24gYXQgc3RhcnR1cDpcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gY2xvc2VEcmFnRWxlbWVudDtcbiAgICAgIC8vIGNhbGwgYSBmdW5jdGlvbiB3aGVuZXZlciB0aGUgY3Vyc29yIG1vdmVzOlxuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGU6IGFueSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBuZXcgY3Vyc29yIHBvc2l0aW9uOlxuICAgICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgLy8gc2V0IHRoZSBlbGVtZW50J3MgbmV3IHBvc2l0aW9uOlxuICAgICAgZWwuc3R5bGUudG9wID0gKGVsLm9mZnNldFRvcCAtIHBvczIpICsgXCJweFwiO1xuICAgICAgZWwuc3R5bGUubGVmdCA9IChlbC5vZmZzZXRMZWZ0IC0gcG9zMSkgKyBcInB4XCI7XG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KCkge1xuICAgICAgLy8gc3RvcCBtb3Zpbmcgd2hlbiBtb3VzZSBidXR0b24gaXMgcmVsZWFzZWQ6XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlSG90a2V5cyA9ICgpID0+IHtcbiAgICAvLyBEZXRlY3RzIHdoZW4gaW5wdXQgaXMgZm9jdXNlZCBhbmQgZGlzYWJsZWQgaG90a2V5c1xuICAgIGZvciAobGV0IGlucHV0IG9mIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSkpIHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsICgpID0+IHsgY2FuVXNlSG90a2V5ID0gZmFsc2U7IH0pO1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsICgpID0+IHsgY2FuVXNlSG90a2V5ID0gdHJ1ZTsgfSk7XG4gICAgfVxufTtcbiIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5pbnRlcmZhY2UgTmV3VXNlciB7XG4gICAgdXNlcm5hbWU6IHN0cmluZ1xuICAgIHBhc3N3b3JkOiBzdHJpbmdcbn1cblxuLy8gPT09IEdFVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvdXNlcicsIGNvbmZpZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuLy8gPT09IFBPU1Qgcm91dGVzID09PSAvL1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJVc2VyID0gYXN5bmMgKHBheWxvYWQ6IE5ld1VzZXIpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3VzZXIvcmVnaXN0ZXInLCBwYXlsb2FkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID0gJ2xvZ2luJztcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBsb2dpblVzZXIgPSBhc3luYyAocGF5bG9hZDogTmV3VXNlcikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvdXNlci9sb2dpbicsIHBheWxvYWQpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPSAnZ2FtZSc7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvdXNlci9sb2dvdXQnKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID0gJ2xvZ2luJztcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG5cbi8vID09PSBQVVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgY29uc3QgY2hhbmdlTmV3VXNlciA9IGFzeW5jIChwYXlsb2FkOiBib29sZWFuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucHV0KCcvYXBpL3VzZXInLCB7IG5ld1N0YXR1czogcGF5bG9hZCB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG4iLCAiaW1wb3J0IHsgcmVhZHkgfSBmcm9tICcuLi9zY3JpcHRzL3Rvb2xzL3V0aWxzJztcbmltcG9ydCB7IGxvZ2luVXNlciB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9naW5QYWdlKCkge1xuICAgIHJlYWR5KCgpID0+IHtcbiAgICAgICAgYmluZEV2ZW50VG9Gb3JtU3VibWl0KCk7XG4gICAgfSwgJy5sb2dpbi1wYWdlJyk7XG5cbiAgICBjb25zdCBiaW5kRXZlbnRUb0Zvcm1TdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXJuYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4tdXNlci11c2VybmFtZScpO1xuICAgICAgICBjb25zdCBwYXNzd29yZElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luLXVzZXItcGFzc3dvcmQnKTtcbiAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4tdXNlci1idG4nKSkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbG9naW5Vc2VyKHsgdXNlcm5hbWU6IHVzZXJuYW1lSW5wdXQudmFsdWUsIHBhc3N3b3JkOiBwYXNzd29yZElucHV0LnZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2dpbi1wYWdlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94X19mb3JtIGJveF9fZm9ybS0tbG9naW4tdXNlci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+TG9naW48L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYm94X19mb3JtLS1sb2dpbi11c2VybmFtZVwiPlVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwibmFtZVwiIGlkPVwibG9naW4tdXNlci11c2VybmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJsb2dpbi11c2VyLXBhc3N3b3JkXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImxvZ2luLXVzZXItYnRuXCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9yZWdpc3RlclwiPlJlZ2lzdGVyPC9hPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufVxuIiwgImltcG9ydCB7IHJlYWR5IH0gZnJvbSAnLi4vc2NyaXB0cy90b29scy91dGlscyc7XG5pbXBvcnQgeyByZWdpc3RlclVzZXIgfSBmcm9tICcuLi9jb250cm9sbGVycy91c2VyQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyUGFnZSgpIHtcbiAgICByZWFkeSgoKSA9PiB7XG4gICAgICAgIGJpbmRFdmVudFRvRm9ybVN1Ym1pdCgpO1xuICAgIH0sICcucmVnaXN0ZXItcGFnZScpO1xuXG4gICAgY29uc3QgYmluZEV2ZW50VG9Gb3JtU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB1c2VybmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyLXVzZXItdXNlcm5hbWUnKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpc3Rlci11c2VyLXBhc3N3b3JkJyk7XG4gICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyLXVzZXItYnRuJykpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJlZ2lzdGVyVXNlcih7IHVzZXJuYW1lOiB1c2VybmFtZUlucHV0LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRJbnB1dC52YWx1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZWdpc3Rlci1wYWdlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94X19mb3JtIGJveF9fZm9ybS0tcmVnaXN0ZXItdXNlci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+UmVnaXN0ZXI8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYm94X19mb3JtLS1yZWdpc3Rlci11c2VybmFtZVwiPlVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwibmFtZVwiIGlkPVwicmVnaXN0ZXItdXNlci11c2VybmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJyZWdpc3Rlci11c2VyLXBhc3N3b3JkXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdGVyLXVzZXItYnRuXCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9sb2dpblwiPkxvZ2luPC9hPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufVxuIiwgImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5pbnRlcmZhY2UgbmV3R2FtZSB7XG4gICAgbmFtZTogc3RyaW5nXG59XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0R2FtZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2Rhc2hib2FyZCcpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEdhbWUgPSBhc3luYyAoY29kZTogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2Rhc2hib2FyZC9nYW1lLyR7Y29kZX1gKTtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhWzBdO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRHYW1lc0hpc3RvcnkgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2Rhc2hib2FyZC9oaXN0b3J5Jyk7XG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBhZGRHYW1lID0gYXN5bmMgKHBheWxvYWQ6IG5ld0dhbWUpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2Rhc2hib2FyZCcsIHBheWxvYWQpO1xuICAgICAgICBnZXRHYW1lcygpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRHYW1lVG9IaXN0b3J5ID0gYXN5bmMgKHBheWxvYWQ6IEdhbWUpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2Rhc2hib2FyZC9oaXN0b3J5JywgcGF5bG9hZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcbiIsICJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL3NjcmlwdHMvdHlwZXNcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgICBnYW1lOiBHYW1lXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVDYXJkKHsgZ2FtZSB9OiBQcm9wcykge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxhIGNsYXNzPVwiZ2FtZS1saXN0X19pdGVtXCIgZGF0YS1nYW1lLWNvZGU9XCIke2dhbWUuY29kZX1cIiBpZD1cImdhbWUtbGlzdF9faXRlbS0ke2dhbWUuaWR9XCI+XG4gICAgICAgICAgICAke2dhbWUubmFtZX1cbiAgICAgICAgPC9hPlxuICAgIGA7XG59XG4iLCAiaW1wb3J0IHsgYWRkR2FtZSwgZ2V0R2FtZXMgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9zY3JpcHRzL3R5cGVzXCI7XG5pbXBvcnQgZ2FtZUNhcmQgZnJvbSBcIi4vZ2FtZUNhcmRcIjtcbmltcG9ydCB7IGpvaW5ETSB9IGZyb20gXCIuLi92aWV3cy9kYXNoYm9hcmRQYWdlXCI7XG5cbmxldCBnYW1lRm9ybU9wZW4gPSBmYWxzZTtcblxuLy8gRm9ybSB0aGF0IGNyZWF0ZXMgbmV3IGNhbXBhaWduXG5jb25zdCB0b2dnbGVHYW1lRm9ybSA9ICgpID0+IHtcbiAgICBnYW1lRm9ybU9wZW4gPSAhZ2FtZUZvcm1PcGVuO1xuICAgIGlmIChnYW1lRm9ybU9wZW4pIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWxpc3RfX2NvbnRlbnQnKT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0tLWFkZC1nYW1lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZ2FtZS1uYW1lLWlucHV0XCIgcGxhY2Vob2xkZXI9XCJuYW1lXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi0tc3VibWl0IGJ0bi0taG92ZXJcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgYCk7XG4gICAgICAgIGJpbmRFdmVudFRvR2FtZXNMaXN0Rm9ybSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLS1hZGQtZ2FtZScpPy5yZW1vdmUoKTtcbiAgICB9XG59O1xuXG4vLyBSZW5kZXJzIHRoZSBsaXN0IGFuZCBhbGwgZ2FtZSBjYXJkcyB3aXRoaW4gdGhlIGxpc3RcbmNvbnN0IHJlbmRlckdhbWVzTGlzdCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBnYW1lc0xpc3Q6IEdhbWVbXSA9IGF3YWl0IGdldEdhbWVzKCk7XG4gICAgY29uc3QgZ2FtZUxpc3RDb250ZW50OiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWxpc3RfX2NvbnRlbnQnKTtcbiAgICBnYW1lTGlzdENvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyBBZGQgYWxsIGdhbWVzIGZyb20gZ2FtZSBsaXN0XG4gICAgZ2FtZXNMaXN0LmZvckVhY2goKGdhbWU6IEdhbWUpID0+IHtcbiAgICAgICAgZ2FtZUxpc3RDb250ZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZ2FtZUNhcmQoeyBnYW1lOiBnYW1lIH0pKTtcbiAgICAgICAgYmluZEV2ZW50VG9HYW1lQ2FyZChnYW1lKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjcmVhdGUgY2FtcGFpZ24gYnV0dG9uIGF0IHRoZSBlbmRcbiAgICBnYW1lTGlzdENvbnRlbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJnYW1lcy1saXN0X19idXR0b24gYnRuLS1ob3ZlclwiPkNyZWF0ZSBDYW1wYWlnbjwvYnV0dG9uPlxuICAgIGApOyAgICBcbn07XG5cbi8vIFJ1bnMgdG9nZ2xlR2FtZUZvcm0oKVxuY29uc3QgYmluZEV2ZW50VG9DcmVhdGVDYW1wYWlnbiA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZXMtbGlzdF9fYnV0dG9uJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVHYW1lRm9ybSgpO1xuICAgIH0pO1xufTtcblxuLy8gSGFuZGxlcyBzdWJtaXR0aW5nIGZvcm0gZm9yIG5ldyBjYW1wYWlnblxuY29uc3QgYmluZEV2ZW50VG9HYW1lc0xpc3RGb3JtID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLS1hZGQtZ2FtZScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGdhbWVOYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtbmFtZS1pbnB1dCcpKTtcbiAgICAgICAgYWRkR2FtZSh7IG5hbWU6IGdhbWVOYW1lSW5wdXQudmFsdWUgfSk7XG4gICAgICAgIHJlbmRlckdhbWVzTGlzdCgpO1xuICAgIH0pO1xufTtcblxuLy8gSGFuZGxlcyBjbGljayBvbiBnYW1lIGNhcmRcbi8vIEpvaW5zIGdhbWUgYXMgRE1cbmNvbnN0IGJpbmRFdmVudFRvR2FtZUNhcmQgPSAoZ2FtZTogR2FtZSkgPT4geyAgICAgICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGdhbWUtbGlzdF9faXRlbS0ke2dhbWUuaWR9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGpvaW5ETShnYW1lLmNvZGUpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZXNMaXN0KCkge1xuICAgIHJlYWR5KGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgcmVuZGVyR2FtZXNMaXN0KCk7XG4gICAgICAgIGJpbmRFdmVudFRvQ3JlYXRlQ2FtcGFpZ24oKTtcbiAgICAgICAgLy8gcHJldkdhbWUgPSBhd2FpdCBnZXRQcmV2R2FtZSgpO1xuICAgICAgICAvLyByb29tQ29kZSA9IHByZXZHYW1lLmNvZGU7XG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb29tLWNvZGUtaW5wdXQnKS52YWx1ZSA9IHByZXZHYW1lLmNvZGU7XG4gICAgICAgIC8vIEdldCBEJkQgYXBpIGRhdGFcbiAgICAgICAgLy8gZ2V0Q3JlYXR1cmVzKCk7XG4gICAgfSwgJy5nYW1lcy1saXN0X19jb250ZW50Jyk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZXMtbGlzdCBnYW1lcy1saXN0X19jb250ZW50XCI+PC9kaXY+XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuLi9zY3JpcHRzL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL3NjcmlwdHMvdHlwZXNcIjtcbmltcG9ydCB7IGdldEdhbWVzSGlzdG9yeSB9IGZyb20gXCIuLi9jb250cm9sbGVycy9kYXNoYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgZ2FtZUNhcmQgZnJvbSBcIi4vZ2FtZUNhcmRcIjtcbmltcG9ydCB7IGpvaW5QbGF5ZXIgfSBmcm9tIFwiLi4vdmlld3MvZGFzaGJvYXJkUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lc0hpc3RvcnlMaXN0KCkge1xuICAgIHJlYWR5KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZXNIaXN0b3J5OiBHYW1lW10gPSBhd2FpdCBnZXRHYW1lc0hpc3RvcnkoKTtcbiAgICAgICAgcmVuZGVyR2FtZXNIaXN0b3J5TGlzdChnYW1lc0hpc3RvcnkpO1xuICAgICAgICBiaW5kRXZlbnRUb0dhbWVDYXJkKCk7XG4gICAgfSwgJy5nYW1lcy1oaXN0b3J5LWxpc3RfX2NvbnRlbnQnKTtcblxuICAgIGNvbnN0IHJlbmRlckdhbWVzSGlzdG9yeUxpc3QgPSAoZ2FtZXNIaXN0b3J5OiBHYW1lW10pID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZUxpc3RDb250ZW50OiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWhpc3RvcnktbGlzdF9fY29udGVudCcpO1xuICAgICAgICBnYW1lTGlzdENvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgXG4gICAgICAgIC8vIEFkZCBhbGwgZ2FtZXMgZnJvbSBnYW1lIGhpc3RvcnlcbiAgICAgICAgZ2FtZXNIaXN0b3J5LmZvckVhY2goKGdhbWU6IEdhbWUpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEZpeCBub24tdW5pcXVlIGVsZW1lbnQgaWRcbiAgICAgICAgICAgIGdhbWVMaXN0Q29udGVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGdhbWVDYXJkKHsgZ2FtZTogZ2FtZSB9KSk7XG4gICAgICAgICAgICAvLyBiaW5kRXZlbnRUb0dhbWVDYXJkKGdhbWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlcyBjbGljayBvbiBnYW1lIGNhcmRcbiAgICAvLyBKb2lucyBnYW1lIGFzIHBsYXllclxuICAgIGNvbnN0IGJpbmRFdmVudFRvR2FtZUNhcmQgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6ICBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKCdbZGF0YS1nYW1lLWNvZGVdJykpIHtcbiAgICAgICAgICAgICAgICBqb2luUGxheWVyKGUudGFyZ2V0LmRhdGFzZXQuZ2FtZUNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbWVzLWxpc3QgZ2FtZXMtaGlzdG9yeS1saXN0X19jb250ZW50XCI+PC9kaXY+XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBNYXAgfSBmcm9tIFwiLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgbGV0IG1hcHM6IE1hcFtdO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGNvbnN0IGdldE1hcHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL21hcHMnKTtcbiAgICAgICAgbWFwcyA9IHJlcy5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuLy8gPT09IFBPU1Qgcm91dGVzID09PSAvL1xuXG5leHBvcnQgY29uc3QgYWRkTWFwID0gYXN5bmMgKHBheWxvYWQ6IE1hcCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL21hcHMnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59IiwgImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IENoYXJhY3RlciwgU2tpbGwgfSBmcm9tIFwiLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgbGV0IGNoYXJhY3RlcnM6IENoYXJhY3RlcltdO1xuZXhwb3J0IGxldCBjaGFyYWN0ZXI6IENoYXJhY3RlcjtcbmV4cG9ydCBsZXQgc2tpbGxzOiBTa2lsbFtdO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQ2hhcmFjdGVyID0gKGRhdGE6IENoYXJhY3RlcikgPT4gY2hhcmFjdGVyID0gZGF0YTtcbmV4cG9ydCBjb25zdCB1cGRhdGVDaGFyYWN0ZXJTa2lsbHMgPSAoZGF0YTogU2tpbGxbXSkgPT4gc2tpbGxzID0gZGF0YTtcblxuaW50ZXJmYWNlIE5ld0hlYWx0aFBheWxvYWQge1xuICAgIGlkOiBudW1iZXJcbiAgICBoZWFsdGg6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTmV3SW5zcGlyYXRpb25QYXlsb2FkIHtcbiAgICBpZDogbnVtYmVyXG4gICAgbmV3SW5zcGlyYXRpb246IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIE5ld1NraWxsUGF5bG9hZCB7XG4gICAgaWQ6IG51bWJlclxuICAgIGNoYXJhY3RlcklkOiBudW1iZXJcbiAgICBuYW1lOiBzdHJpbmdcbiAgICB0eXBlOiBzdHJpbmdcbiAgICBib251c19tb2Q6IG51bWJlclxuICAgIHByb2ZpY2llbnQ6IGJvb2xlYW5cbn1cblxuLy8gPT09IEdFVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBnZXRDaGFyYWN0ZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9jaGFyYWN0ZXJzJyk7XG4gICAgICAgIGNoYXJhY3RlcnMgPSByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyID0gYXN5bmMgKGlkOiBudW1iZXIpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYC9hcGkvY2hhcmFjdGVycy8ke2lkfWApO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGFbMF07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldENoYXJhY3RlclNraWxscyA9IGFzeW5jIChpZDogbnVtYmVyKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2NoYXJhY3RlcnMvc2tpbGxzLyR7aWR9YCk7XG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBhZGRDaGFyYWN0ZXIgPSBhc3luYyAocGF5bG9hZDogQ2hhcmFjdGVyKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jaGFyYWN0ZXJzJywgcGF5bG9hZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZENoYXJhY3RlclNraWxsID0gYXN5bmMgKHBheWxvYWQ6IFNraWxsKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jaGFyYWN0ZXJzL3NraWxscycsIHtpZDogY2hhcmFjdGVyLmlkLCAuLi5wYXlsb2FkfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuLy8gPT09IFBVVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBzZXRIZWFsdGggPSBhc3luYyAocGF5bG9hZDogTmV3SGVhbHRoUGF5bG9hZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS9jaGFyYWN0ZXJzL2hlYWx0aCcsIHBheWxvYWQpO1xuICAgICAgICBjaGFyYWN0ZXIgPSBhd2FpdCBnZXRDaGFyYWN0ZXIocGF5bG9hZC5pZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldFRlbXBIZWFsdGggPSBhc3luYyAocGF5bG9hZDogTmV3SGVhbHRoUGF5bG9hZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS9jaGFyYWN0ZXJzL3RlbXAnLCBwYXlsb2FkKTtcbiAgICAgICAgY2hhcmFjdGVyID0gYXdhaXQgZ2V0Q2hhcmFjdGVyKHBheWxvYWQuaWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRJbnNwaXJhdGlvbiA9IGFzeW5jIChwYXlsb2FkOiBOZXdJbnNwaXJhdGlvblBheWxvYWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wdXQoJy9hcGkvY2hhcmFjdGVycy9pbnNwaXJhdGlvbicsIHBheWxvYWQpO1xuICAgICAgICBjaGFyYWN0ZXIgPSBhd2FpdCBnZXRDaGFyYWN0ZXIocGF5bG9hZC5pZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldENoYXJhY3RlclNraWxsID0gYXN5bmMgKHBheWxvYWQ6IE5ld1NraWxsUGF5bG9hZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS9jaGFyYWN0ZXJzL3NraWxscycsIHBheWxvYWQpO1xuICAgICAgICBza2lsbHMgPSBhd2FpdCBnZXRDaGFyYWN0ZXJTa2lsbHMocGF5bG9hZC5jaGFyYWN0ZXJJZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcbiIsICJpbXBvcnQgeyBjaGFyYWN0ZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY2hhcmFjdGVyc0NvbnRyb2xsZXJcIjtcblxuLy8gUmV0dXJucyBtb2RpZmllcnMgZm9yIGVhY2ggYWJpbGl0eSBzY29yZVxuZXhwb3J0IGNvbnN0IGdldEFiaWxpdHlTY29yZU1vZGlmaWVycyA9ICgpID0+IHtcbiAgICBjb25zdCBzdHJNb2QgPSBNYXRoLmZsb29yKChjaGFyYWN0ZXIuc3RyIC0gMTApIC8gMik7XG4gICAgY29uc3QgZGV4TW9kID0gTWF0aC5mbG9vcigoY2hhcmFjdGVyLmRleCAtIDEwKSAvIDIpO1xuICAgIGNvbnN0IGNvbk1vZCA9IE1hdGguZmxvb3IoKGNoYXJhY3Rlci5jb24gLSAxMCkgLyAyKTtcbiAgICBjb25zdCBpbnRNb2QgPSBNYXRoLmZsb29yKChjaGFyYWN0ZXIuaW50IC0gMTApIC8gMik7XG4gICAgY29uc3Qgd2lzTW9kID0gTWF0aC5mbG9vcigoY2hhcmFjdGVyLndpcyAtIDEwKSAvIDIpO1xuICAgIGNvbnN0IGNoYXJNb2QgPSBNYXRoLmZsb29yKChjaGFyYWN0ZXIuY2hhciAtIDEwKSAvIDIpO1xuICAgIHJldHVybiB7IHN0ck1vZCwgZGV4TW9kLCBjb25Nb2QsIGludE1vZCwgd2lzTW9kLCBjaGFyTW9kIH07XG59O1xuIiwgIi8vIFdvdWxkIHR1cm4gXCJDcmVhdHVyZSBOYW1lXCIgaW50byBcImNyZWF0dXJlLW5hbWVcIlxuZXhwb3J0IGNvbnN0IGluZGV4Q29udmVydGVyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xccysvZywgJy0nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gUmVtb3ZlcyBmdCBhbmQgdHVybnMgcmV0dXJucyBhIG51bWJlciB2YWx1ZVxuZXhwb3J0IGNvbnN0IHJlbW92ZVVuaXRGcm9tU3RyaW5nID0gKHN0cmluZzogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHN0cmluZykgcmV0dXJuIHBhcnNlSW50KHN0cmluZy5zcGxpdCgnICcpWzBdKTtcbn07XG5cbi8vIFJlbW92ZSBkdXBsaWNhdGUgZGF0YSBmcm9tIHRoZSBkYXRhYmFzZVxuZXhwb3J0IGNvbnN0IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YSA9IChhcnJheSwgbmFtZSkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggYXJyYXkgd2l0aCBvYmplY3RzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKChpdGVtKSA9PiBhcnJheVtpXS5uYW1lID09PSBpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTG9vcHMgdGhyb3VnaCBhcnJheSBub3JtYWxseVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc29tZSgoaXRlbSkgPT4gYXJyYXlbaV0gPT09IGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwgImltcG9ydCB7IGNoYXJhY3Rlciwgc2V0Q2hhcmFjdGVyU2tpbGwsIHNraWxscyB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVycy9jaGFyYWN0ZXJzQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgZ2V0QWJpbGl0eVNjb3JlTW9kaWZpZXJzIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvc3RhdHNDYWxjdWxhdGlvbnNcIjtcbmltcG9ydCB7IGluZGV4Q29udmVydGVyIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdG9vbHMvc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7IHNldENoYXJhY3RlclNoZWV0UGFnZSB9IGZyb20gXCIuL2NoYXJhY3RlclNoZWV0XCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGFyYWN0ZXJTaGVldFNraWxsc1BhZ2UgPSAoc2hlZXRDb250ZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIHNldENoYXJhY3RlclNoZWV0UGFnZSgnc2tpbGxzJyk7XG4gICAgc2hlZXRDb250ZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY2hhcmFjdGVyU2hlZXRTa2lsbHNQYWdlSHRtbCgpKTtcbiAgICBmaWxsQ2hhcmFjdGVyU2hlZXRTa2lsbHNUYWJsZUJvZHkoKTtcbiAgICBiaW5kRXZlbnRzVG9DaGFyYWN0ZXJTaGVldFNraWxsc1BhZ2UoKTtcbn07XG5cbmNvbnN0IGJpbmRFdmVudHNUb0NoYXJhY3RlclNoZWV0U2tpbGxzUGFnZSA9ICgpID0+IHtcblxufTtcblxuY29uc3QgY2hhcmFjdGVyU2hlZXRTa2lsbHNQYWdlSHRtbCA9ICgpID0+IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFkZXJcIj5cbiAgICAgICAgPGgzIGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFkZXItLXRpdGxlXCI+U2tpbGxzPC9oMz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19za2lsbHMtdGFibGVcIj5cbiAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2tpbGxzLXRhYmxlLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VmFsdWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+UHJvZmljaWVudDwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NraWxscy10YWJsZS1ib2R5XCI+PC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGZpbGxDaGFyYWN0ZXJTaGVldFNraWxsc1RhYmxlQm9keSA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNoZWV0X19za2lsbHMtdGFibGUtYm9keScpO1xuICAgIHNraWxscy5mb3JFYWNoKChza2lsbCkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbE1vZGlmaWVyID0gZ2V0U2tpbGxNb2RpZmllcihza2lsbCk7XG4gICAgICAgIHRhYmxlQm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHNraWxsUm93SW5uZXJIdG1sKHNraWxsLCBza2lsbE1vZGlmaWVyKSk7XG4gICAgICAgIGJpbmRFdmVudFRvU2tpbGxzKHNraWxsKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHNraWxsUm93SW5uZXJIdG1sID0gKHNraWxsOiBhbnksIHNraWxsTW9kaWZpZXI6IGFueSkgPT4gYFxuICAgIDx0cj5cbiAgICAgICAgPHRkPiR7c2tpbGwubmFtZX0gPHNwYW4gY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NraWxscy10YWJsZS0tc2tpbGwtdHlwZVwiPigke3NraWxsLnR5cGV9KTwvc3Bhbj48L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCIke2luZGV4Q29udmVydGVyKHNraWxsLm5hbWUpfS1tb2RcIj4ke3NraWxsTW9kaWZpZXIgPCAwID8gJycgOiAnKyd9JHtza2lsbE1vZGlmaWVyfTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cIiR7aW5kZXhDb252ZXJ0ZXIoc2tpbGwubmFtZSl9LXByb2ZcIj4ke3NraWxsLnByb2ZpY2llbnQgPyBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGVcIj48aW5wdXQgY2xhc3M9XCJza2lsbC1wcm9maWNpZW50LWNoZWNrYm94LSR7c2tpbGwuaWR9IGNoYXJhY3Rlci1zaGVldF9fc2tpbGxzLXRhYmxlLS1jaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCI+PC9pbnB1dD48L2k+YCA6IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI+PGlucHV0IGNsYXNzPVwic2tpbGwtcHJvZmljaWVudC1jaGVja2JveC0ke3NraWxsLmlkfSBjaGFyYWN0ZXItc2hlZXRfX3NraWxscy10YWJsZS0tY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIj48L2lucHV0PjwvaT5gfTwvdGQ+XG4gICAgPC90cj5cbmA7XG5cbi8vIFRha2VzIGEgc2tpbGwgYW5kIHJldHVybnMgdGhlIHZhbHVlIG9mIGl0cyBtb2RpZmllclxuY29uc3QgZ2V0U2tpbGxNb2RpZmllciA9IChza2lsbDogYW55KSA9PiB7XG4gICAgY29uc3QgeyBzdHJNb2QsIGRleE1vZCwgY29uTW9kLCBpbnRNb2QsIHdpc01vZCwgY2hhck1vZCB9ID0gZ2V0QWJpbGl0eVNjb3JlTW9kaWZpZXJzKCk7XG4gICAgbGV0IHZhbHVlID0gMDtcbiAgICBpZiAoc2tpbGwucHJvZmljaWVudCkgdmFsdWUgKz0gY2hhcmFjdGVyLnByb2ZfYm9udXM7XG4gICAgc3dpdGNoIChza2lsbC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3N0cic6XG4gICAgICAgICAgICB2YWx1ZSArPSBzdHJNb2QgKyBza2lsbC5ib251c19tb2Q7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGV4JzpcbiAgICAgICAgICAgIHZhbHVlICs9IGRleE1vZCArIHNraWxsLmJvbnVzX21vZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb24nOlxuICAgICAgICAgICAgdmFsdWUgKz0gY29uTW9kICsgc2tpbGwuYm9udXNfbW9kO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICB2YWx1ZSArPSBpbnRNb2QgKyBza2lsbC5ib251c19tb2Q7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2lzJzpcbiAgICAgICAgICAgIHZhbHVlICs9IHdpc01vZCArIHNraWxsLmJvbnVzX21vZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGFyJzpcbiAgICAgICAgICAgIHZhbHVlICs9IGNoYXJNb2QgKyBza2lsbC5ib251c19tb2Q7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBza2lsbC5ib251c19tb2QgfHwgMDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuY29uc3QgYmluZEV2ZW50VG9Ta2lsbHMgPSAoc2tpbGw6IGFueSkgPT4ge1xuICAgIGNvbnN0IHByb2ZDaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5za2lsbC1wcm9maWNpZW50LWNoZWNrYm94LSR7c2tpbGwuaWR9YCk7XG4gICAgcHJvZkNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlOiBhbnkpID0+IHs7XG4gICAgICAgIC8vIFNldCBza2lsbCBwcm9maWNpZW5jeVxuICAgICAgICBzZXRDaGFyYWN0ZXJTa2lsbCh7IGlkOiBza2lsbC5pZCwgY2hhcmFjdGVySWQ6IGNoYXJhY3Rlci5pZCwgbmFtZTogc2tpbGwubmFtZSwgdHlwZTogc2tpbGwudHlwZSwgYm9udXNfbW9kOiBza2lsbC5ib251c19tb2QsIHByb2ZpY2llbnQ6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgRE9NXG4gICAgICAgIGNvbnN0IHNraWxsTW9kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5kZXhDb252ZXJ0ZXIoc2tpbGwubmFtZSl9LW1vZGApO1xuICAgICAgICBjb25zdCBza2lsbFByb2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpbmRleENvbnZlcnRlcihza2lsbC5uYW1lKX0tcHJvZmApO1xuICAgICAgICBjb25zdCBwcm9mSWNvbjogYW55ID0gc2tpbGxQcm9mLmNoaWxkTm9kZXNbMF07XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTa2lsbCA9IHtcbiAgICAgICAgICAgIG5hbWU6IHNraWxsLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBza2lsbC50eXBlLFxuICAgICAgICAgICAgYm9udXNfbW9kOiBza2lsbC5ib251c19tb2QsXG4gICAgICAgICAgICBwcm9maWNpZW50OiBlLnRhcmdldC5jaGVja2VkXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNraWxsTW9kaWZpZXIgPSBnZXRTa2lsbE1vZGlmaWVyKHVwZGF0ZWRTa2lsbCk7XG4gICAgICAgIHNraWxsTW9kLmlubmVySFRNTCA9IGAke3NraWxsTW9kaWZpZXIgPCAwID8gJycgOiAnKyd9JHtza2lsbE1vZGlmaWVyfWA7XG4gICAgICAgIGlmIChwcm9mSWNvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLXNvbGlkJykpIHtcbiAgICAgICAgICAgIHByb2ZJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXNvbGlkJyk7XG4gICAgICAgICAgICBwcm9mSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9mSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xuICAgICAgICAgICAgcHJvZkljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEtcmVndWxhcicpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwgImltcG9ydCB7IGNoYXJhY3Rlciwgc2V0SGVhbHRoLCBzZXRUZW1wSGVhbHRoIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2NoYXJhY3RlcnNDb250cm9sbGVyXCI7XG5cbmNvbnN0IGNoYXJhY3Rlckluc3BpcmF0aW9uSWNvbiA9IChpbnNwaXJlZDogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpbnNwaXJlZCkge1xuICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJpbnNwaXJhdGlvbi1pY29uXCIgc3JjPVwiLi4vaW1hZ2VzL3N0YXItZmlsbGVkLnBuZ1wiIGRyYWdnYWJsZT1cImZhbHNlXCI+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJpbnNwaXJhdGlvbi1pY29uXCIgc3JjPVwiLi4vaW1hZ2VzL3N0YXItZW1wdHkucG5nXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIj5gO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkYW1hZ2VIcCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgaGVhbHRoQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zaGVldF9faGVhbHRoJyk7XG4gICAgY29uc3QgdGVtcEhlYWx0aENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc2hlZXRfX2hlYWx0aC0tdGVtcCcpO1xuICAgIGxldCBkbWdBbW91bnQgPSB2YWx1ZTtcbiAgICBsZXQgdG1wSHBWYWx1ZSA9IGNoYXJhY3Rlci50ZW1wX2hlYWx0aDtcbiAgICB0bXBIcFZhbHVlIC09IGRtZ0Ftb3VudDtcbiAgICBpZiAodG1wSHBWYWx1ZSA8IDApIHRtcEhwVmFsdWUgPSAwO1xuICAgIGRtZ0Ftb3VudCAtPSBjaGFyYWN0ZXIudGVtcF9oZWFsdGg7XG4gICAgaWYgKGRtZ0Ftb3VudCA8IDApIGRtZ0Ftb3VudCA9IDA7XG4gICAgY29uc3QgbmV3SGVhbHRoID0gY2hhcmFjdGVyLmN1cnJlbnRfaGVhbHRoIC0gZG1nQW1vdW50O1xuICAgIFxuICAgIHNldFRlbXBIZWFsdGgoeyBpZDogY2hhcmFjdGVyLmlkLCBoZWFsdGg6IHRtcEhwVmFsdWUgfSk7XG4gICAgc2V0SGVhbHRoKHsgaWQ6IGNoYXJhY3Rlci5pZCwgaGVhbHRoOiBuZXdIZWFsdGggfSk7XG4gICAgaGVhbHRoQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIHRlbXBIZWFsdGhDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaGVhbHRoQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICA8cCBjbGFzcz1cImhwXCI+PGltZyBzcmM9XCIuLi9pbWFnZXMvaGVhcnQtcmVkLnBuZ1wiPiR7bmV3SGVhbHRofSAvICR7Y2hhcmFjdGVyLm1heF9oZWFsdGh9PC9wPlxuICAgIGApO1xuICAgIHRlbXBIZWFsdGhDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxwIGNsYXNzPVwidGVtcC1ocFwiPjxpbWcgc3JjPVwiLi4vaW1hZ2VzL2hlYXJ0LWJsdWUucG5nXCI+ICR7dG1wSHBWYWx1ZX08L3A+XG4gICAgYCk7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkbWctcGxheWVyLWhwLWlucHV0JykpLnZhbHVlID0gJyc7XG59O1xuXG5leHBvcnQgY29uc3QgaGVhbEhwID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBlbG10ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zaGVldF9faGVhbHRoJyk7XG4gICAgY29uc3QgaGVhbEFtb3VudCA9IHZhbHVlO1xuICAgIGxldCBuZXdIZWFsdGggPSBjaGFyYWN0ZXIuY3VycmVudF9oZWFsdGggKyBoZWFsQW1vdW50O1xuICAgIGlmIChuZXdIZWFsdGggPiBjaGFyYWN0ZXIubWF4X2hlYWx0aCkge1xuICAgICAgICBuZXdIZWFsdGggPSBjaGFyYWN0ZXIubWF4X2hlYWx0aDtcbiAgICAgICAgc2V0SGVhbHRoKHsgaWQ6IGNoYXJhY3Rlci5pZCwgaGVhbHRoOiBuZXdIZWFsdGggfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SGVhbHRoKHsgaWQ6IGNoYXJhY3Rlci5pZCwgaGVhbHRoOiBuZXdIZWFsdGggfSk7XG4gICAgfVxuXG4gICAgZWxtdC5pbm5lckhUTUwgPSAnJztcbiAgICBlbG10Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICA8cCBjbGFzcz1cImhwXCI+PGltZyBzcmM9XCIuLi9pbWFnZXMvaGVhcnQtcmVkLnBuZ1wiPiR7bmV3SGVhbHRofSAvICR7Y2hhcmFjdGVyLm1heF9oZWFsdGh9PC9wPlxuICAgIGApO1xuICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhbC1wbGF5ZXItaHAtaW5wdXQnKSkudmFsdWUgPSAnJztcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUZW1wSHAgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGVsbXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNoZWV0X19oZWFsdGgtLXRlbXAnKTtcbiAgICBjb25zdCBuZXdUZW1wSGVhbHRoID0gY2hhcmFjdGVyLnRlbXBfaGVhbHRoICsgdmFsdWU7XG4gICAgc2V0VGVtcEhlYWx0aCh7IGlkOiBjaGFyYWN0ZXIuaWQsIGhlYWx0aDogbmV3VGVtcEhlYWx0aCB9KTtcbiAgICBlbG10LmlubmVySFRNTCA9ICcnO1xuICAgIGVsbXQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxwIGNsYXNzPVwidGVtcC1ocFwiPjxpbWcgc3JjPVwiLi4vaW1hZ2VzL2hlYXJ0LWJsdWUucG5nXCI+ICR7bmV3VGVtcEhlYWx0aH08L3A+XG4gICAgYCk7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wLXBsYXllci1ocC1pbnB1dCcpKS52YWx1ZSA9ICcnO1xufTtcbiIsICJpbXBvcnQgeyBjaGFyYWN0ZXIsIHNldEluc3BpcmF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXJzL2NoYXJhY3RlcnNDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBhZGRUZW1wSHAsIGRhbWFnZUhwLCBoZWFsSHAgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9jaGFyYWN0ZXJTdGF0RXZlbnRzXCI7XG5pbXBvcnQgeyBnZXRBYmlsaXR5U2NvcmVNb2RpZmllcnMgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9zdGF0c0NhbGN1bGF0aW9uc1wiO1xuaW1wb3J0IHsgTW9kaWZpZXJzIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdHlwZXNcIjtcbmltcG9ydCB7IHNldENoYXJhY3RlclNoZWV0UGFnZSB9IGZyb20gXCIuL2NoYXJhY3RlclNoZWV0XCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGFyYWN0ZXJTaGVldE1haW5QYWdlID0gKHNoZWV0Q29udGVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICBzZXRDaGFyYWN0ZXJTaGVldFBhZ2UoJ21haW4nKTtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBnZXRBYmlsaXR5U2NvcmVNb2RpZmllcnMoKTtcbiAgICBzaGVldENvbnRlbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjaGFyYWN0ZXJTaGVldE1haW5QYWdlSHRtbChtb2RpZmllcnMpKTtcbiAgICBiaW5kRXZlbnRzVG9DaGFyYWN0ZXJTaGVldE1haW5QYWdlKCk7XG59O1xuXG5jb25zdCBjaGFyYWN0ZXJTaGVldE1haW5QYWdlSHRtbCA9IChtb2RpZmllcnM6IE1vZGlmaWVycykgPT4gYFxuICAgICR7Y2hhcmFjdGVyU2hlZXRNYWluUGFnZUhlYWRlckh0bWwoKX1cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tYWluXCI+XG4gICAgICAgICR7Y2hhcmFjdGVyU2hlZXRNYWluU3RhdHNIdG1sKCl9XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc21hbGwtc3RhdC1ibG9ja3NcIj5cbiAgICAgICAgJHtjaGFyYWN0ZXJTaGVldFNtU3RhdEJsb2Nrc0h0bWwoKX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZXNcIj5cbiAgICAgICAgJHtjaGFyYWN0ZXJTaGVldFNjb3Jlc0h0bWwobW9kaWZpZXJzKX1cbiAgICA8L2Rpdj5cbiAgICAgICAgJHtjaGFyYWN0ZXJTaGVldEhlYWx0aCgpfVxuYDtcblxuY29uc3QgY2hhcmFjdGVyU2hlZXRNYWluUGFnZUhlYWRlckh0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9faGVhZGVyXCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2ltYWdlXCIgc3JjPVwiJHtjaGFyYWN0ZXIuaW1hZ2V9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2hlYWRlci0tYmxvY2tcIj5cbiAgICAgICAgICAgIDxoMj4ke2NoYXJhY3Rlci5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8cD4ke2NoYXJhY3Rlci5yYWNlfSAke2NoYXJhY3Rlci5jbGFzc30sICR7Y2hhcmFjdGVyLmJhY2tncm91bmR9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGNoYXJhY3RlclNoZWV0TWFpblN0YXRzSHRtbCA9ICgpID0+IGBcbiAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5MZXZlbDwvc3Bhbj4gJHtjaGFyYWN0ZXIubGV2ZWx9PC9wPlxuICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPlByb2YgYm9udXM8L3NwYW4+ICske2NoYXJhY3Rlci5wcm9mX2JvbnVzfTwvcD5cbiAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5IaXQgZGljZTwvc3Bhbj4gMWQke2NoYXJhY3Rlci5oaXRfZGljZX08L3A+XG4gICAgPHAgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2luc3BpcmF0aW9uXCI+PHNwYW4gY2xhc3M9XCJib2xkXCI+SW5zcGlyYXRpb248L3NwYW4+ICR7Y2hhcmFjdGVySW5zcGlyYXRpb25JY29uKGNoYXJhY3Rlci5pbnNwaXJhdGlvbil9PC9wPlxuYDtcblxuY29uc3QgYmluZEV2ZW50c1RvQ2hhcmFjdGVyU2hlZXRNYWluUGFnZSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNoZWV0X19pbnNwaXJhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRvZ2dsZUluc3BpcmF0aW9uKGUpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFyYWN0ZXItc2hlZXQtaGVhbHRoLS1kbWctZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlOiBFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkbWctcGxheWVyLWhwLWlucHV0JykpLnZhbHVlKTtcbiAgICAgICAgZGFtYWdlSHAodmFsdWUpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFyYWN0ZXItc2hlZXQtaGVhbHRoLS1oZWFsLWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhbC1wbGF5ZXItaHAtaW5wdXQnKSkudmFsdWUpO1xuICAgICAgICBoZWFsSHAodmFsdWUpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFyYWN0ZXItc2hlZXQtaGVhbHRoLS10ZW1wLWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KCg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcC1wbGF5ZXItaHAtaW5wdXQnKSkudmFsdWUpO1xuICAgICAgICBhZGRUZW1wSHAodmFsdWUpO1xuICAgIH0pO1xufTtcblxuLy8gU2V0IGluc3BpcmF0aW9uIGRhdGEgYW5kIHJlbG9hZHMgaW5zcGlyYXRpb24gaWNvblxuY29uc3QgdG9nZ2xlSW5zcGlyYXRpb24gPSAoZTogRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBpbnNwaXJhdGlvbiwgaWQgfSA9IGNoYXJhY3RlcjtcbiAgICBjb25zdCBuZXdJbnNwaXJhdGlvbiA9ICFpbnNwaXJhdGlvbjtcbiAgICBzZXRJbnNwaXJhdGlvbih7IG5ld0luc3BpcmF0aW9uLCBpZCB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNoZWV0X19pbnNwaXJhdGlvbicpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImJvbGRcIj5JbnNwaXJhdGlvbjwvc3Bhbj4gJHtjaGFyYWN0ZXJJbnNwaXJhdGlvbkljb24obmV3SW5zcGlyYXRpb24pfWA7XG59O1xuXG5jb25zdCBjaGFyYWN0ZXJJbnNwaXJhdGlvbkljb24gPSAoaW5zcGlyZWQ6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaW5zcGlyZWQpIHtcbiAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiaW5zcGlyYXRpb24taWNvblwiIHNyYz1cIi4uL2ltYWdlcy9zdGFyLWZpbGxlZC5wbmdcIiBkcmFnZ2FibGU9XCJmYWxzZVwiPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiaW5zcGlyYXRpb24taWNvblwiIHNyYz1cIi4uL2ltYWdlcy9zdGFyLWVtcHR5LnBuZ1wiIGRyYWdnYWJsZT1cImZhbHNlXCI+YDtcbiAgICB9XG59O1xuXG5jb25zdCBjaGFyYWN0ZXJTaGVldFNtU3RhdEJsb2Nrc0h0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc21hbGwtc3RhdC1ibG9ja3MtLWJsb2NrXCI+XG4gICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkFDPC9zcGFuPjwvcD5cbiAgICAgICAgPHA+JHtjaGFyYWN0ZXIuYWN9PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NtYWxsLXN0YXQtYmxvY2tzLS1ibG9ja1wiPlxuICAgICAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5Jbml0PC9zcGFuPjwvcD5cbiAgICAgICAgPHA+JHtjaGFyYWN0ZXIuaW5pdGlhdGl2ZSA8IDAgPyAnJyA6ICcrJ30ke2NoYXJhY3Rlci5pbml0aWF0aXZlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zbWFsbC1zdGF0LWJsb2Nrcy0tYmxvY2tcIj5cbiAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+U3BlZWQ8L3NwYW4+PC9wPlxuICAgICAgICA8cD4ke2NoYXJhY3Rlci53YWxrX3NwZWVkfSBmdDwvcD5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGNoYXJhY3RlclNoZWV0U2NvcmVzSHRtbCA9IChtb2RpZmllcnM6IE1vZGlmaWVycykgPT4ge1xuICAgIGNvbnN0IHsgc3RyTW9kLCBkZXhNb2QsIGNvbk1vZCwgaW50TW9kLCB3aXNNb2QsIGNoYXJNb2QgfSA9IG1vZGlmaWVycztcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYm9sZFwiPlN0cjwvcD5cbiAgICAgICAgICAgIDxwPiR7c3RyTW9kIDwgMCA/ICcnIDogJysnfSR7c3RyTW9kfTwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgIDxwPiR7Y2hhcmFjdGVyLnN0cn08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJib2xkXCI+RGV4PC9wPlxuICAgICAgICAgICAgPHA+JHtkZXhNb2QgPCAwID8gJycgOiAnKyd9JHtkZXhNb2R9PC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgPHA+JHtjaGFyYWN0ZXIuZGV4fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJvbGRcIj5Db248L3A+XG4gICAgICAgICAgICA8cD4ke2Nvbk1vZCA8IDAgPyAnJyA6ICcrJ30ke2Nvbk1vZH08L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tb2RpZmllci1ib3hcIj5cbiAgICAgICAgICAgICAgICA8cD4ke2NoYXJhY3Rlci5jb259PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYm9sZFwiPkludDwvcD5cbiAgICAgICAgICAgIDxwPiR7aW50TW9kIDwgMCA/ICcnIDogJysnfSR7aW50TW9kfTwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgIDxwPiR7Y2hhcmFjdGVyLmludH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJib2xkXCI+V2lzPC9wPlxuICAgICAgICAgICAgPHA+JHt3aXNNb2QgPCAwID8gJycgOiAnKyd9JHt3aXNNb2R9PC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgPHA+JHtjaGFyYWN0ZXIud2lzfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJvbGRcIj5DaGFyPC9wPlxuICAgICAgICAgICAgPHA+JHtjaGFyTW9kIDwgMCA/ICcnIDogJysnfSR7Y2hhck1vZH08L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tb2RpZmllci1ib3hcIj5cbiAgICAgICAgICAgICAgICA8cD4ke2NoYXJhY3Rlci5jaGFyfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufTtcblxuY29uc3QgY2hhcmFjdGVyU2hlZXRIZWFsdGggPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9faGVhbHRoLS10ZW1wXCI+XG4gICAgICAgIDxwIGNsYXNzPVwidGVtcC1ocFwiPjxpbWcgc3JjPVwiLi4vaW1hZ2VzL2hlYXJ0LWJsdWUucG5nXCI+ICR7Y2hhcmFjdGVyLnRlbXBfaGVhbHRofTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFsdGhcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJocFwiPjxpbWcgc3JjPVwiLi4vaW1hZ2VzL2hlYXJ0LXJlZC5wbmdcIj4ke2NoYXJhY3Rlci5jdXJyZW50X2hlYWx0aH0gLyAke2NoYXJhY3Rlci5tYXhfaGVhbHRofTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFsdGgtdHJhY2tlclwiPlxuICAgICAgICA8Zm9ybSBpZD1cImNoYXJhY3Rlci1zaGVldC1oZWFsdGgtLWRtZy1mb3JtXCI+PHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+RGFtYWdlPC9zcGFuPiA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj4tPC9idXR0b24+PGlucHV0IGlkPVwiZG1nLXBsYXllci1ocC1pbnB1dFwiIHR5cGU9XCJudW1iZXJcIj48L3A+PC9mb3JtPlxuICAgICAgICA8Zm9ybSBpZD1cImNoYXJhY3Rlci1zaGVldC1oZWFsdGgtLWhlYWwtZm9ybVwiPjxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkhlYWw8L3NwYW4+IDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPis8L2J1dHRvbj48aW5wdXQgaWQ9XCJoZWFsLXBsYXllci1ocC1pbnB1dFwiIHR5cGU9XCJudW1iZXJcIj48L3A+PC9mb3JtPlxuICAgICAgICA8Zm9ybSBpZD1cImNoYXJhY3Rlci1zaGVldC1oZWFsdGgtLXRlbXAtZm9ybVwiPjxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPlRlbXAgSHA8L3NwYW4+IDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPis8L2J1dHRvbj48aW5wdXQgaWQ9XCJ0ZW1wLXBsYXllci1ocC1pbnB1dFwiIHR5cGU9XCJudW1iZXJcIj48L3A+PC9mb3JtPlxuICAgIDwvZGl2PlxuYDtcbiIsICJpbXBvcnQgeyBkZXRlcm1pbmVDaGFyYWN0ZXJTaGVldFBhZ2UsIHRvZ2dsZUNoYXJhY3RlclNoZWV0IH0gZnJvbSBcIi4vY2hhcmFjdGVyU2hlZXRcIjtcblxubGV0IHNpZGViYXJPcGVuID0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUNoYXJhY3RlclNoZWV0U2lkZWJhciA9ICgpID0+IHtcbiAgICBzaWRlYmFyT3BlbiA9ICFzaWRlYmFyT3BlbjtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zaGVldF9fc2lkZWJhcicpO1xuICAgIGNvbnN0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc2hlZXRfX3NpZGViYXItYnRuLS10b2dnbGUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLXNoZWV0X19zaWRlYmFyLWJ0bicpLmZvckVhY2goKGJ0bikgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSk7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdjaGFyYWN0ZXItc2hlZXRfX3NpZGViYXItLWhpZGRlbicpO1xuICAgIGlmIChzaWRlYmFyT3Blbikge1xuICAgICAgICB0b2dnbGVCdG4uaW5uZXJIVE1MID0gJzwnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5pbm5lckhUTUwgPSAnPic7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNoYXJhY3RlclNoZWV0U2lkZWJhckh0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2lkZWJhclwiPlxuICAgICAgICAke2NoYXJhY3RlclNoZWV0U2lkZWJhckJ1dHRvbnMoKX1cbiAgICA8L2Rpdj5cbmA7XG5cbi8vIElmIHRoZSBzaWRlYmFyIHdhcyBjbG9zZWQgcHJldmlvdXNseSwgdGhlbiBrZWVwIGl0IGNsb3NlZFxuLy8gVGhlbiBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGJ1dHRvbnNcbmV4cG9ydCBjb25zdCBoYW5kbGVDaGFyYWN0ZXJTaGVldFNpZGViYXJTdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAoIXNpZGViYXJPcGVuKSB7XG4gICAgICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNoZWV0X19zaWRlYmFyJyk7XG4gICAgICAgIGNvbnN0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc2hlZXRfX3NpZGViYXItYnRuLS10b2dnbGUnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1zaGVldF9fc2lkZWJhci1idG4nKS5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZSgnY2hhcmFjdGVyLXNoZWV0X19zaWRlYmFyLS1oaWRkZW4nKTtcbiAgICAgICAgaWYgKHNpZGViYXJPcGVuKSB7XG4gICAgICAgICAgICB0b2dnbGVCdG4uaW5uZXJIVE1MID0gJzwnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9ICc+JztcbiAgICAgICAgfVxuICAgIH1cbiAgICBiaW5kRXZlbnRzVG9TaWRlYmFyQnV0dG9ucygpO1xufTtcblxuY29uc3QgY2hhcmFjdGVyU2hlZXRTaWRlYmFyQnV0dG9ucyA9ICgpID0+IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zaWRlYmFyLWJ0bi0tdG9nZ2xlXCI+PDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NpZGViYXItYnRuXCIgaWQ9XCJzaWRlYmFyLWJ0bi0tbWFpblwiPk1haW48L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zaWRlYmFyLWJ0blwiIGlkPVwic2lkZWJhci1idG4tLXNraWxsc1wiPlNraWxsczwvYnV0dG9uPlxuYDtcblxuY29uc3QgYmluZEV2ZW50c1RvU2lkZWJhckJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXItYnRuLS1tYWluJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRldGVybWluZUNoYXJhY3RlclNoZWV0UGFnZSgnbWFpbicpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyLWJ0bi0tc2tpbGxzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRldGVybWluZUNoYXJhY3RlclNoZWV0UGFnZSgnc2tpbGxzJyk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zaGVldF9fc2lkZWJhci1idG4tLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVDaGFyYWN0ZXJTaGVldFNpZGViYXIoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcmFjdGVyLXNoZWV0LWNsb3NlLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVDaGFyYWN0ZXJTaGVldCgpO1xuICAgIH0pO1xufTtcbiIsICJpbXBvcnQgeyBkaXNhYmxlSG90a2V5cywgbWFrZURyYWdnYWJsZSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyByZW5kZXJDaGFyYWN0ZXJTaGVldFNraWxsc1BhZ2UgfSBmcm9tIFwiLi9jaGFyYWN0ZXIuU2hlZXRTa2lsbHNcIjtcbmltcG9ydCB7IHJlbmRlckNoYXJhY3RlclNoZWV0TWFpblBhZ2UgfSBmcm9tIFwiLi9jaGFyYWN0ZXJTaGVldE1haW5cIjtcbmltcG9ydCB7IGNoYXJhY3RlclNoZWV0U2lkZWJhckh0bWwsIGhhbmRsZUNoYXJhY3RlclNoZWV0U2lkZWJhclN0YXRlIH0gZnJvbSBcIi4vY2hhcmFjdGVyU2hlZXRTaWRlYmFyXCI7XG5cbmxldCBzaGVldE9wZW4gPSBmYWxzZTtcbmV4cG9ydCBsZXQgY2hhcmFjdGVyU2hlZXRQYWdlID0gJ21haW4nO1xuXG5leHBvcnQgY29uc3Qgc2V0Q2hhcmFjdGVyU2hlZXRQYWdlID0gKHBhZ2U6IHN0cmluZykgPT4gY2hhcmFjdGVyU2hlZXRQYWdlID0gcGFnZTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUNoYXJhY3RlclNoZWV0ID0gKCkgPT4ge1xuICAgIHNoZWV0T3BlbiA9ICFzaGVldE9wZW47XG4gICAgaWYgKHNoZWV0T3Blbikge1xuICAgICAgICByZW5kZXJDaGFyYWN0ZXJTaGVldCgpO1xuICAgICAgICBkZXRlcm1pbmVDaGFyYWN0ZXJTaGVldFBhZ2UoY2hhcmFjdGVyU2hlZXRQYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcmFjdGVyLXNoZWV0LW1vZGFsJykucmVtb3ZlKCk7XG4gICAgfVxufTtcblxuLy8gUmVuZGVycyB0aGUgYmFzZSBjaGFyYWN0ZXIgc2hlZXRcbmNvbnN0IHJlbmRlckNoYXJhY3RlclNoZWV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoZWV0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICBzaGVldFdpbmRvdy5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItc2hlZXQnKTtcbiAgICBzaGVldFdpbmRvdy5pZCA9ICdjaGFyYWN0ZXItc2hlZXQtbW9kYWwnO1xuICAgIHNoZWV0V2luZG93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY2hhcmFjdGVyU2hlZXRTaWRlYmFySHRtbCgpKTtcbiAgICBzaGVldFdpbmRvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tbW9kYWwtY2xvc2VcIiBpZD1cImNoYXJhY3Rlci1zaGVldC1jbG9zZS1idG5cIj5YPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXQtY29udGVudFwiPjwvZGl2PlxuICAgIGApO1xuICAgIGhhbmRsZUNoYXJhY3RlclNoZWV0U2lkZWJhclN0YXRlKCk7XG59O1xuXG4vLyBUYWtlcyBpbiB0aGUgcGFnZSB0aGF0IHRoZSBjaGFyYWN0ZXIgc2hlZXQgd2lsbCByZW5kZXIuXG4vLyBSZW5kZXJzIHRoYXQgcGFnZS5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVDaGFyYWN0ZXJTaGVldFBhZ2UgPSAocGFnZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2hlZXRDb250ZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc2hlZXQtY29udGVudCcpO1xuICAgIHNoZWV0Q29udGVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIHN3aXRjaCAocGFnZSkge1xuICAgICAgICBjYXNlICdtYWluJzpcbiAgICAgICAgICAgIHJlbmRlckNoYXJhY3RlclNoZWV0TWFpblBhZ2Uoc2hlZXRDb250ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdza2lsbHMnOlxuICAgICAgICAgICAgcmVuZGVyQ2hhcmFjdGVyU2hlZXRTa2lsbHNQYWdlKHNoZWV0Q29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXNhYmxlSG90a2V5cygpO1xuICAgIG1ha2VEcmFnZ2FibGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJhY3Rlci1zaGVldC1tb2RhbCcpLCAnLmNoYXJhY3Rlci1zaGVldF9faGVhZGVyJyk7XG59O1xuIiwgImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IG1vZGlmeVJlc3BvbnNlQ3JlYXR1cmUsIG1vZGlmeVJlc3BvbnNlU3RhbmRhcmRDcmVhdHVyZSB9IGZyb20gXCIuLi9zY3JpcHRzL2NyZWF0dXJlRGF0YUhhbmRsZXJcIjtcblxuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlcyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJ2h0dHBzOi8vd3d3LmRuZDVlYXBpLmNvL2FwaS9tb25zdGVycycpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEucmVzdWx0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXR1cmVCeUluZGV4ID0gYXN5bmMgKGluZGV4OiBzdHJpbmcsIGN1c3RvbTogYm9vbGVhbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChjdXN0b20pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgL2FwaS9jcmVhdHVyZXMvJHtpbmRleH1gKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZnlSZXNwb25zZUNyZWF0dXJlKHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYGh0dHBzOi8vd3d3LmRuZDVlYXBpLmNvL2FwaS9tb25zdGVycy8ke2luZGV4fWApO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmeVJlc3BvbnNlU3RhbmRhcmRDcmVhdHVyZShyZXMpO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEN1c3RvbUNyZWF0dXJlcyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvY3JlYXR1cmVzJyk7XG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBhZGRDcmVhdHVyZSA9IGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gQ3JlYXRlIGNyZWF0dXJlIGJhc2Ugc3RhdHNcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMnLCBwYXlsb2FkKTtcbiAgICAgICAgLy8gR2V0IGlkIG9mIHRoZSBjcmVhdHVyZSB0aGF0IHdhcyBqdXN0IG1hZGVcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2NyZWF0dXJlcycpO1xuICAgICAgICBsZXQgY3JlYXR1cmVJZCA9IHJlcy5kYXRhW3Jlcy5kYXRhLmxlbmd0aCAtIDFdLmlkO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgcmVzdCBvZiB0aGUgY3JlYXR1cmUgZGF0YVxuICAgICAgICBmb3IgKGxldCBwcm9mIG9mIHBheWxvYWQucHJvZmljaWVuY2llcykge1xuICAgICAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvcHJvZicsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHByb2YubmFtZSwgdmFsdWU6IHByb2YudmFsdWV9fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQucHJvZmljaWVuY2llcy5sZW5ndGggPT09IDApIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3Byb2YnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCB2YWx1ZTogbnVsbH19KTtcblxuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy92dWwnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBwYXlsb2FkLnZ1bH19KTtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvcmVzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogcGF5bG9hZC5yZXN9fSk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2ltbXVuaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtkbWdJbW11bmU6IHRydWUsIG5hbWU6IHBheWxvYWQuZG1nSW1tdW5lfX0pO1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9pbW11bml0aWVzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7Y29uSW1tdW5lOiB0cnVlLCBuYW1lOiBwYXlsb2FkLmNvbkltbXVuZX19KTtcbiAgICAgICAgZm9yIChsZXQgc2Vuc2Ugb2YgcGF5bG9hZC5zZW5zZXMpIHtcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3NlbnNlcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHNlbnNlLm5hbWUsIHZhbHVlOiBzZW5zZS52YWx1ZX19KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5zZW5zZXMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9zZW5zZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCB2YWx1ZTogbnVsbH19KTtcblxuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9sYW5ndWFnZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBwYXlsb2FkLmxhbmd1YWdlc319KTtcbiAgICAgICAgZm9yIChsZXQgYWJpbGl0eSBvZiBwYXlsb2FkLmFiaWxpdGllcykge1xuICAgICAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvYWJpbGl0aWVzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogYWJpbGl0eS5uYW1lLCBkZXNjOiBhYmlsaXR5LmRlc2N9fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWJpbGl0aWVzLmxlbmd0aCA9PT0gMCkgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvYWJpbGl0aWVzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogbnVsbCwgZGVzYzogbnVsbH19KTtcblxuICAgICAgICBmb3IgKGxldCBhY3Rpb24gb2YgcGF5bG9hZC5hY3Rpb25zKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hY3Rpb25zJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGFjdGlvbi5kZXNjfX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmFjdGlvbnMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hY3Rpb25zJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogbnVsbCwgZGVzYzogbnVsbH19KTtcblxuICAgICAgICBmb3IgKGxldCBhY3Rpb24gb2YgcGF5bG9hZC5sZWdBY3Rpb25zKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9sZWctYWN0aW9ucycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IGFjdGlvbi5uYW1lLCBkZXNjOiBhY3Rpb24uZGVzY319KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5sZWdBY3Rpb25zLmxlbmd0aCA9PT0gMCkgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvbGVnLWFjdGlvbnMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCBkZXNjOiBudWxsfX0pO1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuLy8gPT09IERFTEVURSByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBkZWxldGVDcmVhdHVyZSA9IGFzeW5jIChpZDogbnVtYmVyKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKGAvYXBpL2NyZWF0dXJlcy8ke2lkfWApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn07XG4iLCAiaW1wb3J0IHsgcmVtb3ZlVW5pdEZyb21TdHJpbmcgfSBmcm9tIFwiLi90b29scy9zdHJpbmdVdGlsc1wiO1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVTdGFuZGFyZENyZWF0dXJlUmVzcG9uc2UgPSAocmVzKSA9PiB7XG4gICAgY29uc3QgcHJvZmljaWVuY2llcyA9IGdldENyZWF0dXJlUHJvZmljaWVuY2llcyhyZXMucHJvZmljaWVuY2llcyk7XG4gICAgY29uc3QgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBnZXRDcmVhdHVyZUNvbmRpdGlvbkltbXVuaXRpZXMocmVzLmNvbmRpdGlvbl9pbW11bml0aWVzKTtcbiAgICBjb25zdCBzZW5zZXMgPSBnZXRDcmVhdHVyZVNlbnNlcyhyZXMuc2Vuc2VzKTtcbiAgICBjb25zdCBzcGVjaWFsX2FiaWxpdGllcyA9IGdldENyZWF0dXJlQWJpbGl0aWVzKHJlcy5zcGVjaWFsX2FiaWxpdGllcyk7XG4gICAgY29uc3QgYWN0aW9ucyA9IGdldENyZWF0dXJlQWN0aW9ucyhyZXMuYWN0aW9ucyk7XG4gICAgY29uc3QgbGVnZW5kYXJ5X2FjdGlvbnMgPSBnZXRDcmVhdHVyZUxlZ2VuZGFyeUFjdGlvbnMocmVzLmxlZ2VuZGFyeV9hY3Rpb25zKTtcblxuICAgIHJldHVybiB7IHByb2ZpY2llbmNpZXM6IHByb2ZpY2llbmNpZXMsIGNvbmRpdGlvbl9pbW11bml0aWVzOiBjb25kaXRpb25faW1tdW5pdGllcywgc2Vuc2VzOiBzZW5zZXMsIHNwZWNpYWxfYWJpbGl0aWVzOiBzcGVjaWFsX2FiaWxpdGllcywgYWN0aW9uczogYWN0aW9ucywgbGVnZW5kYXJ5X2FjdGlvbnM6IGxlZ2VuZGFyeV9hY3Rpb25zIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jaWVzID0gKF9wcm9maWNpZW5jaWVzKSA9PiB7XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSBbXTtcbiAgICBpZiAoX3Byb2ZpY2llbmNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBfcHJvZmljaWVuY2llcy5mb3JFYWNoKChwcm9mKSA9PiB7XG4gICAgICAgICAgICBwcm9maWNpZW5jaWVzLnB1c2goe25hbWU6IHByb2YucHJvZmljaWVuY3kubmFtZSwgdmFsdWU6IHByb2YudmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9maWNpZW5jaWVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlQ29uZGl0aW9uSW1tdW5pdGllcyA9IChfY29uZGl0aW9uX2ltbXVuaXRpZXMpID0+IHtcbiAgICBsZXQgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBbXTtcbiAgICBpZiAoX2NvbmRpdGlvbl9pbW11bml0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2NvbmRpdGlvbl9pbW11bml0aWVzLmZvckVhY2goKGltbXVuaXR5KSA9PiB7XG4gICAgICAgICAgICBjb25kaXRpb25faW1tdW5pdGllcy5wdXNoKGltbXVuaXR5Lm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmRpdGlvbl9pbW11bml0aWVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlU2Vuc2VzID0gKF9zZW5zZXMpID0+IHsgXG4gICAgbGV0IHNlbnNlcyA9IFtdOyAgIFxuICAgIGlmIChfc2Vuc2VzLmRhcmt2aXNpb24pIHNlbnNlcy5wdXNoKHtuYW1lOiAnRGFya3Zpc2lvbicsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLmRhcmt2aXNpb24pfSk7XG4gICAgaWYgKF9zZW5zZXMuYmxpbmRzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdCbGluZHNpZ2h0JywgdmFsdWU6IHJlbW92ZVVuaXRGcm9tU3RyaW5nKF9zZW5zZXMuYmxpbmRzaWdodCl9KTtcbiAgICBpZiAoX3NlbnNlcy50cmVtb3JzZW5zZSkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcmVtb3JzZW5zZScsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLnRyZW1vcnNlbnNlKX0pO1xuICAgIGlmIChfc2Vuc2VzLnRydWVzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcnVlc2lnaHQnLCB2YWx1ZTogcmVtb3ZlVW5pdEZyb21TdHJpbmcoX3NlbnNlcy50cnVlc2lnaHQpfSk7XG4gICAgaWYgKF9zZW5zZXMucGFzc2l2ZV9wZXJjZXB0aW9uKSBzZW5zZXMucHVzaCh7bmFtZTogJ1Bhc3NpdmUgUGVyY2VwdGlvbicsIHZhbHVlOiBfc2Vuc2VzLnBhc3NpdmVfcGVyY2VwdGlvbn0pO1xuICAgIHJldHVybiBzZW5zZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXR1cmVBYmlsaXRpZXMgPSAoX3NwZWNpYWxfYWJpbGl0aWVzKSA9PiB7XG4gICAgbGV0IHNwZWNpYWxfYWJpbGl0aWVzID0gW107XG4gICAgaWYgKF9zcGVjaWFsX2FiaWxpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIF9zcGVjaWFsX2FiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5KSA9PiB7XG4gICAgICAgICAgICBzcGVjaWFsX2FiaWxpdGllcy5wdXNoKHtuYW1lOiBhYmlsaXR5Lm5hbWUsIGRlc2M6IGFiaWxpdHkuZGVzYywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFiaWxpdHkuZGFtYWdlKX0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwZWNpYWxfYWJpbGl0aWVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlQWN0aW9ucyA9IChfYWN0aW9ucykgPT4ge1xuICAgIGxldCBhY3Rpb25zID0gW107XG4gICAgaWYgKF9hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goe25hbWU6IGFjdGlvbi5uYW1lLCBkZXNjOiBhY3Rpb24uZGVzYywgYXR0YWNrX2JvbnVzOiBhY3Rpb24uYXR0YWNrX2JvbnVzLCBkYW1hZ2U6IHN0YW5kYXJkQ3JlYXR1cmVEYW1hZ2UoYWN0aW9uLmRhbWFnZSl9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXR1cmVMZWdlbmRhcnlBY3Rpb25zID0gKF9sZWdlbmRhcnlfYWN0aW9ucykgPT4ge1xuICAgIGxldCBsZWdlbmRhcnlfYWN0aW9ucyA9IFtdO1xuICAgIGlmIChfbGVnZW5kYXJ5X2FjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBfbGVnZW5kYXJ5X2FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBsZWdlbmRhcnlfYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2MsIGF0dGFja19ib251czogYWN0aW9uLmF0dGFja19ib251cywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFjdGlvbi5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kYXJ5X2FjdGlvbnM7XG59O1xuXG4vLyBHZXRzIHRoZSBkYW1hZ2UgZGljZSBhbmQgZGFtYWdlIHR5cGUgZnJvbSBhIHN0YW5kYXJkIGNyZWF0dXJlXG5leHBvcnQgY29uc3Qgc3RhbmRhcmRDcmVhdHVyZURhbWFnZSA9IChkYW1hZ2UpID0+IHtcbiAgICBsZXQgZGFtYWdlcyA9IFtdO1xuICAgIGlmIChkYW1hZ2UpIHtcbiAgICAgICAgZGFtYWdlLmZvckVhY2goKGRtZykgPT4ge1xuICAgICAgICAgICAgaWYgKGRtZy5mcm9tKSB7XG4gICAgICAgICAgICAgICAgZG1nLmZyb20ub3B0aW9ucy5mb3JFYWNoKChkbWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlcy5wdXNoKHtkYW1hZ2VEaWNlOiBkbWcuZGFtYWdlX2RpY2UsIGRhbWFnZVR5cGU6IGRtZy5kYW1hZ2VfdHlwZS5pbmRleH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYW1hZ2VzLnB1c2goe2RhbWFnZURpY2U6IGRtZy5kYW1hZ2VfZGljZSwgZGFtYWdlVHlwZTogZG1nLmRhbWFnZV90eXBlLmluZGV4fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGFtYWdlcztcbn07XG4iLCAiLy8gUmV0dXJucyBhIHN0cmluZyB3aXRob3V0IHRoZSBzcXVhcmUgYnJhY2tldHMsIGFuZCBhcnJheSB3aXRoIGFjdGlvbiByb2xsc1xuZXhwb3J0IGNvbnN0IGdldEFjdGlvbkRlc2MgPSAoX3N0cmluZzogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHN0cmluZyA9IF9zdHJpbmdcbiAgICBsZXQgcm9sbHMgPSBbXTtcbiAgICBsZXQgdG9IaXQgPSAnJztcblxuICAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhbiBhdHRhY2sgYm9udXNcbiAgICB3aGlsZSAoc3RyaW5nLmluY2x1ZGVzKCd7eycpKSB7XG4gICAgICAgIHRvSGl0ID0gc3RyaW5nLnNwbGl0KCd7eycpWzFdLnNwbGl0KCd9fScpWzBdO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgne3snLCAnJykucmVwbGFjZSgnfX0nLCAnJyk7XG4gICAgfVxuXG4gICAgd2hpbGUodG9IaXQuaW5jbHVkZXMoJysnKSkge1xuICAgICAgICB0b0hpdCA9IHRvSGl0LnJlcGxhY2UoJysnLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gTW9kaWZpZXMgc3RyaW5nIHRvIGdldCBkbWcgcm9sbHMsIGFuZCBkZXNjcmlwdGlvbiB3aXRoIHRoZSBicmFja2V0c1xuICAgIHdoaWxlIChzdHJpbmcuaW5jbHVkZXMoJ1tbJykpIHtcbiAgICAgICAgcm9sbHMucHVzaChzdHJpbmcuc3BsaXQoJ1tbJylbMV0uc3BsaXQoJ11dJylbMF0pO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnW1snLCAnJykucmVwbGFjZSgnXV0nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB7cm9sbHM6IHJvbGxzLCBkZXNjOiBzdHJpbmcsIHRvSGl0OiB0b0hpdH07XG59O1xuXG4vLyBTcGxpdHMgYW5kIHJldHVybnMgYW4gYXR0YWNrIGRhbWFnZSByb2xsc1xuZXhwb3J0IGNvbnN0IHNlcGFyYXRlRG1nUm9sbCA9IChkbWc6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IFsgZGFtYWdlRGljZSwgZGFtYWdlVHlwZSBdID0gZG1nLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHsgZGFtYWdlRGljZSwgZGFtYWdlVHlwZSB9O1xufTtcblxuLy8gU2VwYXJhdGVzIHRoZSBzdHJpbmcgZm9yIHNraWxscy9zYXZpbmcgdGhyb3dzIGFuZCBzcGxpdHMgdGhlbSBpbnRvIHRoZWlyIG5hbWUgYW5kIHZhbHVlIFxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlUHJvZiA9IChzdHJpbmc6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2F2ZSA9IHN0cmluZy5zcGxpdCgnU2F2aW5nIFRocm93OiAnKTtcbiAgICBjb25zdCBza2lsbCA9IHN0cmluZy5zcGxpdCgnU2tpbGw6ICcpO1xuICAgIFxuICAgIGlmIChzYXZlWzBdID09PSAnJykge1xuICAgICAgICBjb25zdCBuYW1lID0gc2F2ZVsxXS5zcGxpdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBuYW1lWzBdLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmIChza2lsbFswXSA9PT0gJycpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHNraWxsWzFdLnNwbGl0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5hbWVbMF0udG9TdHJpbmcoKTtcbiAgICB9IFxuICAgIHJldHVybiBuYW1lO1xufTtcbiIsICJpbXBvcnQgeyBnZXRBY3Rpb25EZXNjLCBzZXBhcmF0ZURtZ1JvbGwgfSBmcm9tIFwiLi90b29scy9zdGF0VG9vbHNcIjtcbmltcG9ydCB7IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YSB9IGZyb20gXCIuL3Rvb2xzL3N0cmluZ1V0aWxzXCI7XG5cbi8vIFNlcGFyYXRlIGRpZmZlcmVudCBwYXJ0cyBvZiB0aGUgcmVzcG9uc2UgaW50byBhcnJheXNcbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUNyZWF0dXJlUmVzcG9uc2UgPSAocmVzKSA9PiB7XG4gICAgbGV0IHsgcHJvZmljaWVuY2llcywgdnVsbmVyYWJpbGl0aWVzLCByZXNpc3RhbmNlcywgZGFtYWdlSW1tdW5pdGllcywgY29uZGl0aW9uSW1tdW5pdGllcywgc2Vuc2VzLCBhYmlsaXRpZXMsIGFjdGlvbnMsIGxlZ0FjdGlvbnMgfSA9IGdldEluaXRpYWxDcmVhdHVyZUFycmF5cyhyZXMpO1xuICAgIFxuICAgIHByb2ZpY2llbmNpZXMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEocHJvZmljaWVuY2llcywgdHJ1ZSk7XG4gICAgdnVsbmVyYWJpbGl0aWVzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKHZ1bG5lcmFiaWxpdGllcywgZmFsc2UpO1xuICAgIHJlc2lzdGFuY2VzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKHJlc2lzdGFuY2VzLCBmYWxzZSk7XG4gICAgZGFtYWdlSW1tdW5pdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShkYW1hZ2VJbW11bml0aWVzLCBmYWxzZSk7XG4gICAgY29uZGl0aW9uSW1tdW5pdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShjb25kaXRpb25JbW11bml0aWVzLCBmYWxzZSk7XG4gICAgc2Vuc2VzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKHNlbnNlcywgdHJ1ZSk7XG4gICAgYWJpbGl0aWVzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKGFiaWxpdGllcywgdHJ1ZSk7XG4gICAgYWN0aW9ucyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShhY3Rpb25zLCB0cnVlKTtcbiAgICBsZWdBY3Rpb25zID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKGxlZ0FjdGlvbnMsIHRydWUpO1xuXG4gICAgLy8gR2V0IGFiaWxpdHkgcm9sbHNcbiAgICBsZXQgbW9kaWZpZWRBYmlsaXRpZXMgPSBbXTtcbiAgICBhYmlsaXRpZXMuZm9yRWFjaCgoYWJpbGl0eSkgPT4ge1xuICAgICAgICBpZiAoYWJpbGl0eS5uYW1lICYmIGFiaWxpdHkuZGVzYykge1xuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSBnZXRBY3Rpb25EZXNjKGFiaWxpdHkuZGVzYyk7XG4gICAgICAgICAgICBtb2RpZmllZEFiaWxpdGllcy5wdXNoKHsgbmFtZTogYWJpbGl0eS5uYW1lLCBkZXNjOiBhYmlsaXR5RGF0YS5kZXNjLCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwoYWJpbGl0eURhdGEucm9sbHMudG9TdHJpbmcoKSldIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgYWJpbGl0aWVzID0gbW9kaWZpZWRBYmlsaXRpZXM7XG5cbiAgICAvLyBHZXQgYWN0aW9uIHJvbGxzXG4gICAgbGV0IG1vZGlmaWVkQWN0aW9ucyA9IFtdO1xuICAgIGFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24ubmFtZSAmJiBhY3Rpb24uZGVzYykge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uRGF0YSA9IGdldEFjdGlvbkRlc2MoYWN0aW9uLmRlc2MpO1xuICAgICAgICAgICAgbW9kaWZpZWRBY3Rpb25zLnB1c2goeyBuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uRGF0YS5kZXNjLCBhdHRhY2tfYm9udXM6IGFjdGlvbkRhdGEudG9IaXQsIGRhbWFnZTogW3NlcGFyYXRlRG1nUm9sbChhY3Rpb25EYXRhLnJvbGxzLnRvU3RyaW5nKCkpXSB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFjdGlvbnMgPSBtb2RpZmllZEFjdGlvbnM7XG5cbiAgICAvLyBHZXQgbGVnZW5kYXJ5IGFjdGlvbiByb2xsc1xuICAgIGxldCBtb2RpZmllZExlZ0FjdGlvbnMgPSBbXTtcbiAgICBsZWdBY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgJiYgYWN0aW9uLmRlc2MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZ0FjdGlvbkRhdGEgPSBnZXRBY3Rpb25EZXNjKGFjdGlvbi5kZXNjKTtcbiAgICAgICAgICAgIG1vZGlmaWVkTGVnQWN0aW9ucy5wdXNoKHsgbmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGxlZ0FjdGlvbkRhdGEuZGVzYywgYXR0YWNrX2JvbnVzOiBsZWdBY3Rpb25EYXRhLnRvSGl0LCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwobGVnQWN0aW9uRGF0YS5yb2xscy50b1N0cmluZygpKV0gfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZWdBY3Rpb25zID0gbW9kaWZpZWRMZWdBY3Rpb25zO1xuXG4gICAgY29uc3QgeyBfcHJvZmljaWVuY2llcywgX3Jlc2lzdGFuY2VzLCBfdnVsbmVyYWJpbGl0aWVzLCBfc2Vuc2VzIH0gPSBlbXB0eU51bGxBcnJheXMocHJvZmljaWVuY2llcywgcmVzaXN0YW5jZXMsIHZ1bG5lcmFiaWxpdGllcywgc2Vuc2VzKTtcbiAgICByZXR1cm4geyBwcm9maWNpZW5jaWVzOiBfcHJvZmljaWVuY2llcywgdnVsbmVyYWJpbGl0aWVzOiBfdnVsbmVyYWJpbGl0aWVzLCByZXNpc3RhbmNlczogX3Jlc2lzdGFuY2VzLCBkYW1hZ2VJbW11bml0aWVzOiBkYW1hZ2VJbW11bml0aWVzLCBjb25kaXRpb25JbW11bml0aWVzOiBjb25kaXRpb25JbW11bml0aWVzLCBzZW5zZXM6IF9zZW5zZXMsIGFiaWxpdGllczogYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdBY3Rpb25zOiBsZWdBY3Rpb25zIH07XG59O1xuXG4vLyBQdXNoZXMgYWxsIGNyZWF0dXJlcyBkYXRhIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBhcnJheXMgYW5kIHJldHVybnMgdGhlbS5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsQ3JlYXR1cmVBcnJheXMgPSAocmVzKSA9PiB7XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSBbXTtcbiAgICBsZXQgdnVsbmVyYWJpbGl0aWVzID0gW107XG4gICAgbGV0IHJlc2lzdGFuY2VzID0gW107XG4gICAgbGV0IGRhbWFnZUltbXVuaXRpZXMgPSBbXTtcbiAgICBsZXQgY29uZGl0aW9uSW1tdW5pdGllcyA9IFtdO1xuICAgIGxldCBzZW5zZXMgPSBbXTtcbiAgICBsZXQgYWJpbGl0aWVzID0gW107XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbGVnQWN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgc3RhdCBvZiByZXMpIHtcbiAgICAgICAgcHJvZmljaWVuY2llcy5wdXNoKHtuYW1lOiBzdGF0LnByb2ZfbmFtZSwgdmFsdWU6IHN0YXQucHJvZl92YWx1ZX0pO1xuICAgICAgICB2dWxuZXJhYmlsaXRpZXMucHVzaChzdGF0LnZ1bF9uYW1lKTtcbiAgICAgICAgcmVzaXN0YW5jZXMucHVzaChzdGF0LnJlc19uYW1lKTtcbiAgICAgICAgc2Vuc2VzLnB1c2goe25hbWU6IHN0YXQuc2Vuc2VfbmFtZSwgdmFsdWU6IHN0YXQuc2Vuc2VfdmFsdWV9KTtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goe25hbWU6IHN0YXQuYWJpbGl0eV9uYW1lLCBkZXNjOiBzdGF0LmFiaWxpdHlfZGVzY30pO1xuICAgICAgICBhY3Rpb25zLnB1c2goe25hbWU6IHN0YXQuYWN0aW9uX25hbWUsIGRlc2M6IHN0YXQuYWN0aW9uX2Rlc2N9KTtcbiAgICAgICAgbGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBzdGF0LmxlZ19hY3Rpb25fbmFtZSwgZGVzYzogc3RhdC5sZWdfYWN0aW9uX2Rlc2N9KTtcblxuICAgICAgICBpZiAoc3RhdC5pbW11bmVfdHlwZSA9PT0gJ2RhbWFnZScpIHtcbiAgICAgICAgICAgIGRhbWFnZUltbXVuaXRpZXMucHVzaChzdGF0LmltbXVuZV9uYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0LmltbXVuZV90eXBlID09PSAnY29uZGl0aW9uJykge1xuICAgICAgICAgICAgY29uZGl0aW9uSW1tdW5pdGllcy5wdXNoKHN0YXQuaW1tdW5lX25hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHByb2ZpY2llbmNpZXM6IHByb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllczogdnVsbmVyYWJpbGl0aWVzLCByZXNpc3RhbmNlczogcmVzaXN0YW5jZXMsIGRhbWFnZUltbXVuaXRpZXM6IGRhbWFnZUltbXVuaXRpZXMsIGNvbmRpdGlvbkltbXVuaXRpZXM6IGNvbmRpdGlvbkltbXVuaXRpZXMsIHNlbnNlczogc2Vuc2VzLCBhYmlsaXRpZXM6IGFiaWxpdGllcywgYWN0aW9uczogYWN0aW9ucywgbGVnQWN0aW9uczogbGVnQWN0aW9ucyB9O1xufTtcblxuLy8gTWFrZSBzdXJlIGFycmF5cyB0aGF0IGhhdmUgbm8gdmFsdWVzIGFyZSBlbXB0eSwgYW5kIGRvbid0IGhhdmUgbnVsbCB2YWx1ZXMgaW4gaXQuXG5leHBvcnQgY29uc3QgZW1wdHlOdWxsQXJyYXlzID0gKHByb2ZpY2llbmNpZXMsIHJlc2lzdGFuY2VzLCB2dWxuZXJhYmlsaXRpZXMsIHNlbnNlcykgPT4ge1xuICAgIGlmIChwcm9maWNpZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICBwcm9maWNpZW5jaWVzLmZvckVhY2goKHByb2YpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9mLm5hbWUgJiYgcHJvZi52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBwcm9maWNpZW5jaWVzID0gW107XG4gICAgfVxuICAgIGlmIChyZXNpc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcmVzaXN0YW5jZXMuZm9yRWFjaCgocmVzaXN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc2lzdGFuY2UpIGV4aXN0cyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV4aXN0cykgcmVzaXN0YW5jZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHZ1bG5lcmFiaWxpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgdnVsbmVyYWJpbGl0aWVzLmZvckVhY2goKHZ1bCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZ1bCkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSB2dWxuZXJhYmlsaXRpZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHNlbnNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgc2Vuc2VzLmZvckVhY2goKHNlbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2Vuc2UubmFtZSAmJiBzZW5zZS52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBzZW5zZXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHsgX3Byb2ZpY2llbmNpZXM6IHByb2ZpY2llbmNpZXMsIF9yZXNpc3RhbmNlczogcmVzaXN0YW5jZXMsIF92dWxuZXJhYmlsaXRpZXM6IHZ1bG5lcmFiaWxpdGllcywgX3NlbnNlczogc2Vuc2VzIH07XG59O1xuIiwgImltcG9ydCB7IHJlbW92ZVVuaXRGcm9tU3RyaW5nIH0gZnJvbSBcIi4vdG9vbHMvc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7IHNlcGFyYXRlU3RhbmRhcmRDcmVhdHVyZVJlc3BvbnNlIH0gZnJvbSBcIi4vc3RhbmRhcmRDcmVhdHVyZVJlc1wiO1xuaW1wb3J0IHsgc2VwYXJhdGVDcmVhdHVyZVJlc3BvbnNlIH0gZnJvbSBcIi4vY3VzdG9tQ3JlYXR1cmVSZXNcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGlmeVJlc3BvbnNlU3RhbmRhcmRDcmVhdHVyZSA9IChyZXM6IGFueSkgPT4ge1xuICAgIC8vIEdldHMgYWxsIHRoZSBhcnJheXMgb2YgY3JlYXR1cmUgZGF0YVxuICAgIGNvbnN0IHsgcHJvZmljaWVuY2llcywgY29uZGl0aW9uX2ltbXVuaXRpZXMsIHNlbnNlcywgc3BlY2lhbF9hYmlsaXRpZXMsIGFjdGlvbnMsIGxlZ2VuZGFyeV9hY3Rpb25zIH0gPSBzZXBhcmF0ZVN0YW5kYXJkQ3JlYXR1cmVSZXNwb25zZShyZXMuZGF0YSk7XG4gICAgY29uc3QgbW9kaWZpZWRSZXMgPSBuZXcgQ3JlYXR1cmUoXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHJlcy5kYXRhLmluZGV4LFxuICAgICAgICByZXMuZGF0YS5uYW1lLFxuICAgICAgICByZXMuZGF0YS5zaXplLFxuICAgICAgICByZXMuZGF0YS50eXBlLFxuICAgICAgICByZXMuZGF0YS5hbGlnbm1lbnQsXG4gICAgICAgIHJlcy5kYXRhLmFybW9yX2NsYXNzLFxuICAgICAgICByZXMuZGF0YS5oaXRfcG9pbnRzLFxuICAgICAgICByZXMuZGF0YS5oaXRfZGljZSxcbiAgICAgICAgcmVzLmRhdGEuc3RyZW5ndGgsXG4gICAgICAgIHJlcy5kYXRhLmRleHRlcml0eSxcbiAgICAgICAgcmVzLmRhdGEuY29uc3RpdHV0aW9uLFxuICAgICAgICByZXMuZGF0YS5pbnRlbGxpZ2VuY2UsXG4gICAgICAgIHJlcy5kYXRhLndpc2RvbSxcbiAgICAgICAgcmVzLmRhdGEuY2hhcmlzbWEsXG4gICAgICAgIHJlcy5kYXRhLmNoYWxsZW5nZV9yYXRpbmcsXG4gICAgICAgIHJlcy5kYXRhLnhwLFxuICAgICAgICByZXMuZGF0YS5sYW5ndWFnZXMsXG4gICAgICAgIHJlbW92ZVVuaXRGcm9tU3RyaW5nKHJlcy5kYXRhLnNwZWVkLndhbGspLFxuICAgICAgICByZW1vdmVVbml0RnJvbVN0cmluZyhyZXMuZGF0YS5zcGVlZC5zd2ltKSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuYnVycm93KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuZmx5KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuY2xpbWIpLFxuICAgICAgICBwcm9maWNpZW5jaWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfdnVsbmVyYWJpbGl0aWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfcmVzaXN0YW5jZXMsXG4gICAgICAgIHJlcy5kYXRhLmRhbWFnZV9pbW11bml0aWVzLFxuICAgICAgICBjb25kaXRpb25faW1tdW5pdGllcyxcbiAgICAgICAgc2Vuc2VzLFxuICAgICAgICBzcGVjaWFsX2FiaWxpdGllcyxcbiAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgbGVnZW5kYXJ5X2FjdGlvbnNcbiAgICApO1xuICAgIHJldHVybiBtb2RpZmllZFJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZnlSZXNwb25zZUNyZWF0dXJlID0gKHJlczogYW55KSA9PiB7XG4gICAgLy8gR2V0cyBhbGwgdGhlIGFycmF5cyBvZiBjcmVhdHVyZSBkYXRhXG4gICAgY29uc3QgeyBwcm9maWNpZW5jaWVzLCB2dWxuZXJhYmlsaXRpZXMsIHJlc2lzdGFuY2VzLCBkYW1hZ2VJbW11bml0aWVzLCBjb25kaXRpb25JbW11bml0aWVzLCBzZW5zZXMsIGFiaWxpdGllcywgYWN0aW9ucywgbGVnQWN0aW9ucyB9ID0gc2VwYXJhdGVDcmVhdHVyZVJlc3BvbnNlKHJlcy5kYXRhKTtcbiAgICBjb25zdCBtb2RpZmllZFJlcyA9IG5ldyBDcmVhdHVyZShcbiAgICAgICAgcmVzLmRhdGFbMF0uaWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLnVzZXJfaWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLmluZGV4LFxuICAgICAgICByZXMuZGF0YVswXS5uYW1lLFxuICAgICAgICByZXMuZGF0YVswXS5zaXplLFxuICAgICAgICByZXMuZGF0YVswXS50eXBlLFxuICAgICAgICByZXMuZGF0YVswXS5hbGlnbm1lbnQsXG4gICAgICAgIHJlcy5kYXRhWzBdLmFjLFxuICAgICAgICByZXMuZGF0YVswXS5oaXRfcG9pbnRzLFxuICAgICAgICByZXMuZGF0YVswXS5oaXRfZGljZSxcbiAgICAgICAgcmVzLmRhdGFbMF0uc3RyLFxuICAgICAgICByZXMuZGF0YVswXS5kZXgsXG4gICAgICAgIHJlcy5kYXRhWzBdLmNvbixcbiAgICAgICAgcmVzLmRhdGFbMF0uaW50LFxuICAgICAgICByZXMuZGF0YVswXS53aXMsXG4gICAgICAgIHJlcy5kYXRhWzBdLmNoYXIsXG4gICAgICAgIHJlcy5kYXRhWzBdLmNyLFxuICAgICAgICByZXMuZGF0YVswXS54cCxcbiAgICAgICAgcmVzLmRhdGFbMF0ubGlzdCxcbiAgICAgICAgcmVzLmRhdGFbMF0ud2Fsa19zcGVlZCxcbiAgICAgICAgcmVzLmRhdGFbMF0uc3dpbV9zcGVlZCxcbiAgICAgICAgcmVzLmRhdGFbMF0uYnVycm93X3NwZWVkLFxuICAgICAgICByZXMuZGF0YVswXS5mbHlfc3BlZWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLmNsaW1iX3NwZWVkLFxuICAgICAgICBwcm9maWNpZW5jaWVzLFxuICAgICAgICB2dWxuZXJhYmlsaXRpZXMsXG4gICAgICAgIHJlc2lzdGFuY2VzLFxuICAgICAgICBkYW1hZ2VJbW11bml0aWVzLFxuICAgICAgICBjb25kaXRpb25JbW11bml0aWVzLFxuICAgICAgICBzZW5zZXMsXG4gICAgICAgIGFiaWxpdGllcyxcbiAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgbGVnQWN0aW9uc1xuICAgICk7XG4gICAgcmV0dXJuIG1vZGlmaWVkUmVzO1xufTtcblxuY2xhc3MgQ3JlYXR1cmUge1xuICAgIGlkOiBudW1iZXJcbiAgICB1c2VyX2lkOiBudW1iZXJcbiAgICBpbmRleDogc3RyaW5nXG4gICAgbmFtZTogc3RyaW5nXG4gICAgc2l6ZTogbnVtYmVyXG4gICAgdHlwZTogc3RyaW5nXG4gICAgYWxpZ25tZW50OiBzdHJpbmdcbiAgICBhYzogbnVtYmVyXG4gICAgaGl0X3BvaW50czogbnVtYmVyXG4gICAgaGl0X2RpY2U6IHN0cmluZ1xuICAgIHN0cjogbnVtYmVyXG4gICAgZGV4OiBudW1iZXJcbiAgICBjb246IG51bWJlclxuICAgIGludDogbnVtYmVyXG4gICAgd2lzOiBudW1iZXJcbiAgICBjaGFyOiBudW1iZXJcbiAgICBjcjogbnVtYmVyXG4gICAgeHA6IG51bWJlclxuICAgIGxhbmd1YWdlczogYW55XG4gICAgc3BlZWRzOiBhbnlcbiAgICBwcm9maWNpZW5jaWVzOiBhbnlcbiAgICB2dWxuZXJhYmlsaXRpZXM6IGFueVxuICAgIHJlc2lzdGFuY2VzOiBhbnlcbiAgICBkYW1hZ2VJbW11bml0aWVzOiBhbnlcbiAgICBjb25kaXRpb25JbW11bml0aWVzOiBhbnlcbiAgICBzZW5zZXM6IGFueVxuICAgIGFiaWxpdGllczogYW55XG4gICAgYWN0aW9uczogYW55XG4gICAgbGVnQWN0aW9uczogYW55XG5cbiAgICBjb25zdHJ1Y3RvciAoaWQ6IG51bWJlciwgdXNlcl9pZDogbnVtYmVyLCBpbmRleDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgdHlwZTogc3RyaW5nLCBhbGlnbm1lbnQ6IHN0cmluZywgYWM6IG51bWJlciwgaGl0X3BvaW50czogbnVtYmVyLCBoaXRfZGljZTogc3RyaW5nLCBzdHI6IG51bWJlciwgZGV4OiBudW1iZXIsIGNvbjogbnVtYmVyLCBpbnQ6IG51bWJlciwgd2lzOiBudW1iZXIsIGNoYXI6IG51bWJlciwgY3I6IG51bWJlciwgeHA6IG51bWJlciwgbGFuZ3VhZ2VzOiBhbnksIHdhbGtfc3BlZWQ6IG51bWJlciwgc3dpbV9zcGVlZDogbnVtYmVyLCBidXJyb3dfc3BlZWQ6IG51bWJlciwgZmx5X3NwZWVkOiBudW1iZXIsIGNsaW1iX3NwZWVkOiBudW1iZXIsIHByb2ZpY2llbmNpZXM6IGFueSwgdnVsbmVyYWJpbGl0aWVzOiBhbnksIHJlc2lzdGFuY2VzOiBhbnksIGRhbWFnZUltbXVuaXRpZXM6IGFueSwgY29uZGl0aW9uSW1tdW5pdGllczogYW55LCBzZW5zZXM6IGFueSwgYWJpbGl0aWVzOiBhbnksIGFjdGlvbnM6IGFueSwgbGVnQWN0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdXNlcl9pZDtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmFsaWdubWVudCA9IGFsaWdubWVudDtcbiAgICAgICAgdGhpcy5hYyA9IGFjO1xuICAgICAgICB0aGlzLmhpdF9wb2ludHMgPSBoaXRfcG9pbnRzO1xuICAgICAgICB0aGlzLmhpdF9kaWNlID0gaGl0X2RpY2U7XG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xuICAgICAgICB0aGlzLmRleCA9IGRleDtcbiAgICAgICAgdGhpcy5jb24gPSBjb247XG4gICAgICAgIHRoaXMuaW50ID0gaW50O1xuICAgICAgICB0aGlzLndpcyA9IHdpcztcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy5jciA9IGNyO1xuICAgICAgICB0aGlzLnhwID0geHA7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gbGFuZ3VhZ2VzO1xuICAgICAgICB0aGlzLnNwZWVkcyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnV2FsaycsIHZhbHVlOiB3YWxrX3NwZWVkfSxcbiAgICAgICAgICAgIHtuYW1lOiAnU3dpbScsIHZhbHVlOiBzd2ltX3NwZWVkfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQnVycm93JywgdmFsdWU6IGJ1cnJvd19zcGVlZH0sXG4gICAgICAgICAgICB7bmFtZTogJ0ZseScsIHZhbHVlOiBmbHlfc3BlZWR9LFxuICAgICAgICAgICAge25hbWU6ICdDbGltYicsIHZhbHVlOiBjbGltYl9zcGVlZH1cbiAgICAgICAgXSxcbiAgICAgICAgdGhpcy5wcm9maWNpZW5jaWVzID0gcHJvZmljaWVuY2llcztcbiAgICAgICAgdGhpcy52dWxuZXJhYmlsaXRpZXMgPSB2dWxuZXJhYmlsaXRpZXM7XG4gICAgICAgIHRoaXMucmVzaXN0YW5jZXMgPSByZXNpc3RhbmNlcztcbiAgICAgICAgdGhpcy5kYW1hZ2VJbW11bml0aWVzID0gZGFtYWdlSW1tdW5pdGllcztcbiAgICAgICAgdGhpcy5jb25kaXRpb25JbW11bml0aWVzID0gY29uZGl0aW9uSW1tdW5pdGllcztcbiAgICAgICAgdGhpcy5zZW5zZXMgPSBzZW5zZXM7XG4gICAgICAgIHRoaXMuYWJpbGl0aWVzID0gYWJpbGl0aWVzO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICB0aGlzLmxlZ0FjdGlvbnMgPSBsZWdBY3Rpb25zO1xuICAgIH1cbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbChpZDogc3RyaW5nLCBoZWFkZXI6IHN0cmluZykge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwiJHtpZH0tbW9kYWxcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tLW1vZGFsLWNsb3NlXCIgaWQ9XCIke2lkfS1tb2RhbC1jbG9zZS1idG5cIj5YPC9idXR0b24+XG4gICAgICAgICAgICAke2hlYWRlcn1cbiAgICAgICAgICAgIDxkaXYgaWQ9XCIke2lkfS1tb2RhbF9fYm9keVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdG9vbHMvdXRpbHNcIjtcbmltcG9ydCB7IENyZWF0dXJlIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXR1cmVBYmlsaXRpZXMoY3JlYXR1cmU6IENyZWF0dXJlKSB7XG4gICAgcmVhZHkoKCkgPT4ge1xuICAgICAgICBpZiAoY3JlYXR1cmUuYWJpbGl0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNyZWF0dXJlLmFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5KSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNwZWNpYWwtYWJpbGl0aWVzLS0ke2NyZWF0dXJlLmluZGV4fWApLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BlY2lhbC1hYmlsaXRpZXNfX2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzcGVjaWFsLWFiaWxpdGllc19fbmFtZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiPiR7YWJpbGl0eS5uYW1lfS48L3NwYW4+ICR7YWJpbGl0eS5kZXNjfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIGAjc3BlY2lhbC1hYmlsaXRpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zcGVjaWFsLWFiaWxpdGllc1wiIGlkPVwic3BlY2lhbC1hYmlsaXRpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgeyBzZXBhcmF0ZVByb2YgfSBmcm9tIFwiLi90b29scy9zdGF0VG9vbHNcIjtcbmltcG9ydCB7IENyZWF0dXJlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlU3BlZWREYXRhID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgIGxldCBzcGVlZHMgPSBbXTtcbiAgICBjcmVhdHVyZS5zcGVlZHMuZm9yRWFjaCgoc3BlZWQpID0+IHtcbiAgICAgICAgaWYgKHNwZWVkLnZhbHVlKSB7XG4gICAgICAgICAgICBzcGVlZHMucHVzaChzcGVlZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3BlZWRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENyZWF0dXJlU2NvcmVzRGF0YSA9IChjcmVhdHVyZTogQ3JlYXR1cmUpID0+IHtcbiAgICBsZXQgc2NvcmVOYW1lcyA9IFsnU3RyJywgJ0RleCcsICdDb24nLCAnSW50JywgJ1dpcycsICdDaGFyJ107XG4gICAgbGV0IHNjb3JlVmFsdWVzID0gW1xuICAgICAgICBjcmVhdHVyZS5zdHIsXG4gICAgICAgIGNyZWF0dXJlLmRleCxcbiAgICAgICAgY3JlYXR1cmUuY29uLFxuICAgICAgICBjcmVhdHVyZS5pbnQsXG4gICAgICAgIGNyZWF0dXJlLndpcyxcbiAgICAgICAgY3JlYXR1cmUuY2hhclxuICAgIF07XG4gICAgcmV0dXJuIHsgc2NvcmVOYW1lczogc2NvcmVOYW1lcywgc2NvcmVWYWx1ZXM6IHNjb3JlVmFsdWVzIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jeURhdGEgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgbGV0IG90aGVyU2tpbGxzID0gW107XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSAnJywgc2tpbGxzID0gJyc7XG5cbiAgICBjcmVhdHVyZS5wcm9maWNpZW5jaWVzLmZvckVhY2goKHByb2ZpY2llbmN5KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVkUHJvZiA9IHNlcGFyYXRlUHJvZihwcm9maWNpZW5jeS5uYW1lICsgcHJvZmljaWVuY3kudmFsdWUsIHByb2ZpY2llbmN5LnZhbHVlLCBwcm9maWNpZW5jeS5uYW1lKTtcbiAgICAgICAgaWYgKHByb2ZpY2llbmN5Lm5hbWUuaW5jbHVkZXMoJ1NhdmluZycpKSB7XG4gICAgICAgICAgICBwcm9maWNpZW5jaWVzICs9IGAgJHttb2RpZmllZFByb2Z9ICske3Byb2ZpY2llbmN5LnZhbHVlfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3RoZXJTa2lsbHMucHVzaCh7bmFtZTogbW9kaWZpZWRQcm9mLCB2YWx1ZTogcHJvZmljaWVuY3kudmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHByb2ZpY2llbmNpZXMgPSBwcm9maWNpZW5jaWVzLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICBvdGhlclNraWxscy5mb3JFYWNoKChza2lsbCkgPT4ge1xuICAgICAgICBza2lsbHMgKz0gYCAke3NraWxsLm5hbWV9ICske3NraWxsLnZhbHVlfSxgO1xuICAgIH0pO1xuICAgIHNraWxscyA9IHNraWxscy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgcmV0dXJuIHsgcHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgc2tpbGxzOiBza2lsbHMgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDcmVhdHVyZVZ1bFJlc0RhdGEgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgbGV0IHZ1bCA9IGdldFZ1bG5lcmFiaWxpdGllcyhjcmVhdHVyZSk7XG4gICAgbGV0IHJlcyA9IGdldFJlc2lzdGFuY2VzKGNyZWF0dXJlKTtcbiAgICBsZXQgZG1nSW1tdW5lID0gZ2V0RG1nSW1tdW5lKGNyZWF0dXJlKTtcbiAgICBsZXQgY29uSW1tdW5lID0gZ2V0Q29uSW1tdW5lKGNyZWF0dXJlKTtcbiAgICByZXR1cm4geyB2dWw6IHZ1bCwgcmVzOiByZXMsIGRtZ0ltbXVuZTogZG1nSW1tdW5lLCBjb25JbW11bmU6IGNvbkltbXVuZSB9O1xufTtcblxuY29uc3QgZ2V0VnVsbmVyYWJpbGl0aWVzID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgIGlmIChjcmVhdHVyZS52dWxuZXJhYmlsaXRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XG4gICAgICAgIGNyZWF0dXJlLnZ1bG5lcmFiaWxpdGllcy5mb3JFYWNoKChzdGF0KSA9PiB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gYCAke3N0YXR9LGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgZ2V0UmVzaXN0YW5jZXMgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgaWYgKGNyZWF0dXJlLnJlc2lzdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuICAgICAgICBjcmVhdHVyZS5yZXNpc3RhbmNlcy5mb3JFYWNoKChzdGF0KSA9PiB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gYCAke3N0YXR9LGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgZ2V0RG1nSW1tdW5lID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgIGlmIChjcmVhdHVyZS5kYW1hZ2VJbW11bml0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuICAgICAgICBjcmVhdHVyZS5kYW1hZ2VJbW11bml0aWVzLmZvckVhY2goKHN0YXQpID0+IHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c3RhdH0sYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCBnZXRDb25JbW11bmUgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgaWYgKGNyZWF0dXJlLmNvbmRpdGlvbkltbXVuaXRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XG4gICAgICAgIGNyZWF0dXJlLmNvbmRpdGlvbkltbXVuaXRpZXMuZm9yRWFjaCgoc3RhdCkgPT4ge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzdGF0fSxgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDcmVhdHVyZVNlbnNlc0RhdGEgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgbGV0IHN0cmluZyA9ICcnO1xuICAgIGNyZWF0dXJlLnNlbnNlcy5mb3JFYWNoKChzZW5zZSkgPT4ge1xuICAgICAgICBpZiAoc2Vuc2UubmFtZS5pbmNsdWRlcygncGFzc2l2ZScpIHx8IHNlbnNlLm5hbWUuaW5jbHVkZXMoJ1Bhc3NpdmUnKSkge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzZW5zZS5uYW1lfSAke3NlbnNlLnZhbHVlfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzZW5zZS5uYW1lfSAke3NlbnNlLnZhbHVlfSBmdC4sYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xufTtcbiIsICJpbXBvcnQgeyBnZXRDcmVhdHVyZVNjb3Jlc0RhdGEgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9jcmVhdHVyZVN0YXRzSGFuZGxlclwiO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdHVyZUFiaWxpdHlTY29yZXMoY3JlYXR1cmU6IENyZWF0dXJlKSB7XG4gICAgcmVhZHkoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHNjb3JlTmFtZXMsIHNjb3JlVmFsdWVzIH0gPSBnZXRDcmVhdHVyZVNjb3Jlc0RhdGEoY3JlYXR1cmUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1vZGlmaWVyID0gTWF0aC5mbG9vcigoc2NvcmVWYWx1ZXNbaV0gLSAxMCkgLyAyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzY29yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvbGRcIj48cD4ke3Njb3JlTmFtZXNbaV19PC9wPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHA+JHttb2RpZmllciA8IDAgPyAnJyA6ICcrJ30ke21vZGlmaWVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlLWJveC0tbW9kaWZpZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7c2NvcmVWYWx1ZXNbaV19PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApO1xuICAgICAgICB9XG4gICAgfSwgYCNzY29yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zY29yZXNcIiBpZD1cInNjb3Jlcy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdG9vbHMvdXRpbHNcIjtcbmltcG9ydCB7IENyZWF0dXJlIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdHlwZXNcIjtcblxuY29uc3QgcmVuZGVyQ3JlYXR1cmVBY3Rpb25zID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBjcmVhdHVyZS5hY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zX19ib3hcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFjdGlvbnNfX25hbWVcIj48c3BhbiBjbGFzcz1cImJvbGRcIj4ke2FjdGlvbi5uYW1lfS48L3NwYW4+ICR7YWN0aW9uLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgICR7YWN0aW9uLmF0dGFja19ib251cyA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZGljZS1kMjBcIj48L2k+ICske2FjdGlvbi5hdHRhY2tfYm9udXN9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xuICAgIGkgPSAwO1xuICAgIGNyZWF0dXJlLmFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y3JlYXR1cmUuaW5kZXh9LSR7YWN0aW9uLm5hbWV9LSR7aX1gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zX19ib3gtLWRtZ19kaWNlJyk7XG4gICAgICAgIGFjdGlvbi5kYW1hZ2UuZm9yRWFjaCgoZG1nKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxidXR0b24gY2xhc3M9XCJidG4tLWF0dGFjayBidG4tLWhvdmVyXCI+JHtkbWcuZGFtYWdlRGljZX0gJHtkbWcuZGFtYWdlVHlwZX08L2J1dHRvbj5gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGkrKztcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0dXJlQWN0aW9ucyhjcmVhdHVyZTogQ3JlYXR1cmUpIHtcbiAgICByZWFkeSgoKSA9PiB7XG4gICAgICAgIHJlbmRlckNyZWF0dXJlQWN0aW9ucyhjcmVhdHVyZSk7XG4gICAgfSwgYCNhY3Rpb25zLS0ke2NyZWF0dXJlLmluZGV4fWApO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX2JvZHktLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxoND5BY3Rpb25zPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX2FjdGlvbnNcIiBpZD1cImFjdGlvbnMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iLCAiaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5jb25zdCByZW5kZXJDcmVhdHVyZUxlZ0FjdGlvbnMgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNyZWF0dXJlLmxlZ0FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmRhcnktYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zX19ib3hcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFjdGlvbnNfX25hbWVcIj48c3BhbiBjbGFzcz1cImJvbGRcIj4ke2FjdGlvbi5uYW1lfS48L3NwYW4+ICR7YWN0aW9uLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgICR7YWN0aW9uLmF0dGFja19ib251cyA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZGljZS1kMjBcIj48L2k+ICske2FjdGlvbi5hdHRhY2tfYm9udXN9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xuXG4gICAgaSA9IDA7XG4gICAgY3JlYXR1cmUubGVnQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfWApO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xlZ2VuZGFyeS1hY3Rpb25zX19ib3gtLWRtZ19kaWNlJyk7XG5cbiAgICAgICAgYWN0aW9uLmRhbWFnZS5mb3JFYWNoKChkbWcpID0+IHtcbiAgICAgICAgICAgIGlmIChkbWcuZGFtYWdlRGljZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tYXR0YWNrIGJ0bi0taG92ZXJcIj4ke2RtZy5kYW1hZ2VEaWNlfSAke2RtZy5kYW1hZ2VUeXBlfTwvYnV0dG9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXR1cmVMZWdBY3Rpb25zKGNyZWF0dXJlOiBDcmVhdHVyZSkge1xuICAgIHJlYWR5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyQ3JlYXR1cmVMZWdBY3Rpb25zKGNyZWF0dXJlKTtcbiAgICB9LCBgI2xlZ2VuZGFyeS1hY3Rpb25zLS0ke2NyZWF0dXJlLmluZGV4fWApO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX2JvZHktLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxoND5MZWdlbmRhcnkgQWN0aW9uczwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19sZWdlbmRhcnktYWN0aW9uc1wiIGlkPVwibGVnZW5kYXJ5LWFjdGlvbnMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iLCAiaW1wb3J0IHsgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jeURhdGEgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9jcmVhdHVyZVN0YXRzSGFuZGxlclwiO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdHVyZVByb2ZpY2llbmNpZXMoY3JlYXR1cmU6IENyZWF0dXJlKSB7XG4gICAgcmVhZHkoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHByb2ZpY2llbmNpZXMsIHNraWxscyB9ID0gZ2V0Q3JlYXR1cmVQcm9maWNpZW5jeURhdGEoY3JlYXR1cmUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvZmljaWVuY2llcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICR7cHJvZmljaWVuY2llcyAmJiBgPHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+U2F2aW5nIFRocm93czwvc3Bhbj4gJHtwcm9maWNpZW5jaWVzfTwvcD5gfVxuICAgICAgICBgKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNraWxscy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICR7c2tpbGxzICYmIGA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5Ta2lsbHM8L3NwYW4+ICR7c2tpbGxzfTwvcD5gfVxuICAgICAgICBgKTtcbiAgICB9LCBgI3NraWxscy0tJHtjcmVhdHVyZS5pbmRleH1gKTtcblxuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Byb2ZpY2llbmNpZXNcIiBpZD1cInByb2ZpY2llbmNpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Byb2ZpY2llbmNpZXNcIiBpZD1cInNraWxscy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCB7IGdldENyZWF0dXJlU2Vuc2VzRGF0YSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL2NyZWF0dXJlU3RhdHNIYW5kbGVyXCI7XG5pbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyBDcmVhdHVyZSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0dXJlU2Vuc2VzKGNyZWF0dXJlOiBDcmVhdHVyZSkge1xuICAgIHJlYWR5KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2Vuc2VzID0gZ2V0Q3JlYXR1cmVTZW5zZXNEYXRhKGNyZWF0dXJlKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNlbnNlcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICR7c2Vuc2VzICYmIGA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5TZW5zZXM8L3NwYW4+ICR7c2Vuc2VzfTwvcD5gfVxuICAgICAgICBgKTtcbiAgICB9LCBgI3NlbnNlcy0tJHtjcmVhdHVyZS5pbmRleH1gKTtcblxuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3NlbnNlc1wiIGlkPVwic2Vuc2VzLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgIGA7XG59XG4iLCAiaW1wb3J0IHsgZ2V0Q3JlYXR1cmVTcGVlZERhdGEgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9jcmVhdHVyZVN0YXRzSGFuZGxlclwiO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdHVyZVNwZWVkcyhjcmVhdHVyZTogQ3JlYXR1cmUpIHtcbiAgICByZWFkeSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwZWVkcyA9IGdldENyZWF0dXJlU3BlZWREYXRhKGNyZWF0dXJlKTtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcGVlZC0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxzcGFuIGNsYXNzPVwiYm9sZFwiPlNwZWVkIDwvc3Bhbj5gKTtcbiAgICAgICAgc3BlZWRzLmZvckVhY2goKHNwZWVkKSA9PiB7XG4gICAgICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgICR7c3BlZWQubmFtZX0gJHtzcGVlZC52YWx1ZX0gZnQuLFxuICAgICAgICAgICAgYCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGAjc3BlZWQtLSR7Y3JlYXR1cmUuaW5kZXh9YCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zcGVlZFwiIGlkPVwic3BlZWQtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgeyBnZXRDcmVhdHVyZVZ1bFJlc0RhdGEgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy9jcmVhdHVyZVN0YXRzSGFuZGxlclwiO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdHVyZVZ1bFJlcyhjcmVhdHVyZTogQ3JlYXR1cmUpIHtcbiAgICByZWFkeSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdnVsLCByZXMsIGRtZ0ltbXVuZSwgY29uSW1tdW5lIH0gPSBnZXRDcmVhdHVyZVZ1bFJlc0RhdGEoY3JlYXR1cmUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdnVsLXJlcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICR7dnVsICYmIGA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5WdWxuZXJhYmlsaXRpZXM8L3NwYW4+ICR7dnVsfTwvcD5gfVxuICAgICAgICAgICAgJHtyZXMgJiYgYDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPlJlc2lzdGFuY2VzPC9zcGFuPiAke3Jlc308L3A+YH1cbiAgICAgICAgICAgICR7ZG1nSW1tdW5lICYmIGA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5EYW1hZ2UgSW1tdW5pdGllczwvc3Bhbj4gJHtkbWdJbW11bmV9PC9wPmB9XG4gICAgICAgICAgICAke2NvbkltbXVuZSAmJiBgPHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+Q29uZGl0aW9uIEltbXVuaXRpZXM8L3NwYW4+ICR7Y29uSW1tdW5lfTwvcD5gfVxuICAgICAgICBgKTtcbiAgICB9LCBgI3Z1bC1yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X192dWwtcmVzXCIgaWQ9XCJ2dWwtcmVzLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgIGA7XG59XG4iLCAiaW1wb3J0IHsgZ2V0Q3JlYXR1cmVCeUluZGV4IH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXJzL2NyZWF0dXJlc0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IG1ha2VEcmFnZ2FibGUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IHsgQ3JlYXR1cmUgfSBmcm9tIFwiLi4vLi4vc2NyaXB0cy90eXBlc1wiO1xuaW1wb3J0IG1vZGFsIGZyb20gXCIuLi9tb2RhbFwiO1xuaW1wb3J0IGNyZWF0dXJlQWJpbGl0aWVzIGZyb20gXCIuL2NyZWF0dXJlQWJpbGl0aWVzXCI7XG5pbXBvcnQgY3JlYXR1cmVBYmlsaXR5U2NvcmVzIGZyb20gXCIuL2NyZWF0dXJlQWJpbGl0eVNjb3Jlc1wiO1xuaW1wb3J0IGNyZWF0dXJlQWN0aW9ucyBmcm9tIFwiLi9jcmVhdHVyZUFjdGlvbnNcIjtcbmltcG9ydCBjcmVhdHVyZUxlZ0FjdGlvbnMgZnJvbSBcIi4vY3JlYXR1cmVMZWdBY3Rpb25zXCI7XG5pbXBvcnQgY3JlYXR1cmVQcm9maWNpZW5jaWVzIGZyb20gXCIuL2NyZWF0dXJlUHJvZmljaWVuY2llc1wiO1xuaW1wb3J0IGNyZWF0dXJlU2Vuc2VzIGZyb20gXCIuL2NyZWF0dXJlU2Vuc2VzXCI7XG5pbXBvcnQgY3JlYXR1cmVTcGVlZHMgZnJvbSBcIi4vY3JlYXR1cmVTcGVlZHNcIjtcbmltcG9ydCBjcmVhdHVyZVZ1bFJlcyBmcm9tIFwiLi9jcmVhdHVyZVZ1bFJlc1wiO1xuXG5sZXQgY3JlYXR1cmVJbmRleExpc3QgPSBbXTtcblxuZXhwb3J0IGNvbnN0IG9wZW5DcmVhdHVyZVN0YXRzV2luZG93ID0gYXN5bmMgKGluZGV4OiBzdHJpbmcsIGN1c3RvbTogYm9vbGVhbikgPT4ge1xuICAgIC8vIENoZWNrIGlmIGEgY3JlYXR1cmUncyBzdGF0cyBhcmUgYWxyZWFkeSBvcGVuXG4gICAgLy8gSWYgdGhleSBhcmUgb3BlbiB0aGUgY2xvc2UgdGhlIHdpbmRvdyBpbnN0ZWFkXG4gICAgZm9yIChsZXQgbGlzdEl0ZW0gb2YgY3JlYXR1cmVJbmRleExpc3QpIHtcbiAgICAgICAgaWYgKGxpc3RJdGVtID09PSBpbmRleCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aW5kZXh9LW1vZGFsYCkucmVtb3ZlKCk7ICAgIFxuICAgICAgICAgICAgY3JlYXR1cmVJbmRleExpc3Quc3BsaWNlKGNyZWF0dXJlSW5kZXhMaXN0LmluZGV4T2YoaW5kZXgpLCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdHVyZUluZGV4TGlzdC5wdXNoKGluZGV4KTtcbiAgICBcbiAgICAvLyBHZXQgZGF0YSBmb3Igc2VsZWN0ZWQgY3JlYXR1cmVcbiAgICBsZXQgY3JlYXR1cmU6IENyZWF0dXJlID0gYXdhaXQgZ2V0Q3JlYXR1cmVCeUluZGV4KGluZGV4LCBjdXN0b20pO1xuICAgIHJlbmRlckNyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmUpO1xuICAgIGJpbmRFdmVudHNUb0NyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmUpO1xufTtcblxuXG5jb25zdCByZW5kZXJDcmVhdHVyZVN0YXRzV2luZG93ID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsKGNyZWF0dXJlLmluZGV4LCBjcmVhdHVyZVN0YXRzV2luZG93SGVhZGVyKGNyZWF0dXJlKSkpO1xuICAgIGNvbnN0IGNyZWF0dXJlU3RhdHNNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NyZWF0dXJlLmluZGV4fS1tb2RhbGApO1xuICAgIGNvbnN0IG1vZGFsQm9keSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjcmVhdHVyZS5pbmRleH0tbW9kYWxfX2JvZHlgKTtcbiAgICBjcmVhdHVyZVN0YXRzTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLW9mZnNldCcpO1xuICAgIG1vZGFsQm9keS5jbGFzc0xpc3QuYWRkKCdjcmVhdHVyZS1zdGF0cy13aW5kb3cnKTtcbiAgICBtb2RhbEJvZHkuY2xhc3NMaXN0LmFkZChgY3JlYXR1cmUtc3RhdHMtd2luZG93LS0ke2NyZWF0dXJlLmluZGV4fWApO1xuICAgIG1vZGFsQm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmUpKTtcbiAgICBtYWtlRHJhZ2dhYmxlKGNyZWF0dXJlU3RhdHNNb2RhbCwgYCNjcmVhdHVyZS1zdGF0cy13aW5kb3ctLSR7Y3JlYXR1cmUuaW5kZXh9X19oZWFkZXJgKTtcbn07XG5cbmNvbnN0IGJpbmRFdmVudHNUb0NyZWF0dXJlU3RhdHNXaW5kb3cgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y3JlYXR1cmUuaW5kZXh9LW1vZGFsLWNsb3NlLWJ0bmApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjcmVhdHVyZS5pbmRleH0tbW9kYWxgKS5yZW1vdmUoKTtcbiAgICAgICAgY3JlYXR1cmVJbmRleExpc3Quc3BsaWNlKGNyZWF0dXJlSW5kZXhMaXN0LmluZGV4T2YoY3JlYXR1cmUuaW5kZXgpLCAxKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0dXJlU3RhdHNXaW5kb3dIZWFkZXIgPSAoY3JlYXR1cmU6IENyZWF0dXJlKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19faGVhZGVyXCIgaWQ9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3ctLSR7Y3JlYXR1cmUuaW5kZXh9X19oZWFkZXJcIj5cbiAgICAgICAgPGgzPiR7Y3JlYXR1cmUubmFtZX08L2gzPlxuICAgICAgICA8cD4ke2NyZWF0dXJlLnNpemUgPyBgJHtjcmVhdHVyZS5zaXplfWAgOiAnJ30ke2NyZWF0dXJlLnR5cGUgPyBgICR7Y3JlYXR1cmUudHlwZX1gIDogJyd9JHtjcmVhdHVyZS5hbGlnbm1lbnQgPyBgLCAke2NyZWF0dXJlLmFsaWdubWVudH1gOiAnJ308L3A+XG4gICAgPC9kaXY+XG5gO1xuXG5jb25zdCBjcmVhdHVyZVN0YXRzV2luZG93ID0gKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4gYFxuICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX2JvZHlcIj5cbiAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkFybW9yIENsYXNzPC9zcGFuPiAke2NyZWF0dXJlLmFjfTwvcD5cbiAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkhlYWx0aDwvc3Bhbj4gJHtjcmVhdHVyZS5oaXRfcG9pbnRzfSAke2NyZWF0dXJlLmhpdF9kaWNlID8gYCgke2NyZWF0dXJlLmhpdF9kaWNlfSlgIDogJyd9PC9wPlxuICAgICAgICAgICAgJHtjcmVhdHVyZVNwZWVkcyhjcmVhdHVyZSl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19fYm9keS0tZ2VuZXJhbC1zdGF0c1wiPlxuICAgICAgICAgICAgICAgICR7Y3JlYXR1cmVBYmlsaXR5U2NvcmVzKGNyZWF0dXJlKX1cbiAgICAgICAgICAgICAgICAke2NyZWF0dXJlUHJvZmljaWVuY2llcyhjcmVhdHVyZSl9XG4gICAgICAgICAgICAgICAgJHtjcmVhdHVyZVZ1bFJlcyhjcmVhdHVyZSl9XG4gICAgICAgICAgICAgICAgJHtjcmVhdHVyZVNlbnNlcyhjcmVhdHVyZSl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fbGFuZ3VhZ2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICR7Y3JlYXR1cmUubGFuZ3VhZ2VzID8gYDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkxhbmd1YWdlczwvc3Bhbj4gJHtjcmVhdHVyZS5sYW5ndWFnZXN9PC9wPmAgOiBgYH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkNoYWxsZW5nZTwvc3Bhbj4gJHtjcmVhdHVyZS5jciA/IGNyZWF0dXJlLmNyIDogJy0nfSAoJHtjcmVhdHVyZS54cCA/IGNyZWF0dXJlLnhwIDogMH0gWFApPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAke2NyZWF0dXJlQWJpbGl0aWVzKGNyZWF0dXJlKX1cbiAgICAgICAgICAgICR7Y3JlYXR1cmUuYWN0aW9ucy5sZW5ndGggPiAwID8gY3JlYXR1cmVBY3Rpb25zKGNyZWF0dXJlKSA6ICcnfVxuICAgICAgICAgICAgJHtjcmVhdHVyZS5sZWdBY3Rpb25zLmxlbmd0aCA+IDAgPyBjcmVhdHVyZUxlZ0FjdGlvbnMoY3JlYXR1cmUpIDogJyd9XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuYDtcbiIsICJpbXBvcnQgeyBkZWxldGVDcmVhdHVyZSB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVycy9jcmVhdHVyZXNDb250cm9sbGVyXCI7XG5pbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyBDcmVhdHVyZSwgTWluaWZpZWRDcmVhdHVyZSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3R5cGVzXCI7XG5pbXBvcnQgeyBvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdyB9IGZyb20gXCIuL2NyZWF0dXJlU3RhdHNcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgICBjcmVhdHVyZTogTWluaWZpZWRDcmVhdHVyZSB8IENyZWF0dXJlXG4gICAgY3VzdG9tOiBib29sZWFuXG4gICAgaW5kZXg6IG51bWJlclxufVxuXG5jb25zdCBiaW5kRXZlbnRzVG9DcmVhdHVyZVJvdyA9IChjcmVhdHVyZTogYW55LCBjcmVhdHVyZUlkOiBzdHJpbmcsIGN1c3RvbTogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IGNyZWF0dXJlUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y3JlYXR1cmVJZH1gKTtcbiAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NyZWF0dXJlSWR9LXRyYXNoYCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVDcmVhdHVyZShjcmVhdHVyZS5pZCk7XG4gICAgICAgICAgICBjcmVhdHVyZVJvdy5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0dXJlUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdyhjcmVhdHVyZS5pbmRleCwgY3VzdG9tKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlckNyZWF0dXJlUm93Q29udGVudCA9IChjcmVhdHVyZTogTWluaWZpZWRDcmVhdHVyZSB8IENyZWF0dXJlLCBjcmVhdHVyZUlkOiBzdHJpbmcsIGN1c3RvbTogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IGNyZWF0dXJlUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3JlYXR1cmVJZCk7XG4gICAgY3JlYXR1cmVSb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxwPiR7Y3JlYXR1cmUubmFtZX08L3A+XG4gICAgICAgICR7Y3VzdG9tID8gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2gtY2FuIGNyZWF0dXJlLXJvd19fZGVsZXRlLWJ0blwiIGlkPVwiJHtjcmVhdHVyZUlkfS10cmFzaFwiPjwvaT5gIDogJyd9XG4gICAgYCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXR1cmVSb3coeyBjcmVhdHVyZSwgY3VzdG9tLCBpbmRleCB9OiBQcm9wcykge1xuICAgIGNvbnN0IGNyZWF0dXJlSWQgPSBgY3JlYXR1cmUtJHtpbmRleH1gO1xuICAgIHJlYWR5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyQ3JlYXR1cmVSb3dDb250ZW50KGNyZWF0dXJlLCBjcmVhdHVyZUlkLCBjdXN0b20pO1xuICAgICAgICBiaW5kRXZlbnRzVG9DcmVhdHVyZVJvdyhjcmVhdHVyZSwgY3JlYXR1cmVJZCwgY3VzdG9tKTtcbiAgICB9LCBgIyR7Y3JlYXR1cmVJZH1gKTtcblxuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1yb3dcIiBpZD1cIiR7Y3JlYXR1cmVJZH1cIj48L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCB7IHRvZ2dsZU5ld0NyZWF0dXJlRm9ybSB9IGZyb20gXCIuLi9jb21wb25lbnRzL25ld0NyZWF0dXJlRm9ybVwiO1xuaW1wb3J0IHsgYWRkQ3JlYXR1cmUgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY3JlYXR1cmVzQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5kZXhDb252ZXJ0ZXIgfSBmcm9tIFwiLi90b29scy9zdHJpbmdVdGlsc1wiO1xuXG5leHBvcnQgY29uc3Qgc3VibWl0Q3JlYXR1cmVGb3JtID0gKGU6IGFueSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7IHByb2ZpY2llbmNpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zIH0gPSBnZXRBcnJheUlucHV0VmFsdWVzKCk7XG4gICAgY29uc3QgeyBjcmVhdHVyZUZvcm1OYW1lLCBjcmVhdHVyZUZvcm1TaXplLCBjcmVhdHVyZUZvcm1UeXBlLCBjcmVhdHVyZUZvcm1BbGlnbm1lbnQsIGNyZWF0dXJlRm9ybUFjLCBjcmVhdHVyZUZvcm1IaXRQb2ludHMsIGNyZWF0dXJlRm9ybUhpdERpY2UsIGNyZWF0dXJlRm9ybVN0ciwgY3JlYXR1cmVGb3JtRGV4LCBjcmVhdHVyZUZvcm1Db24sIGNyZWF0dXJlRm9ybUludCwgY3JlYXR1cmVGb3JtV2lzLCBjcmVhdHVyZUZvcm1DaGFyLCBjcmVhdHVyZUZvcm1WdWwsIGNyZWF0dXJlRm9ybVJlcywgY3JlYXR1cmVGb3JtRG1nSW1tdW5lLCBjcmVhdHVyZUZvcm1Db25JbW11bmUsIGNyZWF0dXJlRm9ybUxhbmd1YWdlcywgY3JlYXR1cmVGb3JtQ3IsIGNyZWF0dXJlRm9ybVhwLCBjcmVhdHVyZUZvcm1XYWxrLCBjcmVhdHVyZUZvcm1Td2ltLCBjcmVhdHVyZUZvcm1CdXJyb3csIGNyZWF0dXJlRm9ybUZseSwgY3JlYXR1cmVGb3JtQ2xpbWIgfSA9IGdldElucHV0VmFsdWVzKCk7XG4gICAgdG9nZ2xlTmV3Q3JlYXR1cmVGb3JtKCk7XG4gICAgY29uc3QgbmV3Q3JlYXR1cmUgPSBuZXcgQ3JlYXR1cmVGb3JtRGF0YShpbmRleENvbnZlcnRlcihjcmVhdHVyZUZvcm1OYW1lKSwgJ2h0dHBzOi8vd3d3LmRhbmR3aWtpLmNvbS93L2ltYWdlcy8zLzM3L0JyZWFkU3Bhd24uanBnJywgY3JlYXR1cmVGb3JtTmFtZSwgY3JlYXR1cmVGb3JtU2l6ZSwgY3JlYXR1cmVGb3JtVHlwZSwgY3JlYXR1cmVGb3JtQWxpZ25tZW50LCBwYXJzZUludChjcmVhdHVyZUZvcm1BYyksIHBhcnNlSW50KGNyZWF0dXJlRm9ybUhpdFBvaW50cyksIGNyZWF0dXJlRm9ybUhpdERpY2UsIHBhcnNlSW50KGNyZWF0dXJlRm9ybVN0ciksIHBhcnNlSW50KGNyZWF0dXJlRm9ybURleCksIHBhcnNlSW50KGNyZWF0dXJlRm9ybUNvbiksIHBhcnNlSW50KGNyZWF0dXJlRm9ybUludCksIHBhcnNlSW50KGNyZWF0dXJlRm9ybVdpcyksIHBhcnNlSW50KGNyZWF0dXJlRm9ybUNoYXIpLCBjcmVhdHVyZUZvcm1WdWwsIGNyZWF0dXJlRm9ybVJlcywgY3JlYXR1cmVGb3JtRG1nSW1tdW5lLCBjcmVhdHVyZUZvcm1Db25JbW11bmUsIGNyZWF0dXJlRm9ybUxhbmd1YWdlcywgcGFyc2VJbnQoY3JlYXR1cmVGb3JtQ3IpLCBwYXJzZUludChjcmVhdHVyZUZvcm1YcCksIHBhcnNlSW50KGNyZWF0dXJlRm9ybVdhbGspLCBwYXJzZUludChjcmVhdHVyZUZvcm1Td2ltKSwgcGFyc2VJbnQoY3JlYXR1cmVGb3JtQnVycm93KSwgcGFyc2VJbnQoY3JlYXR1cmVGb3JtRmx5KSwgcGFyc2VJbnQoY3JlYXR1cmVGb3JtQ2xpbWIpLCBwcm9maWNpZW5jaWVzLCBzZW5zZXMsIGFiaWxpdGllcywgYWN0aW9ucywgbGVnQWN0aW9ucyk7XG4gICAgYWRkQ3JlYXR1cmUobmV3Q3JlYXR1cmUpO1xufVxuXG5jb25zdCBnZXRBcnJheUlucHV0VmFsdWVzID0gKCkgPT4ge1xuICAgIGxldCBwcm9maWNpZW5jaWVzID0gW107XG4gICAgbGV0IHNlbnNlcyA9IFtdO1xuICAgIGxldCBhYmlsaXRpZXMgPSBbXTtcbiAgICBsZXQgYWN0aW9ucyA9IFtdO1xuICAgIGxldCBsZWdBY3Rpb25zID0gW107XG4gICAgbGV0IHByb2ZpY2llbmN5TmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19wcm9maWNpZW5jeS1uYW1lJyk7XG4gICAgbGV0IHByb2ZpY2llbmN5VmFsdWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fcHJvZmljaWVuY3ktdmFsdWUnKTtcbiAgICBsZXQgc2Vuc2VOYW1lOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX3NlbnNlLW5hbWUnKTtcbiAgICBsZXQgc2Vuc2VWYWx1ZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19zZW5zZS12YWx1ZScpO1xuICAgIGxldCBhYmlsaXR5TmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19hYmlsaXR5LW5hbWUnKTtcbiAgICBsZXQgYWJpbGl0eURlc2M6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWJpbGl0eS1kZXNjJyk7XG4gICAgbGV0IGFjdGlvbk5hbWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWN0aW9uLW5hbWUnKTtcbiAgICBsZXQgYWN0aW9uRGVzYzogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19hY3Rpb24tZGVzYycpO1xuICAgIGxldCBsZWdBY3Rpb25OYW1lOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2xlZy1hY3Rpb24tbmFtZScpO1xuICAgIGxldCBsZWdBY3Rpb25EZXNjOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2xlZy1hY3Rpb24tZGVzYycpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9maWNpZW5jeU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2ZpY2llbmN5TmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgcHJvZmljaWVuY3lWYWx1ZVtpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHByb2ZpY2llbmNpZXMucHVzaCh7IG5hbWU6IHByb2ZpY2llbmN5TmFtZVtpXS52YWx1ZSwgdmFsdWU6IHByb2ZpY2llbmN5VmFsdWVbaV0udmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW5zZU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbnNlTmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgc2Vuc2VWYWx1ZVtpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHNlbnNlcy5wdXNoKHsgbmFtZTogc2Vuc2VOYW1lW2ldLnZhbHVlLCB2YWx1ZTogc2Vuc2VWYWx1ZVtpXS52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFiaWxpdHlOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhYmlsaXR5TmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgYWJpbGl0eURlc2NbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBhYmlsaXRpZXMucHVzaCh7IG5hbWU6IGFiaWxpdHlOYW1lW2ldLnZhbHVlLCBkZXNjOiBhYmlsaXR5RGVzY1tpXS52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbk5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFjdGlvbk5hbWVbaV0udmFsdWUgIT09ICcnIHx8IGFjdGlvbkRlc2NbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goeyBuYW1lOiBhY3Rpb25OYW1lW2ldLnZhbHVlLCBkZXNjOiBhY3Rpb25EZXNjW2ldLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnQWN0aW9uTmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGVnQWN0aW9uTmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgbGVnQWN0aW9uRGVzY1tpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGxlZ0FjdGlvbnMucHVzaCh7IG5hbWU6IGxlZ0FjdGlvbk5hbWVbaV0udmFsdWUsIGRlc2M6IGxlZ0FjdGlvbkRlc2NbaV0udmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgcHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgc2Vuc2VzOiBzZW5zZXMsIGFiaWxpdGllczogYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdBY3Rpb25zOiBsZWdBY3Rpb25zIH07XG59O1xuXG5jb25zdCBnZXRJbnB1dFZhbHVlcyA9ICgpID0+IHtcbiAgICBsZXQgY3JlYXR1cmVGb3JtTmFtZSwgY3JlYXR1cmVGb3JtU2l6ZSA9IFwibWVkaXVtXCIsIGNyZWF0dXJlRm9ybVR5cGUsIGNyZWF0dXJlRm9ybUFsaWdubWVudCwgY3JlYXR1cmVGb3JtQWMsIGNyZWF0dXJlRm9ybUhpdFBvaW50cywgY3JlYXR1cmVGb3JtSGl0RGljZSwgY3JlYXR1cmVGb3JtU3RyLCBjcmVhdHVyZUZvcm1EZXgsIGNyZWF0dXJlRm9ybUNvbiwgY3JlYXR1cmVGb3JtSW50LCBjcmVhdHVyZUZvcm1XaXMsIGNyZWF0dXJlRm9ybUNoYXIsIGNyZWF0dXJlRm9ybVZ1bCwgY3JlYXR1cmVGb3JtUmVzLCBjcmVhdHVyZUZvcm1EbWdJbW11bmUsIGNyZWF0dXJlRm9ybUNvbkltbXVuZSwgY3JlYXR1cmVGb3JtTGFuZ3VhZ2VzLCBjcmVhdHVyZUZvcm1DciwgY3JlYXR1cmVGb3JtWHAsIGNyZWF0dXJlRm9ybVdhbGssIGNyZWF0dXJlRm9ybVN3aW0sIGNyZWF0dXJlRm9ybUJ1cnJvdywgY3JlYXR1cmVGb3JtRmx5LCBjcmVhdHVyZUZvcm1DbGltYjtcbiAgICBjcmVhdHVyZUZvcm1OYW1lID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLW5hbWUnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtU2l6ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1zaXplJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybVR5cGUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0tdHlwZScpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1BbGlnbm1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0tYWxpZ25tZW50JykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUFjID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWFjJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUhpdFBvaW50cyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1oaXQtcG9pbnRzJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUhpdERpY2UgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0taGl0LWRpY2UnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtU3RyID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLXN0cicpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1EZXggPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0tZGV4JykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUNvbiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1jb24nKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtSW50ID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWludCcpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1XaXMgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0td2lzJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUNoYXIgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0tY2hhcicpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1WdWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1pbnB1dC0tdnVsJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybVJlcyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1yZXMnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtRG1nSW1tdW5lID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWRtZy1pbW11bmUnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtQ29uSW1tdW5lID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWRtZy1pbW11bmUnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtTGFuZ3VhZ2VzID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWxhbmd1YWdlcycpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1DciA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1jcicpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1YcCA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS14cCcpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1XYWxrID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLXdhbGsnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtU3dpbSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1zd2ltJykpLnZhbHVlO1xuICAgIGNyZWF0dXJlRm9ybUJ1cnJvdyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1idXJyb3cnKSkudmFsdWU7XG4gICAgY3JlYXR1cmVGb3JtRmx5ID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtaW5wdXQtLWZseScpKS52YWx1ZTtcbiAgICBjcmVhdHVyZUZvcm1DbGltYiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWlucHV0LS1jbGltYicpKS52YWx1ZTtcbiAgICByZXR1cm4geyBjcmVhdHVyZUZvcm1OYW1lOiBjcmVhdHVyZUZvcm1OYW1lLCBjcmVhdHVyZUZvcm1TaXplOiBjcmVhdHVyZUZvcm1TaXplLCBjcmVhdHVyZUZvcm1UeXBlOiBjcmVhdHVyZUZvcm1UeXBlLCBjcmVhdHVyZUZvcm1BbGlnbm1lbnQ6IGNyZWF0dXJlRm9ybUFsaWdubWVudCwgY3JlYXR1cmVGb3JtQWM6IGNyZWF0dXJlRm9ybUFjLCBjcmVhdHVyZUZvcm1IaXRQb2ludHM6IGNyZWF0dXJlRm9ybUhpdFBvaW50cywgY3JlYXR1cmVGb3JtSGl0RGljZTogY3JlYXR1cmVGb3JtSGl0RGljZSwgY3JlYXR1cmVGb3JtU3RyOiBjcmVhdHVyZUZvcm1TdHIsIGNyZWF0dXJlRm9ybURleDogY3JlYXR1cmVGb3JtRGV4LCBjcmVhdHVyZUZvcm1Db246IGNyZWF0dXJlRm9ybUNvbiwgY3JlYXR1cmVGb3JtSW50OiBjcmVhdHVyZUZvcm1JbnQsIGNyZWF0dXJlRm9ybVdpczogY3JlYXR1cmVGb3JtV2lzLCBjcmVhdHVyZUZvcm1DaGFyOiBjcmVhdHVyZUZvcm1DaGFyLCBjcmVhdHVyZUZvcm1WdWw6IGNyZWF0dXJlRm9ybVZ1bCwgY3JlYXR1cmVGb3JtUmVzOiBjcmVhdHVyZUZvcm1SZXMsIGNyZWF0dXJlRm9ybURtZ0ltbXVuZTogY3JlYXR1cmVGb3JtRG1nSW1tdW5lLCBjcmVhdHVyZUZvcm1Db25JbW11bmU6IGNyZWF0dXJlRm9ybUNvbkltbXVuZSwgY3JlYXR1cmVGb3JtTGFuZ3VhZ2VzOiBjcmVhdHVyZUZvcm1MYW5ndWFnZXMsIGNyZWF0dXJlRm9ybUNyOiBjcmVhdHVyZUZvcm1DciwgY3JlYXR1cmVGb3JtWHA6IGNyZWF0dXJlRm9ybVhwLCBjcmVhdHVyZUZvcm1XYWxrOiBjcmVhdHVyZUZvcm1XYWxrLCBjcmVhdHVyZUZvcm1Td2ltOiBjcmVhdHVyZUZvcm1Td2ltLCBjcmVhdHVyZUZvcm1CdXJyb3c6IGNyZWF0dXJlRm9ybUJ1cnJvdywgY3JlYXR1cmVGb3JtRmx5OiBjcmVhdHVyZUZvcm1GbHksIGNyZWF0dXJlRm9ybUNsaW1iOiBjcmVhdHVyZUZvcm1DbGltYiB9O1xufTtcblxuY2xhc3MgQ3JlYXR1cmVGb3JtRGF0YSB7XG4gICAgaW5kZXg7XG4gICAgaW1hZ2U7XG4gICAgbmFtZTtcbiAgICBzaXplO1xuICAgIHR5cGU7XG4gICAgYWxpZ25tZW50O1xuICAgIGFjO1xuICAgIGhwO1xuICAgIGhpdERpY2U7XG4gICAgc3RyO1xuICAgIGRleDtcbiAgICBjb247XG4gICAgaW50O1xuICAgIHdpcztcbiAgICBjaGFyO1xuICAgIHZ1bDtcbiAgICByZXM7XG4gICAgZG1nSW1tdW5lO1xuICAgIGNvbkltbXVuZTtcbiAgICBsYW5ndWFnZXM7XG4gICAgY3I7XG4gICAgeHA7XG4gICAgc3BlZWRzO1xuICAgIHByb2ZpY2llbmNpZXM7XG4gICAgc2Vuc2VzO1xuICAgIGFiaWxpdGllcztcbiAgICBhY3Rpb25zO1xuICAgIGxlZ0FjdGlvbnM7XG4gICAgd2FsaztcbiAgICBzd2ltO1xuICAgIGJ1cnJvdztcbiAgICBmbHk7XG4gICAgY2xpbWI7XG5cbiAgICBjb25zdHJ1Y3RvcihpbmRleCwgaW1hZ2UsIG5hbWUsIHNpemUsIHR5cGUsIGFsaWdubWVudCwgYWMsIGhwLCBoaXREaWNlLCBzdHIsIGRleCwgY29uLCBpbnQsIHdpcywgY2hhciwgdnVsLCByZXMsIGRtZ0ltbXVuZSwgY29uSW1tdW5lLCBsYW5ndWFnZXMsIGNyLCB4cCwgd2Fsaywgc3dpbSwgYnVycm93LCBmbHksIGNsaW1iLCBwcm9maWNpZW5jaWVzLCBzZW5zZXMsIGFiaWxpdGllcywgYWN0aW9ucywgbGVnQWN0aW9ucykge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTsgICAgICAgIFxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmFsaWdubWVudCA9IGFsaWdubWVudDtcbiAgICAgICAgYWMgfHwgYWMgPT09IDAgPyB0aGlzLmFjID0gYWMgOiB0aGlzLmFjID0gMDtcbiAgICAgICAgaHAgfHwgaHAgPT09IDAgPyB0aGlzLmhwID0gaHAgOiB0aGlzLmhwID0gMDtcbiAgICAgICAgdGhpcy5oaXREaWNlID0gaGl0RGljZTtcbiAgICAgICAgc3RyIHx8IHN0ciA9PT0gMCA/IHRoaXMuc3RyID0gc3RyIDogdGhpcy5zdHIgPSAxMDtcbiAgICAgICAgZGV4IHx8IGRleCA9PT0gMCA/IHRoaXMuZGV4ID0gZGV4IDogdGhpcy5kZXggPSAxMDtcbiAgICAgICAgY29uIHx8IGNvbiA9PT0gMCA/IHRoaXMuY29uID0gY29uIDogdGhpcy5jb24gPSAxMDtcbiAgICAgICAgaW50IHx8IGludCA9PT0gMCA/IHRoaXMuaW50ID0gaW50IDogdGhpcy5pbnQgPSAxMDtcbiAgICAgICAgd2lzIHx8IHdpcyA9PT0gMCA/IHRoaXMud2lzID0gd2lzIDogdGhpcy53aXMgPSAxMDtcbiAgICAgICAgY2hhciB8fCBjaGFyID09PSAwID8gdGhpcy5jaGFyID0gY2hhciA6IHRoaXMuY2hhciA9IDEwO1xuICAgICAgICB0aGlzLnZ1bCA9IHZ1bDtcbiAgICAgICAgdGhpcy5yZXMgPSByZXM7XG4gICAgICAgIHRoaXMuZG1nSW1tdW5lID0gZG1nSW1tdW5lO1xuICAgICAgICB0aGlzLmNvbkltbXVuZSA9IGNvbkltbXVuZTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSBsYW5ndWFnZXM7XG4gICAgICAgIHRoaXMuY3IgPSBjcjtcbiAgICAgICAgdGhpcy54cCA9IHhwO1xuICAgICAgICB0aGlzLndhbGsgPSB3YWxrO1xuICAgICAgICB0aGlzLnN3aW0gPSBzd2ltO1xuICAgICAgICB0aGlzLmZseSA9IGZseTtcbiAgICAgICAgdGhpcy5idXJyb3cgPSBidXJyb3c7XG4gICAgICAgIHRoaXMuY2xpbWIgPSBjbGltYjtcbiAgICAgICAgdGhpcy5wcm9maWNpZW5jaWVzID0gcHJvZmljaWVuY2llcztcbiAgICAgICAgdGhpcy5zZW5zZXMgPSBzZW5zZXM7XG4gICAgICAgIHRoaXMuYWJpbGl0aWVzID0gYWJpbGl0aWVzO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICB0aGlzLmxlZ0FjdGlvbnMgPSBsZWdBY3Rpb25zO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBzdWJtaXRDcmVhdHVyZUZvcm0gfSBmcm9tIFwiLi4vc2NyaXB0cy9zdWJtaXROZXdDcmVhdHVyZVwiO1xuaW1wb3J0IHsgZGlzYWJsZUhvdGtleXMsIG1ha2VEcmFnZ2FibGUgfSBmcm9tIFwiLi4vc2NyaXB0cy90b29scy91dGlsc1wiO1xuaW1wb3J0IG1vZGFsIGZyb20gXCIuL21vZGFsXCI7XG5cbmxldCBjcmVhdHVyZUZvcm1PcGVuID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVOZXdDcmVhdHVyZUZvcm0gPSAoKSA9PiB7XG4gICAgY3JlYXR1cmVGb3JtT3BlbiA9ICFjcmVhdHVyZUZvcm1PcGVuO1xuICAgIGlmIChjcmVhdHVyZUZvcm1PcGVuKSB7XG4gICAgICAgIHJlbmRlck5ld0NyZWF0dXJlRm9ybU1vZGFsKCk7XG4gICAgICAgIGJpbmRFdmVudHNUb05ld0NyZWF0dXJlRm9ybSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdHVyZXMtd2luZG93LWZvcm0nKS5yZW1vdmUoKTtcbiAgICB9XG59O1xuXG5jb25zdCBiaW5kRXZlbnRzVG9OZXdDcmVhdHVyZUZvcm0gPSgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWZvcm0tbW9kYWwtY2xvc2UtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZU5ld0NyZWF0dXJlRm9ybSgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdHVyZXMtd2luZG93LWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogYW55KSA9PiB7XG4gICAgICAgIHN1Ym1pdENyZWF0dXJlRm9ybShlKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck5ld0NyZWF0dXJlRm9ybU1vZGFsID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIFxuICAgICAgICBtb2RhbCgnbmV3LWNyZWF0dXJlLWZvcm0nLCBuZXdDcmVhdHVyZUZvcm1IZWFkZXJIdG1sKCkpXG4gICAgKTtcbiAgICBjb25zdCB3aW5kb3c6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1mb3JtLW1vZGFsJyk7XG4gICAgY29uc3QgbW9kYWxCb2R5OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtZm9ybS1tb2RhbF9fYm9keScpO1xuICAgIHdpbmRvdy5jbGFzc0xpc3QuYWRkKCdjcmVhdHVyZXMtd2luZG93LWZvcm0nKTtcbiAgICBtb2RhbEJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjcmVhdHVyZUZvcm1Cb2R5SHRtbCgpKTtcbiAgICBkaXNhYmxlSG90a2V5cygpO1xuICAgIG1ha2VEcmFnZ2FibGUod2luZG93LCAnLmNyZWF0dXJlcy13aW5kb3ctZm9ybV9faGVhZGVyJyk7XG59O1xuXG5jb25zdCBuZXdDcmVhdHVyZUZvcm1IZWFkZXJIdG1sID0gKCkgPT4gYFxuICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2hlYWRlciBtb2RhbF9faGVhZGVyXCI+XG4gICAgICAgIDxoMj5OZXcgQ3JlYXR1cmU8L2gyPlxuICAgIDwvZGl2PlxuYDtcblxuY29uc3QgY3JlYXR1cmVGb3JtQm9keUh0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy1jb250ZW50XCI+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5XCIgaWQ9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbD5Ub2tlblxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5OYW1lXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tbmFtZVwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlNpemVcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tc2l6ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRpbnlcIj5UaW55PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic21hbGxcIj5TbWFsbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiIHNlbGVjdGVkPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxhcmdlXCI+TGFyZ2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJodWdlXCI+SHVnZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdhcmdhbnR1YW5cIj5HYXJnYW50dWFuPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlR5cGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLW1kXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLXR5cGVcIj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5BbGlnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWFsaWdubWVudFwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkFDXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tYWNcIj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5IaXQgUG9pbnRzXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0taGl0LXBvaW50c1wiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkhpdCBEaWNlXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS1oaXQtZGljZVwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1zcGVlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPldhbGs8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0td2Fsa1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Td2ltPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLXN3aW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+QnVycm93PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWJ1cnJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5GbHk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tZmx5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNsaW1iPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWNsaW1iXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlN0clxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLXN0clwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5EZXhcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS1kZXhcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGFiZWw+Q29uXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tY29uXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkludFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWludFwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5XaXNcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS13aXNcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGFiZWw+Q2hhclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWNoYXJcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLXByb2ZpY2llbmN5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+UHJvZmljaWVuY2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQZXJjZXB0aW9uXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19wcm9maWNpZW5jeS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjZcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc20gY3JlYXR1cmUtaW5wdXRzX19wcm9maWNpZW5jeS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJhZGRJbnB1dHMoJ3Byb2ZpY2llbmN5JylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgcHJvZmljaWVuY3k8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlZ1bG5lcmFiaWxpdGllc1xuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cImZpcmUsIHRodW5kZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1pbnB1dC0tdnVsXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWw+UmVzaXN0YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJwb2lzb24sIGJsdWRnZW9uaW5nXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLXJlc1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkRhbWFnZSBJbW11bml0aWVzXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwibm9ubWFnaWNhbCBzbGFzaGluZ1wiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS1kbWctaW1tdW5lXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWw+Q29uZGl0aW9uIEltbXVuaXRpZXNcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJwcm9uZSwgcmVzdHJhaW5lZFwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS1jb24taW1tdW5lXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9faW5wdXQtYWRkIGZvcm1fX2lucHV0LWFkZC0tc2Vuc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZW5zZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRGFya3Zpc2lvblwiIGNsYXNzPVwiaW5wdXQtLW1kIGNyZWF0dXJlLWlucHV0c19fc2Vuc2UtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCI2MFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NlbnNlLXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cImFkZElucHV0cygnc2Vuc2UnKVwiIGNsYXNzPVwiY3JlYXR1cmUtZm9ybV9fYnRuLS1pbnB1dFwiPkFkZCBzZW5zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWw+TGFuZ3VhZ2VzXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS1sYW5ndWFnZXNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5DUlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuZXctY3JlYXR1cmUtaW5wdXQtLWNyXCI+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGFiZWw+WFBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbVwiIGlkPVwibmV3LWNyZWF0dXJlLWlucHV0LS14cFwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1hYmlsaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U3BlY2lhbCBBYmlsaXRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBYmlsaXR5IG5hbWVcIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfX2FiaWxpdHktbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImNyZWF0dXJlLWlucHV0c19fYWJpbGl0eS1kZXNjXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkRGVzY0lucHV0cygnYWJpbGl0eScpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIGFiaWxpdHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBY3Rpb24gbmFtZVwiIGNsYXNzPVwiaW5wdXQtLW1kIGNyZWF0dXJlLWlucHV0c19fYWN0aW9uLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJjcmVhdHVyZS1pbnB1dHNfX2FjdGlvbi1kZXNjXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkRGVzY0lucHV0cygnYWN0aW9uJylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgYWN0aW9uPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1sZWctYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+TGVnZW5kYXJ5IEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBY3Rpb24gbmFtZVwiIGNsYXNzPVwiaW5wdXQtLW1kIGNyZWF0dXJlLWlucHV0c19fbGVnLWFjdGlvbi1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwiY3JlYXR1cmUtaW5wdXRzX19sZWctYWN0aW9uLWRlc2NcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJhZGREZXNjSW5wdXRzKCdsZWctYWN0aW9uJylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgTGVnZW5kYXJ5IGFjdGlvbjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIENyZWF0dXJlPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbmA7XG4iLCAiaW1wb3J0IHsgZGlzYWJsZUhvdGtleXMsIG1ha2VEcmFnZ2FibGUgfSBmcm9tICcuLi8uLi9zY3JpcHRzL3Rvb2xzL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0dXJlUm93IH0gZnJvbSAnLi9jcmVhdHVyZVJvdyc7XG5pbXBvcnQgbW9kYWwgZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgQ3JlYXR1cmUsIE1pbmlmaWVkQ3JlYXR1cmUgfSBmcm9tICcuLi8uLi9zY3JpcHRzL3R5cGVzJztcbmltcG9ydCB7IGdldENyZWF0dXJlcywgZ2V0Q3VzdG9tQ3JlYXR1cmVzIH0gZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvY3JlYXR1cmVzQ29udHJvbGxlcic7XG5pbXBvcnQgeyB0b2dnbGVOZXdDcmVhdHVyZUZvcm0gfSBmcm9tICcuLi9uZXdDcmVhdHVyZUZvcm0nO1xuXG5sZXQgY3JlYXR1cmVzT3BlbiA9IGZhbHNlO1xuXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVDcmVhdHVyZXNNb2RhbCA9ICgpID0+IHtcbiAgICBjcmVhdHVyZXNPcGVuID0gIWNyZWF0dXJlc09wZW47XG4gICAgaWYgKGNyZWF0dXJlc09wZW4pIHtcbiAgICAgICAgcmVuZGVyQ3JlYXR1cmVzTW9kYWwoKTtcbiAgICAgICAgcmVuZGVyQ3JlYXR1cmVSb3dzKCdhbGwnKTtcbiAgICAgICAgYmluZEV2ZW50c1RvTW9kYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXR1cmVzLW1vZGFsJykucmVtb3ZlKCk7XG4gICAgfVxufTtcblxuY29uc3QgY3JlYXR1cmVzQm9keUhlYWRlckh0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy1tb2RhbF9faGVhZGVyIG1vZGFsX19oZWFkZXJcIj5cbiAgICAgICAgPGgyPkNyZWF0dXJlczwvaDI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsX19maWx0ZXJzXCI+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJjcmVhdHVyZXMtbGlzdC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWxsXCI+QWxsIGNyZWF0dXJlczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdGFuZGFyZFwiPlN0YW5kYXJkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImN1c3RvbVwiPkN1c3RvbTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxmb3JtIGlkPVwiY3JlYXR1cmVzLW1vZGFsLXNlYXJjaC1zdWJtaXRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwic2VhcmNoXCIgaWQ9XCJjcmVhdHVyZXMtbW9kYWwtc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4tLXNlYXJjaFwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtbWFnbmlmeWluZy1nbGFzc1wiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0taG92ZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1idG5cIj5OZXcgQ3JlYXR1cmU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IHJlbmRlckNyZWF0dXJlc01vZGFsID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsKCdjcmVhdHVyZXMnLCBjcmVhdHVyZXNCb2R5SGVhZGVySHRtbCgpKSk7XG4gICAgY29uc3Qgd2luZG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbCcpO1xuICAgIGRpc2FibGVIb3RrZXlzKCk7XG4gICAgbWFrZURyYWdnYWJsZSh3aW5kb3csICcuY3JlYXR1cmVzLW1vZGFsX19oZWFkZXInKTtcbn07XG5cbmNvbnN0IHJlbmRlckNyZWF0dXJlUm93cyA9IGFzeW5jICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBpZiAodmFsdWUgPT09ICdhbGwnIHx8IHZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgICBjb25zdCBjdXN0b21DcmVhdHVyZXM6IENyZWF0dXJlW10gPSBhd2FpdCBnZXRDdXN0b21DcmVhdHVyZXMoKTtcbiAgICAgICAgY3VzdG9tQ3JlYXR1cmVzLmZvckVhY2goKGNyZWF0dXJlOiBDcmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbF9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgXG4gICAgICAgICAgICAgICAgY3JlYXR1cmVSb3coeyBjcmVhdHVyZSwgY3VzdG9tOiB0cnVlLCBpbmRleCB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09ICdhbGwnIHx8IHZhbHVlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0dXJlczogTWluaWZpZWRDcmVhdHVyZVtdID0gYXdhaXQgZ2V0Q3JlYXR1cmVzKCk7XG4gICAgICAgIGNyZWF0dXJlcy5mb3JFYWNoKChjcmVhdHVyZTogTWluaWZpZWRDcmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbF9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgXG4gICAgICAgICAgICAgICAgY3JlYXR1cmVSb3coeyBjcmVhdHVyZSwgY3VzdG9tOiBmYWxzZSwgaW5kZXggfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5jb25zdCBmaWx0ZXJDcmVhdHVyZXNMaXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbF9fYm9keScpLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVyID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdHVyZXMtbGlzdC1maWx0ZXInKSkudmFsdWU7XG4gICAgY29uc3QgdmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbC1zZWFyY2gnKSkudmFsdWU7XG5cbiAgICAvLyBGaWx0ZXIgYWxsIGN1c3RvbSBjcmVhdHVyZXNcbiAgICBpZiAoc2VsZWN0ZWRGaWx0ZXIgPT09ICdhbGwnIHx8IHNlbGVjdGVkRmlsdGVyID09PSAnY3VzdG9tJykge1xuICAgICAgICBjb25zdCBjdXN0b21DcmVhdHVyZXM6IENyZWF0dXJlW10gPSBhd2FpdCBnZXRDdXN0b21DcmVhdHVyZXMoKTtcbiAgICAgICAgY3VzdG9tQ3JlYXR1cmVzLmZvckVhY2goKGNyZWF0dXJlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3JlYXR1cmUubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbF9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0dXJlUm93KHsgY3JlYXR1cmUsIGN1c3RvbTogdHJ1ZSwgaW5kZXggfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBGaWx0ZXIgYWxsIHN0YW5kYXJkIGNyZWF0dXJlc1xuICAgIGlmIChzZWxlY3RlZEZpbHRlciA9PT0gJ2FsbCcgfHwgc2VsZWN0ZWRGaWx0ZXIgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgY29uc3QgY3JlYXR1cmVzOiBNaW5pZmllZENyZWF0dXJlW10gPSBhd2FpdCBnZXRDcmVhdHVyZXMoKTtcbiAgICAgICAgY3JlYXR1cmVzLmZvckVhY2goKGNyZWF0dXJlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3JlYXR1cmUubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy1tb2RhbF9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0dXJlUm93KHsgY3JlYXR1cmUsIGN1c3RvbTogZmFsc2UsIGluZGV4IH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5jb25zdCBiaW5kRXZlbnRzVG9Nb2RhbCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXR1cmVzLW1vZGFsLWNsb3NlLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVDcmVhdHVyZXNNb2RhbCgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdHVyZXMtbGlzdC1maWx0ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGZpbHRlckNyZWF0dXJlc0xpc3QoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXR1cmVzLW1vZGFsLXNlYXJjaC1zdWJtaXQnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaWx0ZXJDcmVhdHVyZXNMaXN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jcmVhdHVyZS1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlTmV3Q3JlYXR1cmVGb3JtKCk7XG4gICAgfSk7XG59O1xuIiwgImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IFRva2VuIH0gZnJvbSBcIi4uL3NjcmlwdHMvdHlwZXNcIjtcblxuZXhwb3J0IGxldCB0b2tlbnM6IFRva2VuW107XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW5zID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS90b2tlbnMnKVxuICAgICAgICB0b2tlbnMgPSByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBjb25zdCBhZGRUb2tlbiA9IGFzeW5jIChwYXlsb2FkOiBUb2tlbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvdG9rZW5zJywgcGF5bG9hZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRva2VuVG9NYXAgPSBhc3luYyAocGF5bG9hZDogVG9rZW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3Rva2Vucy9tYXAnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59O1xuIiwgImltcG9ydCB7IGNsb3NlTWVudSwgbWVudU9wZW4sIHNldE1lbnVPcGVuVmFsdWUsIHNldFNlbGVjdGVkTWVudVZhbHVlIH0gZnJvbSBcIi4uL3NjcmlwdHMvbWVudU1hbmFnZXJcIjtcbmltcG9ydCB7IFRva2VuIH0gZnJvbSBcIi4uL3NjcmlwdHMvdHlwZXNcIjtcbmltcG9ydCB7IGFkZFRva2VuLCBnZXRUb2tlbnMsIHRva2VucyB9IGZyb20gXCIuLi9jb250cm9sbGVycy90b2tlbnNDb250cm9sbGVyXCI7XG5cbmNvbnN0IGRlZmF1bHRUb2tlbnMgPSBbXG4gICAgeyBpbWFnZTogJ2h0dHBzOi8vaS5waW5pbWcuY29tLzIzNngvODgvNGEvMDUvODg0YTA1NmJhN2E1YTAwNGJlY2FjYmZkMWJmZDc4ZmUuanBnJywgc2l6ZTogMSwgY3JlYXR1cmU6ICdiYW5kaXQnIH0sXG4gICAgeyBpbWFnZTogJ2h0dHBzOi8vaS5pbWd1ci5jb20vNWNpYm1Vdy5wbmcnLCBzaXplOiAyIH0sXG4gICAgeyBpbWFnZTogJ2h0dHBzOi8vZW5jcnlwdGVkLXRibjAuZ3N0YXRpYy5jb20vaW1hZ2VzP3E9dGJuOkFOZDlHY1NsV194ZWtSRDI5MVlCaExkUEtZaWZEbkYySFY3NENzejBLUSZ1c3FwPUNBVScsIHNpemU6IDQsIGNyZWF0dXJlOiAndGFycmFzcXVlJyB9LFxuXTtcblxuXG5leHBvcnQgY29uc3QgYWRkRGVmYXVsdFRva2VucyA9ICgpID0+IHtcbiAgICBkZWZhdWx0VG9rZW5zLmZvckVhY2goKHRva2VuOiBUb2tlbikgPT4ge1xuICAgICAgICBhZGRUb2tlbih0b2tlbik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlVG9rZW5NZW51ID0gKCkgPT4ge1xuICAgIHNldE1lbnVPcGVuVmFsdWUoIW1lbnVPcGVuKTtcbiAgICBpZiAobWVudU9wZW4pIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRNZW51VmFsdWUoJ3Rva2VucycpO1xuICAgICAgICAvLyBDcmVhdGUgbWVudVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KCd0b2tlbnMnKSk7XG4gICAgICAgIGdldFRva2VuQm9keURhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZU1lbnUoJ3Rva2VucycpO1xuICAgIH1cbn07XG5cbmNvbnN0IGdldFRva2VuQm9keURhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZ2V0VG9rZW5zKCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogVG9rZW4pID0+IHtcbiAgICAgICAgaWYgKHRva2VuLmNyZWF0dXJlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19ib2R5LS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9JHt0b2tlbi5pbWFnZX0gY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLXRva2VuXCIgaWQ9XCJ0b2tlbi0ke2l9XCIgcmVsYXRpdmU9JHt0b2tlbi5jcmVhdHVyZX0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19pdGVtLS1jaXJjbGUtYnRuXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1hcnJvdy11cC1yaWdodC1mcm9tLXNxdWFyZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keS0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7dG9rZW4uaW1hZ2V9IGNsYXNzPVwibWVudV9faXRlbSBtZW51X19pdGVtLS10b2tlblwiIGlkPVwidG9rZW4tJHtpfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRva2VuLSR7aX1gKS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgcGxhY2VUb2tlbig8RWxlbWVudD5lLnRhcmdldCwgdG9rZW4uc2l6ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpKys7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGxhY2VUb2tlbiA9ICh0b2tlbjogRWxlbWVudCwgc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgdG9rZW4uc2V0QXR0cmlidXRlKCdzaXplJywgYCR7c2l6ZX1gKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldFRva2VuQm9keURhdGEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVsZXRlTGlzdCA9IFtdO1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9faXRlbScpKS5mb3JFYWNoKCh0b2tlbikgPT4ge1xuICAgICAgICBkZWxldGVMaXN0LnB1c2godG9rZW4pO1xuICAgIH0pO1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9faXRlbS0tY2lyY2xlLWJ0bicpKS5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgICAgZGVsZXRlTGlzdC5wdXNoKGJ0bik7XG4gICAgfSk7XG4gICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51X19ib2R5LS1jb250YWluZXInKSkuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICAgIGRlbGV0ZUxpc3QucHVzaChib3gpO1xuICAgIH0pO1xuICAgIGRlbGV0ZUxpc3QuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgZ2V0VG9rZW5Cb2R5RGF0YSgpO1xufTtcbiIsICJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaChrZXkgPT4ge1xuICAgIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuY29uc3QgRVJST1JfUEFDS0VUID0geyB0eXBlOiBcImVycm9yXCIsIGRhdGE6IFwicGFyc2VyIGVycm9yXCIgfTtcbmV4cG9ydCB7IFBBQ0tFVF9UWVBFUywgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIEVSUk9SX1BBQ0tFVCB9O1xuIiwgImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IG9iaiA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqICYmIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCBlbmNvZGVQYWNrZXQgPSAoeyB0eXBlLCBkYXRhIH0sIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQoZGF0YSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJlxuICAgICAgICAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhkYXRhKSkpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KG5ldyBCbG9iKFtkYXRhXSksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICByZXR1cm4gY2FsbGJhY2soUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcbmNvbnN0IGVuY29kZUJsb2JBc0Jhc2U2NCA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQuc3BsaXQoXCIsXCIpWzFdO1xuICAgICAgICBjYWxsYmFjayhcImJcIiArIGNvbnRlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5leHBvcnQgZGVmYXVsdCBlbmNvZGVQYWNrZXQ7XG4iLCAiY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG5jb25zdCBsb29rdXAgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyBbXSA6IG5ldyBVaW50OEFycmF5KDI1Nik7XG5mb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbn1cbmV4cG9ydCBjb25zdCBlbmNvZGUgPSAoYXJyYXlidWZmZXIpID0+IHtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gJyc7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG4gICAgaWYgKGxlbiAlIDMgPT09IDIpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyAnPSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyAnPT0nO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTY0O1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGUgPSAoYmFzZTY0KSA9PiB7XG4gICAgbGV0IGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LCBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBwID0gMCwgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09ICc9Jykge1xuICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSwgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDIpXTtcbiAgICAgICAgZW5jb2RlZDQgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDMpXTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbn07XG4iLCAiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGRlY29kZVBhY2tldCA9IChlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGVkUGFja2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZW5jb2RlZFBhY2tldC5jaGFyQXQoMCk7XG4gICAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZUJhc2U2NFBhY2tldChlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgcGFja2V0VHlwZSA9IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdO1xuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgICByZXR1cm4gRVJST1JfUEFDS0VUO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZFBhY2tldC5sZW5ndGggPiAxXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV0sXG4gICAgICAgICAgICBkYXRhOiBlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKVxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV1cbiAgICAgICAgfTtcbn07XG5jb25zdCBkZWNvZGVCYXNlNjRQYWNrZXQgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gbmV3IEJsb2IoW2RhdGFdKSA6IGRhdGE7XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7IC8vIGFzc3VtaW5nIHRoZSBkYXRhIGlzIGFscmVhZHkgYW4gQXJyYXlCdWZmZXJcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVjb2RlUGFja2V0O1xuIiwgImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwgIi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsVGhpc1NoaW0gPSAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwgImltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4vLyBiYXNlNjQgZW5jb2RlZCBidWZmZXJzIGFyZSBhYm91dCAzMyUgYmlnZ2VyIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQpXG5jb25zdCBCQVNFNjRfT1ZFUkhFQUQgPSAxLjMzO1xuLy8gd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgYG5ldyBCbG9iKFtvYmpdKS5zaXplYCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBpbiBJRTlcbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB1dGY4TGVuZ3RoKG9iaik7XG4gICAgfVxuICAgIC8vIGFycmF5YnVmZmVyIG9yIGJsb2JcbiAgICByZXR1cm4gTWF0aC5jZWlsKChvYmouYnl0ZUxlbmd0aCB8fCBvYmouc2l6ZSkgKiBCQVNFNjRfT1ZFUkhFQUQpO1xufVxuZnVuY3Rpb24gdXRmOExlbmd0aChzdHIpIHtcbiAgICBsZXQgYyA9IDAsIGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgbGVuZ3RoICs9IDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbn1cbiIsICJpbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5jbGFzcyBUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHJlYXNvbik7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUcmFuc3BvcnRFcnJvclwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgbmV3IFRyYW5zcG9ydEVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgICAgIHRoaXMuZG9PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IGRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgZGV0YWlscyk7XG4gICAgfVxufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Vuc2hpZnRpby95ZWFzdFxuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLCBsZW5ndGggPSA2NCwgbWFwID0ge307XG5sZXQgc2VlZCA9IDAsIGkgPSAwLCBwcmV2O1xuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgICBsZXQgZW5jb2RlZCA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gICAgfSB3aGlsZSAobnVtID4gMCk7XG4gICAgcmV0dXJuIGVuY29kZWQ7XG59XG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIGxldCBkZWNvZGVkID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZDtcbn1cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdCgpIHtcbiAgICBjb25zdCBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuICAgIGlmIChub3cgIT09IHByZXYpXG4gICAgICAgIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgICByZXR1cm4gbm93ICsgJy4nICsgZW5jb2RlKHNlZWQrKyk7XG59XG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dhbGtuL3F1ZXJ5c3RyaW5nXG4vKipcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKG9iaikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyYnO1xuICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUocXMpIHtcbiAgICBsZXQgcXJ5ID0ge307XG4gICAgbGV0IHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcXJ5O1xufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9oYXMtY29yc1xubGV0IHZhbHVlID0gZmFsc2U7XG50cnkge1xuICAgIHZhbHVlID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gICAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG59XG5leHBvcnQgY29uc3QgaGFzQ09SUyA9IHZhbHVlO1xuIiwgIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5pbXBvcnQgeyBoYXNDT1JTIH0gZnJvbSBcIi4uL2NvbnRyaWIvaGFzLWNvcnMuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIFhIUihvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgeWVhc3QgfSBmcm9tIFwiLi4vY29udHJpYi95ZWFzdC5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcIi4uL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBYSFIgYXMgWE1MSHR0cFJlcXVlc3QgfSBmcm9tIFwiLi94bWxodHRwcmVxdWVzdC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBQb2xsaW5nIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc3QgaXNTU0wgPSBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgIGxldCBwb3J0ID0gbG9jYXRpb24ucG9ydDtcbiAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgIGlmICghcG9ydCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBpc1NTTCA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhkID1cbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgICAgICAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBwYWNrZXQgPT4ge1xuICAgICAgICAgICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgICAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgcGFja2V0LnR5cGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmIChcImNsb3NlXCIgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKHsgZGVzY3JpcHRpb246IFwidHJhbnNwb3J0IGNsb3NlZCBieSB0aGUgc2VydmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgICAgICBkZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxDb21wbGV0ZVwiKTtcbiAgICAgICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgICAgICAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZW5jb2RlUGF5bG9hZChwYWNrZXRzLCBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9Xcml0ZShkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXF1ZXN0KG9wdHMgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIHsgeGQ6IHRoaXMueGQsIHhzOiB0aGlzLnhzIH0sIHRoaXMub3B0cyk7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLnVyaSgpLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9Xcml0ZShkYXRhLCBmbikge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcInN1Y2Nlc3NcIiwgZm4pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO1xuICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImF1dG9VbnJlZlwiKTtcbiAgICAgICAgb3B0cy54ZG9tYWluID0gISF0aGlzLm9wdHMueGQ7XG4gICAgICAgIG9wdHMueHNjaGVtZSA9ICEhdGhpcy5vcHRzLnhzO1xuICAgICAgICBjb25zdCB4aHIgPSAodGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5vcHRzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICBpZiAoXCJQT1NUXCIgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCIqLypcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAvLyBpZTYgY2hlY2tcbiAgICAgICAgICAgIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0aGlzLm9wdHMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5vcHRzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyLCB0aGlzLnhocik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBjb25zdCBuZXh0VGljayA9ICgoKSA9PiB7XG4gICAgY29uc3QgaXNQcm9taXNlQXZhaWxhYmxlID0gdHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgaWYgKGlzUHJvbWlzZUF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gY2IgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKGNiLCBzZXRUaW1lb3V0Rm4pID0+IHNldFRpbWVvdXRGbihjYiwgMCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBXZWJTb2NrZXQgPSBnbG9iYWxUaGlzLldlYlNvY2tldCB8fCBnbG9iYWxUaGlzLk1veldlYlNvY2tldDtcbmV4cG9ydCBjb25zdCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRCaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuIiwgImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCIuLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmltcG9ydCB7IHllYXN0IH0gZnJvbSBcIi4uL2NvbnRyaWIveWVhc3QuanNcIjtcbmltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdEJpbmFyeVR5cGUsIG5leHRUaWNrLCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQsIFdlYlNvY2tldCB9IGZyb20gXCIuL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbi8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwic3RyaW5nXCIgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5leHBvcnQgY2xhc3MgV1MgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9ICFvcHRzLmZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnNvY2tldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgICAgICAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMudXJpKCk7XG4gICAgICAgIGNvbnN0IHByb3RvY29scyA9IHRoaXMub3B0cy5wcm90b2NvbHM7XG4gICAgICAgIC8vIFJlYWN0IE5hdGl2ZSBvbmx5IHN1cHBvcnRzIHRoZSAnaGVhZGVycycgb3B0aW9uLCBhbmQgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgYW55dGhpbmcgZWxzZSBpcyBwYXNzZWRcbiAgICAgICAgY29uc3Qgb3B0cyA9IGlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZXJNZXNzYWdlRGVmbGF0ZVwiLCBcInBmeFwiLCBcImtleVwiLCBcInBhc3NwaHJhc2VcIiwgXCJjZXJ0XCIsIFwiY2FcIiwgXCJjaXBoZXJzXCIsIFwicmVqZWN0VW5hdXRob3JpemVkXCIsIFwibG9jYWxBZGRyZXNzXCIsIFwicHJvdG9jb2xWZXJzaW9uXCIsIFwib3JpZ2luXCIsIFwibWF4UGF5bG9hZFwiLCBcImZhbWlseVwiLCBcImNoZWNrU2VydmVySWRlbnRpdHlcIik7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndzID1cbiAgICAgICAgICAgICAgICB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgJiYgIWlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmkpXG4gICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSB0aGlzLnNvY2tldC5iaW5hcnlUeXBlIHx8IGRlZmF1bHRCaW5hcnlUeXBlO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5fc29ja2V0LnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBjbG9zZUV2ZW50ID0+IHRoaXMub25DbG9zZSh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBjbG9zZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNsb3NlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gZXYgPT4gdGhpcy5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgIHRoaXMud3Mub25lcnJvciA9IGUgPT4gdGhpcy5vbkVycm9yKFwid2Vic29ja2V0IGVycm9yXCIsIGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFja2V0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBkYXRhID8gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPCB0aGlzLm9wdHMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuICEhV2ViU29ja2V0O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogUG9sbGluZ1xufTtcbiIsICIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9wYXJzZXVyaVxuLyoqXG4gKiBQYXJzZXMgYW4gVVJJXG4gKlxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmNvbnN0IHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5jb25zdCBwYXJ0cyA9IFtcbiAgICAnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJywgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvcidcbl07XG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gICAgY29uc3Qgc3JjID0gc3RyLCBiID0gc3RyLmluZGV4T2YoJ1snKSwgZSA9IHN0ci5pbmRleE9mKCddJyk7XG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xuICAgIH1cbiAgICBsZXQgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSwgdXJpID0ge30sIGkgPSAxNDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xuICAgIH1cbiAgICB1cmkucGF0aE5hbWVzID0gcGF0aE5hbWVzKHVyaSwgdXJpWydwYXRoJ10pO1xuICAgIHVyaS5xdWVyeUtleSA9IHF1ZXJ5S2V5KHVyaSwgdXJpWydxdWVyeSddKTtcbiAgICByZXR1cm4gdXJpO1xufVxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIGNvbnN0IHJlZ3ggPSAvXFwvezIsOX0vZywgbmFtZXMgPSBwYXRoLnJlcGxhY2UocmVneCwgXCIvXCIpLnNwbGl0KFwiL1wiKTtcbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xufVxuZnVuY3Rpb24gcXVlcnlLZXkodXJpLCBxdWVyeSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBxdWVyeS5yZXBsYWNlKC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcbiAgICAgICAgaWYgKCQxKSB7XG4gICAgICAgICAgICBkYXRhWyQxXSA9ICQyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgYnl0ZUxlbmd0aCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNlKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNlKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IGRlY29kZSh0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbGVudGx5IGNsb3NlIHRoZSB0cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RuYW1lICE9PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm5ldHdvcmsgY29ubmVjdGlvbiBsb3N0XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgcmVhc29uID0+IHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCByZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMubWF4UGF5bG9hZCA9IGRhdGEubWF4UGF5bG9hZDtcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhbmQgcmVzZXRzIHBpbmcgdGltZW91dCB0aW1lciBiYXNlZCBvbiBzZXJ2ZXIgcGluZ3MuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXNldFBpbmdUaW1lb3V0KCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICAgICAgfSwgdGhpcy5waW5nSW50ZXJ2YWwgKyB0aGlzLnBpbmdUaW1lb3V0KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lci51bnJlZigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRyYWluKCkge1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuICAgICAgICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gICAgICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgICAgICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICAgICAgICAgIXRoaXMudXBncmFkaW5nICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0cyA9IHRoaXMuZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHBhY2tldHMpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0V3JpdGFibGVQYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBzaG91bGRDaGVja1BheWxvYWRTaXplID0gdGhpcy5tYXhQYXlsb2FkICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5uYW1lID09PSBcInBvbGxpbmdcIiAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGggPiAxO1xuICAgICAgICBpZiAoIXNob3VsZENoZWNrUGF5bG9hZFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXlsb2FkU2l6ZSA9IDE7IC8vIGZpcnN0IHBhY2tldCB0eXBlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMud3JpdGVCdWZmZXJbaV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXlsb2FkU2l6ZSA+IHRoaXMubWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gMjsgLy8gc2VwYXJhdG9yICsgcGFja2V0IHR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNlbmRQYWNrZXQodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZuID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cEFuZENsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2FpdEZvclVwZ3JhZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIiwgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbiIsICJpbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmV4cG9ydCB7IFNvY2tldCB9O1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gU29ja2V0LnByb3RvY29sO1xuZXhwb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4vdHJhbnNwb3J0LmpzXCI7XG5leHBvcnQgeyB0cmFuc3BvcnRzIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9pbmRleC5qc1wiO1xuZXhwb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG4iLCAiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB1cmkgLSB1cmxcbiAqIEBwYXJhbSBwYXRoIC0gdGhlIHJlcXVlc3QgcGF0aCBvZiB0aGUgY29ubmVjdGlvblxuICogQHBhcmFtIGxvYyAtIEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXJsKHVyaSwgcGF0aCA9IFwiXCIsIGxvYykge1xuICAgIGxldCBvYmogPSB1cmk7XG4gICAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgICBsb2MgPSBsb2MgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbik7XG4gICAgaWYgKG51bGwgPT0gdXJpKVxuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2MuaG9zdDtcbiAgICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IFwiaHR0cHM6Ly9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZVxuICAgICAgICBvYmogPSBwYXJzZSh1cmkpO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiNDQzXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCBcIi9cIjtcbiAgICBjb25zdCBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIGNvbnN0IGhvc3QgPSBpcHY2ID8gXCJbXCIgKyBvYmouaG9zdCArIFwiXVwiIDogb2JqLmhvc3Q7XG4gICAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArIFwiOi8vXCIgKyBob3N0ICsgXCI6XCIgKyBvYmoucG9ydCArIHBhdGg7XG4gICAgLy8gZGVmaW5lIGhyZWZcbiAgICBvYmouaHJlZiA9XG4gICAgICAgIG9iai5wcm90b2NvbCArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIGhvc3QgK1xuICAgICAgICAgICAgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyBcIlwiIDogXCI6XCIgKyBvYmoucG9ydCk7XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsICJpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGRlY29uc3RydWN0UGFja2V0LCByZWNvbnN0cnVjdFBhY2tldCB9IGZyb20gXCIuL2JpbmFyeS5qc1wiO1xuaW1wb3J0IHsgaXNCaW5hcnksIGhhc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNTtcbmV4cG9ydCB2YXIgUGFja2V0VHlwZTtcbihmdW5jdGlvbiAoUGFja2V0VHlwZSkge1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RcIl0gPSAwXSA9IFwiQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkRJU0NPTk5FQ1RcIl0gPSAxXSA9IFwiRElTQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkVWRU5UXCJdID0gMl0gPSBcIkVWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQUNLXCJdID0gM10gPSBcIkFDS1wiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RfRVJST1JcIl0gPSA0XSA9IFwiQ09OTkVDVF9FUlJPUlwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9FVkVOVFwiXSA9IDVdID0gXCJCSU5BUllfRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfQUNLXCJdID0gNl0gPSBcIkJJTkFSWV9BQ0tcIjtcbn0pKFBhY2tldFR5cGUgfHwgKFBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmNvZGVyIHtcbiAgICAvKipcbiAgICAgKiBFbmNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXBsYWNlciAtIGN1c3RvbSByZXBsYWNlciB0byBwYXNzIGRvd24gdG8gSlNPTi5wYXJzZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxhY2VyKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICAgICAqL1xuICAgIGVuY29kZShvYmopIHtcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UIHx8IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkFDSykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmopKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlQXNCaW5hcnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSwgdGhpcy5yZXBsYWNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXZpdmVyIC0gY3VzdG9tIHJldml2ZXIgdG8gcGFzcyBkb3duIHRvIEpTT04uc3RyaW5naWZ5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmV2aXZlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJldml2ZXIgPSByZXZpdmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gICAgICovXG4gICAgYWRkKG9iaikge1xuICAgICAgICBsZXQgcGFja2V0O1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBwbGFpbnRleHQgZGF0YSB3aGVuIHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5kZWNvZGVTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgICAgICBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuICAgICAgICAgICAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JpbmFyeShvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0eXBlOiBcIiArIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gICAgICovXG4gICAgZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUGFja2V0VHlwZVtwLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gcGFja2V0IHR5cGUgXCIgKyBwLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgICAgICAgaWYgKHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gXCItXCIgJiYgaSAhPSBzdHIubGVuZ3RoKSB7IH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgICAgICAgaWYgKFwiL1wiID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoXCIsXCIgPT09IGMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAubnNwID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwLm5zcCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgaWRcbiAgICAgICAgY29uc3QgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICAgICAgICBpZiAoXCJcIiAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuaWQgPSBOdW1iZXIoc3RyLnN1YnN0cmluZyhzdGFydCwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICAgICAgICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy50cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICAgICAgICAgIGlmIChEZWNvZGVyLmlzUGF5bG9hZFZhbGlkKHAudHlwZSwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwYXlsb2FkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICB0cnlQYXJzZShzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0ciwgdGhpcy5yZXZpdmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc1BheWxvYWRWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgcGF5bG9hZC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBCaW5hcnlSZWNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQgPSBwYWNrZXQ7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICB0YWtlQmluYXJ5RGF0YShiaW5EYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsICJjb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzVmlldyA9IChvYmopID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbiAgICAgICAgOiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3Qgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09IFwiW29iamVjdCBGaWxlQ29uc3RydWN0b3JdXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgQnVmZmVyLCBhbiBBcnJheUJ1ZmZlciwgYSBCbG9iIG9yIGEgRmlsZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCaW5hcnkob2JqKSB7XG4gICAgcmV0dXJuICgod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcob2JqKSkpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhc0JpbmFyeShvYmosIHRvSlNPTikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCaW5hcnkob2JqKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iai50b0pTT04gJiZcbiAgICAgICAgdHlwZW9mIG9iai50b0pTT04gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsICJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uc3RydWN0UGFja2V0KHBhY2tldCwgYnVmZmVycykge1xuICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICByZXR1cm4gcGFja2V0O1xufVxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlzSW5kZXhWYWxpZCA9IHR5cGVvZiBkYXRhLm51bSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPj0gMCAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPCBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzSW5kZXhWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gICAgb2JqLm9uKGV2LCBmbik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgIG9iai5vZmYoZXYsIGZuKTtcbiAgICB9O1xufVxuIiwgImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNvY2tldCBpcyBjdXJyZW50bHkgZGlzY29ubmVjdGVkXG4gICAgICovXG4gICAgZ2V0IGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbm5lY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNvbm5lY3QoKVxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbWl0KGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2LnRvU3RyaW5nKCkgKyAnXCIgaXMgYSByZXNlcnZlZCBldmVudCBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncy51bnNoaWZ0KGV2KTtcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5FVkVOVCxcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgIH07XG4gICAgICAgIHBhY2tldC5vcHRpb25zID0ge307XG4gICAgICAgIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gdGhpcy5mbGFncy5jb21wcmVzcyAhPT0gZmFsc2U7XG4gICAgICAgIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuaWRzKys7XG4gICAgICAgICAgICBjb25zdCBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKTtcbiAgICAgICAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwb3J0V3JpdGFibGUgPSB0aGlzLmlvLmVuZ2luZSAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0aGlzLmlvLmVuZ2luZS50cmFuc3BvcnQud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRQYWNrZXQgPSB0aGlzLmZsYWdzLnZvbGF0aWxlICYmICghaXNUcmFuc3BvcnRXcml0YWJsZSB8fCAhdGhpcy5jb25uZWN0ZWQpO1xuICAgICAgICBpZiAoZGlzY2FyZFBhY2tldCkge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spIHtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuZmxhZ3MudGltZW91dDtcbiAgICAgICAgaWYgKHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2tzW2lkXSA9IGFjaztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5pby5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1tpZF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRCdWZmZXJbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNrLmNhbGwodGhpcywgbmV3IEVycm9yKFwib3BlcmF0aW9uIGhhcyB0aW1lZCBvdXRcIikpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgdGhpcy5hY2tzW2lkXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLmlvLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBbbnVsbCwgLi4uYXJnc10pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULCBkYXRhIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YTogdGhpcy5hdXRoIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcGFja2V0LmRhdGEuc2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgbmV3IEVycm9yKFwiSXQgc2VlbXMgeW91IGFyZSB0cnlpbmcgdG8gcmVhY2ggYSBTb2NrZXQuSU8gc2VydmVyIGluIHYyLnggd2l0aCBhIHYzLnggY2xpZW50LCBidXQgdGhleSBhcmUgbm90IGNvbXBhdGlibGUgKG1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9zb2NrZXQuaW8vZG9jcy92My9taWdyYXRpbmctZnJvbS0yLXgtdG8tMy0wLylcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihwYWNrZXQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25ldmVudChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goT2JqZWN0LmZyZWV6ZShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW1pdEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueUxpc3RlbmVycyAmJiB0aGlzLl9hbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHNlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VudCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5BQ0ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmFjayhwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhY2spIHtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY29ubmVjdChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBlbWl0QnVmZmVyZWQoKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5mb3JFYWNoKChhcmdzKSA9PiB0aGlzLmVtaXRFdmVudChhcmdzKSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICAgICAgdGhpcy5zdWJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW9bXCJfZGVzdHJveVwiXSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5ESVNDT05ORUNUIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGRpc2Nvbm5lY3QoKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcHJlc3MgLSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb21wcmVzcyhjb21wcmVzcykge1xuICAgICAgICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBldmVudCBtZXNzYWdlIHdpbGwgYmUgZHJvcHBlZCB3aGVuIHRoaXMgc29ja2V0IGlzIG5vdFxuICAgICAqIHJlYWR5IHRvIHNlbmQgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldCB2b2xhdGlsZSgpIHtcbiAgICAgICAgdGhpcy5mbGFncy52b2xhdGlsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgd2l0aG91dCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcIm15LWV2ZW50XCIsIChlcnIpID0+IHtcbiAgICAgKiAgIGlmIChlcnIpIHtcbiAgICAgKiAgICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGltZW91dCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuZmxhZ3MudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueShsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueUxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICpcbiAgICAgKiA8cHJlPjxjb2RlPlxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqXG4gICAgICogPHByZT48Y29kZT5cbiAgICAgKlxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKlxuICAgICAqIDxwcmU+PGNvZGU+XG4gICAgICpcbiAgICAgKiBjb25zdCBoYW5kbGVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoaGFuZGxlcik7XG4gICAgICpcbiAgICAgKiAvLyB0aGVuIGxhdGVyXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKGhhbmRsZXIpO1xuICAgICAqXG4gICAgICogPC9wcmU+PC9jb2RlPlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55T3V0Z29pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggcGFja2V0IHNlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyAmJiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICAgIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gICAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICAgIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gICAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgICAgIHZhciByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgICAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uIChtaW4pIHtcbiAgICB0aGlzLm1zID0gbWluO1xufTtcbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24gKG1heCkge1xuICAgIHRoaXMubWF4ID0gbWF4O1xufTtcbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbiAoaml0dGVyKSB7XG4gICAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuIiwgImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEJhY2tvZmYgfSBmcm9tIFwiLi9jb250cmliL2JhY2tvMi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKF9hID0gb3B0cy5yYW5kb21pemF0aW9uRmFjdG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGlmICh+dGhpcy5fcmVhZHlTdGF0ZS5pbmRleE9mKFwib3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSBvbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTsgLy8gcHJldmVudHMgYSByYWNlIGNvbmRpdGlvbiB3aXRoIHRoZSAnb3BlbicgZXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob3BlblN1YkRlc3Ryb3kpO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Igb3BlbigpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsIFwicGluZ1wiLCB0aGlzLm9ucGluZy5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksIG9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kYXRhKGRhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVjb2Rlci5hZGQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcInBhcnNlIGVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHBhcnNlciBmdWxseSBkZWNvZGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRlY29kZWQocGFja2V0KSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICBpZiAodGhpcy5lbmdpbmUpXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZmFpbGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9hdHRlbXB0XCIsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlbGYub3BlbigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnJlY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdFwiLCBhdHRlbXB0KTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgdXJsIH0gZnJvbSBcIi4vdXJsLmpzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gdXJsKHVyaSwgb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiKTtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICAgIGNvbnN0IGlkID0gcGFyc2VkLmlkO1xuICAgIGNvbnN0IHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdW1wibnNwc1wiXTtcbiAgICBjb25zdCBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fFxuICAgICAgICBvcHRzW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0gfHxcbiAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8XG4gICAgICAgIHNhbWVOYW1lc3BhY2U7XG4gICAgbGV0IGlvO1xuICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgIGlvID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuLy8gc28gdGhhdCBcImxvb2t1cFwiIGNhbiBiZSB1c2VkIGJvdGggYXMgYSBmdW5jdGlvbiAoZS5nLiBgaW8oLi4uKWApIGFuZCBhcyBhXG4vLyBuYW1lc3BhY2UgKGUuZy4gYGlvLmNvbm5lY3QoLi4uKWApLCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmFzc2lnbihsb29rdXAsIHtcbiAgICBNYW5hZ2VyLFxuICAgIFNvY2tldCxcbiAgICBpbzogbG9va3VwLFxuICAgIGNvbm5lY3Q6IGxvb2t1cCxcbn0pO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgcHJvdG9jb2wgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgTWFuYWdlciwgU29ja2V0LCBsb29rdXAgYXMgaW8sIGxvb2t1cCBhcyBjb25uZWN0LCBsb29rdXAgYXMgZGVmYXVsdCwgfTtcbiIsICJpbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmV4cG9ydCBjb25zdCBzb2NrZXQ6IFNvY2tldCA9IGlvKCk7XG5cbmV4cG9ydCBjb25zdCBlbWl0U2VydmVyRXZlbnQgPSAoZXZlbnQ6IHN0cmluZywgcGFyYW1zOiBhbnlbXSkgPT4ge1xuICAgIHNvY2tldC5lbWl0KGV2ZW50LCAuLi5wYXJhbXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IG9uU2VydmVyRXZlbnQgPSAoZXZlbnQ6IHN0cmluZywgZm46IGFueSkgPT4ge1xuICAgIHNvY2tldC5vbihldmVudCwgZm4pO1xufTtcbiIsICJpbXBvcnQgeyBlbWl0U2VydmVyRXZlbnQgfSBmcm9tIFwiLi9zb2NrZXQtaW9cIjtcbmltcG9ydCB7IENvb3JkIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGZpbmRDZWxsIH0gZnJvbSBcIi4vdG9vbHMvdXRpbHNcIjtcbmltcG9ydCB7IHJvb20sIHNvY2tldElkIH0gZnJvbSBcIi4uL3ZpZXdzL2Rhc2hib2FyZFBhZ2VcIjtcbmltcG9ydCB7IHVzZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9ncmlkXCI7XG5pbXBvcnQgeyBwbGFjZVRva2VuLCByZXNldFRva2VuQm9keURhdGEgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90b2tlbnNNZW51XCI7XG5cbmV4cG9ydCBsZXQgbW91c2VQb3M6IENvb3JkID0geyB4OiAwLCB5OiAwIH07XG5sZXQgbGFzdFBvczogQ29vcmQ7XG5cbmNsYXNzIFRva2VuIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIGltYWdlOiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHJlbGF0aXZlOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIGltYWdlOiBzdHJpbmcsIHNpemU6IG51bWJlciwgcmVsYXRpdmU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZSA9IHJlbGF0aXZlO1xuICAgIH1cbn1cblxuLy8gRnVuY3Rpb24gZ2V0cyBjYWxsZWQgd2hlbiB1c2VyIGRyb3BzIGEgdG9rZW5cbmV4cG9ydCBjb25zdCBhZGRUb2tlblRvQm9hcmQgPSAoc2VsZWN0ZWRDZWxsOiBFbGVtZW50KSA9PiB7XG4gICAgLy8gQ2xvbmUgdG9rZW4gYmVpbmcgZHJhZ2dlZCBmcm9tIG1lbnVcbiAgICBjb25zdCBtZW51VG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgbWVudVRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1kcmFnZ2luZycpO1xuICAgIGNvbnN0IG5ld1Rva2VuID0gbmV3IFRva2VuKHBhcnNlSW50KG1lbnVUb2tlbi5pZCksIG1lbnVUb2tlbi5nZXRBdHRyaWJ1dGUoJ3NyYycpLCBwYXJzZUludChtZW51VG9rZW4uZ2V0QXR0cmlidXRlKCdzaXplJykpLCBtZW51VG9rZW4uZ2V0QXR0cmlidXRlKCdyZWxhdGl2ZScpKTtcblxuICAgIGlmICghcGFyc2VJbnQoc2VsZWN0ZWRDZWxsLmdldEF0dHJpYnV0ZSgneCcpKSkgeyAgICAgICAgXG4gICAgICAgIG1lbnVUb2tlbi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X19pdGVtJyk7XG4gICAgICAgIG1lbnVUb2tlbi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X19pdGVtLS10b2tlbicpO1xuICAgICAgICBzb2NrZXRQbGFjZVRva2VuKHsgeDogbGFzdFBvcy54LCB5OiBsYXN0UG9zLnkgfSwgbmV3VG9rZW4sIHVzZXIudXNlcm5hbWUsIHJvb20pO1xuICAgIH1cblxuICAgIC8vIFBsYWNlIHRva2VuIGlmIHRoZSBjZWxscyBhcmUgbm90IG9jY3VwaWVkXG4gICAgaWYgKCEoc2VsZWN0ZWRDZWxsLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgbWVudVRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2l0ZW0nKTtcbiAgICAgICAgbWVudVRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2l0ZW0tLXRva2VuJyk7XG4gICAgICAgIHNvY2tldFBsYWNlVG9rZW4oeyB4OiBwYXJzZUludChzZWxlY3RlZENlbGwuZ2V0QXR0cmlidXRlKCd4JykpLCB5OiBwYXJzZUludChzZWxlY3RlZENlbGwuZ2V0QXR0cmlidXRlKCd5JykpIH0sIG5ld1Rva2VuLCB1c2VyLnVzZXJuYW1lLCByb29tKTtcbiAgICB9XG59O1xuXG5jb25zdCBzb2NrZXRQbGFjZVRva2VuID0gKGNvb3JkczogQ29vcmQsIHRva2VuRGF0YTogVG9rZW4sIHVzZXJuYW1lOiBzdHJpbmcsIHJvb206IHN0cmluZykgPT4ge1xuICAgIGVtaXRTZXJ2ZXJFdmVudCgnUExBQ0VfVE9LRU4nLCBbY29vcmRzLCB0b2tlbkRhdGEsIHVzZXJuYW1lLCByb29tXSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9rZW5FdmVudHMgPSAodG9rZW46IGFueSwgcmVsYXRpdmU6IHN0cmluZykgPT4ge1xuICAgIC8vIE9wZW4gc3RhdHMgbWVudSBhZnRlciBkb3VibGUgY2xpY2tcbiAgICAvLyB0b2tlbi5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAvLyAgICAgaWYgKCFyZWxhdGl2ZSkgcmV0dXJuO1xuICAgIC8vICAgICBjb25zdCBjcmVhdHVyZSA9IGF3YWl0IGdldENyZWF0dXJlQnlJbmRleChyZWxhdGl2ZSwgdHJ1ZSkgfHwgYXdhaXQgZ2V0Q3JlYXR1cmVCeUluZGV4KHJlbGF0aXZlLCBmYWxzZSk7XG4gICAgLy8gICAgIG9wZW5DcmVhdHVyZVN0YXRzV2luZG93KHJlbGF0aXZlLCBjcmVhdHVyZS5pZCA/IHRydWUgOiBmYWxzZSk7XG4gICAgLy8gfSk7XG4gICAgLy8gSGFuZGxlIGRyYWdnaW5nIHRva2VuXG4gICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlblBvcyA9IHRva2VuLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBtb3VzZVBvcyA9IHtcbiAgICAgICAgICAgIHg6IGUueCAtIHRva2VuUG9zLngsXG4gICAgICAgICAgICB5OiBlLnkgLSB0b2tlblBvcy55XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxhY2VUb2tlbih0b2tlbiwgcGFyc2VJbnQodG9rZW4uZ2V0QXR0cmlidXRlKCdzaXplJykpKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRva2VuLnBhcmVudE5vZGU7XG4gICAgICAgIGxhc3RQb3MgPSB7eDogcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoJ3gnKSksIHk6IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCd5JykpfTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgdG9rZW4gbW92ZWRcbiAgICB0b2tlbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKCkgPT4ge1xuICAgICAgICBlbWl0U2VydmVyRXZlbnQoJ1JFTU9WRV9UT0tFTicsIFtsYXN0UG9zLCByb29tXSk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludCh0b2tlbi5nZXRBdHRyaWJ1dGUoJ3NpemUnKSk7XG4gICAgICAgIGVtaXRTZXJ2ZXJFdmVudCgnUkVNT1ZFX09DQ1VQSUVEX1RPS0VOX1NQQUNFJywgW2xhc3RQb3MueCwgbGFzdFBvcy55LCBzaXplLCByb29tXSk7XG4gICAgfSk7XG59O1xuXG4vLyBPY2N1cHkgdGlsZXMgdGhhdCB0aGUgdG9rZW4gZmlsbHMsIGlmIHRoZSB0b2tlbiBpcyBiaWdnZXIgdGhhbiAxIGNlbGxcbmV4cG9ydCBjb25zdCBvY2N1cHlUb2tlblNwYWNlID0gKGNlbGxYOiBudW1iZXIsIGNlbGxZOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4ge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZmluZENlbGwoY2VsbFggKyB4LCBjZWxsWSArIHkpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdvY2N1cGllZC0tZW5lbXknKTtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIERvbid0IG9jY3VweSB0aWxlcyB0aGF0IHRoZSB0b2tlbiBmaWxscywgaWYgdGhlIHRva2VuIGlzIGJpZ2dlciB0aGFuIDEgY2VsbFxuZXhwb3J0IGNvbnN0IHJlbW92ZU9jY3VweVRva2VuU3BhY2UgPSAoY2VsbFg6IG51bWJlciwgY2VsbFk6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzaXplOyB4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbChjZWxsWCArIHgsIGNlbGxZICsgeSk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ29jY3VwaWVkLS1lbmVteScpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdvY2N1cGllZCcpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsICJpbXBvcnQgeyBhZGRUb2tlblRvQm9hcmQsIG1vdXNlUG9zIH0gZnJvbSBcIi4vdG9rZW5cIjtcbmltcG9ydCB7IGNsYW1wLCBmaW5kUmVsYXRpdmVDZWxsIH0gZnJvbSBcIi4vdG9vbHMvdXRpbHNcIjtcblxuY29uc3Qgem9vbU1pbiA9IDQsIHpvb21NYXggPSA2NDtcblxuLy8gQWRkIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgZ3JpZFxuZXhwb3J0IGNvbnN0IGFkZEdyaWRFdmVudHMgPSAoZ3JpZDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICBsZXQgc2VsZWN0ZWRDZWxsOiBFdmVudFRhcmdldDtcbiAgICAvLyBGaXJlcyB3aGVuZXZlciB0b2tlbiBpcyBkcmFnZ2VkIG92ZXIgdGhlIGdyaWRcbiAgICAvLyBUaGUgbGFzdCBjZWxsIGhvdmVyZWQgb3ZlciBpcyB0aGUgc2VsZWN0ZWQgY2VsbFxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgICAgICBzZWxlY3RlZENlbGwgPSBlLnRhcmdldDtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlQ2VsbDogRWxlbWVudCA9IGZpbmRSZWxhdGl2ZUNlbGwoc2VsZWN0ZWRDZWxsLCBtb3VzZVBvcy54LCBtb3VzZVBvcy55KTtcbiAgICAgICAgY29uc3QgbWVudVRva2VuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRva2VuLS1kcmFnZ2luZycpO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1lbnVUb2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnVfX2l0ZW0nKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0b2tlbiBpcyBiZWluZyBkcmFnZ2VkIG91dCBmcm9tIHRoZSBtZW51LCB0aGVuIHBsYWNlIGl0IGV4YWN0bHkgd2hlcmUgdGhlIG1vdXNlIGN1cnNvciBpcy5cbiAgICAgICAgICAgIGFkZFRva2VuVG9Cb2FyZCg8RWxlbWVudD5zZWxlY3RlZENlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRWxzZSBwbGFjZSBpdCBub3JtYWxseVxuICAgICAgICAgICAgYWRkVG9rZW5Ub0JvYXJkKHJlbGF0aXZlQ2VsbCB8fCA8RWxlbWVudD5zZWxlY3RlZENlbGwpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgem9vbUluID0gKCkgPT4ge1xuICAgIGNvbnN0IGdyaWQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBjb25zdCBycyA9IGdldENvbXB1dGVkU3R5bGUoZ3JpZCk7XG4gICAgY29uc3Qgem9vbVZhbHVlID0gcGFyc2VJbnQocnMuZ2V0UHJvcGVydHlWYWx1ZSgnLS1zaXplJykpO1xuICAgIGdyaWQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2l6ZScsIGAke2NsYW1wKHpvb21WYWx1ZSArIDQsIHpvb21NaW4sIHpvb21NYXgpfXB4YCk7XG59O1xuXG5leHBvcnQgY29uc3Qgem9vbU91dCA9ICgpID0+IHtcbiAgICBjb25zdCBncmlkOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgY29uc3QgcnMgPSBnZXRDb21wdXRlZFN0eWxlKGdyaWQpO1xuICAgIGNvbnN0IHpvb21WYWx1ZSA9IHBhcnNlSW50KHJzLmdldFByb3BlcnR5VmFsdWUoJy0tc2l6ZScpKTtcbiAgICBncmlkLnN0eWxlLnNldFByb3BlcnR5KCctLXNpemUnLCBgJHtjbGFtcCh6b29tVmFsdWUgLSA0LCB6b29tTWluLCB6b29tTWF4KX1weGApO1xufTtcbiIsICJpbXBvcnQgeyB0b2dnbGVDaGFyYWN0ZXJNZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJNZW51JztcbmltcG9ydCB7IHRvZ2dsZUNoYXJhY3RlclNoZWV0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJTaGVldC9jaGFyYWN0ZXJTaGVldCc7XG5pbXBvcnQgeyB0b2dnbGVDcmVhdHVyZXNNb2RhbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVzTW9kYWwnO1xuaW1wb3J0IHsgdG9nZ2xlTWFwTWVudSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbWFwc01lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlVG9rZW5NZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy90b2tlbnNNZW51JztcbmltcG9ydCB7IGNsaWVudFR5cGUgfSBmcm9tICcuLi92aWV3cy9kYXNoYm9hcmRQYWdlJztcbmltcG9ydCB7IHpvb21Jbiwgem9vbU91dCB9IGZyb20gJy4vZ3JpZEV2ZW50cyc7XG5pbXBvcnQgeyBjYW5Vc2VIb3RrZXksIGNoZWNrRm9yRWxlbWVudCB9IGZyb20gJy4vdG9vbHMvdXRpbHMnO1xuaW1wb3J0IHsgQ29vcmQgfSBmcm9tICcuL3R5cGVzJztcblxubGV0IGNhblNjYWxlID0gZmFsc2U7XG5sZXQgdGFyZ2V0UG9zWDogbnVtYmVyLCB0YXJnZXRQb3NZOiBudW1iZXI7XG5sZXQgbW92ZWRQb3NYOiBudW1iZXIsIG1vdmVkUG9zWTogbnVtYmVyO1xubGV0IG1vdXNlU3RhcnRYOiBudW1iZXIsIG1vdXNlU3RhcnRZOiBudW1iZXI7XG5sZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbmxldCBwb3NpdGlvbjogQ29vcmQ7XG5cblxuZXhwb3J0IGNvbnN0IGJpbmRFdmVudHNUb0dyaWQgPSAoKSA9PiB7XG4gICAgaGFuZGxlR3JpZEtleUV2ZW50cygpO1xuICAgIGhhbmRsZUdyaWRNb3VzZUV2ZW50cygpO1xuICAgIGhhbmRsZUdyaWRXaGVlbEV2ZW50cygpO1xufTtcblxuY29uc3QgaGFuZGxlR3JpZEtleUV2ZW50cyA9ICgpID0+IHtcbiAgICAvLyBGaXJlcyB3aGVuIHVzZXIgcHJlc3NlcyBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGNhblVzZUhvdGtleSkge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBlLmtleSA9PT0gJ01ldGEnIHx8IGUua2V5ID09PSAnQ29udHJvbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhblNjYWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlLmtleSA9PT0gJ0RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgX3Rva2VuIG9mIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9rZW4nKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc2VsZWN0ZWQnKSkgX3Rva2VuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZS5rZXkgPT09ICcxJzpcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50VHlwZSA9PT0gJ2RtJyA/IHRvZ2dsZU1hcE1lbnUoKSA6IHRvZ2dsZUNoYXJhY3Rlck1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlLmtleSA9PT0gJzInOlxuICAgICAgICAgICAgICAgICAgICBjbGllbnRUeXBlID09PSAnZG0nID8gdG9nZ2xlVG9rZW5NZW51KCkgOiB0b2dnbGVDaGFyYWN0ZXJTaGVldCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGUua2V5ID09PSAnMyc6XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFR5cGUgPT09ICdkbScgPyB0b2dnbGVDcmVhdHVyZXNNb2RhbCgpIDogY29uc29sZS53YXJuKCdNZW51IGRvZXNuXFwndCBleGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIHJlbGVhc2VzIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIGUua2V5ID09PSAnTWV0YScgfHwgZS5rZXkgPT09ICdDb250cm9sTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FuU2NhbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmNvbnN0IGhhbmRsZUdyaWRNb3VzZUV2ZW50cyA9ICgpID0+IHtcbiAgICAvLyBGaXJlcyB3aGVuIHVzZXIgcHJlc3NlcyBtb3VzZSBidXR0b25cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgZS53aGljaCA9PT0gMjpcbiAgICAgICAgICAgICAgICBtb3VzZVN0YXJ0WCA9IGUueDtcbiAgICAgICAgICAgICAgICBtb3VzZVN0YXJ0WSA9IGUueTtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3NYID0gbW92ZWRQb3NYID8gbW92ZWRQb3NYIDogMDtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3NZID0gbW92ZWRQb3NZID8gbW92ZWRQb3NZIDogMDtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBGaXJlcyB3aGVuIHVzZXIgcmVsZWFzZXMgbW91c2UgYnV0dG9uXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBlLndoaWNoID09PSAyOlxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQ6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7IFxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdHJhbnNmb3JtWCwgdHJhbnNmb3JtWSB9ID0gZ2V0VHJhbnNmb3JtVmFsdWVzKGdyaWQpO1xuICAgICAgICAgICAgICAgIG1vdmVkUG9zWCA9IHRyYW5zZm9ybVg7XG4gICAgICAgICAgICAgICAgbW92ZWRQb3NZID0gdHJhbnNmb3JtWTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlJykuY2xhc3NMaXN0LnJlbW92ZSgncGFubmluZycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIG1vdmVzIG1vdXNlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbW91c2VQb3NYID0gLShtb3VzZVN0YXJ0WCAtIGUueCk7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zWSA9IC0obW91c2VTdGFydFkgLSBlLnkpO1xuICAgICAgICB0YXJnZXRQb3NYID0gbW92ZWRQb3NYID8gbW92ZWRQb3NYIDogMDtcbiAgICAgICAgdGFyZ2V0UG9zWSA9IG1vdmVkUG9zWSA/IG1vdmVkUG9zWSA6IDA7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyaWQ6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7ICAgICAgICAgICAgXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHsgeDogKG1vdXNlUG9zWCArIHRhcmdldFBvc1gpLCB5OiAobW91c2VQb3NZICsgdGFyZ2V0UG9zWSkgfTtcbiAgICAgICAgICAgIGdyaWQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3Bvc2l0aW9uLnh9cHgsICR7cG9zaXRpb24ueX1weClgO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZScpLmNsYXNzTGlzdC5hZGQoJ3Bhbm5pbmcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgZ2V0VHJhbnNmb3JtVmFsdWVzID0gKGdyaWQ6IGFueSkgPT4ge1xuICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGdyaWQpO1xuICAgIGxldCBtYXRyaXggPSBuZXcgRE9NTWF0cml4UmVhZE9ubHkoc3R5bGUudHJhbnNmb3JtKTtcbiAgICByZXR1cm4geyB0cmFuc2Zvcm1YOiBtYXRyaXgubTQxLCB0cmFuc2Zvcm1ZOiBtYXRyaXgubTQyIH07XG59O1xuXG5jb25zdCBoYW5kbGVHcmlkV2hlZWxFdmVudHMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZTogYW55KSA9PiB7ICAgICAgICBcbiAgICAgICAgaWYgKCFjaGVja0ZvckVsZW1lbnQoZS5wYXRoLCAnLmdyaWQtY29udGFpbmVyJykpIHJldHVybjtcbiAgICAgICAgaWYgKGUuZGVsdGFZID4gMCAmJiAhY2FuU2NhbGUpIHtcbiAgICAgICAgICAgIHpvb21PdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHpvb21JbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwgImltcG9ydCB7IGZpbmRDZWxsLCByZWFkeSB9IGZyb20gJy4uL3NjcmlwdHMvdG9vbHMvdXRpbHMnO1xuaW1wb3J0IHsgQ29vcmQsIFRva2VuLCBVc2VyIH0gZnJvbSBcIi4uL3NjcmlwdHMvdHlwZXNcIjtcbmltcG9ydCB7IHJvb20gfSBmcm9tICcuLi92aWV3cy9kYXNoYm9hcmRQYWdlJztcbmltcG9ydCB7IGJpbmRFdmVudHNUb0dyaWQgfSBmcm9tICcuLi9zY3JpcHRzL2dyaWRJbnB1dCc7XG5pbXBvcnQgeyByZXNldFRva2VuQm9keURhdGEgfSBmcm9tICcuL3Rva2Vuc01lbnUnO1xuaW1wb3J0IHsgZ2V0VXNlciB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyJztcbmltcG9ydCB7IGVtaXRTZXJ2ZXJFdmVudCwgb25TZXJ2ZXJFdmVudCB9IGZyb20gJy4uL3NjcmlwdHMvc29ja2V0LWlvJztcbmltcG9ydCB7IGFkZFRva2VuRXZlbnRzLCBvY2N1cHlUb2tlblNwYWNlLCByZW1vdmVPY2N1cHlUb2tlblNwYWNlIH0gZnJvbSAnLi4vc2NyaXB0cy90b2tlbic7XG5pbXBvcnQgeyBhZGRHcmlkRXZlbnRzIH0gZnJvbSAnLi4vc2NyaXB0cy9ncmlkRXZlbnRzJztcblxuZXhwb3J0IGxldCB1c2VyOiBVc2VyO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBHcmlkID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZ3JpZDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBncmlkLnN0eWxlLnNldFByb3BlcnR5KCctLWdyaWQteCcsIDxhbnk+d2lkdGgpO1xuICAgIGdyaWQuc3R5bGUuc2V0UHJvcGVydHkoJy0tZ3JpZC15JywgPGFueT5oZWlnaHQpO1xuXG4gICAgLy8gQWRkaW5nIDEgdG8gd2lkdGggYW5kIGhlaWdodCwgYmVjYXVzZSBncmlkIHN0YXJ0cyBhdCAoMSwxKVxuICAgIGNyZWF0ZUdyaWRDbGlja0RldGVjdGlvbih3aWR0aCArIDEsIGhlaWdodCArIDEsIGdyaWQpO1xuICAgIGFkZEdyaWRFdmVudHMoZ3JpZCk7XG59O1xuXG4vLyBHZW5lcmF0ZXMgZGl2J3MgaW4gZWFjaCBjZWxsLCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbi8vIFRoZSBkaXYncyB3aWxsIGRldGVjdCB3aGVyZSB0aGUgdXNlciBkcm9wcyBhIHRva2VuXG5jb25zdCBjcmVhdGVHcmlkQ2xpY2tEZXRlY3Rpb24gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGdyaWQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgcmVzZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IHkgPSAxOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBncmlkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkX19jZWxsIGNlbGxcIiB4PVwiJHt4fVwiIHk9XCIke3l9XCI+PC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIENsZWFycyB0aGUgYm9hcmQgYW5kIHJlc2V0cyBpdHMgY2xpY2sgZGV0ZWN0aW9uXG5jb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkX19jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLnJlbW92ZSgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2tlbicpLmZvckVhY2goKHRva2VuKSA9PiB7XG4gICAgICAgIHRva2VuLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxuLy8gQWRkIGEgdG9rZW4gdG8gdGhlIGJvYXJkXG5vblNlcnZlckV2ZW50KCdQTEFDRV9UT0tFTicsICgoc2VsZWN0ZWRDZWxsOiBDb29yZCwgbWVudVRva2VuOiBUb2tlbiwgdXNlcm5hbWU6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gc2VsZWN0ZWRDZWxsO1xuICAgIGNvbnN0IHsgaW1hZ2UsIHJlbGF0aXZlLCBzaXplIH0gPSBtZW51VG9rZW47XG4gICAgY29uc3QgdG9rZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjb25zdCBjZWxsID0gZmluZENlbGwoeCwgeSk7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4nKTtcbiAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlKTtcbiAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ3JlbGF0aXZlJywgcmVsYXRpdmUpXG4gICAgdG9rZW4uc2V0QXR0cmlidXRlKCd1c2VyJywgdXNlcm5hbWUpO1xuICAgIHRva2VuLnNldEF0dHJpYnV0ZSgnc2l6ZScsIGAke3NpemV9YCk7XG4gICAgY2VsbC5hcHBlbmRDaGlsZCh0b2tlbik7XG4gICAgLy8gU2V0IHRva2VuIHNpemVcbiAgICB0b2tlbi5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgYGNhbGModmFyKC0tc2l6ZSkgKiAke3NpemV9KWApO1xuICAgIHRva2VuLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGBjYWxjKHZhcigtLXNpemUpICogJHtzaXplfSlgKTtcbiAgICAvLyBTZXQgdG9rZW4gcG9zaXRpb25cbiAgICB0b2tlbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1yb3cnLCBgJHt4fWApO1xuICAgIHRva2VuLnN0eWxlLnNldFByb3BlcnR5KCctLWNvbHVtbicsIGAke3l9YCk7XG5cbiAgICBpZiAoc2l6ZSA+IDEpIHtcbiAgICAgICAgb2NjdXB5VG9rZW5TcGFjZSh4LCB5LCBzaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkLS1lbmVteScpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyk7XG4gICAgfVxuXG4gICAgYWRkVG9rZW5FdmVudHModG9rZW4sIHJlbGF0aXZlKTtcbiAgICByZXNldFRva2VuQm9keURhdGEoKTtcbn0pKTtcblxuLy8gUmVtb3ZlcyB0aGUgdG9rZW4gYmFja2dyb3VuZCBmb3IgZXZlcnlvbmVcbm9uU2VydmVyRXZlbnQoJ1JFTU9WRV9PQ0NVUElFRF9UT0tFTl9TUEFDRScsIChsYXN0UG9zWDogbnVtYmVyLCBsYXN0UG9zWTogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IHtcbiAgICBpZiAoc2l6ZSA+IDEpIHtcbiAgICAgICAgcmVtb3ZlT2NjdXB5VG9rZW5TcGFjZShsYXN0UG9zWCwgbGFzdFBvc1ksIHNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbmRDZWxsKGxhc3RQb3NYLCBsYXN0UG9zWSkuY2xhc3NMaXN0LnJlbW92ZSgnb2NjdXBpZWQtLWVuZW15Jyk7XG4gICAgICAgIGZpbmRDZWxsKGxhc3RQb3NYLCBsYXN0UG9zWSkuY2xhc3NMaXN0LnJlbW92ZSgnb2NjdXBpZWQnKTtcbiAgICB9XG59KTtcblxub25TZXJ2ZXJFdmVudCgnUkVNT1ZFX1RPS0VOJywgKChjZWxsOiBDb29yZCkgPT4ge1xuICAgIGNvbnN0IG5ld0NlbGwgPSBmaW5kQ2VsbChjZWxsLngsIGNlbGwueSk7XG4gICAgbmV3Q2VsbC5pbm5lckhUTUwgPSAnJztcbn0pKTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncmlkKCkge1xuICAgIHJlYWR5KGFzeW5jICgpID0+IHtcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXIoKTtcbiAgICAgICAgZW1pdFNlcnZlckV2ZW50KCdTRVRfTkFNRScsIFt1c2VyLnVzZXJuYW1lXSk7XG4gICAgICAgIGVtaXRTZXJ2ZXJFdmVudCgnVVBEQVRFX1BMQVlFUl9MSVNUJywgW3Jvb21dKTtcbiAgICAgICAgc2V0dXBHcmlkKDI1LCAyNSk7XG4gICAgICAgIGJpbmRFdmVudHNUb0dyaWQoKTtcbiAgICB9LCAnLmdyaWQnKTtcblxuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkXCI+PC9kaXY+XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgeyBhZGRNYXAsIGdldE1hcHMsIG1hcHMgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbWFwc0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IHNldHVwR3JpZCB9IGZyb20gXCIuL2dyaWRcIjtcbmltcG9ydCB7IEFyZWEsIE1hcCB9IGZyb20gXCIuLi9zY3JpcHRzL3R5cGVzXCI7XG5pbXBvcnQgeyBjbG9zZU1lbnUsIG1lbnVPcGVuLCBzZXRNZW51T3BlblZhbHVlLCBzZXRTZWxlY3RlZE1lbnVWYWx1ZSB9IGZyb20gXCIuLi9zY3JpcHRzL21lbnVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBlbWl0U2VydmVyRXZlbnQsIG9uU2VydmVyRXZlbnQgfSBmcm9tIFwiLi4vc2NyaXB0cy9zb2NrZXQtaW9cIjtcbmltcG9ydCB7IHJvb20gfSBmcm9tIFwiLi4vdmlld3MvZGFzaGJvYXJkUGFnZVwiO1xuXG5jb25zdCBkZWZhdWx0TWFwczogTWFwW10gPSBbXG4gICAgeyBuYW1lOiAnRGVmYXVsdCBNYXAnLCBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnNxdWFyZXNwYWNlLWNkbi5jb20vY29udGVudC92MS81NTExZmM3Y2U0YjBhMzc4MmFhOTQxOGIvMTQyOTEzOTc1OTEyNy1LRkhXQUZGRlZYSldaTldUSVRLSy9sZWFybmluZy10aGUtZ3JpZC1tZXRob2QuanBnJyB9LFxuXTtcblxuXG5leHBvcnQgY29uc3QgYWRkRGVmYXVsdE1hcHMgPSAoKSA9PiB7XG4gICAgZGVmYXVsdE1hcHMuZm9yRWFjaCgobWFwKSA9PiB7XG4gICAgICAgIGFkZE1hcChtYXApO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZU1hcE1lbnUgPSAoKSA9PiB7XG4gICAgc2V0TWVudU9wZW5WYWx1ZSghbWVudU9wZW4pO1xuICAgIGlmIChtZW51T3Blbikge1xuICAgICAgICBzZXRTZWxlY3RlZE1lbnVWYWx1ZSgnbWFwcycpO1xuICAgICAgICAvLyBDcmVhdGUgbWVudVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KCdtYXBzJykpO1xuICAgICAgICBnZXRNYXBCb2R5RGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNsb3NlTWVudSgnbWFwcycpO1xuICAgIH1cbn07XG5cbmNvbnN0IGdldE1hcEJvZHlEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGdldE1hcHMoKTtcbiAgICBcbiAgICAvLyBQb3B1bGF0ZSBtZW51IGJvZHlcbiAgICBtYXBzLmZvckVhY2goKG1hcDogTWFwKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7bWFwLmltYWdlfSBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tbWFwXCIgaWQ9JHttYXAuaWR9PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWVudV9faXRlbS0tbmFtZVwiPiR7bWFwLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHttYXAuaWR9YCkuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4gc2VsZWN0TWFwKDxFbGVtZW50PmUudGFyZ2V0KSk7XG4gICAgfSk7XG4gICAgLy8gQWRkIG5ldyBtYXAgYnV0dG9uXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tbWFwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLS1uZXctaXRlbVwiIGlkPVwibmV3LW1hcC1idG5cIj5OZXcgTWFwPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufTtcblxuY29uc3Qgc2VsZWN0TWFwID0gKHRhcmdldDogRWxlbWVudCkgPT4ge1xuICAgIG1hcHMuZm9yRWFjaCgobWFwOiBNYXApID0+IHtcbiAgICAgICAgaWYgKG1hcC5pZCA9PT0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSkpIHtcbiAgICAgICAgICAgIGVtaXRTZXJ2ZXJFdmVudCgnU0VMRUNUX01BUCcsIFt7IHdpZHRoOiB0YXJnZXQuY2xpZW50V2lkdGgsIGhlaWdodDogdGFyZ2V0LmNsaWVudEhlaWdodCB9LCBtYXAsIHJvb21dKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxub25TZXJ2ZXJFdmVudCgnU0VMRUNUX01BUCcsICgodGFyZ2V0OiBBcmVhLCBtYXA6IE1hcCkgPT4ge1xuICAgIGlmIChtYXAubmFtZSA9PT0gJ0RlZmF1bHQgTWFwJykge1xuICAgICAgICAvLyBTZXQgaW1hZ2UgdG8gbm90aGluZ1xuICAgICAgICAoPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpLnN0eWxlLnNldFByb3BlcnR5KCctLW1hcC1iYWNrZ3JvdW5kJywgYHJnYigyMzcgMjM3IDIzNyAvIDUyJSlgKTtcbiAgICAgICAgc2V0dXBHcmlkKDI1LCAyNSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG5ldyBtYXAgaW1hZ2VcbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpKS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYXAtYmFja2dyb3VuZCcsIGB1cmwoJyR7bWFwLmltYWdlfScpYCk7XG4gICAgICAgIHNldHVwR3JpZCh0YXJnZXQud2lkdGggLyAyLCB0YXJnZXQuaGVpZ2h0IC8gMik7XG4gICAgfVxufSkpO1xuIiwgImltcG9ydCB7IHRvZ2dsZUNoYXJhY3Rlck1lbnUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJNZW51XCI7XG5pbXBvcnQgeyB0b2dnbGVNYXBNZW51IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWFwc01lbnVcIjtcbmltcG9ydCB7IHRvZ2dsZVRva2VuTWVudSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Rva2Vuc01lbnVcIjtcblxuZXhwb3J0IGxldCBtZW51T3BlbiA9IGZhbHNlO1xuZXhwb3J0IGxldCBzZWxlY3RlZE1lbnU6IHN0cmluZztcblxuXG5leHBvcnQgY29uc3Qgc2V0TWVudU9wZW5WYWx1ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4gbWVudU9wZW4gPSB2YWx1ZTtcbmV4cG9ydCBjb25zdCBzZXRTZWxlY3RlZE1lbnVWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiBzZWxlY3RlZE1lbnUgPSB2YWx1ZTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlTWVudSA9IChtZW51TmFtZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkTWVudSA9PSBtZW51TmFtZSkge1xuICAgICAgICAvLyBDbG9zZSBtZW51XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykucmVtb3ZlKCk7XG4gICAgICAgIG1lbnVPcGVuID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2xvc2UgbWVudSwgdGhlbiBvcGVuIHNlbGVjdGVkIG9uZVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLnJlbW92ZSgpO1xuICAgICAgICBtZW51T3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHN3aXRjaCAobWVudU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Rva2Vucyc6XG4gICAgICAgICAgICAgICAgdG9nZ2xlVG9rZW5NZW51KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtYXBzJzpcbiAgICAgICAgICAgICAgICB0b2dnbGVNYXBNZW51KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaGFyYWN0ZXJzJzpcbiAgICAgICAgICAgICAgICB0b2dnbGVDaGFyYWN0ZXJNZW51KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwgImltcG9ydCB7IGRldGVybWluZU5ld0NoYXJhY3RlckZvcm1QYWdlIH0gZnJvbSBcIi4vbmV3Q2hhcmFjdGVyXCI7XG5cbmxldCBuZXdDaGFyYWN0ZXJGb3JtU2lkZWJhck9wZW4gPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlTmV3Q2hhcmFjdGVyRm9ybVNpZGViYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctY2hhcmFjdGVyLWZvcm1fX3NpZGViYXInKTtcbiAgICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWNoYXJhY3Rlci1mb3JtX19zaWRlYmFyLWJ0bi0tdG9nZ2xlJyk7XG4gICAgbmV3Q2hhcmFjdGVyRm9ybVNpZGViYXJPcGVuID0gIW5ld0NoYXJhY3RlckZvcm1TaWRlYmFyT3BlbjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3LWNoYXJhY3Rlci1mb3JtX19zaWRlYmFyLWJ0bicpLmZvckVhY2goKGJ0bikgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSk7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCduZXctY2hhcmFjdGVyLWZvcm1fX3NpZGViYXItLWhpZGRlbicpO1xuICAgIGlmIChuZXdDaGFyYWN0ZXJGb3JtU2lkZWJhck9wZW4pIHtcbiAgICAgICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9ICc8JztcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVCdG4uaW5uZXJIVE1MID0gJz4nO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVOZXdDaGFyYWN0ZXJGb3JtU2lkZWJhclN0YXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctY2hhcmFjdGVyLWZvcm1fX3NpZGViYXItYnRuLS10b2dnbGUnKTtcbiAgICBpZiAobmV3Q2hhcmFjdGVyRm9ybVNpZGViYXJPcGVuKSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5pbm5lckhUTUwgPSAnPCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9ICc+JztcbiAgICB9XG4gICAgYmluZEV2ZW50c1RvTmV3Q2hhcmFjdGVyRm9ybVNpZGViYXJCdXR0b25zKCk7XG59O1xuXG5leHBvcnQgY29uc3QgbmV3Q2hhcmFjdGVyRm9ybVNpZGViYXJIdG1sID0gKCkgPT4gYFxuICAgIDxkaXYgY2xhc3M9XCJuZXctY2hhcmFjdGVyLWZvcm1fX3NpZGViYXJcIj5cbiAgICAgICAgJHtuZXdDaGFyYWN0ZXJGb3JtU2lkZWJhckJ1dHRvbnMoKX1cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IG5ld0NoYXJhY3RlckZvcm1TaWRlYmFyQnV0dG9ucyA9ICgpID0+IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwibmV3LWNoYXJhY3Rlci1mb3JtX19zaWRlYmFyLWJ0bi0tdG9nZ2xlXCIgaWQ9XCJuZXctY2hhcmFjdGVyLWZvcm1fX3NpZGViYXItLXRvZ2dsZVwiPjw8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwibmV3LWNoYXJhY3Rlci1mb3JtX19zaWRlYmFyLWJ0blwiIGlkPVwibmV3LWNoYXJhY3Rlci1zaWRlYmFyLWJ0bi0tbWFpblwiPk1haW48L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwibmV3LWNoYXJhY3Rlci1mb3JtX19zaWRlYmFyLWJ0blwiIGlkPVwibmV3LWNoYXJhY3Rlci1zaWRlYmFyLWJ0bi0tc2tpbGxzXCI+U2tpbGxzPC9idXR0b24+XG5gO1xuXG5jb25zdCBiaW5kRXZlbnRzVG9OZXdDaGFyYWN0ZXJGb3JtU2lkZWJhckJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jaGFyYWN0ZXItZm9ybV9fc2lkZWJhci0tdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZU5ld0NoYXJhY3RlckZvcm1TaWRlYmFyKCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jaGFyYWN0ZXItc2lkZWJhci1idG4tLW1haW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZGV0ZXJtaW5lTmV3Q2hhcmFjdGVyRm9ybVBhZ2UoJ21haW4nKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNoYXJhY3Rlci1zaWRlYmFyLWJ0bi0tc2tpbGxzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRldGVybWluZU5ld0NoYXJhY3RlckZvcm1QYWdlKCdza2lsbHMnKTtcbiAgICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgbmV3Q2hhcmFjdGVyRGF0YSwgc2V0TmV3Q2hhcmFjdGVyRm9ybVBhZ2UgfSBmcm9tIFwiLi9uZXdDaGFyYWN0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlck5ld0NoYXJhY3RlckZvcm1NYWluUGFnZSA9IChzaGVldENvbnRlbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgc2V0TmV3Q2hhcmFjdGVyRm9ybVBhZ2UoJ21haW4nKTtcbiAgICBzaGVldENvbnRlbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBuZXdDaGFyYWN0ZXJGb3JtTWFpblBhZ2VIdG1sKCkpO1xuICAgIGJpbmRFdmVudHNUb0Zvcm1NYWluUGFnZSgpO1xufTtcblxuY29uc3QgYmluZEV2ZW50c1RvRm9ybU1haW5QYWdlID0gKCkgPT4geyAgICBcbiAgICAkKCcjbmMtaW1hZ2UnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLmltYWdlID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSk7XG4gICAgJCgnI25jLW5hbWUnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLm5hbWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtbGV2ZWwnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLmxldmVsID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSk7XG4gICAgJCgnI25jLWNsYXNzJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5jbGFzcyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH0pO1xuICAgICQoJyNuYy1yYWNlJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5yYWNlID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSk7XG4gICAgJCgnI25jLWJhY2tncm91bmQnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLmJhY2tncm91bmQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtaGl0LWRpY2UnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLmhpdF9kaWNlID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ2QnKVsxXSB8fCBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtYWMnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLmFjID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSk7XG4gICAgJCgnI25jLXNwZWVkJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS53YWxrX3NwZWVkID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSk7XG4gICAgJCgnI25jLW1heC1oZWFsdGgnKS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICBuZXdDaGFyYWN0ZXJEYXRhLm1heF9oZWFsdGggPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtc3RyJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5zdHIgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtZGV4Jykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5kZXggPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtY29uJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5jb24gPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtaW50Jykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS5pbnQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtd2lzJykub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgbmV3Q2hhcmFjdGVyRGF0YS53aXMgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICAkKCcjbmMtY2hhcicpLm9uKCdjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICAgIG5ld0NoYXJhY3RlckRhdGEuY2hhciA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH0pO1xufTtcblxuY29uc3QgbmV3Q2hhcmFjdGVyRm9ybU1haW5QYWdlSHRtbCA9ICgpID0+IGBcbiAgICA8Zm9ybSBjbGFzcz1cIm5ldy1jaGFyYWN0ZXJfX2Zvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5ldy1jaGFyYWN0ZXItZm9ybV9faGVhZGVyXCI+XG4gICAgICAgICAgICA8aDI+TmV3IENoYXJhY3RlcjwvaDI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYy1pbWFnZVwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvcG5nLCBpbWFnZS9qcGVnXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmV3LWNoYXJhY3Rlci1mb3JtX19zZWN0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmMtaW5wdXQtYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5jLW5hbWVcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYy1uYW1lXCIgcGxhY2Vob2xkZXI9XCJTdGV2ZVwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJEYXRhLm5hbWV9XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYy1pbnB1dC1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmMtbGV2ZWxcIj5MZXZlbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1sZXZlbFwiIHBsYWNlaG9sZGVyPVwiMVwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyRGF0YS5sZXZlbH1cIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5jLWlucHV0LWJveFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuYy1jbGFzc1wiPkNsYXNzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYy1jbGFzc1wiIHBsYWNlaG9sZGVyPVwiQmFyYmFyaWFuXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlckRhdGEuY2xhc3N9XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYy1pbnB1dC1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmMtcmFjZVwiPlJhY2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm5jLXJhY2VcIiBwbGFjZWhvbGRlcj1cIkdvbGlhdGhcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyRGF0YS5yYWNlfVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmMtaW5wdXQtYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5jLWJhY2tncm91bmRcIj5CYWNrZ3JvdW5kPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYy1iYWNrZ3JvdW5kXCIgcGxhY2Vob2xkZXI9XCJOb2JsZVwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJEYXRhLmJhY2tncm91bmR9XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYy1pbnB1dC1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmMtaGl0LWRpY2VcIj5IaXQgZGljZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1oaXQtZGljZVwiIHBsYWNlaG9sZGVyPVwiMWQxMlwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJEYXRhLmhpdF9kaWNlfVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tYWluXCI+XG4gICAgICAgICAgICAke25ld0NoYXJhY3RlckZvcm1NYWluU3RhdHNIdG1sKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZXNcIj5cbiAgICAgICAgICAgICR7bmV3Q2hhcmFjdGVyRm9ybVNjb3Jlc0h0bWwoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuYDtcblxuY29uc3QgbmV3Q2hhcmFjdGVyRm9ybU1haW5TdGF0c0h0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc21hbGwtc3RhdC1ibG9ja3NcIj5cbiAgICAgICAgJHtuZXdDaGFyYWN0ZXJGb3JtU21TdGF0QmxvY2tzSHRtbCgpfVxuICAgIDwvZGl2PlxuYDtcblxuY29uc3QgbmV3Q2hhcmFjdGVyRm9ybVNtU3RhdEJsb2Nrc0h0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc21hbGwtc3RhdC1ibG9ja3MtLWJsb2NrXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJuYy1hY1wiPkFDPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1hY1wiIHBsYWNlaG9sZGVyPVwiMTJcIiB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlckRhdGEuYWN9XCI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc21hbGwtc3RhdC1ibG9ja3MtLWJsb2NrXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJuYy1zcGVlZFwiPlNwZWVkPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1zcGVlZFwiIHBsYWNlaG9sZGVyPVwiMzBcIiB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlckRhdGEud2Fsa19zcGVlZH1cIj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zbWFsbC1zdGF0LWJsb2Nrcy0tYmxvY2tcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cIm5jLW1heC1oZWFsdGhcIj5NYXggSGVhbHRoPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1tYXgtaGVhbHRoXCIgcGxhY2Vob2xkZXI9XCIyMFwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyRGF0YS5tYXhfaGVhbHRofVwiPlxuICAgIDwvZGl2PlxuYDtcblxuY29uc3QgbmV3Q2hhcmFjdGVyRm9ybVNjb3Jlc0h0bWwgPSAoKSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cIm5ldy1jaGFyYWN0ZXItZm9ybV9fc2NvcmVzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5jLXN0clwiPlN0cjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiBpZD1cIm5jLXN0clwiIHBsYWNlaG9sZGVyPVwiMTBcIiB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlckRhdGEuc3RyfVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibmMtZGV4XCI+RGV4PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIGlkPVwibmMtZGV4XCIgcGxhY2Vob2xkZXI9XCIxMFwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyRGF0YS5kZXh9XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuYy1jb25cIj5Db248L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgaWQ9XCJuYy1jb25cIiBwbGFjZWhvbGRlcj1cIjEwXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJEYXRhLmNvbn1cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5jLWludFwiPkludDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiBpZD1cIm5jLWludFwiIHBsYWNlaG9sZGVyPVwiMTBcIiB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlckRhdGEuaW50fVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibmMtd2lzXCI+V2lzPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIGlkPVwibmMtd2lzXCIgcGxhY2Vob2xkZXI9XCIxMFwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyRGF0YS53aXN9XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuYy1jaGFyXCI+Q2hhcjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiBpZD1cIm5jLWNoYXJcIiBwbGFjZWhvbGRlcj1cIjEwXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJEYXRhLmNoYXJ9XCI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuYDtcbiIsICJpbXBvcnQgeyBnZXRQcm9mQm9udXNGcm9tTGV2ZWwsIG5ld0NoYXJhY3RlckRhdGEsIHNldE5ld0NoYXJhY3RlckZvcm1QYWdlLCBzdWJtaXROZXdDaGFyYWN0ZXIgfSBmcm9tIFwiLi9uZXdDaGFyYWN0ZXJcIjtcblxubGV0IGxhdGVzdE5ld0NoYXJhY3RlclNraWxsSUQ6IG51bWJlcjtcbmV4cG9ydCBsZXQgbmV3Q2hhcmFjdGVyU2tpbGxzOiBTa2lsbFtdO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3Q2hhcmFjdGVyRm9ybVNraWxsc1BhZ2UgPSAoc2hlZXRDb250ZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIHNldE5ld0NoYXJhY3RlckZvcm1QYWdlKCdza2lsbHMnKTtcbiAgICBzaGVldENvbnRlbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBuZXdDaGFyYWN0ZXJGb3JtU2tpbGxzUGFnZUh0bWwoKSk7XG4gICAgZmlsbE5ld0NoYXJhY3RlckZvcm1Ta2lsbHNUYWJsZUJvZHkoKTtcbiAgICBiaW5kRXZlbnRUb0Zvcm1Ta2lsbHNQYWdlKCk7XG59O1xuXG5jb25zdCBuZXdDaGFyYWN0ZXJGb3JtU2tpbGxzUGFnZUh0bWwgPSAoKSA9PiBgXG4gICAgPGZvcm0gY2xhc3M9XCJuZXctY2hhcmFjdGVyLWZvcm1fX2Zvcm1cIiBpZD1cIm5ldy1jaGFyYWN0ZXItZm9ybS1za2lsbHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5ldy1jaGFyYWN0ZXItZm9ybV9faGVhZGVyXCI+XG4gICAgICAgICAgICA8aDI+U2tpbGxzPC9oMj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZXctY2hhcmFjdGVyLWZvcm1fX3NraWxscy10YWJsZVwiPlxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwibmV3LWNoYXJhY3Rlci1mb3JtX19za2lsbHMtdGFibGUtLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlZhbHVlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Qcm9maWNpZW50PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cIm5ldy1jaGFyYWN0ZXItZm9ybV9fc2tpbGxzLXRhYmxlLWJvZHlcIj48L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWRkLW5ldy1jaGFyYWN0ZXItc2tpbGwtcm93LWJ0blwiPkFkZCByb3c8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbmA7XG5cbmNvbnN0IGZpbGxOZXdDaGFyYWN0ZXJGb3JtU2tpbGxzVGFibGVCb2R5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctY2hhcmFjdGVyLWZvcm1fX3NraWxscy10YWJsZS1ib2R5Jyk7XG4gICAgbmV3Q2hhcmFjdGVyU2tpbGxzLmZvckVhY2goKHNraWxsKSA9PiB7XG4gICAgICAgIGxldCBza2lsbE1vZGlmaWVyID0gZ2V0TmV3Q2hhcmFjdGVyRm9ybVNraWxsTW9kaWZpZXIoc2tpbGwpO1xuICAgICAgICB0YWJsZUJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBuZXdDaGFyYWN0ZXJGb3JtU2tpbGxJbnB1dFJvd0lubmVySHRtbChza2lsbCwgc2tpbGxNb2RpZmllcikpO1xuICAgICAgICBiaW5kRXZlbnRUb05ld0NoYXJhY3RlckZvcm1Qcm9mKHNraWxsKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IG5ld0NoYXJhY3RlckZvcm1Ta2lsbElucHV0Um93SW5uZXJIdG1sID0gKHNraWxsOiBTa2lsbCwgc2tpbGxNb2RpZmllcjogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHNraWxsKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtLW1kXCIgcGxhY2Vob2xkZXI9XCJTa2lsbCBuYW1lXCIgdmFsdWU9XCIke3NraWxsLm5hbWV9XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJpbnB1dC0tc20gbmV3LWNyZWF0dXJlLWZvcm0tLXNraWxsLXR5cGVcIiBvbmNoYW5nZT1cInVwZGF0ZU5ld0NoYXJhY3RlclNraWxsVHlwZSgke3NraWxsLmlkfSwgZXZlbnQudGFyZ2V0LnZhbHVlKVwiIHBsYWNlaG9sZGVyPVwiVHlwZVwiIHZhbHVlPVwiJHtza2lsbC50eXBlfVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBjbGFzcz1cImlucHV0LS1zbSBpLSR7c2tpbGwuaWR9LW5ldy1za2lsbC1tb2RcIiBwbGFjZWhvbGRlcj1cIlZhbHVlXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHtza2lsbE1vZGlmaWVyfVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPiR7c2tpbGwucHJvZmljaWVudCA/IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZSBpLSR7c2tpbGwuaWR9LXByb2YtaWNvblwiPjxpbnB1dCBjbGFzcz1cIm5ldy1za2lsbC1wcm9maWNpZW50LWNoZWNrYm94LSR7c2tpbGwuaWR9IGNoYXJhY3Rlci1zaGVldF9fc2tpbGxzLXRhYmxlLS1jaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCI+PC9pbnB1dD48L2k+YCA6IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlIGktJHtza2lsbC5pZH0tcHJvZi1pY29uXCI+PGlucHV0IGNsYXNzPVwibmV3LXNraWxsLXByb2ZpY2llbnQtY2hlY2tib3gtJHtza2lsbC5pZH0gY2hhcmFjdGVyLXNoZWV0X19za2lsbHMtdGFibGUtLWNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCI+PC9pbnB1dD48L2k+YH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGlkPVwiJHtza2lsbC5pZH0tbmV3LXNraWxsLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoIGRlbGV0ZS1uZXctY2hhcmFjdGVyLWZvcm0tc2tpbGwtcm93LWJ0blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2J1dHRvbj48L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgYDtcbiAgICB9XG4gICAgY29uc3QgaWQgPSBsYXRlc3ROZXdDaGFyYWN0ZXJTa2lsbElEICs9IDE7XG4gICAgbmV3Q2hhcmFjdGVyU2tpbGxzLnB1c2gobmV3IFNraWxsKGlkLCAnVW50aXRsZWQgc2tpbGwnLCAnc3RyJywgMCwgZmFsc2UpKTtcbiAgICByZXR1cm4gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJpbnB1dC0tbWRcIiBwbGFjZWhvbGRlcj1cIlNraWxsIG5hbWVcIiB2YWx1ZT1cIiR7bmV3Q2hhcmFjdGVyU2tpbGxzW2lkXS5uYW1lfVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtLXNtIG5ldy1jcmVhdHVyZS1mb3JtLS1za2lsbC10eXBlXCIgcGxhY2Vob2xkZXI9XCJUeXBlXCIgdmFsdWU9XCIke25ld0NoYXJhY3RlclNraWxsc1tpZF0udHlwZX1cIj48L3RkPlxuICAgICAgICAgICAgPHRkPjxpbnB1dCBjbGFzcz1cImlucHV0LS1zbSBpLSR7aWR9LW5ldy1za2lsbC1tb2RcIiBwbGFjZWhvbGRlcj1cIlZhbHVlXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHtuZXdDaGFyYWN0ZXJTa2lsbHNbaWRdLmJvbnVzX21vZH1cIj48L3RkPlxuICAgICAgICAgICAgPHRkPiR7bmV3Q2hhcmFjdGVyU2tpbGxzW2lkXS5wcm9maWNpZW50ID8gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlIGktJHtuZXdDaGFyYWN0ZXJTa2lsbHNbaWRdLmlkfS1wcm9mLWljb25cIj48aW5wdXQgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NraWxscy10YWJsZS0tY2hlY2tib3ggbmV3LXNraWxsLXByb2ZpY2llbnQtY2hlY2tib3gtJHtuZXdDaGFyYWN0ZXJTa2lsbHNbaWRdLmlkfVwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCI+PC9pbnB1dD48L2k+YCA6IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlIGktJHtuZXdDaGFyYWN0ZXJTa2lsbHNbaWRdLmlkfS1wcm9mLWljb25cIj48aW5wdXQgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3NraWxscy10YWJsZS0tY2hlY2tib3ggbmV3LXNraWxsLXByb2ZpY2llbnQtY2hlY2tib3gtJHtuZXdDaGFyYWN0ZXJTa2lsbHNbaWRdLmlkfVwiIHR5cGU9XCJjaGVja2JveFwiPjwvaW5wdXQ+PC9pPmB9PC90ZD5cbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGlkPVwiJHtpZH0tbmV3LXNraWxsLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoIGRlbGV0ZS1uZXctY2hhcmFjdGVyLWZvcm0tc2tpbGwtcm93LWJ0blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2J1dHRvbj48L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGA7XG59O1xuXG5jb25zdCBiaW5kRXZlbnRUb0Zvcm1Ta2lsbHNQYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNraWxsc01vZElucHV0cyA9IFtdO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctY2hhcmFjdGVyLWZvcm1fX3NraWxscy10YWJsZS1ib2R5Jyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1uZXctY2hhcmFjdGVyLXNraWxsLXJvdy1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGFibGVCb2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbmV3Q2hhcmFjdGVyRm9ybVNraWxsSW5wdXRSb3dJbm5lckh0bWwobnVsbCwgbnVsbCkpO1xuICAgICAgICBiaW5kRXZlbnRUb05ld0NoYXJhY3RlckZvcm1Qcm9mKG5ld0NoYXJhY3RlclNraWxsc1tsYXRlc3ROZXdDaGFyYWN0ZXJTa2lsbElEXSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jaGFyYWN0ZXItZm9ybS1za2lsbHMnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzdWJtaXROZXdDaGFyYWN0ZXIoKTtcbiAgICB9KTtcbiAgICBuZXdDaGFyYWN0ZXJTa2lsbHMuZm9yRWFjaCgoc2tpbGwsIGkpID0+IHtcbiAgICAgICAgc2tpbGxzTW9kSW5wdXRzLnB1c2goKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pLSR7c2tpbGwuaWR9LW5ldy1za2lsbC1tb2RgKSkudmFsdWUpO1xuICAgICAgICAkKGAuaS0ke3NraWxsLmlkfS1uZXctc2tpbGwtbW9kYCkub24oJ2lucHV0JywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgc2tpbGwuYm9udXNfbW9kID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIC0gc2tpbGxzTW9kSW5wdXRzW2ldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGJpbmRFdmVudFRvTmV3Q2hhcmFjdGVyRm9ybVByb2YgPSAoc2tpbGw6IFNraWxsKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm5ldy1za2lsbC1wcm9maWNpZW50LWNoZWNrYm94LSR7c2tpbGwuaWR9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAvLyBTZXQgcHJvZmljaWVudCB2YWx1ZVxuICAgICAgICBjb25zdCBza2lsbE1vZDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pLSR7c2tpbGwuaWR9LW5ldy1za2lsbC1tb2RgKTtcbiAgICAgICAgc2tpbGwucHJvZmljaWVudCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHNraWxsTW9kLnZhbHVlID0gZ2V0TmV3Q2hhcmFjdGVyRm9ybVNraWxsTW9kaWZpZXIoc2tpbGwpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgLy8gQ2hhbmdlIHByb2ZpY2llbnQgaWNvblxuICAgICAgICBjb25zdCBwcm9mSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pLSR7c2tpbGwuaWR9LXByb2YtaWNvbmApO1xuICAgICAgICBpZiAocHJvZkljb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1zb2xpZCcpKSB7XG4gICAgICAgICAgICBwcm9mSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1zb2xpZCcpO1xuICAgICAgICAgICAgcHJvZkljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcbiAgICAgICAgICAgIHByb2ZJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXJlZ3VsYXInKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0TmV3Q2hhcmFjdGVyU2tpbGxzID0gKCkgPT4ge1xuICAgIGxhdGVzdE5ld0NoYXJhY3RlclNraWxsSUQgPSAxNztcbiAgICBuZXdDaGFyYWN0ZXJTa2lsbHMgPSBbXG4gICAgICAgIG5ldyBTa2lsbCAoMCwgJ0F0aGxldGljcycsICdzdHInLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoMSwgJ0Fjcm9iYXRpY3MnLCAnZGV4JywgMCwgZmFsc2UpLFxuICAgICAgICBuZXcgU2tpbGwgKDIsICdTbGlnaHQgb2YgSGFuZCcsICdkZXgnLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoMywgJ1N0ZWFsdGgnLCAnZGV4JywgMCwgdHJ1ZSksXG4gICAgICAgIG5ldyBTa2lsbCAoNCwgJ0FyY2FuYScsICdpbnQnLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoNSwgJ0hpc3RvcnknLCAnaW50JywgMCwgZmFsc2UpLFxuICAgICAgICBuZXcgU2tpbGwgKDYsICdJbnZlc3RpZ2F0aW9uJywgJ2ludCcsIDAsIGZhbHNlKSxcbiAgICAgICAgbmV3IFNraWxsICg3LCAnTmF0dXJlJywgJ3dpcycsIDAsIGZhbHNlKSxcbiAgICAgICAgbmV3IFNraWxsICg4LCAnUmVsaWdpb24nLCAnd2lzJywgMCwgZmFsc2UpLFxuICAgICAgICBuZXcgU2tpbGwgKDksICdBbmltYWwgSGFuZGxpbmcnLCAnd2lzJywgMCwgZmFsc2UpLFxuICAgICAgICBuZXcgU2tpbGwgKDEwLCAnSW5zaWdodCcsICd3aXMnLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoMTEsICdNZWRpY2luZScsICd3aXMnLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoMTIsICdQZXJjZXB0aW9uJywgJ3dpcycsIDAsIHRydWUpLFxuICAgICAgICBuZXcgU2tpbGwgKDEzLCAnU3Vydml2YWwnLCAnd2lzJywgMCwgZmFsc2UpLFxuICAgICAgICBuZXcgU2tpbGwgKDE0LCAnRGVjZXB0aW9uJywgJ2NoYXInLCAwLCBmYWxzZSksXG4gICAgICAgIG5ldyBTa2lsbCAoMTUsICdJbnRpbWlkYXRpb24nLCAnY2hhcicsIDAsIHRydWUpLFxuICAgICAgICBuZXcgU2tpbGwgKDE2LCAnUGVyZm9ybWFuY2UnLCAnY2hhcicsIDAsIGZhbHNlKSxcbiAgICAgICAgbmV3IFNraWxsICgxNywgJ1BlcnN1YXNpb24nLCAnY2hhcicsIDAsIGZhbHNlKSxcbiAgICBdO1xufTtcblxuY29uc3QgZ2V0TmV3Q2hhcmFjdGVyRm9ybVNraWxsTW9kaWZpZXIgPSAoc2tpbGw6IFNraWxsKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gMDtcbiAgICBpZiAoc2tpbGwucHJvZmljaWVudCkgdmFsdWUgKz0gZ2V0UHJvZkJvbnVzRnJvbUxldmVsKG5ld0NoYXJhY3RlckRhdGEubGV2ZWwpO1xuICAgIHN3aXRjaCAoc2tpbGwudHlwZSkge1xuICAgICAgICBjYXNlICdzdHInOlxuICAgICAgICAgICAgdmFsdWUgKz0gbmV3Q2hhcmFjdGVyRGF0YS5zdHIgKyBza2lsbC5ib251c19tb2QgfHwgc2tpbGwuYm9udXNfbW9kIHx8IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGV4JzpcbiAgICAgICAgICAgIHZhbHVlICs9IG5ld0NoYXJhY3RlckRhdGEuZGV4ICsgc2tpbGwuYm9udXNfbW9kIHx8IHNraWxsLmJvbnVzX21vZCB8fCAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Nvbic6XG4gICAgICAgICAgICB2YWx1ZSArPSBuZXdDaGFyYWN0ZXJEYXRhLmNvbiArIHNraWxsLmJvbnVzX21vZCB8fCBza2lsbC5ib251c19tb2QgfHwgMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgdmFsdWUgKz0gbmV3Q2hhcmFjdGVyRGF0YS5pbnQgKyBza2lsbC5ib251c19tb2QgfHwgc2tpbGwuYm9udXNfbW9kIHx8IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2lzJzpcbiAgICAgICAgICAgIHZhbHVlICs9IG5ld0NoYXJhY3RlckRhdGEud2lzICsgc2tpbGwuYm9udXNfbW9kIHx8IHNraWxsLmJvbnVzX21vZCB8fCAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoYXInOlxuICAgICAgICAgICAgdmFsdWUgKz0gbmV3Q2hhcmFjdGVyRGF0YS5jaGFyICsgc2tpbGwuYm9udXNfbW9kIHx8IHNraWxsLmJvbnVzX21vZCB8fCAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBza2lsbC5ib251c19tb2QgfHwgMDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuY2xhc3MgU2tpbGwge1xuICAgIGlkOiBudW1iZXJcbiAgICBuYW1lOiBzdHJpbmdcbiAgICB0eXBlOiBzdHJpbmdcbiAgICBib251c19tb2Q6IG51bWJlclxuICAgIHByb2ZpY2llbnQ6IGJvb2xlYW5cblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBib251c19tb2Q6IG51bWJlciwgcHJvZmljaWVudDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuYm9udXNfbW9kID0gYm9udXNfbW9kO1xuICAgICAgICB0aGlzLnByb2ZpY2llbnQgPSBwcm9maWNpZW50O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBhZGRDaGFyYWN0ZXIsIGFkZENoYXJhY3RlclNraWxsIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXJzL2NoYXJhY3RlcnNDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBkaXNhYmxlSG90a2V5cywgbWFrZURyYWdnYWJsZSB9IGZyb20gXCIuLi8uLi9zY3JpcHRzL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXIsIFNraWxsIH0gZnJvbSBcIi4uLy4uL3NjcmlwdHMvdHlwZXNcIjtcbmltcG9ydCB7IGhhbmRsZU5ld0NoYXJhY3RlckZvcm1TaWRlYmFyU3RhdGUsIG5ld0NoYXJhY3RlckZvcm1TaWRlYmFySHRtbCB9IGZyb20gXCIuL25ld0NoYXJhY3RlckZvcm1TaWRlYmFyXCI7XG5pbXBvcnQgeyByZW5kZXJOZXdDaGFyYWN0ZXJGb3JtTWFpblBhZ2UgfSBmcm9tIFwiLi9uZXdDaGFyYWN0ZXJNYWluXCI7XG5pbXBvcnQgeyBuZXdDaGFyYWN0ZXJTa2lsbHMsIHJlbmRlck5ld0NoYXJhY3RlckZvcm1Ta2lsbHNQYWdlLCByZXNldE5ld0NoYXJhY3RlclNraWxscyB9IGZyb20gXCIuL25ld0NoYXJhY3RlclNraWxsc1wiO1xuXG5sZXQgbmV3Q2hhcmFjdGVyT3BlbiA9IGZhbHNlO1xubGV0IG5ld0NoYXJhY3RlckZvcm1QYWdlID0gJ21haW4nO1xuZXhwb3J0IGNvbnN0IG5ld0NoYXJhY3RlckRhdGE6IENoYXJhY3RlciA9IHtcbiAgICBuYW1lOiAnJyxcbiAgICBjbGFzczogJycsXG4gICAgcmFjZTogJycsXG4gICAgYmFja2dyb3VuZDogJycsXG4gICAgYWxpZ25tZW50OiAnJyxcbiAgICBsZXZlbDogMSxcbiAgICBhYzogMTAsXG4gICAgbWF4X2hlYWx0aDogMCxcbiAgICBjdXJyZW50X2hlYWx0aDogMCxcbiAgICB0ZW1wX2hlYWx0aDogMCxcbiAgICBwcm9mX2JvbnVzOiAyLFxuICAgIGluaXRpYXRpdmU6IDAsXG4gICAgaW5zcGlyYXRpb246IGZhbHNlLFxuICAgIGhpdF9kaWNlOiAnJyxcbiAgICBzdHI6IDEwLFxuICAgIGRleDogMTAsXG4gICAgY29uOiAxMCxcbiAgICBpbnQ6IDEwLFxuICAgIHdpczogMTAsXG4gICAgY2hhcjogMTAsXG4gICAgaW1hZ2U6ICcnLFxuICAgIHdhbGtfc3BlZWQ6IDMwLFxuICAgIHN3aW1fc3BlZWQ6IDAsXG4gICAgYnVycm93X3NwZWVkOiAwLFxuICAgIGZseV9zcGVlZDogMCxcbiAgICBjbGltYl9zcGVlZDogMCxcbn07XG5cbmV4cG9ydCBjb25zdCBzZXROZXdDaGFyYWN0ZXJGb3JtUGFnZSA9IChwYWdlOiBzdHJpbmcpID0+IG5ld0NoYXJhY3RlckZvcm1QYWdlID0gcGFnZTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZU5ld0NoYXJhY3RlcldpbmRvdyA9ICgpID0+IHtcbiAgICBuZXdDaGFyYWN0ZXJPcGVuID0gIW5ld0NoYXJhY3Rlck9wZW47XG4gICAgaWYgKG5ld0NoYXJhY3Rlck9wZW4pIHtcbiAgICAgICAgcmVuZGVyTmV3Q2hhcmFjdGVyRm9ybSgpO1xuICAgICAgICByZXNldE5ld0NoYXJhY3RlclNraWxscygpO1xuICAgICAgICBkZXRlcm1pbmVOZXdDaGFyYWN0ZXJGb3JtUGFnZShuZXdDaGFyYWN0ZXJGb3JtUGFnZSk7XG4gICAgICAgIGJpbmRFdmVudHNUb05ld0NoYXJhY3RlckZvcm0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWNoYXJhY3Rlci1mb3JtJykucmVtb3ZlKCk7XG4gICAgfVxufTtcblxuY29uc3QgcmVuZGVyTmV3Q2hhcmFjdGVyRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBzaGVldFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgc2hlZXRXaW5kb3cuY2xhc3NMaXN0LmFkZCgnbmV3LWNoYXJhY3Rlci1mb3JtJyk7XG4gICAgc2hlZXRXaW5kb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tLW1vZGFsLWNsb3NlXCIgaWQ9XCJuZXctY2hhcmFjdGVyLWZvcm0tYnRuLS10b2dnbGVcIj5YPC9idXR0b24+XG4gICAgYCk7XG4gICAgc2hlZXRXaW5kb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBuZXdDaGFyYWN0ZXJGb3JtU2lkZWJhckh0bWwoKSk7XG4gICAgc2hlZXRXaW5kb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPGRpdiBjbGFzcz1cIm5ldy1jaGFyYWN0ZXItZm9ybS1jb250ZW50XCI+PC9kaXY+Jyk7XG4gICAgaGFuZGxlTmV3Q2hhcmFjdGVyRm9ybVNpZGViYXJTdGF0ZSgpO1xufTtcblxuY29uc3QgYmluZEV2ZW50c1RvTmV3Q2hhcmFjdGVyRm9ybSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNoYXJhY3Rlci1mb3JtLWJ0bi0tdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZU5ld0NoYXJhY3RlcldpbmRvdygpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZU5ld0NoYXJhY3RlckZvcm1QYWdlID0gKHBhZ2U6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNoZWV0Q29udGVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWNoYXJhY3Rlci1mb3JtLWNvbnRlbnQnKTtcbiAgICBzaGVldENvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgc3dpdGNoIChwYWdlKSB7XG4gICAgICAgIGNhc2UgJ21haW4nOlxuICAgICAgICAgICAgcmVuZGVyTmV3Q2hhcmFjdGVyRm9ybU1haW5QYWdlKHNoZWV0Q29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2tpbGxzJzpcbiAgICAgICAgICAgIHJlbmRlck5ld0NoYXJhY3RlckZvcm1Ta2lsbHNQYWdlKHNoZWV0Q29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXNhYmxlSG90a2V5cygpO1xuICAgIG1ha2VEcmFnZ2FibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1jaGFyYWN0ZXItZm9ybScpLCAnLm5ldy1jaGFyYWN0ZXItZm9ybV9faGVhZGVyJyk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3VibWl0TmV3Q2hhcmFjdGVyID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGFkZENoYXJhY3RlcihuZXdDaGFyYWN0ZXJEYXRhKTtcbiAgICBuZXdDaGFyYWN0ZXJTa2lsbHMuZm9yRWFjaCgoc2tpbGw6IFNraWxsKSA9PiB7XG4gICAgICAgIGFkZENoYXJhY3RlclNraWxsKHNraWxsKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9mQm9udXNGcm9tTGV2ZWwgPSAobGV2ZWw6IG51bWJlcikgPT4ge1xuICAgIGlmIChsZXZlbCA8PSA0KSByZXR1cm4gMjtcbiAgICBpZiAobGV2ZWwgPD0gOCkgcmV0dXJuIDM7XG4gICAgaWYgKGxldmVsIDw9IDEyKSByZXR1cm4gNDtcbiAgICBpZiAobGV2ZWwgPD0gMTYpIHJldHVybiA1O1xuICAgIGlmIChsZXZlbCA8PSAyMCkgcmV0dXJuIDY7XG59O1xuIiwgImltcG9ydCB7IGNsb3NlTWVudSwgbWVudU9wZW4sIHNldE1lbnVPcGVuVmFsdWUsIHNldFNlbGVjdGVkTWVudVZhbHVlIH0gZnJvbSBcIi4uL3NjcmlwdHMvbWVudU1hbmFnZXJcIjtcbmltcG9ydCB7IGNoYXJhY3RlcnMsIGdldENoYXJhY3RlciwgZ2V0Q2hhcmFjdGVycywgZ2V0Q2hhcmFjdGVyU2tpbGxzLCB1cGRhdGVDaGFyYWN0ZXIsIHVwZGF0ZUNoYXJhY3RlclNraWxscyB9IGZyb20gXCIuLi9jb250cm9sbGVycy9jaGFyYWN0ZXJzQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgdG9nZ2xlTmV3Q2hhcmFjdGVyV2luZG93IH0gZnJvbSBcIi4vbmV3Q2hhcmFjdGVyRm9ybS9uZXdDaGFyYWN0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUNoYXJhY3Rlck1lbnUgPSAoKSA9PiB7XG4gICAgc2V0TWVudU9wZW5WYWx1ZSghbWVudU9wZW4pO1xuICAgIGlmIChtZW51T3Blbikge1xuICAgICAgICBzZXRTZWxlY3RlZE1lbnVWYWx1ZSgnY2hhcmFjdGVycycpO1xuICAgICAgICAvLyBDcmVhdGUgbWVudVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KCdjaGFyYWN0ZXJzJykpO1xuICAgICAgICBnZXRDaGFyYWN0ZXJCb2R5RGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNsb3NlTWVudSgnY2hhcmFjdGVycycpO1xuICAgIH1cbn07XG5cbmNvbnN0IGJpbmRFdmVudHNUb0NoYXJhY3Rlck1lbnUgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1uZXctY2hhcmFjdGVyLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVOZXdDaGFyYWN0ZXJXaW5kb3coKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGdldENoYXJhY3RlckJvZHlEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGdldENoYXJhY3RlcnMoKTtcbiAgICBjaGFyYWN0ZXJzLmZvckVhY2goKGNoYXJhY3RlcikgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tY2hhcmFjdGVyXCIgaWQ9XCJjaGFyYWN0ZXItbWVudS1pdGVtLSR7Y2hhcmFjdGVyLmlkfVwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7Y2hhcmFjdGVyLmltYWdlfT5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cD4ke2NoYXJhY3Rlci5sZXZlbH0gJHtjaGFyYWN0ZXIubmFtZX0gJHtjaGFyYWN0ZXIuY2xhc3N9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2hhcmFjdGVyLW1lbnUtaXRlbS0ke2NoYXJhY3Rlci5pZH1gKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHNlbGVjdENoYXJhY3RlcihjaGFyYWN0ZXIuaWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBuZXcgY2hhcmFjdGVyIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLWNoYXJhY3Rlci1idG5cIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tLW5ldy1pdGVtXCIgaWQ9XCJjcmVhdGUtbmV3LWNoYXJhY3Rlci1idG5cIj5OZXcgQ2hhcmFjdGVyPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xuICAgIGJpbmRFdmVudHNUb0NoYXJhY3Rlck1lbnUoKTtcbn07XG5cbmNvbnN0IHNlbGVjdENoYXJhY3RlciA9IGFzeW5jIChpZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY2hhcmFjdGVyRGF0YSA9IGF3YWl0IGdldENoYXJhY3RlcihpZCk7XG4gICAgdXBkYXRlQ2hhcmFjdGVyKGNoYXJhY3RlckRhdGEpO1xuICAgIGNvbnN0IHNraWxsc0RhdGEgPSBhd2FpdCBnZXRDaGFyYWN0ZXJTa2lsbHMoaWQpO1xuICAgIHVwZGF0ZUNoYXJhY3RlclNraWxscyhza2lsbHNEYXRhKTtcbiAgICB0b2dnbGVDaGFyYWN0ZXJNZW51KCk7XG59O1xuIiwgImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4uL3NjcmlwdHMvdG9vbHMvdXRpbHNcIjtcbmltcG9ydCB7IGNsaWVudFR5cGUgfSBmcm9tIFwiLi4vdmlld3MvZGFzaGJvYXJkUGFnZVwiO1xuaW1wb3J0IHsgdG9nZ2xlQ2hhcmFjdGVyTWVudSB9IGZyb20gXCIuL2NoYXJhY3Rlck1lbnVcIjtcbmltcG9ydCB7IHRvZ2dsZUNoYXJhY3RlclNoZWV0IH0gZnJvbSBcIi4vY2hhcmFjdGVyU2hlZXQvY2hhcmFjdGVyU2hlZXRcIjtcbmltcG9ydCB7IHRvZ2dsZUNyZWF0dXJlc01vZGFsIH0gZnJvbSBcIi4vY3JlYXR1cmVzTW9kYWwvY3JlYXR1cmVzTW9kYWxcIjtcbmltcG9ydCB7IHRvZ2dsZU1hcE1lbnUgfSBmcm9tIFwiLi9tYXBzTWVudVwiO1xuaW1wb3J0IHsgdG9nZ2xlVG9rZW5NZW51IH0gZnJvbSBcIi4vdG9rZW5zTWVudVwiO1xuXG5jb25zdCBiaW5kRXZlbnRzVG9TaWRlYmFyID0gKCkgPT4ge1xuICAgIGlmIChjbGllbnRUeXBlID09PSAnZG0nKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXBzLW1lbnUtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVNYXBNZW51KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9rZW5zLW1lbnUtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVUb2tlbk1lbnUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdHVyZXMtbW9kYWwtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVDcmVhdHVyZXNNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcmFjdGVycy1tZW51LWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlQ2hhcmFjdGVyTWVudSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJhY3Rlci1zaGVldC1tb2RhbC1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZUNoYXJhY3RlclNoZWV0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmNvbnN0IHNpZGViYXJJbm5lckh0bWwgPSAoKSA9PiB7XG4gICAgaWYgKGNsaWVudFR5cGUgPT09ICdkbScpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gYnRuLS1ob3ZlclwiIGlkPVwibWFwcy1tZW51LWJ0blwiPk1hcHM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gYnRuLS1ob3ZlclwiIGlkPVwidG9rZW5zLW1lbnUtYnRuXCI+VG9rZW5zPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIGJ0bi0taG92ZXJcIiBpZD1cImNyZWF0dXJlcy1tb2RhbC1idG5cIj5DcmVhdHVyZXM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gYnRuLS1ob3ZlclwiIGlkPVwiZW5jb3VudGVycy1tb2RhbC1idG5cIj5FbmNvdW50ZXJzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIGJ0bi0taG92ZXJcIiBpZD1cImxvb3QtbW9kYWwtYnRuXCI+TG9vdDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNpZGViYXJfX2J0biBidG4tLWhvdmVyXCIgaWQ9XCJpdGVtcy1tb2RhbC1idG5cIj5JdGVtczwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNpZGViYXJfX2J0biBidG4tLWhvdmVyXCIgaWQ9XCJzaG9wcy1tb2RhbC1idG5cIj5TaG9wczwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIGJ0bi0taG92ZXJcIiBpZD1cImNoYXJhY3RlcnMtbWVudS1idG5cIj5DaGFyYWN0ZXJzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIGJ0bi0taG92ZXJcIiBpZD1cImNoYXJhY3Rlci1zaGVldC1tb2RhbC1idG5cIj5DaGFyYWN0ZXIgU2hlZXQ8L2J1dHRvbj5cbiAgICAgICAgYDtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaWRlYmFyKCkge1xuICAgIHJlYWR5KCgpID0+IHtcbiAgICAgICAgYmluZEV2ZW50c1RvU2lkZWJhcigpO1xuICAgIH0sICcuc2lkZWJhcicpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXJcIj4ke3NpZGViYXJJbm5lckh0bWwoKX08L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCB7IGVtaXRTZXJ2ZXJFdmVudCwgc29ja2V0IH0gZnJvbSAnLi4vc2NyaXB0cy9zb2NrZXQtaW8nO1xuaW1wb3J0IHsgcmVhZHkgfSBmcm9tICcuLi9zY3JpcHRzL3Rvb2xzL3V0aWxzJztcbmltcG9ydCB7IHJvb20gfSBmcm9tICcuLi92aWV3cy9kYXNoYm9hcmRQYWdlJztcblxuY29uc3QgbGVhdmVSb29tID0gKCkgPT4ge1xuICAgIGVtaXRTZXJ2ZXJFdmVudCgnVVNFUl9ESVNDT05ORUNUJywgW3Jvb20sIHNvY2tldC5pZF0pO1xuICAgIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG59O1xuXG5jb25zdCBiaW5kRXZlbnRzVG9Ub29sYmFyID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWF2ZS1nYW1lLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZWF2ZVJvb20oKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvb2xiYXIoKSB7XG4gICAgcmVhZHkoKCkgPT4ge1xuICAgICAgICBiaW5kRXZlbnRzVG9Ub29sYmFyKCk7XG4gICAgfSwgJy50b29sYmFyJyk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbGJhclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvb2xiYXJfX2J0blwiIG9uY2xpY2s9XCJ6b29tSW4oKVwiPis8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b29sYmFyX19idG5cIiBvbmNsaWNrPVwiem9vbU91dCgpXCI+LTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvb2xiYXJfX2J0blwiIG9uY2xpY2s9XCJ0b2dnbGVQbGF5ZXJMaXN0KClcIj5TaG93IFBsYXllcnM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidG9vbGJhcl9fdGV4dFwiPlJvb206ICR7cm9vbX08L3A+XG4gICAgICAgICAgICA8YSBjbGFzcz1cInRvb2xiYXJfX2xlYXZlLWJ0blwiIGlkPVwibGVhdmUtZ2FtZS1idG5cIj5MZWF2ZSBHYW1lPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIiwgImltcG9ydCBzaWRlYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhcic7XG5pbXBvcnQgdG9vbGJhciBmcm9tICcuLi9jb21wb25lbnRzL3Rvb2xiYXInO1xuaW1wb3J0IGdyaWQgZnJvbSAnLi4vY29tcG9uZW50cy9ncmlkJztcbmltcG9ydCB7IHJlYWR5IH0gZnJvbSAnLi4vc2NyaXB0cy90b29scy91dGlscyc7XG5pbXBvcnQgeyBnZXRDcmVhdHVyZXMsIGdldEN1c3RvbUNyZWF0dXJlcyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NyZWF0dXJlc0NvbnRyb2xsZXInO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVQYWdlKCkge1xuICAgIHJlYWR5KGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZ2V0Q3VzdG9tQ3JlYXR1cmVzKCk7XG4gICAgICAgIGF3YWl0IGdldENyZWF0dXJlcygpO1xuICAgIH0sICcuZ2FtZS1wYWdlJyk7XG5cbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbWUtcGFnZVwiPlxuICAgICAgICAgICAgJHtzaWRlYmFyKCl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgJHt0b29sYmFyKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICR7Z3JpZCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufVxuIiwgImltcG9ydCBnYW1lc0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9nYW1lc0xpc3QnO1xuaW1wb3J0IHsgZ2V0VXNlciwgbG9nb3V0IH0gZnJvbSAnLi4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQ2xpZW50LCBHYW1lIH0gZnJvbSAnLi4vc2NyaXB0cy90eXBlcyc7XG5pbXBvcnQgeyByZWFkeSB9IGZyb20gJy4uL3NjcmlwdHMvdG9vbHMvdXRpbHMnO1xuaW1wb3J0IGdhbWVzSGlzdG9yeUxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9nYW1lSGlzdG9yeUxpc3QnO1xuaW1wb3J0IGdhbWVQYWdlIGZyb20gJy4vZ2FtZVBhZ2UnO1xuaW1wb3J0IHsgZW1pdFNlcnZlckV2ZW50IH0gZnJvbSAnLi4vc2NyaXB0cy9zb2NrZXQtaW8nO1xuaW1wb3J0IHsgYWRkR2FtZVRvSGlzdG9yeSwgZ2V0R2FtZSwgZ2V0R2FtZXNIaXN0b3J5IH0gZnJvbSAnLi4vY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlcic7XG5pbXBvcnQgeyB0b2dnbGVDaGFyYWN0ZXJNZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJNZW51JztcblxuZXhwb3J0IGxldCByb29tOiBzdHJpbmc7XG5leHBvcnQgbGV0IGNsaWVudFR5cGU6IHN0cmluZztcbmV4cG9ydCBsZXQgc29ja2V0SWQ6IHN0cmluZztcblxuXG4vLyBKb2lucyB0aGUgZ2FtZSBhcyBhIHBsYXllclxuZXhwb3J0IGNvbnN0IGpvaW5QbGF5ZXIgPSAocm9vbUNvZGU6IHN0cmluZykgPT4ge1xuICAgIHJvb20gPSByb29tQ29kZTtcbiAgICBlbWl0U2VydmVyRXZlbnQoJ0pPSU5fUk9PTScsIFsncGxheWVyJywgcm9vbUNvZGUsIChyb29tRXhpc3RzOiBib29sZWFuLCBuZXdDbGllbnQ6IENsaWVudCkgPT4ge1xuICAgICAgICBpZiAocm9vbUV4aXN0cykge1xuICAgICAgICAgICAgY2xpZW50VHlwZSA9IG5ld0NsaWVudC5jbGllbnRUeXBlO1xuICAgICAgICAgICAgc29ja2V0SWQgPSBuZXdDbGllbnQuaWQ7XG4gICAgICAgICAgICByZW5kZXJHYW1lUGFnZSgpO1xuICAgICAgICAgICAgaGFuZGxlUHVzaEdhbWVUb0hpc3Rvcnkocm9vbUNvZGUpO1xuICAgICAgICAgICAgdG9nZ2xlQ2hhcmFjdGVyTWVudSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdyb29tIGRvZXNuXFwndCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgfV0pO1xufTtcblxuLy8gSm9pbnMgdGhlIGdhbWUgYXMgdGhlIERNXG5leHBvcnQgY29uc3Qgam9pbkRNID0gKHJvb21Db2RlOiBzdHJpbmcpID0+IHtcbiAgICByb29tID0gcm9vbUNvZGU7XG4gICAgZW1pdFNlcnZlckV2ZW50KCdKT0lOX1JPT00nLCBbJ2RtJywgcm9vbUNvZGUsIChyb29tRXhpc3RzOiBib29sZWFuLCBuZXdDbGllbnQ6IENsaWVudCkgPT4ge1xuICAgICAgICBpZiAocm9vbUV4aXN0cykge1xuICAgICAgICAgICAgY2xpZW50VHlwZSA9IG5ld0NsaWVudC5jbGllbnRUeXBlO1xuICAgICAgICAgICAgc29ja2V0SWQgPSBuZXdDbGllbnQuaWQ7XG4gICAgICAgICAgICByZW5kZXJHYW1lUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdnYW1lIGFscmVhZHkgc3RhcnRlZCcpO1xuICAgICAgICB9XG4gICAgfV0pO1xufTtcblxuLy8gU3dpdGNoIHBhZ2UgZnJvbSBkYXNoYm9hcmQgdG8gdGhlIGdhbWVcbmNvbnN0IHJlbmRlckdhbWVQYWdlID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQtcGFnZScpLnJlbW92ZSgpO1xuICAgIGNvbnN0IGNvbnRhaW5lcjogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbiAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBnYW1lUGFnZSgpKTtcbn07XG5cbi8vIEFkZHMgc2VsZWN0ZWQgZ2FtZSB0byBoaXN0b3J5XG5jb25zdCBoYW5kbGVQdXNoR2FtZVRvSGlzdG9yeSA9IGFzeW5jIChyb29tQ29kZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZ2FtZSA9IGF3YWl0IGdldEdhbWUocm9vbUNvZGUpO1xuICAgIGNvbnN0IGdhbWVzSGlzdG9yeSA9IGF3YWl0IGdldEdhbWVzSGlzdG9yeSgpO1xuICAgIGlmIChjaGVja0dhbWVFeGlzdHMoZ2FtZSwgZ2FtZXNIaXN0b3J5KSkgcmV0dXJuO1xuICAgIGFkZEdhbWVUb0hpc3RvcnkoZ2FtZSk7XG59O1xuXG5jb25zdCBjaGVja0dhbWVFeGlzdHMgPSAobmV3R2FtZTogR2FtZSwgZ2FtZXNIaXN0b3J5OiBHYW1lW10pID0+IHtcbiAgICBsZXQgZ2FtZUV4aXN0cyA9IGZhbHNlO1xuICAgIGdhbWVzSGlzdG9yeS5mb3JFYWNoKChnYW1lKSA9PiB7XG4gICAgICAgIGlmIChnYW1lLmNvZGUgPT09IG5ld0dhbWUuY29kZSkgZ2FtZUV4aXN0cyA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdhbWVFeGlzdHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXNoYm9hcmRQYWdlKCkge1xuICAgIGxldCByb29tQ29kZTogc3RyaW5nO1xuXG4gICAgcmVhZHkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIWF3YWl0IGdldFVzZXIoKSkgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID0gJ2xvZ2luJzsgLy8gQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgICAgYmluZEV2ZW50c1RvRm9ybSgpO1xuICAgIH0sICcuZGFzaGJvYXJkLXBhZ2UnKTtcblxuICAgIGNvbnN0IGJpbmRFdmVudHNUb0Zvcm0gPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqb2luLXJvb20tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJvb21Db2RlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb29tLWNvZGUtaW5wdXQnKSkudmFsdWU7XG4gICAgICAgICAgICBqb2luUGxheWVyKHJvb21Db2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmQtbG9nb3V0LWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtcGFnZVwiPlxuICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFnZS10aXRsZVwiPkRhc2hib2FyZDwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiam9pbi1yb29tLWZvcm1cIiBjbGFzcz1cImZvcm0tLWpvaW4tcm9vbVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJyb29tLWNvZGUtaW5wdXRcIiBwbGFjZWhvbGRlcj1cInJvb20gY29kZVwiIHZhbHVlPVwiXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkpvaW4gUm9vbTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAke2dhbWVzTGlzdCgpfVxuICAgICAgICAgICAgICAgICR7Z2FtZXNIaXN0b3J5TGlzdCgpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkYXNoYm9hcmQtbG9nb3V0LWJ0blwiIGNsYXNzPVwiYnV0dG9uIGJ0bi0taG92ZXIgYnRuLS1sb2dvdXRcIj5Mb2cgb3V0PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCk7XG59XG4iLCAiaW1wb3J0IGxvZ2luUGFnZSBmcm9tICcuL3ZpZXdzL2xvZ2luUGFnZSc7XG5pbXBvcnQgcmVnaXN0ZXJQYWdlIGZyb20gJy4vdmlld3MvcmVnaXN0ZXJQYWdlJztcbmltcG9ydCBkYXNoYm9hcmRQYWdlIGZyb20gJy4vdmlld3MvZGFzaGJvYXJkUGFnZSc7XG5cbmNvbnN0IHJvdXRlTWFuYWdlciA9ICgpID0+IHtcbiAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICBjYXNlICcvJzpcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9ICcvZ2FtZSc7XG4gICAgY2FzZSAnL2xvZ2luJzpcbiAgICAgIHJldHVybiBsb2dpblBhZ2UoKTtcbiAgICBjYXNlICcvcmVnaXN0ZXInOlxuICAgICAgcmV0dXJuIHJlZ2lzdGVyUGFnZSgpO1xuICAgIGNhc2UgJy9nYW1lJzpcbiAgICAgIHJldHVybiBkYXNoYm9hcmRQYWdlKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnPGgxPjQwNCBOb3QgRm91bmQ8L2gxPic7XG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJyNhcHAnKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICR7cm91dGVNYW5hZ2VyKCl9XG4gIDwvZGl2PlxuYCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxXQUFPLFVBQVUsU0FBUyxLQUFLLElBQUksU0FBUztBQUMxQyxhQUFPLFNBQVMsT0FBTztBQUNyQixZQUFJLE9BQU8sSUFBSSxNQUFNLFVBQVUsTUFBTTtBQUNyQyxpQkFBU0EsS0FBSSxHQUFHQSxLQUFJLEtBQUssUUFBUUEsTUFBSztBQUNwQyxlQUFLQSxNQUFLLFVBQVVBO0FBQUEsUUFDdEI7QUFDQSxlQUFPLEdBQUcsTUFBTSxTQUFTLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNWQTtBQUFBO0FBQUE7QUFFQSxRQUFJLE9BQU87QUFJWCxRQUFJQyxZQUFXLE9BQU8sVUFBVTtBQUdoQyxRQUFJLFNBQVUsU0FBU0MsUUFBTztBQUU1QixhQUFPLFNBQVMsT0FBTztBQUNyQixZQUFJLE1BQU1ELFVBQVMsS0FBSyxLQUFLO0FBQzdCLGVBQU9DLE9BQU0sU0FBU0EsT0FBTSxPQUFPLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxZQUFZO0FBQUEsTUFDbEU7QUFBQSxJQUNGLEVBQUcsdUJBQU8sT0FBTyxJQUFJLENBQUM7QUFFdEIsYUFBUyxXQUFXLE1BQU07QUFDeEIsYUFBTyxLQUFLLFlBQVk7QUFDeEIsYUFBTyxTQUFTLFNBQVMsT0FBTztBQUM5QixlQUFPLE9BQU8sS0FBSyxNQUFNO0FBQUEs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SSxJQUFJO0FBQ3hLLFFBQU0sY0FBYyxJQUFJO0FBQUEsSUFDcEIsSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1osSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUNaLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDWixJQUFJLEtBQUssR0FBRztBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7QUFFQSxJQUFNLFdBQU4sTUFBZTtBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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akI7QUFDSCxhQUFPLGNBQWM7QUFBQTtBQUVyQixhQUFPO0FBQUE7QUFFYjtBQUVBLFNBQVMsY0FBOEIsTUFBTSxFQUFFLG1CQUFtQixhQUFhO0FBQUE7QUFBQSxNQUV6RSxhQUFhO0FBQUE7QUFBQSxDQUVsQjsiLAogICJuYW1lcyI6IFsiaSIsICJ0b1N0cmluZyIsICJjYWNoZSIsICJpIiwgInBvc2l0aW9uIiwgImVuY29kZSIsICJ1cmwiLCAicGFydHMiLCAidmFsdWUiLCAidmFsdWUiLCAidmFsdWUiLCAidXJsIiwgImkiLCAidXJsIiwgInVybCIsICJ2YWx1ZSIsICJwcm90b2NvbCIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJpIiwgInZhbHVlIiwgInVybCIsICJpIiwgImF4aW9zIiwgInJlcXVpcmVfYXhpb3MiLCAiYXhpb3MiLCAiaW1wb3J0X2F4aW9zIiwgImF4aW9zIiwgImdhbWVzTGlzdCIsICJiaW5kRXZlbnRUb0dhbWVDYXJkIiwgImltcG9ydF9heGlvcyIsICJheGlvcyIsICJpbXBvcnRfYXhpb3MiLCAiYXhpb3MiLCAiaSIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJzaWRlYmFyIiwgImltcG9ydF9heGlvcyIsICJkbWciLCAidmFsdWUiLCAibmFtZSIsICJheGlvcyIsICJza2lsbHMiLCAiaSIsICJpIiwgImkiLCAic2tpbGxzIiwgImNyZWF0dXJlUm93IiwgImkiLCAid2luZG93IiwgIndpbmRvdyIsICJ2YWx1ZSIsICJpbXBvcnRfYXhpb3MiLCAiYXhpb3MiLCAiaSIsICJpIiwgImkiLCAid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwgImxlbmd0aCIsICJpIiwgIm9uIiwgImkiLCAibGVuZ3RoIiwgImkiLCAiZW5jb2RlIiwgImkiLCAiZGVjb2RlIiwgImVuY29kZSIsICJpIiwgImkiLCAiZW5jb2RlIiwgImkiLCAiZGVjb2RlIiwgImkiLCAicHJvdG9jb2wiLCAicHJvdG9jb2wiLCAid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwgImlzVmlldyIsICJ3aXRoTmF0aXZlQmxvYiIsICJpIiwgImkiLCAicHJvdG9jb2wiLCAiUGFja2V0VHlwZSIsICJpIiwgIlNvY2tldCIsICJpIiwgInNlbGYiLCAic29ja2V0IiwgInNlbGYiLCAiU29ja2V0IiwgImkiLCAibG9va3VwIiwgIlNvY2tldCIsICJsb29rdXAiLCAicm9vbSIsICJncmlkIiwgImdyaWQiLCAiZ3JpZCIsICJtYXAiLCAidmFsdWUiLCAic2lkZWJhciIsICJpIiwgInZhbHVlIiwgImNoYXJhY3RlciIsICJzb2NrZXRJZCJdCn0K
