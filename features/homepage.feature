Feature: Playwright Home Page

    Scenario: Check title
        Given I am on Playwright home page
        Then I see in title "Playwright"

    Scenario Outline: Check get started
        Given I am on Playwright home page
        When I click link "<link>"
        Then I see in title "<title>"

    Examples:
        | link          | title        |
        | Get started   | Installation |    
        | API           | Library      |    