import {
  __commonJS
} from "./chunk-WKYGNSYM.js";

// node_modules/@stomp/stompjs/bundles/stomp.umd.js
var require_stomp_umd = __commonJS({
  "node_modules/@stomp/stompjs/bundles/stomp.umd.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define("StompJs", [], factory);
      else if (typeof exports === "object")
        exports["StompJs"] = factory();
      else
        root["StompJs"] = factory();
    })(typeof self !== "undefined" ? self : exports, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(ns, key, (function(key2) {
                  return value[key2];
                }).bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 0);
        }({
          /***/
          "./src/byte.ts": (
            /*!*********************!*\
              !*** ./src/byte.ts ***!
              \*********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.BYTE = {
                // LINEFEED byte (octet 10)
                LF: "\n",
                // NULL byte (octet 0)
                NULL: "\0"
              };
            }
          ),
          /***/
          "./src/client.ts": (
            /*!***********************!*\
              !*** ./src/client.ts ***!
              \***********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              var __generator = this && this.__generator || function(thisArg, body) {
                var _ = { label: 0, sent: function() {
                  if (t[0] & 1)
                    throw t[1];
                  return t[1];
                }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                  return this;
                }), g;
                function verb(n) {
                  return function(v) {
                    return step([n, v]);
                  };
                }
                function step(op) {
                  if (f)
                    throw new TypeError("Generator is already executing.");
                  while (_)
                    try {
                      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                      if (y = 0, t)
                        op = [op[0] & 2, t.value];
                      switch (op[0]) {
                        case 0:
                        case 1:
                          t = op;
                          break;
                        case 4:
                          _.label++;
                          return { value: op[1], done: false };
                        case 5:
                          _.label++;
                          y = op[1];
                          op = [0];
                          continue;
                        case 7:
                          op = _.ops.pop();
                          _.trys.pop();
                          continue;
                        default:
                          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                          }
                          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                          }
                          if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                          }
                          if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                          }
                          if (t[2])
                            _.ops.pop();
                          _.trys.pop();
                          continue;
                      }
                      op = body.call(thisArg, _);
                    } catch (e) {
                      op = [6, e];
                      y = 0;
                    } finally {
                      f = t = 0;
                    }
                  if (op[0] & 5)
                    throw op[1];
                  return { value: op[0] ? op[1] : void 0, done: true };
                }
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              var stomp_handler_1 = __webpack_require__(
                /*! ./stomp-handler */
                "./src/stomp-handler.ts"
              );
              var versions_1 = __webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              );
              var web_socket_state_1 = __webpack_require__(
                /*! ./web-socket-state */
                "./src/web-socket-state.ts"
              );
              var Client = (
                /** @class */
                function() {
                  function Client2(conf) {
                    if (conf === void 0) {
                      conf = {};
                    }
                    this.stompVersions = versions_1.Versions.default;
                    this.reconnectDelay = 5e3;
                    this.heartbeatIncoming = 1e4;
                    this.heartbeatOutgoing = 1e4;
                    this.splitLargeFrames = false;
                    this.maxWebSocketChunkSize = 8 * 1024;
                    this.forceBinaryWSFrames = false;
                    this.appendMissingNULLonIncoming = false;
                    this._active = false;
                    var noOp = function() {
                    };
                    this.debug = noOp;
                    this.beforeConnect = noOp;
                    this.onConnect = noOp;
                    this.onDisconnect = noOp;
                    this.onUnhandledMessage = noOp;
                    this.onUnhandledReceipt = noOp;
                    this.onUnhandledFrame = noOp;
                    this.onStompError = noOp;
                    this.onWebSocketClose = noOp;
                    this.onWebSocketError = noOp;
                    this.logRawCommunication = false;
                    this.connectHeaders = {};
                    this._disconnectHeaders = {};
                    this.configure(conf);
                  }
                  Object.defineProperty(Client2.prototype, "webSocket", {
                    /**
                     * Underlying WebSocket instance, READONLY.
                     */
                    get: function() {
                      return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "disconnectHeaders", {
                    /**
                     * Disconnection headers.
                     */
                    get: function() {
                      return this._disconnectHeaders;
                    },
                    set: function(value) {
                      this._disconnectHeaders = value;
                      if (this._stompHandler) {
                        this._stompHandler.disconnectHeaders = this._disconnectHeaders;
                      }
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "connected", {
                    /**
                     * `true` if there is a active connection with STOMP Broker
                     */
                    get: function() {
                      return !!this._stompHandler && this._stompHandler.connected;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "connectedVersion", {
                    /**
                     * version of STOMP protocol negotiated with the server, READONLY
                     */
                    get: function() {
                      return this._stompHandler ? this._stompHandler.connectedVersion : void 0;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "active", {
                    /**
                     * if the client is active (connected or going to reconnect)
                     */
                    get: function() {
                      return this._active;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Client2.prototype.configure = function(conf) {
                    Object.assign(this, conf);
                  };
                  Client2.prototype.activate = function() {
                    this._active = true;
                    this._connect();
                  };
                  Client2.prototype._connect = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var _this = this;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            if (this.connected) {
                              this.debug("STOMP: already connected, nothing to do");
                              return [
                                2
                                /*return*/
                              ];
                            }
                            return [4, this.beforeConnect()];
                          case 1:
                            _a.sent();
                            if (!this._active) {
                              this.debug("Client has been marked inactive, will not attempt to connect");
                              return [
                                2
                                /*return*/
                              ];
                            }
                            this.debug("Opening Web Socket...");
                            this._webSocket = this._createWebSocket();
                            this._stompHandler = new stomp_handler_1.StompHandler(this, this._webSocket, {
                              debug: this.debug,
                              stompVersions: this.stompVersions,
                              connectHeaders: this.connectHeaders,
                              disconnectHeaders: this._disconnectHeaders,
                              heartbeatIncoming: this.heartbeatIncoming,
                              heartbeatOutgoing: this.heartbeatOutgoing,
                              splitLargeFrames: this.splitLargeFrames,
                              maxWebSocketChunkSize: this.maxWebSocketChunkSize,
                              forceBinaryWSFrames: this.forceBinaryWSFrames,
                              logRawCommunication: this.logRawCommunication,
                              appendMissingNULLonIncoming: this.appendMissingNULLonIncoming,
                              onConnect: function(frame) {
                                if (!_this._active) {
                                  _this.debug("STOMP got connected while deactivate was issued, will disconnect now");
                                  _this._disposeStompHandler();
                                  return;
                                }
                                _this.onConnect(frame);
                              },
                              onDisconnect: function(frame) {
                                _this.onDisconnect(frame);
                              },
                              onStompError: function(frame) {
                                _this.onStompError(frame);
                              },
                              onWebSocketClose: function(evt) {
                                _this.onWebSocketClose(evt);
                                if (_this._active) {
                                  _this._schedule_reconnect();
                                }
                              },
                              onWebSocketError: function(evt) {
                                _this.onWebSocketError(evt);
                              },
                              onUnhandledMessage: function(message) {
                                _this.onUnhandledMessage(message);
                              },
                              onUnhandledReceipt: function(frame) {
                                _this.onUnhandledReceipt(frame);
                              },
                              onUnhandledFrame: function(frame) {
                                _this.onUnhandledFrame(frame);
                              }
                            });
                            this._stompHandler.start();
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  Client2.prototype._createWebSocket = function() {
                    var webSocket;
                    if (this.webSocketFactory) {
                      webSocket = this.webSocketFactory();
                    } else {
                      webSocket = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
                    }
                    webSocket.binaryType = "arraybuffer";
                    return webSocket;
                  };
                  Client2.prototype._schedule_reconnect = function() {
                    var _this = this;
                    if (this.reconnectDelay > 0) {
                      this.debug("STOMP: scheduling reconnection in " + this.reconnectDelay + "ms");
                      this._reconnector = setTimeout(function() {
                        _this._connect();
                      }, this.reconnectDelay);
                    }
                  };
                  Client2.prototype.deactivate = function() {
                    this._active = false;
                    if (this._reconnector) {
                      clearTimeout(this._reconnector);
                    }
                    this._disposeStompHandler();
                  };
                  Client2.prototype.forceDisconnect = function() {
                    if (this._webSocket) {
                      if (this._webSocket.readyState === web_socket_state_1.WebSocketState.CONNECTING || this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                        this._stompHandler._closeWebsocket();
                      }
                    }
                  };
                  Client2.prototype._disposeStompHandler = function() {
                    if (this._stompHandler) {
                      this._stompHandler.dispose();
                      this._stompHandler = null;
                    }
                  };
                  Client2.prototype.publish = function(params) {
                    this._stompHandler.publish(params);
                  };
                  Client2.prototype.watchForReceipt = function(receiptId, callback) {
                    this._stompHandler.watchForReceipt(receiptId, callback);
                  };
                  Client2.prototype.subscribe = function(destination, callback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    return this._stompHandler.subscribe(destination, callback, headers);
                  };
                  Client2.prototype.unsubscribe = function(id, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.unsubscribe(id, headers);
                  };
                  Client2.prototype.begin = function(transactionId) {
                    return this._stompHandler.begin(transactionId);
                  };
                  Client2.prototype.commit = function(transactionId) {
                    this._stompHandler.commit(transactionId);
                  };
                  Client2.prototype.abort = function(transactionId) {
                    this._stompHandler.abort(transactionId);
                  };
                  Client2.prototype.ack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.ack(messageId, subscriptionId, headers);
                  };
                  Client2.prototype.nack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.nack(messageId, subscriptionId, headers);
                  };
                  return Client2;
                }()
              );
              exports2.Client = Client;
            }
          ),
          /***/
          "./src/compatibility/compat-client.ts": (
            /*!********************************************!*\
              !*** ./src/compatibility/compat-client.ts ***!
              \********************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              var __extends = this && this.__extends || /* @__PURE__ */ function() {
                var extendStatics = function(d, b) {
                  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                    d2.__proto__ = b2;
                  } || function(d2, b2) {
                    for (var p in b2)
                      if (b2.hasOwnProperty(p))
                        d2[p] = b2[p];
                  };
                  return extendStatics(d, b);
                };
                return function(d, b) {
                  extendStatics(d, b);
                  function __() {
                    this.constructor = d;
                  }
                  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
              }();
              Object.defineProperty(exports2, "__esModule", { value: true });
              var client_1 = __webpack_require__(
                /*! ../client */
                "./src/client.ts"
              );
              var heartbeat_info_1 = __webpack_require__(
                /*! ./heartbeat-info */
                "./src/compatibility/heartbeat-info.ts"
              );
              var CompatClient = (
                /** @class */
                function(_super) {
                  __extends(CompatClient2, _super);
                  function CompatClient2(webSocketFactory) {
                    var _this = _super.call(this) || this;
                    _this.maxWebSocketFrameSize = 16 * 1024;
                    _this._heartbeatInfo = new heartbeat_info_1.HeartbeatInfo(_this);
                    _this.reconnect_delay = 0;
                    _this.webSocketFactory = webSocketFactory;
                    _this.debug = function() {
                      var message = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        message[_i] = arguments[_i];
                      }
                      console.log.apply(console, message);
                    };
                    return _this;
                  }
                  CompatClient2.prototype._parseConnect = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    var closeEventCallback;
                    var connectCallback;
                    var errorCallback;
                    var headers = {};
                    if (args.length < 2) {
                      throw new Error("Connect requires at least 2 arguments");
                    }
                    if (typeof args[1] === "function") {
                      headers = args[0], connectCallback = args[1], errorCallback = args[2], closeEventCallback = args[3];
                    } else {
                      switch (args.length) {
                        case 6:
                          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4], headers.host = args[5];
                          break;
                        default:
                          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4];
                      }
                    }
                    return [headers, connectCallback, errorCallback, closeEventCallback];
                  };
                  CompatClient2.prototype.connect = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    var out = this._parseConnect.apply(this, args);
                    if (out[0]) {
                      this.connectHeaders = out[0];
                    }
                    if (out[1]) {
                      this.onConnect = out[1];
                    }
                    if (out[2]) {
                      this.onStompError = out[2];
                    }
                    if (out[3]) {
                      this.onWebSocketClose = out[3];
                    }
                    _super.prototype.activate.call(this);
                  };
                  CompatClient2.prototype.disconnect = function(disconnectCallback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    if (disconnectCallback) {
                      this.onDisconnect = disconnectCallback;
                    }
                    this.disconnectHeaders = headers;
                    _super.prototype.deactivate.call(this);
                  };
                  CompatClient2.prototype.send = function(destination, headers, body) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    if (body === void 0) {
                      body = "";
                    }
                    headers = Object.assign({}, headers);
                    var skipContentLengthHeader = headers["content-length"] === false;
                    if (skipContentLengthHeader) {
                      delete headers["content-length"];
                    }
                    this.publish({
                      destination,
                      headers,
                      body,
                      skipContentLengthHeader
                    });
                  };
                  Object.defineProperty(CompatClient2.prototype, "reconnect_delay", {
                    /**
                     * Available for backward compatibility, renamed to [Client#reconnectDelay]{@link Client#reconnectDelay}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.reconnectDelay = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "ws", {
                    /**
                     * Available for backward compatibility, renamed to [Client#webSocket]{@link Client#webSocket}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "version", {
                    /**
                     * Available for backward compatibility, renamed to [Client#connectedVersion]{@link Client#connectedVersion}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "onreceive", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.onUnhandledMessage;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.onUnhandledMessage = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "onreceipt", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     * Prefer using [Client#watchForReceipt]{@link Client#watchForReceipt}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.onUnhandledReceipt;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.onUnhandledReceipt = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "heartbeat", {
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this._heartbeatInfo;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.heartbeatIncoming = value.incoming;
                      this.heartbeatOutgoing = value.outgoing;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  return CompatClient2;
                }(client_1.Client)
              );
              exports2.CompatClient = CompatClient;
            }
          ),
          /***/
          "./src/compatibility/heartbeat-info.ts": (
            /*!*********************************************!*\
              !*** ./src/compatibility/heartbeat-info.ts ***!
              \*********************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var HeartbeatInfo = (
                /** @class */
                function() {
                  function HeartbeatInfo2(client) {
                    this.client = client;
                  }
                  Object.defineProperty(HeartbeatInfo2.prototype, "outgoing", {
                    get: function() {
                      return this.client.heartbeatOutgoing;
                    },
                    set: function(value) {
                      this.client.heartbeatOutgoing = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(HeartbeatInfo2.prototype, "incoming", {
                    get: function() {
                      return this.client.heartbeatIncoming;
                    },
                    set: function(value) {
                      this.client.heartbeatIncoming = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  return HeartbeatInfo2;
                }()
              );
              exports2.HeartbeatInfo = HeartbeatInfo;
            }
          ),
          /***/
          "./src/compatibility/stomp.ts": (
            /*!************************************!*\
              !*** ./src/compatibility/stomp.ts ***!
              \************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var versions_1 = __webpack_require__(
                /*! ../versions */
                "./src/versions.ts"
              );
              var compat_client_1 = __webpack_require__(
                /*! ./compat-client */
                "./src/compatibility/compat-client.ts"
              );
              var Stomp = (
                /** @class */
                function() {
                  function Stomp2() {
                  }
                  Stomp2.client = function(url, protocols) {
                    if (protocols == null) {
                      protocols = versions_1.Versions.default.protocolVersions();
                    }
                    var wsFn = function() {
                      var klass = Stomp2.WebSocketClass || WebSocket;
                      return new klass(url, protocols);
                    };
                    return new compat_client_1.CompatClient(wsFn);
                  };
                  Stomp2.over = function(ws) {
                    var wsFn;
                    if (typeof ws === "function") {
                      wsFn = ws;
                    } else {
                      console.warn("Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over");
                      wsFn = function() {
                        return ws;
                      };
                    }
                    return new compat_client_1.CompatClient(wsFn);
                  };
                  Stomp2.WebSocketClass = null;
                  return Stomp2;
                }()
              );
              exports2.Stomp = Stomp;
            }
          ),
          /***/
          "./src/frame-impl.ts": (
            /*!***************************!*\
              !*** ./src/frame-impl.ts ***!
              \***************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var byte_1 = __webpack_require__(
                /*! ./byte */
                "./src/byte.ts"
              );
              var FrameImpl = (
                /** @class */
                function() {
                  function FrameImpl2(params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, escapeHeaderValues = params.escapeHeaderValues, skipContentLengthHeader = params.skipContentLengthHeader;
                    this.command = command;
                    this.headers = Object.assign({}, headers || {});
                    if (binaryBody) {
                      this._binaryBody = binaryBody;
                      this.isBinaryBody = true;
                    } else {
                      this._body = body || "";
                      this.isBinaryBody = false;
                    }
                    this.escapeHeaderValues = escapeHeaderValues || false;
                    this.skipContentLengthHeader = skipContentLengthHeader || false;
                  }
                  Object.defineProperty(FrameImpl2.prototype, "body", {
                    /**
                     * body of the frame
                     */
                    get: function() {
                      if (!this._body && this.isBinaryBody) {
                        this._body = new TextDecoder().decode(this._binaryBody);
                      }
                      return this._body;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(FrameImpl2.prototype, "binaryBody", {
                    /**
                     * body as Uint8Array
                     */
                    get: function() {
                      if (!this._binaryBody && !this.isBinaryBody) {
                        this._binaryBody = new TextEncoder().encode(this._body);
                      }
                      return this._binaryBody;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  FrameImpl2.fromRawFrame = function(rawFrame, escapeHeaderValues) {
                    var headers = {};
                    var trim = function(str) {
                      return str.replace(/^\s+|\s+$/g, "");
                    };
                    for (var _i = 0, _a = rawFrame.headers.reverse(); _i < _a.length; _i++) {
                      var header = _a[_i];
                      var idx = header.indexOf(":");
                      var key = trim(header[0]);
                      var value = trim(header[1]);
                      if (escapeHeaderValues && rawFrame.command !== "CONNECT" && rawFrame.command !== "CONNECTED") {
                        value = FrameImpl2.hdrValueUnEscape(value);
                      }
                      headers[key] = value;
                    }
                    return new FrameImpl2({
                      command: rawFrame.command,
                      headers,
                      binaryBody: rawFrame.binaryBody,
                      escapeHeaderValues
                    });
                  };
                  FrameImpl2.prototype.toString = function() {
                    return this.serializeCmdAndHeaders();
                  };
                  FrameImpl2.prototype.serialize = function() {
                    var cmdAndHeaders = this.serializeCmdAndHeaders();
                    if (this.isBinaryBody) {
                      return FrameImpl2.toUnit8Array(cmdAndHeaders, this._binaryBody).buffer;
                    } else {
                      return cmdAndHeaders + this._body + byte_1.BYTE.NULL;
                    }
                  };
                  FrameImpl2.prototype.serializeCmdAndHeaders = function() {
                    var lines = [this.command];
                    if (this.skipContentLengthHeader) {
                      delete this.headers["content-length"];
                    }
                    for (var _i = 0, _a = Object.keys(this.headers || {}); _i < _a.length; _i++) {
                      var name_1 = _a[_i];
                      var value = this.headers[name_1];
                      if (this.escapeHeaderValues && this.command !== "CONNECT" && this.command !== "CONNECTED") {
                        lines.push(name_1 + ":" + FrameImpl2.hdrValueEscape("" + value));
                      } else {
                        lines.push(name_1 + ":" + value);
                      }
                    }
                    if (this.isBinaryBody || !this.isBodyEmpty() && !this.skipContentLengthHeader) {
                      lines.push("content-length:" + this.bodyLength());
                    }
                    return lines.join(byte_1.BYTE.LF) + byte_1.BYTE.LF + byte_1.BYTE.LF;
                  };
                  FrameImpl2.prototype.isBodyEmpty = function() {
                    return this.bodyLength() === 0;
                  };
                  FrameImpl2.prototype.bodyLength = function() {
                    var binaryBody = this.binaryBody;
                    return binaryBody ? binaryBody.length : 0;
                  };
                  FrameImpl2.sizeOfUTF8 = function(s) {
                    return s ? new TextEncoder().encode(s).length : 0;
                  };
                  FrameImpl2.toUnit8Array = function(cmdAndHeaders, binaryBody) {
                    var uint8CmdAndHeaders = new TextEncoder().encode(cmdAndHeaders);
                    var nullTerminator = new Uint8Array([0]);
                    var uint8Frame = new Uint8Array(uint8CmdAndHeaders.length + binaryBody.length + nullTerminator.length);
                    uint8Frame.set(uint8CmdAndHeaders);
                    uint8Frame.set(binaryBody, uint8CmdAndHeaders.length);
                    uint8Frame.set(nullTerminator, uint8CmdAndHeaders.length + binaryBody.length);
                    return uint8Frame;
                  };
                  FrameImpl2.marshall = function(params) {
                    var frame = new FrameImpl2(params);
                    return frame.serialize();
                  };
                  FrameImpl2.hdrValueEscape = function(str) {
                    return str.replace(/\\/g, "\\\\").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/:/g, "\\c");
                  };
                  FrameImpl2.hdrValueUnEscape = function(str) {
                    return str.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\c/g, ":").replace(/\\\\/g, "\\");
                  };
                  return FrameImpl2;
                }()
              );
              exports2.FrameImpl = FrameImpl;
            }
          ),
          /***/
          "./src/index.ts": (
            /*!**********************!*\
              !*** ./src/index.ts ***!
              \**********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              function __export(m) {
                for (var p in m)
                  if (!exports2.hasOwnProperty(p))
                    exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export(__webpack_require__(
                /*! ./client */
                "./src/client.ts"
              ));
              __export(__webpack_require__(
                /*! ./frame-impl */
                "./src/frame-impl.ts"
              ));
              __export(__webpack_require__(
                /*! ./parser */
                "./src/parser.ts"
              ));
              __export(__webpack_require__(
                /*! ./stomp-config */
                "./src/stomp-config.ts"
              ));
              __export(__webpack_require__(
                /*! ./stomp-headers */
                "./src/stomp-headers.ts"
              ));
              __export(__webpack_require__(
                /*! ./stomp-subscription */
                "./src/stomp-subscription.ts"
              ));
              __export(__webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              ));
              __export(__webpack_require__(
                /*! ./web-socket-state */
                "./src/web-socket-state.ts"
              ));
              __export(__webpack_require__(
                /*! ./compatibility/compat-client */
                "./src/compatibility/compat-client.ts"
              ));
              __export(__webpack_require__(
                /*! ./compatibility/stomp */
                "./src/compatibility/stomp.ts"
              ));
            }
          ),
          /***/
          "./src/parser.ts": (
            /*!***********************!*\
              !*** ./src/parser.ts ***!
              \***********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var NULL = 0;
              var LF = 10;
              var CR = 13;
              var COLON = 58;
              var Parser = (
                /** @class */
                function() {
                  function Parser2(onFrame, onIncomingPing) {
                    this.onFrame = onFrame;
                    this.onIncomingPing = onIncomingPing;
                    this._encoder = new TextEncoder();
                    this._decoder = new TextDecoder();
                    this._token = [];
                    this._initState();
                  }
                  Parser2.prototype.parseChunk = function(segment, appendMissingNULLonIncoming) {
                    if (appendMissingNULLonIncoming === void 0) {
                      appendMissingNULLonIncoming = false;
                    }
                    var chunk;
                    if (segment instanceof ArrayBuffer) {
                      chunk = new Uint8Array(segment);
                    } else {
                      chunk = this._encoder.encode(segment);
                    }
                    if (appendMissingNULLonIncoming && chunk[chunk.length - 1] !== 0) {
                      var chunkWithNull = new Uint8Array(chunk.length + 1);
                      chunkWithNull.set(chunk, 0);
                      chunkWithNull[chunk.length] = 0;
                      chunk = chunkWithNull;
                    }
                    for (var i = 0; i < chunk.length; i++) {
                      var byte = chunk[i];
                      this._onByte(byte);
                    }
                  };
                  Parser2.prototype._collectFrame = function(byte) {
                    if (byte === NULL) {
                      return;
                    }
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this.onIncomingPing();
                      return;
                    }
                    this._onByte = this._collectCommand;
                    this._reinjectByte(byte);
                  };
                  Parser2.prototype._collectCommand = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._results.command = this._consumeTokenAsUTF8();
                      this._onByte = this._collectHeaders;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectHeaders = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._setupCollectBody();
                      return;
                    }
                    this._onByte = this._collectHeaderKey;
                    this._reinjectByte(byte);
                  };
                  Parser2.prototype._reinjectByte = function(byte) {
                    this._onByte(byte);
                  };
                  Parser2.prototype._collectHeaderKey = function(byte) {
                    if (byte === COLON) {
                      this._headerKey = this._consumeTokenAsUTF8();
                      this._onByte = this._collectHeaderValue;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectHeaderValue = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]);
                      this._headerKey = void 0;
                      this._onByte = this._collectHeaders;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._setupCollectBody = function() {
                    var contentLengthHeader = this._results.headers.filter(function(header) {
                      return header[0] === "content-length";
                    })[0];
                    if (contentLengthHeader) {
                      this._bodyBytesRemaining = parseInt(contentLengthHeader[1], 10);
                      this._onByte = this._collectBodyFixedSize;
                    } else {
                      this._onByte = this._collectBodyNullTerminated;
                    }
                  };
                  Parser2.prototype._collectBodyNullTerminated = function(byte) {
                    if (byte === NULL) {
                      this._retrievedBody();
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectBodyFixedSize = function(byte) {
                    if (this._bodyBytesRemaining-- === 0) {
                      this._retrievedBody();
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._retrievedBody = function() {
                    this._results.binaryBody = this._consumeTokenAsRaw();
                    this.onFrame(this._results);
                    this._initState();
                  };
                  Parser2.prototype._consumeByte = function(byte) {
                    this._token.push(byte);
                  };
                  Parser2.prototype._consumeTokenAsUTF8 = function() {
                    return this._decoder.decode(this._consumeTokenAsRaw());
                  };
                  Parser2.prototype._consumeTokenAsRaw = function() {
                    var rawResult = new Uint8Array(this._token);
                    this._token = [];
                    return rawResult;
                  };
                  Parser2.prototype._initState = function() {
                    this._results = {
                      command: void 0,
                      headers: [],
                      binaryBody: void 0
                    };
                    this._token = [];
                    this._headerKey = void 0;
                    this._onByte = this._collectFrame;
                  };
                  return Parser2;
                }()
              );
              exports2.Parser = Parser;
            }
          ),
          /***/
          "./src/stomp-config.ts": (
            /*!*****************************!*\
              !*** ./src/stomp-config.ts ***!
              \*****************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var StompConfig = (
                /** @class */
                /* @__PURE__ */ function() {
                  function StompConfig2() {
                  }
                  return StompConfig2;
                }()
              );
              exports2.StompConfig = StompConfig;
            }
          ),
          /***/
          "./src/stomp-handler.ts": (
            /*!******************************!*\
              !*** ./src/stomp-handler.ts ***!
              \******************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var byte_1 = __webpack_require__(
                /*! ./byte */
                "./src/byte.ts"
              );
              var frame_impl_1 = __webpack_require__(
                /*! ./frame-impl */
                "./src/frame-impl.ts"
              );
              var parser_1 = __webpack_require__(
                /*! ./parser */
                "./src/parser.ts"
              );
              var versions_1 = __webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              );
              var web_socket_state_1 = __webpack_require__(
                /*! ./web-socket-state */
                "./src/web-socket-state.ts"
              );
              var StompHandler = (
                /** @class */
                function() {
                  function StompHandler2(_client, _webSocket, config) {
                    var _this = this;
                    if (config === void 0) {
                      config = {};
                    }
                    this._client = _client;
                    this._webSocket = _webSocket;
                    this._serverFrameHandlers = {
                      // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.2.html#CONNECTED_Frame)
                      CONNECTED: function(frame) {
                        _this.debug("connected to server " + frame.headers.server);
                        _this._connected = true;
                        _this._connectedVersion = frame.headers.version;
                        if (_this._connectedVersion === versions_1.Versions.V1_2) {
                          _this._escapeHeaderValues = true;
                        }
                        _this._setupHeartbeat(frame.headers);
                        _this.onConnect(frame);
                      },
                      // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.2.html#MESSAGE)
                      MESSAGE: function(frame) {
                        var subscription = frame.headers.subscription;
                        var onReceive = _this._subscriptions[subscription] || _this.onUnhandledMessage;
                        var message = frame;
                        var client = _this;
                        var messageId = _this._connectedVersion === versions_1.Versions.V1_2 ? message.headers.ack : message.headers["message-id"];
                        message.ack = function(headers) {
                          if (headers === void 0) {
                            headers = {};
                          }
                          return client.ack(messageId, subscription, headers);
                        };
                        message.nack = function(headers) {
                          if (headers === void 0) {
                            headers = {};
                          }
                          return client.nack(messageId, subscription, headers);
                        };
                        onReceive(message);
                      },
                      // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.2.html#RECEIPT)
                      RECEIPT: function(frame) {
                        var callback = _this._receiptWatchers[frame.headers["receipt-id"]];
                        if (callback) {
                          callback(frame);
                          delete _this._receiptWatchers[frame.headers["receipt-id"]];
                        } else {
                          _this.onUnhandledReceipt(frame);
                        }
                      },
                      // [ERROR Frame](http://stomp.github.com/stomp-specification-1.2.html#ERROR)
                      ERROR: function(frame) {
                        _this.onStompError(frame);
                      }
                    };
                    this._counter = 0;
                    this._subscriptions = {};
                    this._receiptWatchers = {};
                    this._partialData = "";
                    this._escapeHeaderValues = false;
                    this._lastServerActivityTS = Date.now();
                    this.configure(config);
                  }
                  Object.defineProperty(StompHandler2.prototype, "connectedVersion", {
                    get: function() {
                      return this._connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(StompHandler2.prototype, "connected", {
                    get: function() {
                      return this._connected;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  StompHandler2.prototype.configure = function(conf) {
                    Object.assign(this, conf);
                  };
                  StompHandler2.prototype.start = function() {
                    var _this = this;
                    var parser = new parser_1.Parser(
                      // On Frame
                      function(rawFrame) {
                        var frame = frame_impl_1.FrameImpl.fromRawFrame(rawFrame, _this._escapeHeaderValues);
                        if (!_this.logRawCommunication) {
                          _this.debug("<<< " + frame);
                        }
                        var serverFrameHandler = _this._serverFrameHandlers[frame.command] || _this.onUnhandledFrame;
                        serverFrameHandler(frame);
                      },
                      // On Incoming Ping
                      function() {
                        _this.debug("<<< PONG");
                      }
                    );
                    this._webSocket.onmessage = function(evt) {
                      _this.debug("Received data");
                      _this._lastServerActivityTS = Date.now();
                      if (_this.logRawCommunication) {
                        var rawChunkAsString = evt.data instanceof ArrayBuffer ? new TextDecoder().decode(evt.data) : evt.data;
                        _this.debug("<<< " + rawChunkAsString);
                      }
                      parser.parseChunk(evt.data, _this.appendMissingNULLonIncoming);
                    };
                    this._webSocket.onclose = function(closeEvent) {
                      _this.debug("Connection closed to " + _this._webSocket.url);
                      _this.onWebSocketClose(closeEvent);
                      _this._cleanUp();
                    };
                    this._webSocket.onerror = function(errorEvent) {
                      _this.onWebSocketError(errorEvent);
                    };
                    this._webSocket.onopen = function() {
                      var connectHeaders = Object.assign({}, _this.connectHeaders);
                      _this.debug("Web Socket Opened...");
                      connectHeaders["accept-version"] = _this.stompVersions.supportedVersions();
                      connectHeaders["heart-beat"] = [_this.heartbeatOutgoing, _this.heartbeatIncoming].join(",");
                      _this._transmit({ command: "CONNECT", headers: connectHeaders });
                    };
                  };
                  StompHandler2.prototype._setupHeartbeat = function(headers) {
                    var _this = this;
                    if (headers.version !== versions_1.Versions.V1_1 && headers.version !== versions_1.Versions.V1_2) {
                      return;
                    }
                    if (!headers["heart-beat"]) {
                      return;
                    }
                    var _a = headers["heart-beat"].split(",").map(function(v) {
                      return parseInt(v, 10);
                    }), serverOutgoing = _a[0], serverIncoming = _a[1];
                    if (this.heartbeatOutgoing !== 0 && serverIncoming !== 0) {
                      var ttl = Math.max(this.heartbeatOutgoing, serverIncoming);
                      this.debug("send PING every " + ttl + "ms");
                      this._pinger = setInterval(function() {
                        if (_this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                          _this._webSocket.send(byte_1.BYTE.LF);
                          _this.debug(">>> PING");
                        }
                      }, ttl);
                    }
                    if (this.heartbeatIncoming !== 0 && serverOutgoing !== 0) {
                      var ttl_1 = Math.max(this.heartbeatIncoming, serverOutgoing);
                      this.debug("check PONG every " + ttl_1 + "ms");
                      this._ponger = setInterval(function() {
                        var delta = Date.now() - _this._lastServerActivityTS;
                        if (delta > ttl_1 * 2) {
                          _this.debug("did not receive server activity for the last " + delta + "ms");
                          _this._closeWebsocket();
                        }
                      }, ttl_1);
                    }
                  };
                  StompHandler2.prototype._closeWebsocket = function() {
                    this._webSocket.onmessage = function() {
                    };
                    this._webSocket.close();
                  };
                  StompHandler2.prototype._transmit = function(params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    var frame = new frame_impl_1.FrameImpl({
                      command,
                      headers,
                      body,
                      binaryBody,
                      escapeHeaderValues: this._escapeHeaderValues,
                      skipContentLengthHeader
                    });
                    var rawChunk = frame.serialize();
                    if (this.logRawCommunication) {
                      this.debug(">>> " + rawChunk);
                    } else {
                      this.debug(">>> " + frame);
                    }
                    if (this.forceBinaryWSFrames && typeof rawChunk === "string") {
                      rawChunk = new TextEncoder().encode(rawChunk);
                    }
                    if (typeof rawChunk !== "string" || !this.splitLargeFrames) {
                      this._webSocket.send(rawChunk);
                    } else {
                      var out = rawChunk;
                      while (out.length > 0) {
                        var chunk = out.substring(0, this.maxWebSocketChunkSize);
                        out = out.substring(this.maxWebSocketChunkSize);
                        this._webSocket.send(chunk);
                        this.debug("chunk sent = " + chunk.length + ", remaining = " + out.length);
                      }
                    }
                  };
                  StompHandler2.prototype.dispose = function() {
                    var _this = this;
                    if (this.connected) {
                      try {
                        var disconnectHeaders = Object.assign({}, this.disconnectHeaders);
                        if (!disconnectHeaders.receipt) {
                          disconnectHeaders.receipt = "close-" + this._counter++;
                        }
                        this.watchForReceipt(disconnectHeaders.receipt, function(frame) {
                          _this._closeWebsocket();
                          _this._cleanUp();
                          _this.onDisconnect(frame);
                        });
                        this._transmit({ command: "DISCONNECT", headers: disconnectHeaders });
                      } catch (error) {
                        this.debug("Ignoring error during disconnect " + error);
                      }
                    } else {
                      if (this._webSocket.readyState === web_socket_state_1.WebSocketState.CONNECTING || this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                        this._closeWebsocket();
                      }
                    }
                  };
                  StompHandler2.prototype._cleanUp = function() {
                    this._connected = false;
                    if (this._pinger) {
                      clearInterval(this._pinger);
                    }
                    if (this._ponger) {
                      clearInterval(this._ponger);
                    }
                  };
                  StompHandler2.prototype.publish = function(params) {
                    var destination = params.destination, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    var hdrs = Object.assign({ destination }, headers);
                    this._transmit({
                      command: "SEND",
                      headers: hdrs,
                      body,
                      binaryBody,
                      skipContentLengthHeader
                    });
                  };
                  StompHandler2.prototype.watchForReceipt = function(receiptId, callback) {
                    this._receiptWatchers[receiptId] = callback;
                  };
                  StompHandler2.prototype.subscribe = function(destination, callback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (!headers.id) {
                      headers.id = "sub-" + this._counter++;
                    }
                    headers.destination = destination;
                    this._subscriptions[headers.id] = callback;
                    this._transmit({ command: "SUBSCRIBE", headers });
                    var client = this;
                    return {
                      id: headers.id,
                      unsubscribe: function(hdrs) {
                        return client.unsubscribe(headers.id, hdrs);
                      }
                    };
                  };
                  StompHandler2.prototype.unsubscribe = function(id, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    delete this._subscriptions[id];
                    headers.id = id;
                    this._transmit({ command: "UNSUBSCRIBE", headers });
                  };
                  StompHandler2.prototype.begin = function(transactionId) {
                    var txId = transactionId || "tx-" + this._counter++;
                    this._transmit({
                      command: "BEGIN",
                      headers: {
                        transaction: txId
                      }
                    });
                    var client = this;
                    return {
                      id: txId,
                      commit: function() {
                        client.commit(txId);
                      },
                      abort: function() {
                        client.abort(txId);
                      }
                    };
                  };
                  StompHandler2.prototype.commit = function(transactionId) {
                    this._transmit({
                      command: "COMMIT",
                      headers: {
                        transaction: transactionId
                      }
                    });
                  };
                  StompHandler2.prototype.abort = function(transactionId) {
                    this._transmit({
                      command: "ABORT",
                      headers: {
                        transaction: transactionId
                      }
                    });
                  };
                  StompHandler2.prototype.ack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                      headers.id = messageId;
                    } else {
                      headers["message-id"] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    this._transmit({ command: "ACK", headers });
                  };
                  StompHandler2.prototype.nack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                      headers.id = messageId;
                    } else {
                      headers["message-id"] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    return this._transmit({ command: "NACK", headers });
                  };
                  return StompHandler2;
                }()
              );
              exports2.StompHandler = StompHandler;
            }
          ),
          /***/
          "./src/stomp-headers.ts": (
            /*!******************************!*\
              !*** ./src/stomp-headers.ts ***!
              \******************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var StompHeaders = (
                /** @class */
                /* @__PURE__ */ function() {
                  function StompHeaders2() {
                  }
                  return StompHeaders2;
                }()
              );
              exports2.StompHeaders = StompHeaders;
            }
          ),
          /***/
          "./src/stomp-subscription.ts": (
            /*!***********************************!*\
              !*** ./src/stomp-subscription.ts ***!
              \***********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var StompSubscription = (
                /** @class */
                /* @__PURE__ */ function() {
                  function StompSubscription2() {
                  }
                  return StompSubscription2;
                }()
              );
              exports2.StompSubscription = StompSubscription;
            }
          ),
          /***/
          "./src/versions.ts": (
            /*!*************************!*\
              !*** ./src/versions.ts ***!
              \*************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var Versions = (
                /** @class */
                function() {
                  function Versions2(versions) {
                    this.versions = versions;
                  }
                  Versions2.prototype.supportedVersions = function() {
                    return this.versions.join(",");
                  };
                  Versions2.prototype.protocolVersions = function() {
                    return this.versions.map(function(x) {
                      return "v" + x.replace(".", "") + ".stomp";
                    });
                  };
                  Versions2.V1_0 = "1.0";
                  Versions2.V1_1 = "1.1";
                  Versions2.V1_2 = "1.2";
                  Versions2.default = new Versions2([Versions2.V1_0, Versions2.V1_1, Versions2.V1_2]);
                  return Versions2;
                }()
              );
              exports2.Versions = Versions;
            }
          ),
          /***/
          "./src/web-socket-state.ts": (
            /*!*********************************!*\
              !*** ./src/web-socket-state.ts ***!
              \*********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var WebSocketState;
              (function(WebSocketState2) {
                WebSocketState2[WebSocketState2["CONNECTING"] = 0] = "CONNECTING";
                WebSocketState2[WebSocketState2["OPEN"] = 1] = "OPEN";
                WebSocketState2[WebSocketState2["CLOSING"] = 2] = "CLOSING";
                WebSocketState2[WebSocketState2["CLOSED"] = 3] = "CLOSED";
              })(WebSocketState = exports2.WebSocketState || (exports2.WebSocketState = {}));
            }
          ),
          /***/
          0: (
            /*!****************************!*\
              !*** multi ./src/index.ts ***!
              \****************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              module2.exports = __webpack_require__(
                /*! /home/kdeepak/MyWork/Tech/stomp/stompjs/src/index.ts */
                "./src/index.ts"
              );
            }
          )
          /******/
        })
      );
    });
  }
});
export default require_stomp_umd();
//# sourceMappingURL=@stomp_stompjs.js.map
