import DisplayError from "@/components/shared/DisplayError";
import { Button } from "@/components/ui/button";

interface Props {
	reset: (...args: unknown[]) => void;
}

export default function GlobalErrorBoundary({ reset }: Props) {
	return (
		<>
			<div className="m-4">
				<h1>
					Model Homes of the San Francisco International Exposition, 1939-40
				</h1>
				<div className="w-full max-w-sm my-4 flex flex-col gap-8">
					<DisplayError msg="An internal error occurred!" />
					<div className="flex flex-col gap-4">
						<p className="text-sm">
							Please click the Retry button below, or try again later.
						</p>
						<Button
							onClick={reset}
							size="lg"
							className="w-fit"
							variant="secondary"
						>
							Retry
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
