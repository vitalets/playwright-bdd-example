Feature: Visual Testing of Cart Page

  Scenario: Create a base screenshot
    Given I open url "https://flipkart.com"
    When I click on cart link
    Then Screenshot should get captured
  