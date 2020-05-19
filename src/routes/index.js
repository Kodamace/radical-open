import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router";

const Admin = lazy(() => import("pages/admin"));
const CardHolders = lazy(() => import("pages/cardholders"));
const Home = lazy(() => import("pages/home"));

const Routes = () => (
  <Switch>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Route path="/admin" component={Admin} />
      <Route path="/user/:id" component={CardHolders} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
);

export default Routes;
