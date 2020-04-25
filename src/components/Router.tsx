import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Routes, { RouteConfig } from '../routes'

// Allow lazy loading of components
function WaitingComponent(Component: React.LazyExoticComponent<React.FunctionComponent<{}>>): any {
    return (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
        <Suspense fallback={<div></div>}>
            <Component {...props} />
        </Suspense>
    );
}

const Router: React.FC = () => {
    return (
        <Switch>
            {Routes.map((route: RouteConfig) => {
                    return (<Route key={route.name} path={route.path} exact component={WaitingComponent(route.component)} />)
            })}
            <Redirect to="/home" />
        </Switch>
    );
}

export default Router;
