if (navigator.userAgent.includes("Firefox")) {
	Object.defineProperty(globalThis, "crossOriginIsolated", {
		value: true,
		writable: false,
	});
}

importScripts("/sj/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();

self.addEventListener("install", () => {
	self.skipWaiting();
});

const CONFIG = {
	blocked: [
		"youtube.com/get_video_info?*adformat=*",
		"youtube.com/api/stats/ads/*",
		"youtube.com/pagead/*",
		".facebook.com/ads/*",
		".facebook.com/tr/*",
		".fbcdn.net/ads/*",
		"graph.facebook.com/ads/*",
		"ads-api.twitter.com/*",
		"analytics.twitter.com/*",
		".twitter.com/i/ads/*",
		".ads.yahoo.com",
		".advertising.com",
		".adtechus.com",
		".oath.com",
		".verizonmedia.com",
		".amazon-adsystem.com",
		"aax.amazon-adsystem.com/*",
		"c.amazon-adsystem.com/*",
		".adnxs.com",
		".adnxs-simple.com",
		"ab.adnxs.com/*",
		".rubiconproject.com",
		".magnite.com",
		".pubmatic.com",
		"ads.pubmatic.com/*",
		".criteo.com",
		"bidder.criteo.com/*",
		"static.criteo.net/*",
		".openx.net",
		".openx.com",
		".indexexchange.com",
		".casalemedia.com",
		".adcolony.com",
		".chartboost.com",
		".unityads.unity3d.com",
		".inmobiweb.com",
		".tapjoy.com",
		".applovin.com",
		".vungle.com",
		".ironsrc.com",
		".fyber.com",
		".smaato.net",
		".supersoniads.com",
		".startappservice.com",
		".airpush.com",
		".outbrain.com",
		".taboola.com",
		".revcontent.com",
		".zedo.com",
		".mgid.com",
		"*/ads/*",
		"*/adserver/*",
		"*/adclick/*",
		"*/banner_ads/*",
		"*/sponsored/*",
		"*/promotions/*",
		"*/tracking/ads/*",
		"*/promo/*",
		"*/affiliates/*",
		"*/partnerads/*",
	],
	inject: {
		html: "\x3c!-- pr0x1ed by vapor's static sj --\x3e",
	},
};

const SCRAMJET_DB_NAME = "$scramjet";
const SCRAMJET_REQUIRED_STORES = [
	"config",
	"cookies",
	"redirectTrackers",
	"referrerPolicies",
	"publicSuffixList",
];

let scramjetPromise = null;

function openIndexedDb(name, version) {
	return new Promise((resolve, reject) => {
		const request =
			typeof version === "number" ? indexedDB.open(name, version) : indexedDB.open(name);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () =>
			reject(request.error || new Error(`Failed to open IndexedDB database: ${name}`));
		request.onblocked = () => reject(new Error(`IndexedDB open blocked for ${name}`));
	});
}

function deleteIndexedDb(name) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.deleteDatabase(name);
		request.onsuccess = () => resolve(true);
		request.onerror = () =>
			reject(request.error || new Error(`Failed to delete IndexedDB database: ${name}`));
		request.onblocked = () => reject(new Error(`IndexedDB delete blocked for ${name}`));
	});
}

async function repairScramjetDatabase() {
	let db;

	try {
		db = await openIndexedDb(SCRAMJET_DB_NAME);
	} catch (error) {
		console.warn("Unable to inspect Scramjet database in service worker:", error);
		return;
	}

	const missingStores = SCRAMJET_REQUIRED_STORES.filter(
		(storeName) => !db.objectStoreNames.contains(storeName)
	);

	if (missingStores.length === 0) {
		db.close();
		return;
	}

	console.warn("Repairing Scramjet database in service worker, missing stores:", missingStores);
	db.close();
	await deleteIndexedDb(SCRAMJET_DB_NAME);
}

async function getScramjet() {
	if (!scramjetPromise) {
		scramjetPromise = (async () => {
			await repairScramjetDatabase();
			const scramjet = new ScramjetServiceWorker();
			scramjet.addEventListener("request", handleScramjetRequest);
			return scramjet;
		})().catch((error) => {
			scramjetPromise = null;
			throw error;
		});
	}

	return scramjetPromise;
}

/** @type {{ origin: string, html: string, css: string, js: string } | undefined} */
let playgroundData;

/**
 * @param {string} pattern
 * @returns {RegExp}
 */
function toRegex(pattern) {
	const escaped = pattern
		.replace(/[.+?^${}()|[\]\\]/g, "\\$&")
		.replace(/\*\*/g, "{{DOUBLE_STAR}}")
		.replace(/\*/g, "[^/]*")
		.replace(/{{DOUBLE_STAR}}/g, ".*");
	return new RegExp(`^${escaped}$`);
}

/**
 * @param {string} hostname
 * @param {string} pathname
 * @returns {boolean}
 */
function isBlocked(hostname, pathname) {
	return CONFIG.blocked.some((pattern) => {
		if (pattern.startsWith("#")) {
			pattern = pattern.substring(1);
		}
		if (pattern.startsWith("*")) {
			pattern = pattern.substring(1);
		}

		if (pattern.includes("/")) {
			const [hostPattern, ...pathParts] = pattern.split("/");
			const pathPattern = pathParts.join("/");
			const hostRegex = toRegex(hostPattern);
			const pathRegex = toRegex(`/${pathPattern}`);
			return hostRegex.test(hostname) && pathRegex.test(pathname);
		}
		const hostRegex = toRegex(pattern);
		return hostRegex.test(hostname);
	});
}

/**
 * @param {string} html
 * @returns {string}
 */
function inject(html) {
	return html.replace(/<head[^>]*>/i, (match) => `${match}${CONFIG.inject.html}`);
}

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function handleRequest(event) {
	const scramjet = await getScramjet();
	await scramjet.loadConfig();

	if (scramjet.route(event)) {
		const response = await scramjet.fetch(event);
		const contentType = response.headers.get("content-type") || "";

		if (contentType.includes("text/html")) {
			const originalText = await response.text();
			const modifiedHtml = inject(originalText);
			const encoder = new TextEncoder();
			const byteLength = encoder.encode(modifiedHtml).length;
			const newHeaders = new Headers(response.headers);
			newHeaders.set("content-length", byteLength.toString());

			return new Response(modifiedHtml, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}

		return response;
	}

	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	const url = event.request.url;

  	if (url.includes("supabase.co")) {
    	return;
  	}

	event.respondWith(handleRequest(event));
});

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("message", ({ data }) => {
	if (data.type === "playgroundData") {
		playgroundData = data;
	}
});

function handleScramjetRequest(e) {
	if (isBlocked(e.url.hostname, e.url.pathname)) {
		e.response = new Response("Site Blocked", { status: 403 });
		return;
	}

	if (playgroundData && e.url.href.startsWith(playgroundData.origin)) {
		const routes = {
			"/": { content: playgroundData.html, type: "text/html" },
			"/style.css": { content: playgroundData.css, type: "text/css" },
			"/script.js": { content: playgroundData.js, type: "application/javascript" },
		};

		const route = routes[e.url.pathname];

		if (route) {
			let content = route.content;

			if (route.type === "text/html") {
				content = inject(content);
			}

			const headers = { "content-type": route.type };
			e.response = new Response(content, { headers });
			e.response.rawHeaders = headers;
			e.response.rawResponse = {
				body: e.response.body,
				headers: headers,
				status: e.response.status,
				statusText: e.response.statusText,
			};
			e.response.finalURL = e.url.toString();
		} else {
			e.response = new Response("empty response", { headers: {} });
		}
	}
}

