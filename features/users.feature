Feature: Users Page

  Scenario: Display list of users
    Given I am on the users list
    Then I see heading "Users"
    And I see 10 users in the table

  Scenario: Show user details
    Given I am on the users list
    When I click the first user
    Then I see the name "Leanne Graham"
