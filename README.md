# voice123-test

## Author

Jorge Andres Esguerra (LimitBreaker98 on github)

## Application features

- Search bar where users can conduct searches using enter key or clicking the search button.
- Matching text is highlighted and shown in Voice Actor Card.
- Pagination of the grid of Voice Actors that match the search criteria
- Search for all available talent by leaving the keywords field empty and searching.
- Audio Player for voice sample per shown voice actor card.
- Link to voice123 provider profile page by clicking on username in the Voice Actor Card.
- Helpful text for the user to use the app
- Responsive
- Fully created with Material UI library and React + Vite

## Application Setup Guide

This is a Vite + React application.

Vite provides frontend tooling much like Create React App.  
While Create React App is the better known project starter for React applications, Vite is actively being developed and has more up-to-date support.

### Prerequisites

This project requires you to have node and npm installed. Please follow the official instructions of your platform [here](https://nodejs.org/en/).

Then, clone the repo and follow these steps.

### Step 0: cd into project folder

```
    cd voice-test
```

### Step 1: Get all the necessary packages for running the project

```
    npm install
```

### Step 2: Run the frontend server

```
    npm run dev
```

Alternatively, you can build and run a production build by using

```
    npm run build
    npm preview
```

## Worklog

Initial project setup

| Task                                                                                      | Time                                                          |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Exploring the API responses and playing with the provided API via Postman                 | 2 Hours initially, then sparringly during project development |
| Initial project setup (upgrading node, npm, installing vite, react, material UI)          | 30 min                                                        |
| Project frontend base structure (Title and Subtitle, Search Component, Voice Actor Grid ) | 4 hours                                                       |
| Voice Actor Card implementation (Basic Card Layout with image, link to voice123 profile)  | 2 hours                                                       |
| Media Player implementation                                                               | 1 hour                                                        |
| Highlighted text implementation                                                           | 4 hours                                                       |
| Final refactoring and testing manually on Safari, Chrome.                                 | 4 hours                                                       |

Note: Highlighted text was the most challenging part of the project since there is no specification on how the provided API endpoint for search uses the keywords parameters to filter the returned voice actors.

As such, I had to assume that the matching text could come from any of the string fields for each returned Voice Actor object.

I used postman to try to discern which fields are being used in the search filter via trial and error, but there is simply too many fields to manually test this. Therefore, I decided to instead search for the matching text in all of the string fields of the Voice Actor object and return the first coincidence.

## Future improvements and recommendations

- Improved highlighted text functionality

  - First, the backend API for the search has to be studied and understood so that the specific criteria for returning a particular Voice Actor based on the passed keywords is unambiguous for me.
  - Once I know those rules, I propose two approaches for improving.

    1. Modify the backend endpoint so that every Voice Actor Object has an additional field "reason_for_selection".

       - This field's value will be the name of another field, namely, the one used by the backend to determine that such a Voice Actor complies with the keywords used for lookup.
       - With this field, we can eliminate the code that finds the matching text inside the flattened object representation of the Voice Actor data. The backend allows us to immediately know which field has the matching text and we proceed to just render it properly in the Frontend.

    2. Change the StringUtils functions so that they do not have to flatten the whole Voice Actor object before searching. I can eagerly search only the fields that I know that the backend uses for the search function.

Approach 2 takes less time to implement but it is unsustainable in the long run, since every time that the backend API search functionality is modified (e.g a new criteria is considered for the filtering) then I would need to change the front end code.

Approach 1 may take a bit longer since the API has to be modified, but once implemented the concern of finding the text is removed from the frontend. The frontend can now just render the matching text and the backend is responsible for providing exactly this information.

This improvement is **imperative**, as currently the text matching is not guaranteed to reflect exactly which search criteria was used by the backend to filter the Voice Actors for our end customer.

Additional backend endpoints could be set up if needed.

- Improved UI of highlighted text

  - The text component of the Voice Actor card behaves inconsistently when the description is short. An improvement would be to always guarantee equal Card height relative to other Cards, regardless of text content length.

- Caching

  - With more time I can implement Caching throughout the project.
    - At the moment, the pagination implementation is not Caching the responses every time we change pages.
      - The [TanStack Query Library (Previously known as React Query)](https://tanstack.com/query/latest/docs/react/overview) library could be leveraged to cache fetching and improve query management in the app. This would also introduce a new dependency for the project but the trade-off could worth it, since this library is actively being developed.
      - I'm sure it could also be improved with some more advanced react hooks but I need to get up to date with those. 

- Better UI styles

  - This app uses basic styling but using a custom component or styling library could help it look better. For example, using the CircleAvatar component to show the picture of every Voice Actor could help the look and feel of the app.
  - Adding a theme using the createTheme functionality of Material UI would also standardize the styles used throughout the app and allow extensions to benefit from preset styling.
  - Creating a theme would also allow implementation of dark mode.
  - Add a skeleton component to show the user that information is loading. This would be based on [Skeleton - material UI](https://mui.com/material-ui/react-skeleton/)

- Internationalization

  - If there is enough traffic from non-english speaking countries, I would consider adding internationalization support to the app. I'd use the [react-intl](https://www.npmjs.com/package/react-intl) package for this, since I've previously used it.

- Backend improvements

  - At the moment, the provided backend returns an array of objects, where every object represents a Voice Actor. During my investigation of the responses, I figured out that some fields are repeated and redundant. I do not know the underlying implementation of the backend and what kind of DB it uses, but I could study how it is implemented and suggest improvements to reduce the redundancy of the data. This helps us storage wise and also improves the onboarding experience for new devs onto the codebase.

- Test Suite

  - Adding a unit test suite for the string utility functions.
  - Adding [cypress](https://www.cypress.io/) to have UI tests. 
  - Adding tests using Jest.

- Improve responsiveness of the app.

  - The app is currently responsive but testing on different screen sizes was limited. Responsiveness in material ui can be fine tuned using the screen size props (xs, sm, md, lg, xl) and can be customized further using themes.

  - The proposed solution limits the amount of characters shown in the matching text per Voice Actor. This was done intentionally to show relevant information to the client while avoiding showing too much information that may saturate them. This also ensures smooth look and feel of the app since the rendered Cards will always have a matching text of at most 2 lines, regardless of the device they are using (phone, tablet, pc or bigger screen).

- Production deployment

  - Actually deploying the app instead of serving it locally.

- Code cleanliness

  - Some functions can be refactored in a better way. For example, the StringHelper functions.

- More thorough testing on other browsers

  - The app was tested in Windows and MacOS, specifically on the Chrome and Safari browsers

- Improving API security, since at the moment it does not use API Keys or another mechanism to avoid exploits and attacks. This is a test app so for the moment it does not matter, but a bigger project would require an implementation of security features.

