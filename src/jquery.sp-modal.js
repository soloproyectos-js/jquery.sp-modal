/**
 * jQuery.spModal - A Modal Window System.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *      2. jQuery.ui >= 1.11.4
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    var methods = {
        /**
         * Creates a modal window.
         * 
         * A modal window is an iFrame covering all the available window. See the example included in
         * /demos/modal-window for more info.
         * 
         * Example:
         * ```JavaScript
         * var mw = $.spModal('window', 'user-interface.html', {param1: 'one', param2: 'two'});
         * mw.on('event', function () {
         *      // Performs some actions and close the modal window
         *      mw.close();
         * });
         * ```
         * 
         * @param {String} url    URL to the user interface
         * @param {Object} params Parameters (not required)
         * 
         * @return {$.spModalWindow}
         */
        'window': function (url, params) {
            return new $.spModalWindow(url, params);
        },
        
        /**
         * User Interface class.
         * 
         * See the example included in /demos/modal-window for more info.
         * 
         * Example:
         * ```JavaScript
         * var target = $('#my-user-interface');
         * var ui = $.spModal('ui', target);
         * 
         * // populates data
         * $('#title').text(ui.getParam('title'));
         * $('#message').text(ui.getParam('message'));
         * 
         * $('#button1').on('click', function () {
         *      // tells the parent window to perform the action-1
         *      // the event will be captured by the parent window
         *      ui.trigger('action-1');
         * });
         * ```
         * 
         * @param {jQuery.<HTMLElement>} target      User Interface
         * @param {jQuery.<HTMLElement>} modalWindow Modal window container (not required)
         * 
         * @return {$.spModalUi}
         */
        'ui': function (target, modalWindow) {
            return new $.spModalUi(target, modalWindow);
        },
        
        /**
         * Modal message dialog.
         * 
         * See the example included in /demos/modal-message for more info.
         * 
         * Example:
         * ```JavaScript
         * var msg = $.spModal('message', 'My Title', 'This is a message...');
         * msg.setX(100);
         * msg.setY(50);
         * ```
         * 
         * @param {String} title   Title
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalMessage}
         */
        'message': function (title, message) {
            return new $.spModalMessage(title, message);
        },
        
        /**
         * Shows a modal alert dialog.
         * 
         * An alert dialog is a modal message dialog with a button. If the 'message' parameter
         * is missing, the 'title' is taken as message and a default title is used.
         * 
         * Examples:
         * ```JavaScript:
         * // shows an alert dialog with a title and a message
         * $.spModal('alert', 'Alert', 'Hi there!');
         * 
         * // shows an alert dialog witha a default title and a message
         * $.spModal('alert', 'Hi there!');
         * ```
         * 
         * @param {String} title   Title or message
         * @param {Strimg} message Message
         * 
         * @return {$.spModalMessage}
         */
        'alert': function (title, message) {
            // title is missing
            if (arguments.length < 2) {
                message = title;
                title = 'Alert';
            }
            
            var msg = new $.spModalMessage(title, message);
            msg.addButton('Ok', function () {
                msg.close();
            });
            
            return msg;
        },
        
        /**
         * Shows a modal confirm dialog.
         * 
         * A confirm dialog is a modal message dialog with two buttons: 'Ok' and 'Cancel'.
         * This function can take 2 or 3 arguments. When taking 2 arguments, the function assumes that
         * the title is missing and it uses a default title.
         * 
         * Example:
         * ```JavaScript
         * $.spModal('confirm', 'Are you sure?', function () {
         *     console.log('Oh yes!');
         * });
         * ```
         * 
         * @param {String}   title    Title of message
         * @param {String}   message  Message
         * @param {Fucntion} onAccept 'On accept' function
         * 
         * @return {$.spModalMessage}
         */
        'confirm': function (title, message, onAccept) {
            // title is missing
            if (arguments.length < 3) {
                onAccept = message;
                message = title;
                title = 'Confirm';
            }
            
            var msg = new $.spModalMessage(title, message);
            msg.addButton('Ok', function () {
                msg.close();
                $.proxy(onAccept, this)();
            });
            msg.addButton('Cancel', function () {
                msg.close();
            });
            
            return msg;
        },
        
        /**
         * Shows an modal error dialog and throws an error.
         * 
         * An error dialog is a modal message dialog with a button. If the 'message' parameter
         * is missing, the 'title' is taken as message and a default title is used.
         * 
         * Example:
         * ```JavaScript
         * // shows and throws an error with a default title
         * $.spModal('error', 'Oh my God!');
         * 
         * // shows and throws an error with a custom title
         * $.spModal('error', 'Error!', 'Oh my God!');
         * 
         * // initializes the error dialog, shows a message and throws an error
         * $.spModal('error', 'This is an error', function () {
         *     this.setTextAlign('left');
         *     this.setHtml(true);
         * });
         * ```
         * 
         * @param {String}   title   Title of message
         * @param {String}   message Message
         * @param {Function} onReady Called when the message dialog is ready
         * 
         * @return {Void}
         */
        'error': function (title, message, onReady) {
            // title is missing
            if ($.type(title) != 'string' || $.type(message) != 'string') {
                onReady = message;
                message = title;
                title = 'Error';
            }
            
            // makes the modal dialog
            var msg = new $.spModalMessage(title, message);
            msg.addButton('Ok', function () {
                msg.close();
            });
            
            // calls the initialization function
            if (onReady !== undefined) {
                $.proxy(onReady, msg)();
            }
            
            $.error(message);
        },
        
        /**
         * Modal loading dialog.
         * 
         * See the example included in /demos/modal-loading for more info.
         * 
         * Example:
         * ```JavaScript
         * var loading = $.spModal('loading', 'This process may take several minutes...');
         * loading.addButton('Cancel', function () {
         *      // canceling process...
         *      loading.close();
         * });
         * ```
         * 
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalLoading}
         */
        'loading': function (message) {
            return new $.spModalLoading(message);
        },
        
        /**
         * Sends a POST request and uploads files.
         * 
         * Example:
         * ```JavaScript
         * var inputFile = $('#file');
         * inputFile.change(function () {
         *     $.spModal('upload', inputFile, 'test.php', {one: 1, two: 2}).done(function (data) {
         *         console.log(data);
         *     }).fail(function () {
         *         console.log('failed!');
         *     });
         * });
         * ```
         * 
         * @param {jQuery.<HTMLInputElement>|String} input Input file(s)
         * @param {String}                           url   URL
         * @param {Object}                           data  Parameters (not required)
         * 
         * @return {jQuery.Promise}
         */
        'upload': function (input, url, data) {
            var req = new $.spModalRequestUpload(input, url, data);
            return req.send();
        }
    };
    
    /**
     * Registers plugin.
     * 
     * @param {String} methodName Method name
     * @param {Mixed}  args,...   Additional arguments (not required)
     * 
     * @return {Mixed}
     */
    $.spModal = function (methodName, args) {
        var method = methods[methodName];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (method === undefined) {
            $.error('Method not found: ' + methodName);
        }
        
        return method.apply(this, args);
    };
})(jQuery);
