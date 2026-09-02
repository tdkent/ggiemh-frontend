import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TourList from "@/components/pages/Tour/TourList";
import { renderWithClient } from "@/test/render";

describe("The list of homes", () => {
	const user = userEvent.setup();
	it("sorts homes by Number by default", async () => {
		renderWithClient(<TourList />, ["/homes"]);

		const list = await screen.findByRole("list");

		const item1 = list.children.item(0) as Element;
		expect(item1.textContent).toContain("Model Home #1");

		const item2 = list.children.item(1) as Element;
		expect(item2.textContent).toContain("Model Home #2");

		const item3 = list.children.item(2) as Element;
		expect(item3.textContent).toContain("Model Home #3");
	});

	it("sorts homes alphabetically by City", async () => {
		renderWithClient(<TourList />, ["/homes"]);

		const select = await screen.findByRole("combobox");
		await user.selectOptions(select, "City");

		const list = screen.getByRole("list");

		const item1 = list.children.item(0) as Element;
		expect(item1.textContent).toContain(
			"Model Home #4City: BelvedereCounty: Marin",
		);

		const item2 = list.children.item(1) as Element;
		expect(item2.textContent).toContain(
			"Model Home #27City: BerkeleyCounty: Alameda",
		);

		const item3 = list.children.item(2) as Element;
		expect(item3.textContent).toContain(
			"Model Home #28City: BerkeleyCounty: Alameda",
		);
	});

	it("sorts homes alphabetically by County", async () => {
		renderWithClient(<TourList />, ["/homes"]);

		const select = await screen.findByRole("combobox");
		await user.selectOptions(select, "County");

		const list = screen.getByRole("list");

		const item1 = list.children.item(0) as Element;
		expect(item1.textContent).toContain(
			"Model Home #19City: San LeandroCounty: Alameda",
		);

		const item2 = list.children.item(1) as Element;
		expect(item2.textContent).toContain(
			"Model Home #20City: OaklandCounty: Alameda",
		);

		const item3 = list.children.item(2) as Element;
		expect(item3.textContent).toContain(
			"Model Home #21City: OaklandCounty: Alameda",
		);
	});
	it("can be sorted by City, then Number", async () => {
		renderWithClient(<TourList />, ["/homes"]);

		const select = await screen.findByRole("combobox");
		await user.selectOptions(select, "County");
		await user.selectOptions(select, "Number");

		const list = await screen.findByRole("list");

		const item1 = list.children.item(0) as Element;
		expect(item1.textContent).toContain("Model Home #1");

		const item2 = list.children.item(1) as Element;
		expect(item2.textContent).toContain("Model Home #2");

		const item3 = list.children.item(2) as Element;
		expect(item3.textContent).toContain("Model Home #3");
	});
});
