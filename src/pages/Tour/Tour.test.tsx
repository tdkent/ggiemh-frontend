import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { renderWithClient } from "@/test/render";

describe("Tour page", () => {
	const user = userEvent.setup();
	it("renders a list of 28 home items", () => {
		renderWithClient(<App />, ["/homes"]);

		const list = screen.getByRole("list", {
			name: /homes/i,
		});

		expect(list).toBeInTheDocument();
		expect(list.children.length).toBe(28);
	});

	it("renders a list with Model Home items", () => {
		renderWithClient(<App />, ["/homes"]);

		const list = screen.getByRole("list", {
			name: /homes/i,
		});

		const items = within(list);

		expect(items.getByText(/model home #4/i)).toBeInTheDocument();
		expect(items.getByText(/model home #5/i)).toBeInTheDocument();
		expect(items.getByText(/model home #6/i)).toBeInTheDocument();
	});

	it("renders links that navigate to correct Tour Details page", async () => {
		renderWithClient(<App />, ["/homes"]);

		await user.click(
			await screen.findByRole("link", {
				name: /home 8/i,
			}),
		);

		expect(
			screen.getByRole("heading", { name: /model home #8/i }),
		).toBeInTheDocument();
	});
});
