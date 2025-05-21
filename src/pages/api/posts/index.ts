import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async ({ params, request }) => {
    // const post = await getEntry("blog", params.slug); para buscar solo un post en especifico y no traerlos todos
	const posts = await getCollection("blog"); // para traer todos los posts

    // construido con query params
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug");

	// para buscar un post en especifico mediante el slug, ejemplo: /api/posts?slug=mi-post
	if (slug) {
		const post = posts.findIndex((post) => post.id === slug);
		if (post === -1) {
			return new Response(JSON.stringify({ error: `Post ${slug} not found` }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		const postData = posts[post];
		return new Response(JSON.stringify(postData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} else {
		return new Response(JSON.stringify(posts), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
