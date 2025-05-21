import type { APIRoute, GetStaticPaths } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = true;

// GET
// en este caso se están generando las rutas con los params solicitados al servido
export const GET: APIRoute = async ({ params, request }) => {
	// entre corchetes puedo usar cualquier nombre, el que mejor describa el parámetro que esperas en la URL
	const clientId = params.clientId ?? "";

	const user = await db.select().from(Clients).where(eq(Clients.id, +clientId));

	if (user.length === 0) {
		return new Response(
			JSON.stringify({
				msg: `Client ${clientId} not found`,
			}),
			{
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

	return new Response(JSON.stringify(user), {
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

	return new Response(
		JSON.stringify({
			method: "POST",
			clientId: 1,
			slug: clientId,
			...body,
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};

// PUT
export const PUT: APIRoute = async ({ params, request }) => {
	const { clientId } = params;
	const body = await request.json();

	return new Response(
		JSON.stringify({
			method: "PUT",
			clientId: 1,
			slug: clientId,
			...body,
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};

// PATCH
export const PATCH: APIRoute = async ({ params, request }) => {
	const clientId = params.clientId ?? "";

	try {
		const { id, ...body } = await request.json();

		const results = await db
			.update(Clients)
			.set(body)
			.where(eq(Clients.id, +clientId));

		const updatedClient = await db
			.select()
			.from(Clients)
			.where(eq(Clients.id, +clientId));

		return new Response(JSON.stringify(updatedClient.at(0)), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("🚀 ~ constPOST:APIRoute= ~ error:", error);
		return new Response(JSON.stringify({ msg: "No body found" }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	// const { clientId } = params;
	// const body = await request.json();

	// return new Response(JSON.stringify({
	//     method: "PATCH",
	//     clientId: 1,
	//     slug: clientId,
	//     ...body,
	// }), {
	//     status: 200,
	//     headers: {
	//         "Content-Type": "application/json",
	//     },
	// });
};

// DELETE
export const DELETE: APIRoute = async ({ params, request }) => {
	const clientId = params.clientId ?? "";

	const { rowsAffected } = await db
		.delete(Clients)
		.where(eq(Clients.id, +clientId));

	if (rowsAffected > 0) {
		return new Response(
			JSON.stringify({
				method: "DELETE",
				clientId: clientId,
				msg: "Client deleted",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

    return new Response(
        JSON.stringify({
            method: "DELETE",
            clientId: clientId,
            msg: `Client ${clientId} not found`,
        }),
        {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
