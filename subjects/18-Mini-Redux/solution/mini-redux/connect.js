import React from "react";

import ReduxContext from "./ReduxContext";

function connect(mapStateToProps) {
  return Component => {
    return props => {
      return (
        <ReduxContext.Consumer>
          {redux => (
            <Component
              {...props}
              {...mapStateToProps(redux.state)}
              dispatch={redux.dispatch}
            />
          )}
        </ReduxContext.Consumer>
      );
    };
  };
}

export default connect;
