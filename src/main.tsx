import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router";
import App from "@/App";
import GlobalErrorBoundary from "@/GlobalError";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider>
			<ErrorBoundary
				fallbackRender={({ resetErrorBoundary }) => (
					<GlobalErrorBoundary reset={resetErrorBoundary} />
				)}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ErrorBoundary>
		</HelmetProvider>
	</StrictMode>,
);
