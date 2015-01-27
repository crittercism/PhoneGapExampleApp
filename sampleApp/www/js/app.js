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
        var url_scheme = "http",
          sync = false,
          networking_api = "xhr",
          response_code,
          data,
          delay,
          jqXHR,
          XHR,
          timeout = 0,
          http_method = "GET",
          bytes_out = 0,
          bytes_in = 0
          make_request = makeXMLHttpRequest;

        function makeXMLHttpRequest(URL) {
            XHR = new window.XMLHttpRequest();
            XHR.timeout = timeout;
            XHR.open(http_method, URL, !sync);
            XHR.onloadend = function() {
                alert("Received response(" + XHR.status + ") from " + URL);
            };
            console.log("sending data: " + data);
            XHR.send(data);
        }

        function makeJQRequest(URL) {
            jqXHR = $.ajax({
                url: URL,
                type: http_method,
                async: !sync,
                timeout: timeout,
                data: data,
                complete: function() {
                    alert("Received response from " + URL + "\nBody:\n" + this.response);
                }
            });
        }

        $('#crash_application').click(function() {
            error1()()();       // ridiculous nonsense that causes a crash
        });

        $('#breadcrumb_submit').click(function() {
            Crittercism.leaveBreadcrumb('breadcrumb');
        });

        $('#set_username').click(function() {
            Crittercism.setUsername('MommaCritter');
        });

        $('#set_metadata').click(function() {
            Crittercism.setValueForKey('Game Level', '5');
        });

        $('#handled_exception').click(function() {
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

        $("input:radio[name=url_scheme]").click(function() {
            url_scheme = $('input:radio[name=url_scheme]:checked').val();
            console.log("set base url to " + url_scheme);
        });

        $("input:radio[name=sync]").click(function() {
            var bool = $('input:radio[name=sync]:checked').val();
            sync = (bool === "true");
            console.log("set synchronous to " + sync);
        });

        $("input:radio[name=networking_api]").click(function() {
            networking_api = $('input:radio[name=networking_api]:checked').val();

            if (networking_api) {
              make_request = makeJQRequest;
            } else {
              make_request = makeXMLHttpRequest;
            }

            console.log("set networking_api to " + networking_api);
        });

        $('#response_code_202').click(function() {
            make_request(url_scheme + "://httpbin.org/status/202");
        });

        $('#response_code_404').click(function() {
            make_request(url_scheme + "://httpbin.org/status/404");
        });

        $('#response_code_500').click(function() {
            make_request(url_scheme + "://httpbin.org/status/500");
        });

        $('#delay_1').click(function() {
            make_request(url_scheme + "://httpbin.org/delay/1");
        });

        $('#delay_2').click(function() {
            make_request(url_scheme + "://httpbin.org/delay/2");
        });

        $('#delay_5').click(function() {
            make_request(url_scheme + "://httpbin.org/delay/5");
        });

        $("input:radio[name=timeout]").click(function() {
            timeout = parseInt($('input:radio[name=timeout]:checked').val());
            console.log("set timeout to " + timeout + " ms");
        });

        $("input:radio[name=http_method]").click(function() {
            http_method = $('input:radio[name=http_method]:checked').val();
            console.log("set http method to " + http_method);
        });

        $("input:radio[name=bytes_out]").click(function() {
            bytes_out = parseInt($('input:radio[name=bytes_out]:checked').val());
            data = undefined;

            if(bytes_out > 0){
                data = new Array(bytes_out + 1).join( 'a' );
            }

        });

        $('#bytes_in_0').click(function() {
            make_request(url_scheme + "://httpbin.org/bytes/0");
        });

        $('#bytes_in_4k').click(function() {
            make_request(url_scheme + "://httpbin.org/bytes/4096");
        });

        $('#bytes_in_8k').click(function() {
            make_request(url_scheme + "://httpbin.org/bytes/8192");
        });

        $('#return_from_service_monitoring').click(function() {
            $('#service_monitoring').fadeOut();
            $('#default').fadeIn();
        });

        $('abort_request').click(function() {
            if(networking_api === "jquery") {
                jqXHR.abort();
            } else {
                XHR.abort();
            }
        });

        $('#return_from_transactions').click(function() {
            $('#transactions').fadeOut();
            $('#default').fadeIn();
        });

        $('#test_transactions').click(function() {
            $('#transactions').fadeIn();
            $('#default').fadeOut();
        });

        var valueA = 1, valueB = 1, valueC = 1;

        $('#transactionA_start').click(function() {
            Crittercism.beginTransaction("A");
        });

        $('#transactionB_start').click(function() {
            Crittercism.beginTransaction("B");
        });

        $('#transactionC_start').click(function() {
            Crittercism.beginTransaction("C");
        });

        $('#transactionA_startWithValue').click(function() {
            Crittercism.beginTransaction("A", 1);
        });

        $('#transactionB_startWithValue').click(function() {
            Crittercism.beginTransaction("B", 1);
        });

        $('#transactionC_startWithValue').click(function() {
            Crittercism.beginTransaction("C", 1);
        });

        $('#transactionA_end').click(function() {
            Crittercism.endTransaction("A");
        });

        $('#transactionB_end').click(function() {
            Crittercism.endTransaction("B");
        });

        $('#transactionC_end').click(function() {
            Crittercism.endTransaction("C");
        });

        $('#transactionA_fail').click(function() {
            Crittercism.failTransaction("A");
        });

        $('#transactionB_fail').click(function() {
            Crittercism.failTransaction("B");
        });

        $('#transactionC_fail').click(function() {
            Crittercism.failTransaction("C");
        });

        $('#transactionA_increase').click(function() {
            valueA++;
            Crittercism.setTransactionValue("A", valueA);
        });

        $('#transactionB_increase').click(function() {
            valueB++;
            Crittercism.setTransactionValue("B", valueB);
        });

        $('#transactionC_increase').click(function() {
            valueC++;
            Crittercism.setTransactionValue("C", valueC);
        });

        $('#transactionA_get').click(function() {
           alert("A value: " + Crittercism.getTransactionValue("A"));
        });

        $('#transactionB_get').click(function() {
            alert("B value: " + Crittercism.getTransactionValue("B"));
        });

        $('#transactionC_get').click(function() {
            alert("C value: " + Crittercism.getTransactionValue("C"));
        });

        $('#service_monitoring').hide();
        $('#transactions').hide();
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
