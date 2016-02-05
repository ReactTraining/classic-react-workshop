/*
The goal of this exercise is to add a button beside each contact in the list
that can be used to delete that contact. To do this, you'll need to perform
the following steps:

Remember, redux models all changes to state with an action. Mimic what we've
done to load the contacts with a new "thunk" action.

The order you do things makes the code easier to iterate: write some code,
app runs, write some code, app runs. We've found the best workflow with redux
is to:

1. add a reducer, in this exercise the reducer is already there (reducers/contacts)
   so this part is already done.
2. Add propTypes to your component for the state and then "select" it in `connect`
2. add a new action, it doesn't have to do much yet, just exist
3. add the UI and dispatch the action
4. finish up the action's logic if needed
5. handle the action in the reducer by returning new state, remember don't mutate
   the reducer state, return new objects/arrays.

Doing it in this order ensures your app will continue to run when you save code.

If you run into problems, check the logger's output:

- Did you dispatch the right action? Check your component code.
- Did you send the right data in the action? Check your action code.
- Is the next state what you'd expect? Check the reducer.

*/
import './exercise/index'
