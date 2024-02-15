Feature: Test httpbin.org API

    Scenario: /headers
        When I send request to "/headers"
        Then I see in response field "Accept-Encoding" containing "gzip,deflate,br"
