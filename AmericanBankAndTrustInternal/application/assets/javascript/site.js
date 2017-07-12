var FEDApp = FEDApp || {};
$f = $j = FEDApp.$ = FEDApp.jQuery = jQuery;

fiName = siteSettings.name;

// variables to use with Modernizr
var mq_smallWindow = 'only all and (max-width: 767px)';
var mq_largeWindow = 'only all and (min-width: 768px)';

$f(document).ready(function () {

    firstBranchLogo.setupFBLogo();

    setupMenu();
    setupMobileMenu();

    popupify();

    findOptionalFields();

    addConfirmMenuLink("clarkeamerican.com", "confirm");
    addConfirmMenuLink("orderpoint.deluxe.com", "confirm");

    if (typeof fiName !== 'undefined') {
        setSpeedBumps();
    }


    if ($f('.add-accordion').length) {
        setupAddAccordion();
    }

    if ($f('.staff-page, .meet-our-team').length) {
        setupStaffPage();
    }


    setupOnlineBanking();

    setupAccordions();
    setupTables();

    $f('.other-links:empty').hide();

    $f('.detail-crumb .crumb a:contains("News & Events")').parent().replaceWith('<div class="crumb"><a href="/about-us">About Us</a> <i class="fa fa-angle-right"></i> <a href="/about-us/news-events.html">News &amp; Events</a></div>');


    $f('.statement-of-condition table.split tr td:empty').parent().hide();

    // $f('.mobile-banking').wrap($f('<a>', {
    //     href: 'https://www.abt.bank/services-tools/account-services/mobile-banking-with-mobile-deposit.html'
    // }));





    if (!$f('.dotContainer').length) {
        setClickableContainers();
        $f('.column-promo').wrapAll('<div class="promo-wrapper"></div>');
    }

    if ($f('.comparison-chart').length) {
        setupComparisonChart();
        if (Modernizr.mq(mq_largeWindow) || FEDApp.previewMode) {
            setupComparisonChartHeights($f('.account .account-name'));
            var sections = $f('.account:first-of-type .section').length + 1;
            for (var i = 1; i < sections; i++) {
                setupComparisonChartHeights($f('.account .section:nth-child(' + i + ')'));
            }
        }
    }

    $f('.togglesNext').click(function () {
        $f(this).toggleClass('active').next().slideToggle();
    });

    $f('.togglesNextMobile').click(function () {
        if (Modernizr.mq(mq_smallWindow)) {
            $f(this).toggleClass('active').next().slideToggle();
            $f(this).parent().toggleClass('active');
        }
    });

    if (typeof setupSharePopup !== 'undefined') {
        setupSharePopup({
            'rounded': true, // true or false
            'trigger': $f(".share"),
            'appended': $f(".share")
        });
    }

    if ($f('#banner').length) {
        setupBanner();
    }


    if ($f('.careers').length) {
        /*$f('body.careers .page-content h3').each(function(){
			$f(this).nextUntil('h3, h2').andSelf().wrapAll('<div class="openPosition"></div>');
		});*/
    }

    if ($f('#searchResults').length) {
        setupSearchPage();
    }

    $f('.oblToggler').toggles($f('.oblToggled'));

    // popups

    $f('.currentCustomerPopup').magnificPopup({ type: 'inline', mainClass: 'mfp-zoom-out', midClick: true, removalDelay: 300 });

    if (Modernizr.mq(mq_largeWindow)) {
        $f('.tellmemore, a.requestInfo, a.questions, a.careerApplication, a.spiritCardFunds').magnificPopup({
            type: 'iframe',
            mainClass: 'questionsPopup mfp-zoom-out',
            removalDelay: 300
        });

        $f('.calcPopup').magnificPopup({
            type: 'iframe',
            mainClass: 'calculatorPopup mfp-zoom-out',
            removalDelay: 300
        });
    }


    $f('.primaryNavLink').click(function (event) {
        event.preventDefault();
        $f('#mobileMenu').toggleClass('show-menu');
    });

});

$f(window).load(function () {
    setPrintLinks($f('.print'));
    if ($f('#map').length) {
        fedMaps.setupLocationsPage();
        $f('.branchName .seeMap').click(function (e) { e.stopPropagation(); });
    }

})

function setupMenu() {
    // add var or condition for hover vs. click

    var navholder = $f('#header .primaryNav > li');
    var navlink = $f('#header .primaryNav > li > a');
    var closetext = "<span class='close'><i class='fa fa-times'></i> Close</span>";

    navlink.click(function (event) {
        event.preventDefault();
        $f('.close').detach();

        navlink.not($f(this)).removeClass('active').addClass('inactive').next('ul').fadeOut();
        $f(this).toggleClass('active inactive').next('ul').append(closetext).fadeToggle();

        // if no children are active
        if ($f('#header .primaryNav > li > a.active').length == 0) {
            $f('#header .primaryNav > li.inPath').find('a').addClass('landed');
        } else {
            $f('#header .primaryNav > li.inPath').find('a').removeClass('landed');
        }
    });

    $f('.primaryNav').delegate(".close", "click", function () {
        $f(this).detach();
        navlink.removeClass('active').next('ul').fadeOut();
    });
}

function setupMobileMenu() {
    var primaryNav = $f('.primaryNav').clone().filter(":last").detach();
    var searchbox = $f('.site-search').clone().filter(":last").detach();

    $f("#mobileMenu").append(searchbox, primaryNav);

    $f('#mobileMenu').delegate(".close", "click", function () {
        $f('#mobileMenu').removeClass('show-menu');
    });

    $f('#mobileMenu .primaryNav > li').addClass('inactive').filter('.inPath').toggleClass('active inactive');
    var toggleableLinks = $f('#mobileMenu .primaryNav > li > a');
    toggleableLinks.click(function (e) {
        e.preventDefault();
        $f(this).parent().siblings().not($f(this).parent()).removeClass('active').addClass('inactive');
        $f(this).parent().toggleClass('active inactive');
    });
}

function setupComparisonChart() {

    var labels = [];

    // wrap each detail section
    $f('.account-details h4').each(function () {
        $f(this).nextUntil('h4').andSelf().wrapAll('<div class="section"></div>');
        if (labels.indexOf($f(this).text()) == -1) {
            labels.push($f(this).text());
        }
    });

    // make the column for labels
    $f('.comparison-chart').prepend('<div class="account for-labels noMobile"><div class="account-name"><h5>Account</h5></div><div class="account-details"></div></div>');

    // get the labels to make the label column from 1st account
    for (var i = 0; i < labels.length; i++) {
        $f('.comparison-chart .for-labels .account-details').append("<div class='section'><h5>" + labels[i] + "</h5></div>");
    }

}

function setupComparisonChartHeights(target) {

    var elementHeights = $f(target).map(function () {
        return $f(this).outerHeight();
    }).get();
    var maxHeight = Math.max.apply(null, elementHeights);
    $f(target).height(maxHeight);

}

// we could probably blackbox all of this stuff

function addConfirmMenuLink(match, classname) {
    var matchthis = match;
    // only iterate thru named navigations
    $f('.primaryNav a, .calcList a, .content-list .content-item a, .secondaryNav a').each(function () {
        var href = $f(this).attr('href');

        if ((href) && (href.indexOf(matchthis) >= 0)) {
            $f(this).addClass(classname);
        }

    });
}

function setupAccordions() {
    var accordion = $f('.accordion');
    var accordionTop = accordion.find('> .accordion-title');
    var accordionBottom = accordion.find('> .accordion-content');

    accordionBottom.hide();

    accordionTop.click(function () {
        $f(this).toggleClass('active').next().slideToggle();
    });

    if (accordionTop.length == 1) {
        accordionTop.eq(0).click();
    }
}

function popupify() {
    // Set no background links
    $f('a.noBG').each(function () {
        href = $f(this).attr('href');
        href += href.indexOf('?') != -1 ? '&' : '?';
        href += 'noBG=true';
        $f(this).attr('href', href);
    });

    // If iframe not inside edit/preview
    FEDApp.previewModeTest = (typeof FEDApp.previewModeTest !== 'undefined') ? FEDApp.previewModeTest : false;
    if (self !== top && (!FEDApp.previewMode || FEDApp.previewModeTest)) {

        // is this safer than finding .main?
        $f('body').addClass('popup').find('#header, #footer, .prefooter').detach();

        // Add targets to links
        $f('a.targetBlank').attr('target', '_blank');
        $f('a').not('[target]').attr('target', '_top');
    }
}

function findOptionalFields() {
    var defaultmsg = $f('form .help');
    defaultmsg.each(function () {
        var self = $f(this);
        if (self.find('.default').text() == "Optional") {
            self.prevAll().addClass('optional');
        }
    });
}

function setClickableContainers() {
    clickableContainer($f('.content-list .content-item, .featured-content'));
    clickableContainer($f('.column-promo'));
    clickableContainer($f('.home-column-promo'));
    clickableContainer($f('.featured-content-wrapper.grid-2 > div'));
    clickableContainer($f('#banner .slide'));
}

function clickableContainer(target) {
    target.on('click', function (e) {
        var self = $f(this);
        var a = self.find('a');
        var href = a.attr('href');

        if (a && a.hasClass("confirm")) {
            jConfirm(alertText, "Confirm", function (r) {
                if (r) {
                    window.open(href);
                } else {
                    return false;
                }
            });
        } else if (a && a.hasClass("warn")) {
            jConfirm(warnText, "Confirm", function (r) {
                if (r) {
                    window.open(href);
                } else {
                    return false;
                }
            });
        } else if (href.indexOf('.pdf') >= 0 || a.attr('target') == '_blank') {
            window.open(href);
        } else if (a) {
            window.location = href;
        }

    }).addClass('clickable');

    target.find('a').on('click', function (e) {
        e.stopPropagation();
    });
}

(function ($) {
    $.fn.toggles = function (elem) {

        var obj = typeof elem === "string" ? $(elem) : elem;

        $(this).click(function () {
            $(this).toggleClass('active');
            $(obj).toggleClass('active');
        });
        return this;
    };


}(FEDApp.jQuery));

var ResizeMgr = {
    onStarts: new Array(), // array of functions to call when user starts to resize the window.
    onCompletes: new Array(), // array of functions to call when user has finished resizing the window.
    interval: null,

    init: function (interval) {

        ResizeMgr.interval = interval;
        if (typeof (interval) === 'undefined') {
            ResizeMgr.interval = 250;
        }
    },
    add: function (onStart, onComplete) {
        ResizeMgr.onStarts.push(onStart);

        ResizeMgr.onCompletes.push(onComplete);
    },
    start: function () {

        // Need to track when we call the onStarts and onCompletes.
        var calledOnStarts = false;
        var calledOnCompletes = false;

        // Get the width of the window.
        var winWidth = window.outerWidth;

        // Set up the function that gets called every interval period.
        setInterval(function () {

            //  check if the window width has changed.
            if (winWidth != window.outerWidth) {
                // Reset the called on completes.
                calledOnCompletes = false;

                // if not notifi
                if (calledOnStarts === false) {
                    // call onStarts
                    for (var i = 0; i < ResizeMgr.onStarts.length; i++) {
                        ResizeMgr.onStarts[i]();
                    }

                    calledOnStarts = true;
                }

                // set the new width
                winWidth = window.outerWidth;

            } else { // else width is same not resizing or resizing complete
                // Reset the called on starts.
                calledOnStarts = false;

                // if not notified 
                if (calledOnCompletes === false) {
                    // notify
                    for (var i = 0; i < ResizeMgr.onCompletes.length; i++) {
                        ResizeMgr.onCompletes[i](winWidth);
                    }

                    calledOnCompletes = true;
                }

            }

        }, ResizeMgr.interval);
    },

    isWindowSmall: function () { return window.outerWidth <= 767; },
    isWindowLarge: function () { return window.outerWidth > 767; }
};

ResizeMgr.init();
ResizeMgr.start();

function setupTables() {
    var tables = $f('.table.split');

    tables.each(function () {

        var newLayout = $f('<table class="split"/>');

        // Split the rows up into the header row (<th/>) and data rows (<td/>).
        var table = $f(this);
        var rows = table.find('tr');
        var headings = rows.eq(0).children();
        var dataRows = rows.slice(1);


        dataRows.each(function () {
            var row = $f(this);
            var columns = row.children();

            columns.each(function (index) {
                var heading = headings.eq(index).html();
                var data = $f(this).html();
                if (index % headings.length === 0) {
                    // new "column"
                    newLayout.append('<tr><th colspan="2">' + data + '</th></tr>');
                }
                else {
                    newLayout.append('<tr><td>' + heading + '</td><td>' + data + '</td></tr>');
                }
            });
        });

        // Display new headings and data
        table.append(newLayout);
    });
}

function setPrintLinks(target) {
    target.click(function () {

        window.print();

    });
}

function setupSearchPage() {
    // get rid of SEO'd titles from search page
    var results = $f('#searchResultsWrapper .content-item');

    var totalresults = results.length;
    $f('.result-total').text(totalresults);

    results.each(function () {
        var text = $f(this).find('h3').text().split("|");
        $f(this).find('h3').text(text[0]);
    });
}


function setupOnlineBanking() {
    (function (d) {
        'use strict';
        var form = d.forms.remote,
			url = {
			    protocol: 'https://',
			    roDomain: 'web10.secureinternetbank.com',
			    ro: '/pbi_pbi1961/pbi1961.ashx?wci=RemoteLogin&logonby=connect3&prmaccess=Account&rt=',
			    boDomain: 'web10.secureinternetbank.com',
			    bo: '/ebc_ebc1961/ebc1961.ashx?wci=Process&wce=RemoteLogon&irl=T&mfa=2&rt=',
			    rt: '091407175'
			},
			submit = function () {
			    if (!form.AccessID.value) { alert('Please enter a valid Access ID. Thank you!'); return !1; }
			    form.nmUID.value = form.AccessID.value; form.nmRTN.value = url.rt;
			    form.action = url.protocol + (form.app[0].checked ? url.roDomain + url.ro : url.boDomain + url.bo) + url.rt;
			    return true;
			};
        form.addEventListener ?
			form.addEventListener('submit', submit) :
		form.attachEvent('onsubmit', submit);
    })(document);


    $f('.obLogin > h2').click(function () {
        if (!Modernizr.mq(mq_smallWindow)) {
            $f(this).toggleClass('open');
            $f('.loginForm').slideToggle();
        }
    });

    if (Modernizr.mq(mq_largeWindow)) {
        $f('.close').click(function () {
            $f('.obLogin > h2').toggleClass('open');
            $f('.loginForm').slideToggle();
        });
    }

    if (Modernizr.mq(mq_smallWindow)) {
        $f('.close').click(function (e) {
            e.preventDefault();
            $f('.oblToggler').click();
        });
    }


    var onlineBankingSelector = $f('#dropDown .onlineBanking');
    var onlinePlusSelector = $f('#dropDown .onlinePlus');
    var businessOnlineSelector = $f('#dropDown .businessOnline');
    var businessOnlinePlusSelector = $f('#dropDown .businessOnlinePlus');

    var spanText = $f('.dropDownSelector span');

    //drop down banking menu
    $f('.dropDownSelector').click(function () {
        $f('.dropDownSelector, .dropDownSelector ul#dropDown').toggleClass('open');
        $f('.dropDownSelector ul#dropDown').slideToggle();
        $f('#selectionDropDown, #selectionDropDown ul#dropDown').removeClass('open');
    });

    // changing things around when certain item is clicked
    onlineBankingSelector.click(function () {
        $f('.retailOnline').attr('checked', true);
        spanText.contents().replaceWith('Online Banking');
    });
    onlinePlusSelector.click(function () {
        $f('.bizOnline').attr('checked', true);
        spanText.contents().replaceWith('Online Plus');
    });
    businessOnlineSelector.click(function () {
        $f('.retailOnline').attr('checked', true);
        spanText.contents().replaceWith('Business Online');
    });
    businessOnlinePlusSelector.click(function () {
        $f('.bizOnline').attr('checked', true);
        spanText.contents().replaceWith('Business Online Plus');
    });
}


function setupAddAccordion() {
    $f('.add-accordion .page-content .page-summary').addClass('accordion');
    $f('.add-accordion .page-content .page-summary > h3').each(function () {
        $f(this).nextUntil('h2,h3').wrapAll('<div class="accordion-content"></div>');
        $f(this).wrap('<div class="accordion-title"><div class="text"></div></div>');
        $f('.accordion-title .text > h3').contents().unwrap();
    });

    /*$f('.accordion-title').each(function(){
		var accorionID = $f(this).text().replace(/\s+/g, '-').toLowerCase();
		$f(this).attr('id', accorionID);
	});*/
}


function setupStaffPage() {
    if ($f('.staff-page').hasClass('add-accordion')) {
        $f('.staff-page .page-summary .accordion-content div:has("img")').each(function () {
            $f(this).nextUntil('div').andSelf().wrapAll('<div class="staff-member"></div>');
        });
    } else {
        $f('.staff-page .page-summary div:has("img")').each(function () {
            $f(this).nextUntil('div').andSelf().wrapAll('<div class="staff-member"></div>');
        });
    }

    $f('.meet-our-team .page-summary .accordion-content div:has("img")').each(function () {
        $f(this).nextUntil('div').andSelf().wrapAll('<div class="team-member"></div>');
    });
}


