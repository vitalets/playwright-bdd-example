Feature: Playwright Home Page

  @chrome
  Scenario: scenario for chromium
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"

  @WebKit
  Scenario: scenario for webkit
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"
