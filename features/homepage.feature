Feature: Playwright Home Page

  Scenario: A two-parameter action step
    When Actor does action "foo" on "bar" site

  Scenario: A zero-parameter verification step
    Then User verifies something visible


# Scenario: A two-parameter action step with a table
#   When Actor does action "foo" on "bar" site
#     | option | value |
#     | env    | demo  |