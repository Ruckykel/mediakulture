"use client";
import { Suspense } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<Suspense
			fallback={
				<div className="fixed inset-0 z-[9997] flex items-center justify-center bg-white/60">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#20408B]/30 border-t-[#20408B]" />
				</div>
			}
		>
			{children}
		</Suspense>
	);
}


