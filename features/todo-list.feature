Feature: Todo list

  Scenario: Add todo
    Given I am on todo page
    When I add todo "my todo"
    Then visible todos count is 1
