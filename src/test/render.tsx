import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderWithClient(ui: React.ReactNode, routes: string[]) {
	return render(<MemoryRouter initialEntries={routes}>{ui}</MemoryRouter>);
}
