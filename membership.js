window.hlpt = window.hlpt || [];
window.hlpt.mmsheeturl = window.hlpt.mmsheeturl || '';

const hlpt_loadEmbed = (url, cb) => {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            cb(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

const the_ark = function() {
    var ark = '';
    var ark_att = document.getElementById('hlpt-membership-nav');
    if (document.contains(ark_att)) {
        if (ark_att.hasAttribute("data-ark")) {
            ark = ark_att.getAttribute("data-ark");
        }
    }
    return ark;
}

$(document).ready(function() {
    hlpt_loadEmbed("https://auth.locationapi.co/resources1?s=membership_nav&v=" + Date.now(), function(j) {
        let r = JSON.parse(j);
        if (r.e) {
            hlptmm_addnav();
            hlptmm_handle_mutations();
        }
    });
});

function hlptmm_handle_mutations() {
    var observer = new MutationObserver(function(mutations) {
        console.log('Mutation Observed');
        hlptmm_addnav();
    });
    var target = document.querySelectorAll('#app')[1];
    if ($(target).length) {
        observer.observe(target, {
            childList: true,
            attributes: true,
            characterData: true
        });
    }
}

function hlptmm_addnav() {
    var div = $("#hlp-custom-nav-links");
    if (!div.length) {
        console.log('init');
        var nav_items_url = window.hlpt.mmsheeturl;
        if (nav_items_url) {
            var nav_data = $.getJSON(nav_items_url, function() {
                    //
                })
                .done(function() {
                    var nav_response_text = nav_data['responseJSON'];

                    var nav_html = '';
                    if (document.body.contains(document.querySelector("#library"))) {
                        nav_html = nav_html + '<div id="hlp-custom-nav-links" style="display: flex;justify-content: center;align-items: center;">';
                        $.each(nav_response_text, function(i, e) {
                            var link_title = e['title'];
                            var link_url = e['link_url'];
                            nav_html = nav_html + '<a href="' + link_url + '" class="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out hlp-custom-nav-link" id="how-it-works">' + link_title + '</a>';
                        });
                        nav_html = nav_html + '</div>';
                        $('#library').each(function() {
                            $(this).parent().prepend(nav_html);
                        });
                        $("#navigation-header nav a.hlp-custom-nav-link").css("margin-right", "35px");
                        $("#navigation-header nav").css("grid-template-columns", "auto");
                    } else if (document.body.contains(document.querySelector("button#portal-home"))) {
                        nav_html = nav_html + '<div id="hlp-custom-nav-links" style="display: flex;justify-content: center;align-items: center;">';
                        $.each(nav_response_text, function(i, e) {
                            var link_title = e['title'];
                            var link_url = e['link_url'];
                            nav_html = nav_html + '<a href="' + link_url + '" class="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out hlp-custom-nav-link" id="how-it-works">' + link_title + '</a>';
                        });
                        nav_html = nav_html + '</div>';
                        $('button#portal-home').each(function() {
                            $(this).parent().prepend(nav_html);
                        });
                        $("#navigation-header nav a.hlp-custom-nav-link").css("margin-right", "35px");
                        $("#navigation-header nav").css("grid-template-columns", "auto");
                    }


                });
        }
    } else {
        console.log('remove readd');
        $("#hlp-custom-nav-links").remove();
        hlptmm_addnav();
    }
}
