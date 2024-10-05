# SE4030 – Secure Software Development Assignment

## Group Members
- **Member 1**: Thuduwage I.M.H.G (IT21169380)
- **Member 2**: Arandara.S.D (IT21164330)
- **Member 3**: Karunarathne R.Y.D. (IT21169144)
- **Member 4**: Kodithuwakku C.K. (IT21156960)

## Project Overview
This project involves identifying vulnerabilities in a web or mobile application and implementing fixes as well as an OAuth/OpenID Connect feature. The application chosen for this assignment is **EyeZen**, which was originally sourced from [EyeZen-FE](https://github.com/IsuruX98/EyeZen-FE) and [EyeZen-API](https://github.com/IsuruX98/EyeZen-API).

### Vulnerabilities Identified and Fixed
1. **Vulnerability 1**: CSP: Wildcard Directive.
2. **Vulnerability 2**: Cross-Domain Misconfiguration.
3. **Vulnerability 3**: Missing Anti-clickjacking Header.
4. **Vulnerability 4**: Server Leaks Version Information via “Server” HTTP Response Header Field.
5. **Vulnerability 5**: Information Disclosure – Suspicious Comments.
6. **Vulnerability 6**: Timestamp Disclosure – Unix
7. **Vulnerability 7**: X-Content Type-Options Header Missing
8. **Vulnerability 8**: Strict-Transport-Security Header Not Set.

## OAuth/OpenID Connect Implementation
- **Feature Description**: We implemented a Google OAuth login feature to allow users to authenticate using their Google accounts. This provides a more convenient and secure method for users to access the application.
- **OAuth Provider**: Google
- **Implementation Details**: 
  - We used the `@react-oauth/google` package to integrate Google OAuth into our application. 
  - To install the library, run:
    ```bash
    npm install @react-oauth/google
    ```
  - After setting up the library, we configured the OAuth flow to handle user login and authentication. When a user successfully logs in, their profile information (like email and name) is retrieved and used within the application.
