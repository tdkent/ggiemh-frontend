import DOMPurify from "dompurify";
import parse, { type HTMLReactParserOptions } from "html-react-parser";
import { CircleQuestionMark } from "lucide-react";
import { Link } from "react-router";
import ImageGallery from "@/components/pages/TourDetails/ImageGallery";
import DisplayError from "@/components/shared/DisplayError";
import TextHeading from "@/components/shared/TextHeader";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	calculateFOVI,
	convertToUSD,
	inflatedValueUSD,
} from "@/lib/saleValues";
import type { ModelHome } from "@/types/types";
import { modelHomeData } from "../../../db/db.json";

interface Props {
	id: number;
}

export default function HomeDetails({ id }: Props) {
	const homeData = modelHomeData.find((home) => home.id === id) as ModelHome;

	if (!homeData) return <DisplayError msg="That home does not exist!" />;

	const {
		architect,
		city,
		county,
		images,
		neighborhood_district: neighDistrict,
		notes,
		value_current: currVal,
		value_original: origVal,
	} = homeData;

	const html = DOMPurify.sanitize(notes, {
		USE_PROFILES: { html: true },
	});

	const options: HTMLReactParserOptions = {
		replace(domNode) {
			if (
				"name" in domNode &&
				"children" in domNode &&
				"data" in domNode.children[0] &&
				domNode.name === "a"
			) {
				const href = domNode.attribs.href;
				const text = domNode.children[0].data;
				return <Link to={href}>{text}</Link>;
			}
		},
	};

	const parsedHtml = parse(html, options);

	return (
		<div className="content flex flex-col gap-10 lg:mx-auto lg:gap-20">
			<section>
				<TextHeading element="h2" text="Location" />
				<dl>
					<div>
						<dt>City</dt>
						<dd>{city}</dd>
					</div>
					<div>
						<dt>County</dt>
						<dd>{county}</dd>
					</div>
					<div>
						<dt>Neighborhood/District</dt>
						<dd>{neighDistrict}</dd>
					</div>
				</dl>
			</section>
			<section>
				<TextHeading element="h2" text="Architecture" />
				<dl>
					<div>
						<dt>Architect</dt>
						<dd>{architect}</dd>
					</div>
				</dl>
			</section>
			<section>
				<TextHeading element="h2" text="Valuation" />
				<dl>
					<div>
						<dt>Original sale value (1939-40)</dt>
						<dd className={`${!origVal && "italic"}`}>
							{origVal ? convertToUSD(origVal) : "No info available"}
						</dd>
					</div>
					<div>
						<dt>Original value, inflation adjusted (2025)</dt>
						<dd className={`${!origVal && "italic"}`}>
							{origVal ? inflatedValueUSD(origVal) : "N/a"}
						</dd>
					</div>
					<div>
						<dt>Current sale value (estimated)</dt>
						<dd>{convertToUSD(currVal)}</dd>
					</div>
					<div>
						<dt className="flex items-center gap-1">
							FOVI
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="ghost"
										className="cursor-pointer"
										aria-label="Open FOVI popover"
									>
										<CircleQuestionMark className="size-5" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="font-sans">
									<PopoverHeader>
										<PopoverTitle className="text-base">
											What is FOVI?
										</PopoverTitle>
										<PopoverDescription className="text-base">
											FOVI is a metric is obtained by dividing the home value as
											of 1 January, 2025 by the inflation-adjusted asking price
											in 1939/40. For example, a FOVI of 10 means the value has
											increased ten times.
										</PopoverDescription>
									</PopoverHeader>
								</PopoverContent>
							</Popover>
						</dt>
						<dd className={`${!origVal && "italic"}`}>
							{origVal ? calculateFOVI(origVal, currVal) : "N/a"}
						</dd>
					</div>
				</dl>
			</section>
			<section>
				<TextHeading element="h2" text="Notes" />
				{parsedHtml}
			</section>
			<ImageGallery id={id} gallery={images.gallery} city={city} />
		</div>
	);
}
