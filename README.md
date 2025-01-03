This is a [Next.js](https://nextjs.org) using [Sanity.io](https://www.sanity.io/) to serve a dynamic hero section.

## Project Documentation
- [Setup Instructions](./docs/setup.md)
- [User Stories](./docs/user-stories.md)

## Architecture Diagram

```mermaid
flowchart TB
    SC[("Sanity.io heroTextVariant<br>Collection")] --> |Stores| SV["Variant Data"]

    subgraph NextJS["Next.js Application"]
        subgraph Server["Server Side"]
            QF["Query Functions (queries.ts)"] --> |Fetches data| CH["Client Helpers (getHeroTextVariant.ts)"]
            CH --> |Processes| VL["Variant Logic:<br>1. Calculate total weights<br>2. Generate random number<br>3. Select variant based on distribution"]
            VL --> |Returns| SHV["Selected Hero Variant"]
        end

        subgraph Frontend["Client Side"]
            SHV --> |Hydrates| HC["Hero Component<br>(Hero.tsx)"]
            HC --> |Displays| RV["Rendered Variant"]
            RV --> |Triggers| TV["TrackVariantView Component<br>(TrackVariantView.tsx)"]
            TV --> |Tracks| VA["Variant Analytics"]
        end
    end

    SC --> |GROQ Queries| QF
    VA --> |API Route| SC
```