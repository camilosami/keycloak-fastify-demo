import config from './config/keycloak.json';
import Fastify from 'fastify';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import Keycloak from 'keycloak-sami-js';

async function initServer(): Promise<FastifyInstance> {
	// init fastify
	const fastify = Fastify({ logger: true });

	// init keycloak
	const keycloak = new Keycloak(config);

	// Run authorization flow in all endpoints
	fastify.addHook('preHandler', (req, reply, done) => {
		if (!keycloak.verify(req.headers.authorization?.split(' ')[1])) {
			reply.status(401).send({ error: 'HTTP 401 Unauthorized' });
		}

		done();
	});

	return fastify;
}

(async () => {
	// init app server
	const fastify = await initServer();

	// routes
	fastify.get('/development/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		reply.status(200).send({ hello: 'Hiring Development on Typescript' });
	});

	// listening...
	fastify.listen(5000, (err) => {
		if (err) throw err;
	});
})();

