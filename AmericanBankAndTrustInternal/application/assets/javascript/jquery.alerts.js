// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//

var $j = jQuery.noConflict();

(function ($j) {

    $j.alerts = {

        // These properties can be read/written by accessing $j.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .50,                // transparency level of overlay
        overlayColor: '#000',               // base color of overlay
        draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;OK&nbsp;',         // text for the OK button
        cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        alert: function (message, title, callback) {
            if (title == null) title = 'Alert';
            $j.alerts._show(title, message, null, 'alert', function (result) {
                if (callback) callback(result);
            });
        },

        confirm: function (message, title, callback) {
            if (title == null) title = 'Confirm';
            $j.alerts._show(title, message, null, 'confirm', function (result) {
                if (callback) callback(result);
            });
        },

        prompt: function (message, value, title, callback) {
            if (title == null) title = 'Prompt';
            $j.alerts._show(title, message, value, 'prompt', function (result) {
                if (callback) callback(result);
            });
        },

        // Private methods

        _show: function (title, msg, value, type, callback) {

            $j.alerts._hide();
            $j.alerts._overlay('show');

            $j("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');

            if ($j.alerts.dialogClass) $j("#popup_container").addClass($j.alerts.dialogClass);

            // IE6 Fix
            var pos = ($j.browser.msie && parseInt($j.browser.version) <= 6) ? 'absolute' : 'fixed';

            $j("#popup_container").css({
                position: pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });

            $j("#popup_title").text(title);
            $j("#popup_content").addClass(type);
            $j("#popup_message").text(msg);
            $j("#popup_message").html($j("#popup_message").text().replace(/\n/g, '<br />'));

            $j("#popup_container").css({
                minWidth: $j("#popup_container").outerWidth(),
                maxWidth: $j("#popup_container").outerWidth()
            });

            $j.alerts._reposition();
            $j.alerts._maintainPosition(true);

            switch (type) {
                case 'alert':
                    $j("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $j.alerts.okButton + '" id="popup_ok" /></div>');
                    $j("#popup_ok").click(function () {
                        $j.alerts._hide();
                        callback(true);
                    });
                    $j("#popup_ok").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $j("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $j("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $j.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $j.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $j("#popup_ok").click(function () {
                        $j.alerts._hide();
                        if (callback) callback(true);
                    });
                    $j("#popup_cancel").click(function () {
                        $j.alerts._hide();
                        if (callback) callback(false);
                    });
                    $j("#popup_ok").focus();
                    $j("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $j("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $j("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $j("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $j.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $j.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $j("#popup_prompt").width($j("#popup_message").width());
                    $j("#popup_ok").click(function () {
                        var val = $j("#popup_prompt").val();
                        $j.alerts._hide();
                        if (callback) callback(val);
                    });
                    $j("#popup_cancel").click(function () {
                        $j.alerts._hide();
                        if (callback) callback(null);
                    });
                    $j("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $j("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $j("#popup_cancel").trigger('click');
                    });
                    if (value) $j("#popup_prompt").val(value);
                    $j("#popup_prompt").focus().select();
                    break;
            }

            // Make draggable
            if ($j.alerts.draggable) {
                try {
                    $j("#popup_container").draggable({ handle: $j("#popup_title") });
                    $j("#popup_title").css({ cursor: 'move' });
                } catch (e) { /* requires jQuery UI draggables */ }
            }
        },

        _hide: function () {
            $j("#popup_container").remove();
            $j.alerts._overlay('hide');
            $j.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $j.alerts._overlay('hide');
                    $j("BODY").append('<div id="popup_overlay"></div>');
                    $j("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $j(document).height(),
                        background: $j.alerts.overlayColor,
                        opacity: $j.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $j("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            var top = (($j(window).height() / 2) - ($j("#popup_container").outerHeight() / 2)) + $j.alerts.verticalOffset;
            var left = (($j(window).width() / 2) - ($j("#popup_container").outerWidth() / 2)) + $j.alerts.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ($j.browser.msie && parseInt($j.browser.version) <= 6) top = top + $j(window).scrollTop();

            $j("#popup_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $j("#popup_overlay").height($j(document).height());
        },

        _maintainPosition: function (status) {
            if ($j.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $j(window).bind('resize', $j.alerts._reposition);
                        break;
                    case false:
                        $j(window).unbind('resize', $j.alerts._reposition);
                        break;
                }
            }
        }

    }

    // Shortuct functions
    jAlert = function (message, title, callback) {
        $j.alerts.alert(message, title, callback);
    }

    jConfirm = function (message, title, callback) {
        $j.alerts.confirm(message, title, callback);
    };

    jPrompt = function (message, value, title, callback) {
        $j.alerts.prompt(message, value, title, callback);
    };

})(jQuery);