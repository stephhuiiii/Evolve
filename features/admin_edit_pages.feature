Feature: Administrators should be able to edit existing pages

  As an administrator of the website
  So I can make changes to existing pages
  I can edit a page's fields

  Background: I am logged in as an administrator
    Given I am on the Evolve home page
    And I am a new, authenticated user
    And the following pages exist:
      | title                   | path      | content        | published |
      | Blog1                   | /blog1    | <p>Blog1</p>   | true      |
      | Blog2                   | /blog2    | <p>Blog2</p>   | true      |


  Scenario: I can create a new page and edit the page
    When I am on the page index page
      And I follow "Edit Blog1"
      Then I should be on Blog1's edit page
    When I fill in "Content:" with "Changed Field"
      And I press "Update Page"
      And I follow "View Blog1"
      Then I should see "Changed Field"


  Scenario: (Sad Path) If I try to submit invalid values updating fails with an explanation
    When I am on the page index page
      And I follow "Edit Blog1"
      Then I should be on Blog1's edit page
    When I fill in "Path:" with "/blog2"
      And I press "Update Page"
      Then I should be on Blog1's edit page
     When I am on the page index page
      And I follow "View Blog1"
      Then I should see "Blog1"