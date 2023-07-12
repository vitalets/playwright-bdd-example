Feature: Home Page

    Background:
        Given I am on home page

    Scenario: Check title
        Then I see in title "Playwright"

    Scenario: Check get started
        When I click link "Get started"
        Then I see in title "Installation"