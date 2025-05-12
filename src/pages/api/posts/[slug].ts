import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import { getStaticPaths } from "../../blog/[...slug].astro";

export const prerender = false;

// en este caso se están generando las rutas con los params solicitados al servidor
export const GET: APIRoute = async ({ params, request,  }) => {

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

	return new Response(JSON.stringify(post), { status: 200 });
};


// export const getStaticPaths: GetStaticPaths = async () => {
//     return [
//         {
//             params: {
//                 slug: "first-post",}
//         }
//     ]
// }