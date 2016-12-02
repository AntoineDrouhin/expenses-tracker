# poc-redux

```
npm install
npm start
```
### Dev Process
J'ai suivi [ce processus](http://redux.js.org/docs/basics/Actions.html).

Voici ce que j'ai pu abstraire :

#### Define Actions
- `ADD_EXPENSE` : Amount, date, type
- `DELETE_EXPENSE` : id
- `ADD_EXPENSETYPE` : label
- `DELETE_EXPENSETYPE` : id

#### Designing the State Shape
```
{
  expenseTypes: [
    id,
    label
  ]
  expenses: [
    {
      id,
      expenseType,
      amount,
      date
    }, ...
  ]
}
```

#### Designing Component Hierarchy

Architecture following [Jack Hsu Guidelines](http://jaysoo.ca/2016/02/28/organizing-redux-application/)
