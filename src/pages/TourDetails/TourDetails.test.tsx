import { screen } from "@testing-library/react";
import App from "@/App";
import { renderWithClient } from "@/test/render";

describe("Tour Details page", () => {
	it("renders the correct details page", () => {
		renderWithClient(<App />, ["/homes/1"]);
		expect(screen.getByRole("heading", { name: /model home #1/i }));
	});

	it("renders correct details about the home", async () => {
		renderWithClient(<App />, ["/homes/1"]);
		expect(await screen.findByText(/pine lake park/i)).toBeInTheDocument();
	});
});
