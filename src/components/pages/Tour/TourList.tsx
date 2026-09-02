import { useState } from "react";
import SortList from "@/components/pages/Tour/SortList";
import TourListItem from "@/components/pages/Tour/TourListItem";
import DisplayError from "@/components/shared/DisplayError";
import { modelHomeData } from "@/db/db.json";
import sortHomes from "@/helpers/sortHomes";
import type { ModelHome } from "@/types/types";
import { type SortOptions, sortOptions } from "@/types/types";

export default function TourList() {
	const [sortOption, setSortOption] = useState<SortOptions>(sortOptions[0]);

	if (!modelHomeData.length) return <DisplayError msg="Unable to load data!" />;

	const homes = modelHomeData as ModelHome[];
	const sorted = sortHomes(homes, sortOption);

	return (
		<>
			<SortList setSortOption={setSortOption} />
			<ul aria-label="Homes" className="divide-y">
				{sorted.map((home) => {
					return <TourListItem key={home.id} home={home} />;
				})}
			</ul>
		</>
	);
}
