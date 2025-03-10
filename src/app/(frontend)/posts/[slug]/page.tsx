import type { Metadata } from "next";
import { RelatedDocs } from "@blocks/RelatedPosts/Component";
import { PayloadRedirects } from "@components/PayloadRedirects";
import RichText from "@components/RichText";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import React, { cache } from "react";
import type { Post } from "@payload-types";
import { LivePreviewListener } from "@components/LivePreviewListener";
import { PostHero } from "@heros/PostHero";
import PageClient from "./page.client";
import { mergeOpenGraph } from "@services/seo/mergeOpenGraph";
import { getDynamicMeta } from "@data/getDynamicMeta";
import { getPostBySlug } from "@data/getPost";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "posts",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	});

	const params = posts.docs.map(({ slug }) => {
		return { slug };
	});

	return params;
}

type Args = {
	params: Promise<{
		slug?: string;
	}>;
};

export default async function Post({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode();
	const { slug = "" } = await paramsPromise;
	const url = "/posts/" + slug;
	const post = await getPostBySlug({ slug });

	if (!post) return <PayloadRedirects url={url} />;

	return (
		<article className="pt-16 pb-16">
			<PageClient />

			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			<PostHero post={post} />

			<div className="flex flex-col items-center gap-4 pt-8">
				<div className="container">
					<RichText
						className="max-w-[48rem] mx-auto"
						data={post.content as DefaultTypedEditorState}
						enableGutter={false}
					/>
					{post.relatedDocs && post.relatedDocs.length > 0 && (
            <RelatedDocs
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedDocs.filter(
                (post) => typeof post === 'object',
              )}
            />
					)}
				</div>
			</div>
		</article>
	);
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getDynamicMeta()
  const title = `Blog | ${siteName}`

  return {
    title,
    description: siteDescription,
    openGraph: await mergeOpenGraph(
      {
        title,
        description: siteDescription,
        url: '/blog',
      },
      {
        siteName,
        description: siteDescription,
      },
    ),
  }
}