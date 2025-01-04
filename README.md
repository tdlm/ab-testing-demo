This is a [Next.js](https://nextjs.org) using [Sanity.io](https://www.sanity.io/) to serve a dynamic hero section.

## Project Documentation
- [Setup Instructions](./docs/setup.md)
- [User Stories](./docs/user-stories.md)

## Architecture Diagram

```mermaid
flowchart TB
    SC[("Sanity.io heroTextVariant<br>Collection")] --> |Stores| SV["Variant Data"]

    subgraph NextJS["Next.js Application"]
        subgraph Frontend["Client Side"]
            HC["Hero Component<br>(Hero.tsx)"] --> |Displays| RV["Rendered Variant"]
            TV["TrackVariantView Component<br>(TrackVariantView.tsx)"] --> |Tracks| VA["Variant Analytics"]
        end

        subgraph Server["Server Side"]
            QF["Query Functions (queries.ts)"] --> |Fetches data| CH["Client Helpers (getHeroTextVariant.ts)"]
            CH --> |Processes| VL["Variant Logic:<br>1. Calculate total weights<br>2. Generate random number<br>3. Select variant based on distribution"]
            VL --> |Returns| SHV["Selected Hero Variant"]
        end
    end

    SC --> |GROQ Queries| QF
    SHV --> |Server Props| HC
    VA --> |API Route| SC
```