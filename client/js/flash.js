(function(angular) {
  'use strict';

  var bind = function(fn, context) {
    return function() {
      return fn.apply(context, arguments);
    };
  };

  var templateUrl = 'template/flash-messages.html';

  var module = angular.module('ngFlash', ['ng', 'ngSanitize']);

  module.provider('$flash', function() {
    // How long to wait before removing the flash message.
    var defaultDuration = 5000;
    this.setDefaultDuration = function(duration) {
      defaultDuration = duration;
    };

    // The type of message.
    var defaultType = 'alert';
    this.setDefaultType = function(type) {
      defaultType = type;
    };

    // Where the flash messages are stored on the scope.
    var flashScopeKey = '_flash';
    this.setFlashScopeKey = function(newflashScopeKey) {
      flashScopeKey = newflashScopeKey;
    };

    // Flash messages will not persist across route change events unless
    // explicitly specified.
    var routeChangeSuccess = '$routeChangeSuccess';
    this.setRouteChangeSuccess = function(event) {
      routeChangeSuccess = event;
    };

    this.$get = function($rootScope, $timeout) {
      var flash;

      var rootScope = $rootScope;

      /**
       * Flash that represents a flash message.
       */
      function FlashMessage(message, options) {
        options = options || {};

        this.message  = message;
        this.duration = options.duration || defaultDuration;
        this.type     = options.type || defaultType;
        this.persist  = options.persist;
        this.key      = options.key || this.message;
        this.unique   = true;
        this.scope    = options.scope || rootScope;

        if (!this.scope.hasOwnProperty(flashScopeKey)) {
          this.scope[flashScopeKey] = { messages: [] };
        }
      }

      FlashMessage.prototype._messages = function() {
        return this.scope[flashScopeKey].messages;
      };

      FlashMessage.prototype.findExisting = function() {
        var found;
        var _this = this;

        angular.forEach(this._messages(), function(flashMessage) {
          if (flashMessage.key === _this.key) {
            found = flashMessage;
          }
        });

        return found;
      };

      /**
       * Init and add this flash message.
       */
      FlashMessage.prototype.add = function() {
        var existing = this.findExisting();

        if (existing) {
          // If we're replacing a message on the same scope, don't reset. Otherwise,
          // this new message will show up at the higher scope
          var shouldResetScope = existing.scope != this.scope;
          existing._remove(shouldResetScope);
        }

        this._messages().push(this.init());

        return this;
      };

      /**
       * Remove this flash message.
       *
       * @param {Boolean} shouldResetScope - Determines whether we should reset the local scope.
       *
       */
      FlashMessage.prototype._remove = function(shouldResetScope) {
        this.cancelTimeout();
        this._messages().splice(this._messages().indexOf(this), 1);

        // Fall back to the higher scope if required. If we don't do this, the directive will
        // never go back to it default behaviour of displaying rootScope messages
        var noMoreScopedMessages = this.scope != rootScope && this._messages().length == 0;
        if (shouldResetScope && noMoreScopedMessages) {
          delete this.scope._flash;
        }
      };

      /**
       * Remove this flash message.
       */
      FlashMessage.prototype.remove = function() {
        this._remove(true);
      };

      /**
       * Starts the timeout to remove this message. Cancels the existing
       * timeout if it's present.
       */
      FlashMessage.prototype.startTimeout = function() {
        this.cancelTimeout();
        this.timeout = $timeout(bind(this.remove, this), this.duration);
        return this.timeout;
      };

      /**
       * Cancel a previous timeout.
       */
      FlashMessage.prototype.cancelTimeout = function() {
        if (this.timeout) {
          $timeout.cancel(this.timeout);
        }
      };

      /**
       * Initialize timeouts.
       */
      FlashMessage.prototype.init = function() {
        var remove = bind(this.remove, this);

        this.startTimeout();

        // Remove the flash message when the user navigates.
        if (this.persist) {
          var _this = this;

          /**
           * Only runs `func` after the function has been executed `times` times. Each time that `func` is not run,
           * it will restart the timeout to remove this message.
           *
           * See
           * https://github.com/jashkenas/underscore/blob/2c709d72c89a1ae9e06c56fc256c14435bfa7893/underscore.js#L770
           */
          var after = function(times, func) {
            return function() {
              if (--times < 1) {
                return func.apply(this, arguments);
              } else {
                _this.startTimeout();
              }
            };
          };

          $rootScope.$on(routeChangeSuccess, after(this.persist + 1, remove));
        } else {
          $rootScope.$on(routeChangeSuccess, remove);
        }

        return this;
      };

      /**
       * Add a flash message.
       *
       * @param {String} message - The flash message to display.
       *
       * @return {Object} The flash message that was added.
       */
      flash = function(message, options) {
        return new FlashMessage(message, options).add();
      };

      /**
       * Reset the flash messages
       */
      flash.reset = function(scope) {
        scope = scope || rootScope;
        scope[flashScopeKey].messages.length = 0;
      };

      return flash;
    };
  });

  module.directive('flashMessages', function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: templateUrl
    };
  });

  module.run(function($templateCache) {
    if (!$templateCache.get(templateUrl)) {
      $templateCache.put(templateUrl,
        '<div class="flash-messages">' +
          '<div class="flash-message {{message.type}}" ng-repeat="message in _flash.messages">' +
            '<a href="" class="close" ng-click="message.remove()"></a>' +
            '<span class="flash-content" ng-bind-html="message.message"></span>' +
          '</div>' +
        '</div>');
    }
  });

})(angular);