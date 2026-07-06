Feature: Users Page

  Scenario: Display list of users with pagination
    Given I am on the users list
    Then I see heading "Users"
    And I see 5 users in the table
    And the first user is "Leanne Graham"
    When I click the next page button
    Then I see 5 users in the table
    And the first user is "Mrs. Dennis Schulist"
    When I click the previous page button
    Then the first user is "Leanne Graham"

  Scenario: Show user details
    Given I am on the users list
    When I click the first user
    Then I see the name "Leanne Graham"
