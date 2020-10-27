import React from "react";
import { Route } from "react-router-dom";

import Hoc from "./utils/hoc";

import CharacterList from "./containers/CharacterList";
import CharacterDetails from "./containers/CharacterDetails";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={CharacterList} />
    <Route path="/character/:characterID" component={CharacterDetails} />
  </Hoc>
);

export default BaseRouter;
