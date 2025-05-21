import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

	// select * from Clients where ...
	const users = await db.select().from(Clients);

	return new Response(
		JSON.stringify(users),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};



export const POST: APIRoute = async ({ params, request }) => {
	try {
		// const body = await request.json();
		const { id, ...body } = await request.json();
		/* Al destructurar el body, podemos sacar el id y el resto de los datos, el resto de los datos quedan agruapados en body,
		podemos pasar el body como respuesta y al haber sacado el id, no lo incluimos en la respuesta.
		Esto es útil para no enviar datos sensibles o innecesarios al cliente, o usar el id para hacer una consulta a la base de datos o cosas así.
		*/

		const resp = await db.insert(Clients).values(body)
		console.log("🚀 ~ constPOST:APIRoute= ~ resp:", resp)
		const { lastInsertRowid } = resp;

		return new Response(
			JSON.stringify({
				method: "POST",
				id: +lastInsertRowid!.toString(),
				...body,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error("🚀 ~ constPOST:APIRoute= ~ error:", error)
		return new Response(
			JSON.stringify({msg: 'No body found'}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
};
