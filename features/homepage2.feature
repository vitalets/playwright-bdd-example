Feature: Playwright Home Page 2

  Scenario: Check title 2
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"

