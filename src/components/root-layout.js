import { Outlet } from "react-router";

import MainNavigation from "./navigation/main-navigation";

export default function RootLayout() {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    );
}