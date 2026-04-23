/* ============================================
   GET  /api/oss-policy  → 生成 OSS PostObject 签名
   支持 type 参数:
     - ielts  雅思听力视频 → ielts/
     - video  名师视频 → videos/
     - image  图片 → images/
   ============================================ */


export async function onRequestGet(context) {
	try {
		let access_key_id			= context.env.OSS_ACCESS_KEY_ID;
		let access_key_secret		= context.env.OSS_ACCESS_KEY_SECRET;
		let bucket					= context.env.OSS_BUCKET || "meuni-videos";
		let host					= "https://" + bucket + ".oss-accelerate.aliyuncs.com";

		if (access_key_id === undefined || access_key_secret === undefined) {
			return Response.json({ success: false, error: "OSS credentials not configured" }, { status: 500, headers: cors_headers() });
		}

		let url						= new URL(context.request.url);
		let upload_type				= url.searchParams.get("type") || "ielts";

		let now						= new Date();
		let expire_time				= new Date(now.getTime() + 30 * 60 * 1000);
		let expire_iso				= expire_time.toISOString();

		let timestamp				= now.getTime().toString(36);
		let random					= Math.random().toString(36).substring(2, 8);

		let folder					= "ielts/";
		let max_size				= 500 * 1024 * 1024;

		if (upload_type === "video") {
			folder					= "videos/";
			max_size					= 500 * 1024 * 1024;
		} else if (upload_type === "image") {
			folder					= "images/";
			max_size					= 10 * 1024 * 1024;
		}

		let key_prefix				= folder + timestamp + "_" + random + "_";

		let policy_obj				= {
			expiration: expire_iso,
			conditions: [
				["content-length-range", 0, max_size],
				["starts-with", "$key", folder]
			]
		};

		let policy_base64			= btoa(JSON.stringify(policy_obj));
		let signature				= await hmac_sha1_base64(access_key_secret, policy_base64);

		return Response.json({
			success:		true,
			host:			host,
			access_key_id:	access_key_id,
			policy:			policy_base64,
			signature:		signature,
			key_prefix:		key_prefix,
			expire:			expire_iso
		}, { headers: cors_headers() });
	}
	catch (error) {
		return Response.json({ success: false, error: error.message }, { status: 500, headers: cors_headers() });
	}
}


export async function onRequestOptions() {
	return new Response(null, { status: 204, headers: cors_headers() });
}


async function hmac_sha1_base64(secret, message) {
	let encoder					= new TextEncoder();
	let key_data				= encoder.encode(secret);
	let msg_data				= encoder.encode(message);

	let crypto_key				= await crypto.subtle.importKey("raw", key_data, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
	let signature_buffer		= await crypto.subtle.sign("HMAC", crypto_key, msg_data);
	let signature_bytes			= new Uint8Array(signature_buffer);

	let binary_string			= "";

	for (let byte of signature_bytes) {
		binary_string			= binary_string + String.fromCharCode(byte);
	}

	return btoa(binary_string);
}


function cors_headers() {
	return {
		"Access-Control-Allow-Origin":	"*",
		"Access-Control-Allow-Methods":	"GET, OPTIONS",
		"Access-Control-Allow-Headers":	"Content-Type"
	};
}
