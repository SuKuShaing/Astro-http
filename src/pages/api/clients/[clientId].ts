import type { APIRoute, GetStaticPaths } from "astro";

export const prerender = false;

// GET
// en este caso se están generando las rutas con los params solicitados al servido
export const GET: APIRoute = async ({ params, request }) => {
    // entre corchetes puedo usar cualquier nombre, el que mejor describa el parámetro que esperas en la URL
	const { clientId } = params;

	return new Response(JSON.stringify({
        method: "GET",
        clientId: 1,
        slug: clientId,
    }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

// POST 
export const POST: APIRoute = async ({ params, request }) => {
    const { clientId } = params;
    const body = await request.json();

	return new Response(JSON.stringify({
        method: "POST",
        clientId: 1,
        slug: clientId,
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
    const { clientId } = params;
    const body = await request.json();

	return new Response(JSON.stringify({
        method: "PUT",
        clientId: 1,
        slug: clientId,
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
    const { clientId } = params;
    const body = await request.json();

    return new Response(JSON.stringify({
        method: "PATCH",
        clientId: 1,
        slug: clientId,
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
    const { clientId } = params;

    return new Response(JSON.stringify({
        method: "DELETE",
        clientId: 1,
        slug: clientId,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};