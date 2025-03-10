"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { getClientSideURL } from "@utils/getURL";
import { useRouter } from "next/navigation";
import type React from "react";

export const LivePreviewListener: React.FC = () => {
	const router = useRouter();
	return (
		<PayloadLivePreview
			refresh={router.refresh}
			serverURL={getClientSideURL()}
		/>
	);
};
