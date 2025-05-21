import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import { getStaticPaths } from "../../blog/[...slug].astro";

export const prerender = false;

// GET
// en este caso se están generando las rutas con los params solicitados al servidor, no el slug
export const GET: APIRoute = async ({ params, request }) => {
	const { slug } = params;

	const post = await getEntry("blog", slug as any);

	if (!post) {
		return new Response(JSON.stringify({ error: `Post ${slug} not found` }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return new Response(JSON.stringify(post), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     return [
//         {
//             params: {
//                 slug: "first-post",}
//         }
//     ]
// }

// POST 
export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();

	return new Response(JSON.stringify({
        method: "POST",
        ...body,
    }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

// PUT
export const PUT: APIRoute = async ({ params, request }) => {
    const body = await request.json();

	return new Response(JSON.stringify({
        method: "PUT",
        ...body,
    }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

// PATCH
export const PATCH: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    return new Response(JSON.stringify({
        method: "PATCH",
        ...body,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// DELETE
export const DELETE: APIRoute = async ({ params, request }) => {
    const { slug } = params;

    const body = await request.json();

    return new Response(JSON.stringify({
        method: "DELETE",
        slug: `slug ${slug} deleted`,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};