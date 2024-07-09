Feature: Playwright Home Page

    Background:
        Given I logged in with "simpleForm@authenticationtest.com" credentials

    Scenario: Check title
        When I go to home page
        Then I see I am on the home page
 
  