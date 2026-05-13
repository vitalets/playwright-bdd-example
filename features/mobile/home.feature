@home @batch1
Feature:  Home feature validates the home screen to display the features in the home screen

Background: Turn ON internet connection
  Then I change network settings "Network"

@ios_smoke @Home_Screen @tz
Scenario: Home Screen
  MP-2670: Home Screen
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  And I verify dashboard is displayed with username
  And I tap on "Settings" at bottom bar
  And I tap on option "Customize menus"
  And the screen with title "Customize menus" is displayed
  And I grab text from "Common.CustomizeMenuRowTitle" and store in "customizeMenus"
  And I go back to the previous screen
  And the screen with title "Settings" is displayed
  And I tap on "Home" at bottom bar
  And I grab text from "Common.Quick_action" and store in "customizeMenusHomeScreen"
  And I verify "customizeMenus" and "customizeMenusHomeScreen" are equal
  And I tap the toggle button on balance
  And I verify the bottom navigation are displayed
      | Navigation |
      | Home       |
      | Move money |
      | Services   |
      | Bundles    |
  And I tap on "Settings" at bottom bar
  And I tap on "Home" at bottom bar
  And I grab text from "Common.Quick_action" and store in "customizeMenusHomeScreen"
  And I verify "customizeMenus" and "customizeMenusHomeScreen" are equal
  And I tap the toggle button on balance
  And I verify the bottom navigation are displayed
      | Navigation |
      | Home       |
      | Move money |
      | Services   |
      | Bundles    |

@Discover_card @tz @testreg1
Scenario: Discover card - English
  MP-4923: Discover card - English
  MP-5522 : Discover card - One Offer - English text
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I swipe up to the text "See all"
  And I verify the text "Discover" is displayed

@Balance @tz @mz @11555 @7054 @lso @12443 @47263 @backlog
Scenario: Balance
  MP-2675: Balance
  MP-5842 : Balance
  MP-5922 : Verify the currency letter for Lesotho is now M
  SP-47263 : Balance
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I verify text "Show balance"
  And I tap the toggle button on balance
  And I wait "10"
  And I verify text "Hide balance"
  And I tap on "Settings" at bottom bar
  And I tap on "Home" at bottom bar
  And I verify text "Hide balance"

@Balance_change_WiFi_connection @tz @47278 @mz @backlog @drc @lso
Scenario: Balance - change wifi connection
  MP-2658: Balance - change WiFi connection
  SP-47278 : Balance - change wifi connection
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap the toggle button on balance
  And I wait "10"
  And I verify text "Hide balance"
  And I tap the toggle button on balance
  And I change network settings "No Network"
  And I tap the toggle button on balance
  And I wait "3"
  And I verify text "Unavailable" on balance
  And I change network settings "Network"
  And I tap the toggle button on balance
  And I wait "10"
  And I verify text "Show balance"
  And I tap the toggle button on balance
  And I wait "10"
  And I verify text "Hide balance"

@Enter_your_PIN @tz @mz @7391 @lso
Scenario: Enter your PIN
  MP-2656: Enter your PIN
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And the balance is "hidden"

@MP-2657_Enter_your_PIN-Wrong_PIN @tz @lso @7392
Scenario: Enter your PIN - Wrong PIN
  MP-2657: Enter your PIN - Wrong PIN
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "WrongPIN"
  And I validate wrong pin message displayed
  And I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username

@Period_of_inactivity @tz @mz @7394 @lso
Scenario: Period of inactivity
  MP-2676: Enter your PIN - Period of inactivity
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  And I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I wait "120"
  And I see user is asked to enter pin
  And I enter Pin number "account.phone number1 pin"
  And I verify dashboard is displayed with username

@Period1_of_inactivity_wrong_pin @tz @mz @7395 @lso
Scenario: Period of inactivity wrong PIN
  MP-2678: Enter your PIN - Period of inactivity - Wrong PIN
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  And I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I wait "90"
  And I see user is asked to enter pin
  Then I enter Pin number "WrongPIN"
  And I validate wrong pin message displayed
  And I enter Pin number "account.phone number1 pin"
  And I verify dashboard is displayed with username

@QR_code_onboarding_screen @tz
Scenario: QR Code - Permission
  MP-3605: QR Code - Onboarding screen
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap on "Common.QrCode"
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I tap on "Continue"
  And I tap on allow permission
  And I go back to the previous screen

@Homepage_shortcut_buttons @mz @7960
Scenario: Homepage shortcut buttons
  MP-3982: Homepage shortcut buttons
  MP-4004: Homepage shortcut buttons
  MP-4264: Dynamic UI service - Paga fácil
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  And I verify dashboard is displayed with username
  And I verify the following cards are displayed
      | Cards               |
      | Meu Vodacom         |
      | Withdraw from Agent |
      | Pay Person          |
  # Meu Vodacom is not working currently (16/01/25). Comment it
  # And I tap on "Meu Vodacom"
  # And I wait "10"
  # And the screen with title "Meu Vodacom" is displayed
  # And I tap the native back button
  # And I tap on "Home" at bottom bar
  And I tap on "Withdraw from Agent"
  And I tap on "Continue"
  And the screen with title "Cash out: Agent" is displayed
  And I go back to the previous screen
  And I verify dashboard is displayed with username
  # Credelec is not working currently (16/01/25). Comment it
  And I tap on "Pay Person"
  And I wait "10"
  And I see text "Send money"
  And I go back to the previous screen
  And I verify dashboard is displayed with username

@Balance @drc @24101 @24086
Scenario: Balance drc
  MP-10383: Balance - Multi Currency
  MP-10386: Balance - Unavailable
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap the toggle button on balance
  And I wait "5"
  And the balance is "displayed"
  And I swipe balance to "left"
  And I verify text "USD M-Pesa account"
  And the balance is "displayed"
  And I tap the toggle button on balance
  And the balance is "hidden"
  And I change network settings "No Network"
  And I tap the toggle button on balance
  And I verify text "Unavailable"
  And I change network settings "Network"
  And I tap the toggle button on balance
  And the balance is "hidden"
  And I swipe balance to "right"
  And I verify text "CDF M-Pesa account"
  And the balance is "hidden"
  And I tap the toggle button on balance
  And the balance is "displayed"
  And I swipe balance to "left"
  And the balance is "displayed"

@HomepageQuickActionCardsSetup @lso @12156
Scenario: Homepage quick action cards setup
  MP-5907: Homepage quick action cards setup
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  # And I verify the following cards are displayed
  #     | Cards           |
  #     | Send money      |
  #     | AIRTIME         |
  #     | Cash out: Agent |
  #     | Bundles         |
  And I tap on "Settings" at bottom bar
  And I tap on option "Customize menus"
  And the screen with title "Customize menus" is displayed
  And I grab text from "Common.CustomizeMenuRowTitle" and store in "customizeMenus"
  And I go back to the previous screen
  And the screen with title "Settings" is displayed
  And I tap on "Home" at bottom bar
  And I grab text from "Common.Quick_action" and store in "customizeMenusHomeScreen"
  And I verify "customizeMenus" and "customizeMenusHomeScreen" are equal
  And I tap on "Send money"
  And I dismiss the tooltip
  And the screen with title "Send money" is displayed
  And I go back to the previous screen
  And I verify dashboard is displayed with username
  # And I tap on "AIRTIME"
  # And the screen with title "Top up for Self/Others" is displayed
  # And I go back to the previous screen
  # And I verify dashboard is displayed with username
  And I tap on "Cash out: Agent"
  And I verify text "Visit an agent"
  And I tap on "Continue"
  And the screen with title "Cash out: Agent" is displayed
  And I verify text "Agent Till"
  And I go back to the previous screen
  And I verify dashboard is displayed with username

@Homepage_Secondary_wallet @lso @29699
Scenario: Secondary Wallet - Homepage
  MP-10890 : Secondary Wallet - Homepage
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number2 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number2 pin"
  And I validate biometric screen
  And I verify dashboard is displayed with username
  And I tap the toggle button on balance
  And the balance is "displayed"
  And I swipe balance to "left"
  And I verify text "secondary_wallet.second_name"
  And the balance is "displayed"

@DiscoverCardsLs @lso @12485
Scenario: Ls Discovery Cards
  MP-5923: Ls Discovery Cards
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  And I verify dashboard is displayed with username
  And I verify text "congratulationsLsDiscoverCard"
  And I tap on "Congratulations"
  And I dismiss the tooltip
  And the screen with title "Send money" is displayed
  And I tap on "Home" at bottom bar
  And I see if discover card "withdrawCash" is present
  And I verify text "withdrawCashLsDiscoverCard"
  And I tap on "withdrawCash"
  And I tap on "Continue"
  And I dismiss the tooltip
  And the screen with title "Cash out: Agent" is displayed

@49628 @49627 @PI24.1.3 @mz @lso @tz @drc
Scenario: Frequents - No Frequents
  SP-49628 - Frequents - No Frequents
  SP-49627 - Home screen - Frequent -  First frequent
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I wait for "Common.pinLoader" to become invisible
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  And I dismiss the tooltip
  And I swipe up to the text "See all"
  # And I verify dashboard is displayed with username
  And I do not see text "Frequent services"
  And I tap on "Services" at bottom bar
  And I search for service "SecondService"
  And I choose the first service "SecondService" from the search
  And I wait "35"
  And I hide keyboard
  And I tap the native back button
  And I tap on "Common.SearchCloseIcon"
  And I tap on "Home" at bottom bar
  And I swipe up to the text "See all"
  And I verify text "Frequent services"
  And I verify text "SecondService"

@51553 @mz @lso @PI24.1.3 @52667 @PI24.1.4 @tz @drc
Scenario: Services area - Limit and redirection
  SP-51553: Services area - Limit and redirection
  SP-49627 - Home screen - List of services
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I swipe up to the text "See all"
  And I scroll down to services
  And I verify services are displayed maximum of "9"
  And I tap on "Common.ServicesSeeAll"
  And the screen with title "Services" is displayed

@mz @lso @47262 @PI24.1.3
Scenario: Home screen
  SP-47262: Home screen
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And the balance is "hidden"
  And I swipe up to the text "Discover"
  And I validate home screen

@mz @lso @51763 @50888 @PI24.1.5
Scenario: Avatar with tooltip - Adding a picture on first login
  SP - 51763 : Avatar with tooltip - Adding a picture on first login
  SP - 50888 : Profile Picture - Add picture from gallery
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I tap on user avatar icon
  And I tap on add or edit user picture
  And I tap on "Choose from gallery"
  And I tap on "Dismiss" if available
  And I tap on coordinates x:"116" and y:"904"
  # And I tap on "Common.ImgThumbnail"
  And I tap on "Choose another one"
  And I tap on coordinates x:"116" and y:"904"
  # And I tap on "Common.ImgThumbnail"
  And I tap on "Use this picture"
  And I wait "2"
  And I see element "Common.ProfileImage"
  And I tap on "Home" at bottom bar
  And I see element "Common.ProfileImageHome"
  And I terminate the app
  And I wait "5"
  When I launch the app
  Then I enter Pin number "account.phone number1 pin"
  And I do not see element "Common.TooltipText"
  And I see element "Common.ProfileImageHome"

@mz @lso @50887 @50890 @PI24.1.5
Scenario: Profile Picture - Add picture from camera
  SP - 50887 : Profile Picture - Add picture from camera
  SP - 50890 : Profile Picture - Edit picture
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  And I tap on user avatar icon
  And I tap on add or edit user picture
  And I tap on "Take a picture"
  And I tap on allow permission
  And I tap on take a photo
  And I tap on "Take another picture"
  And I tap on take a photo
  And I tap on "Use this picture"
  And I wait "2"
  And I see element "Common.ProfileImage"
  And I tap on add or edit user picture
  And I tap on "Choose from gallery"
  And I tap on "Dismiss" if available
  # And I tap on "Common.thumbnail"
  And I tap on coordinates x:"116" and y:"904"
  And I tap on "Use this picture"
  And I wait "2"
  And I see element "Common.ProfileImage"
  And I tap on add or edit user picture
  And I tap on "Remove current picture"
  And I do not see element "Common.ProfileImage"

@mz @lso @50791 @50744 @PI24.1.5
Scenario: Avatar with tooltip - After three logins
  SP - 50791 : Avatar with tooltip - After three logins
  SP - 50744 : Avatar with tooltip - First three logins
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap on user avatar icon
  And I tap on option "Log Out"
  And I see text "You are about to log out from this device, clearing all transactions frequents"
  And I tap on "LOG OUT"
  And I verify text "Please choose your language"
  # When I launch the app
  And I launch the app again and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I do not see element "Common.TooltipText"

@mz @lso @50544 @50549 @PI24.1.5
Scenario: Avatar with initials based on a user name - Home page
  SP - 50544 : Avatar with initials based on a user name - Home page
  SP - 50549 : Avatar with initials based on a user name - Settings
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I dismiss the tooltip
  And I verify element "Common.TextViewContains" with text "account.phone number1 name" is displayed
  And I tap on user avatar icon
  And I verify element "Common.TextView" with text "account.phone number1 full name" is displayed
# And I verify element "Common.TextView" with text "account.phone number1 Initials" is displayed

@tz @7260
Scenario: QR Code - Close button
  MP-2966 - QR Code - Close button
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap on "Common.Action_qr_code"
  And I verify text "QR code"
  And I see text "QRcodeMsg"
  And I verify that "Common.PrimaryBtn" button is "enable"
  And I tap on "Common.CloseX"
  And I verify dashboard is displayed with username

@53066 @mz @backlog @tz @drc @lso
Scenario: Home screen - Multiple quick actions
  SP-53066: Home screen - Multiple quick actions
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I tap on last quick action
  And I do not see element "Common.Action_intelligent_search"

@47306 @mz @backlog @tz @drc @lso
Scenario: Dashboard - Bottom tab bar selection
  SP-47306: Dashboard - Bottom tab bar selection
  Given I login to app using
      | Device  | AccountMSISDN         |
      | Device1 | account.phone number1 |
  When I launch the app and choose language "English"
  Then I enter Pin number "account.phone number1 pin"
  And I validate biometric screen
  #And I tap on "Common.CloseBtn1"
  # And I tap on "Common.GrantPermissionAllow"
  # And I tap on "Common.GrantPermissionDeny"
  ##And I tap on "Common.GrantPermissionWhileUsing"
  # And I tap on "Common.GrantPermissionOnlyThisTime"
  # And I tap on "Common.GrantPermissionDeny1"
  And I verify dashboard is displayed with username
  And I verify "Home" menu is highlighted and bold
  And I tap on "Move money" at bottom bar
  And I verify "Move money" menu is highlighted and bold
  And I tap on "Services" at bottom bar
  And I verify "Services" menu is highlighted and bold
  And I tap on "Home" at bottom bar
  And I verify "Home" menu is highlighted and bold
