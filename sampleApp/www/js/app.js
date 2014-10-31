/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var error1 = function ThrowNewError() {
    return function FunctionB() {
        return function FunctionC() {
            throw new Error( "Error!" );
        }
    }
};

var error2 = function NonsenseText() {
    return function FunctionB() {
        return function FunctionC() {
            abc123       // ridiculous nonsense that causes a crash
        }
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var jqXHR, XHR;
        var http_type = "http", sync = false, jquery = false, response_code, delay, timeout = 0, type = "GET", bytes_out = 0, bytes_in = 0;
        var data;

        function makeXMLHttpRequest(URL) {
            XHR = new window.XMLHttpRequest();
            XHR.timeout = timeout;
            XHR.open(type, URL, !sync);
            XHR.onloadend = function() {
                alert(this.response);
            };
            XHR.send(data);
        }

        function makeJQRequest(URL) {
            jqXHR = $.ajax({
                url: URL,
                type: type,
                async: !sync,
                timeout: timeout,
                data: data,
                complete: function() {
                    alert(this.response);
                }
            });
        }

        $('#crash_application').click(function() {
            alert("CRASH");
            error1()()();       // ridiculous nonsense that causes a crash
        });

        $('#breadcrumb_submit').click(function() {
            alert("LEAVE BREADCRUMB");
            var bcText = 'breadcrumb';
            Crittercism.leaveBreadcrumb(bcText);
        });

        $('#set_username').click(function() {
            alert("SET USERNAME");
            Crittercism.setUsername('MommaCritter');
        });

        $('#set_metadata').click(function() {
            alert("SET METADATA");
            Crittercism.setValueForKey('Game Level', '5');
        });

        $('#handled_exception').click(function() {
            alert("HANDLED EXCEPTION");
            try {
                error2()()();
            } catch(e) {
                Crittercism.logHandledException(e);
            }
        });

        $('#test_APM').click(function() {
            $('#default').fadeOut();
            $('#service_monitoring').fadeIn();
        });

        $("input:radio[name=http_type]").click(function() {
            http_type = $('input:radio[name=http_type]:checked').val();
            if (http_type == "https://sni.velox.ch/") {
                if (jquery) {
                    makeJQRequest(http_type);
                    alert("sent jquery GET request to https://sni.velox.ch/");
                } else {
                    makeXMLHttpRequest(http_type);
                    alert("sent XMLHttp GET request to https://sni.velox.ch/");
                }
            } else {
                alert("set base url to " + http_type);
            }
        });

        $("input:radio[name=sync]").click(function() {
            var bool = $('input:radio[name=sync]:checked').val();
            sync = (bool === "true");
            alert("set synchronous to " + sync);
        });

        $("input:radio[name=jquery]").click(function() {
            var bool = $('input:radio[name=jquery]:checked').val();
            jquery = (bool === "true");
            alert("set jquery to " + jquery);
        });

        $("input:radio[name=response_code]").click(function() {
            response_code = $('input:radio[name=response_code]:checked').val();
            var URL = http_type + "://httpbin.org/status/" + response_code + "/";
            if (jquery) {
                makeJQRequest(URL);
                alert("sent jquery GET request to " + URL);
            } else {
                makeXMLHttpRequest(URL);
                alert("sent XMLHttp GET request to " + URL);
            }
        });

        $("input:radio[name=delay]").click(function() {
            delay = $('input:radio[name=delay]:checked').val();
            var URL = http_type + "://httpbin.org/delay/" + delay + "/";
            if (jquery) {
                makeJQRequest(URL);
                alert("sent jquery GET request to " + URL + "with delay of " + delay + " s");
            } else {
                makeXMLHttpRequest(URL);
                alert("sent XMLHttp GET request to " + URL + "with delay of " + delay + " s");
            }
        });

        $("input:radio[name=timeout]").click(function() {
            timeout = parseInt($('input:radio[name=timeout]:checked').val());
            alert("set timeout to " + timeout + " ms");
        });

        $("input:radio[name=type]").click(function() {
            type = $('input:radio[name=type]:checked').val();
            var URL = http_type + "://httpbin.org/" + type + "/";
            if (jquery) {
                makeJQRequest(URL);
                alert("sent jquery " + type + " request to " + URL);
            } else {
                makeXMLHttpRequest(URL);
                alert("sent XMLHttp " + type + " request to " + URL);
            }
        });

        $("input:radio[name=bytes_out]").click(function() {
            bytes_out = $('input:radio[name=bytes_out]:checked').val();
            if(typeof bytes_out === 'number' && bytes_out > 0){
                data = new Array(bytes_out + 1).join( 'a' );
            }
            alert("created data object of " + bytes_out + " bytes to be sent");
        });

        $("input:radio[name=bytes_in]").click(function() {
            bytes_in = $('input:radio[name=bytes_in]:checked').val();
            var URL = http_type + "://httpbin.org/bytes/" + bytes_in + "/";
            if (jquery) {
                makeJQRequest(URL);
                alert("sent jquery request for " + bytes_in + " bytes to " + URL);
            } else {
                makeXMLHttpRequest(URL);
                alert("sent XMLHttp request for " + bytes_in + " bytes to " + URL);
            }
        });

        $('#go_back').click(function() {
            $('#service_monitoring').fadeOut();
            $('#default').fadeIn();
        });

        $('abort_request').click(function() {
            if(jquery) {
                jqXHR.abort();
            } else {
                XHR.abort();
            }
        });

        $('#service_monitoring').hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
