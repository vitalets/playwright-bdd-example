Feature: Playwright Home Page

  @login
  Scenario: Check title
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"

  @login
  @skip
  Scenario: Check title 2
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"
