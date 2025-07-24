declare module "react-helmet-async" {
    import { FC, ReactNode } from "react";

    interface HelmetProviderProps {
        children: ReactNode;
    }

    export const HelmetProvider: FC<HelmetProviderProps>;
    export const Helmet: FC<any>;
}
