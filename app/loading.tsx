"use client";

import React from "react";

export default function Loading() {
	return (
		<div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/90 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-3">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-[#20408B]/30 border-t-[#20408B]" />
				<p className="text-sm text-gray-700">Loading...</p>
			</div>
		</div>
	);
}
