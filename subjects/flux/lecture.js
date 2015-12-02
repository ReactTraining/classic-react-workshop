/*
- Flux is an architecture, not a framework
  - DO NOT START BUILDING STUFF WITH FLUX WHEN YOU'RE FIRST GETTING STARTED WITH REACT
  - It can be difficult to understand why the patterns in Flux are useful if you haven't
    already tried to solve problems w/out Flux
  - You'll most likely hate Flux unless you're already fighting with your current JS
    framework. If you're not, stick with what's working for you

- Flux is good at:
  - Making it easy to reason about changes to state

- Remember our 2 questions:
  - What state is there?
  - When does it change?

Open Flux.png

- Views
  - React components (see components)
  - Create actions (see actions/ViewActionCreators.js)

- Action Creators
  - Create "actions" with meaningful names (e.g. "load contacts", "delete contact").
    These are the verbs. Ask yourself, "what actions can the user take?"
  - Send actions through the dispatcher
  - Possibly trigger API requests (side effect)

- Dispatcher
  - The only actual code Facebook's flux repo gives you!
  - Synchronous dispatch of actions to ALL registered listeners (stores)
  - Ensures only one action happens at a time

- Stores
  - Store the state of your app
  - Listen for actions from the dispatcher, so they know when to update state
  - Notify listeners when the state changes
*/
