import React, {Suspense} from "react";

export default function MainWrapper({children} : {children : React.ReactNode}) {
    return (
        <main className="h-screen">
            <div className="w-full h-full">
                <Suspense fallback={<div>Esperate! chucha su madre...</div>}>
                    {children}
                </Suspense>
            </div>
        </main>
    )
}
