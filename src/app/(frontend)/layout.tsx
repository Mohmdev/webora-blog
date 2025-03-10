import type { Metadata } from "next";

import { cn } from "@utils/ui";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type React from "react";

import { Footer } from "@CMS/design/Footer/Component";
import { Header } from "@/Header/Component";
import { AdminBar } from "@/components/AdminBar";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@utils/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getServerSideURL } from "@utils/getURL";

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode();

	return (
		<html
			className={cn(GeistSans.variable, GeistMono.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<head>
				<InitTheme />
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body>
				<Providers>
					<AdminBar
						adminBarProps={{
							preview: isEnabled,
						}}
					/>

					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@payloadcms",
	},
};
