local http = require "net.http";
local usermanager = require "core.usermanager";
local uuid = require "util.uuid";
local json = require "util.json";

local accounts = module:open_store("accounts");
local lookup = accounts:get("lookup") or {};

module:depends("http");


local pending_registrations = {}
local pending_ids = {}


function request_token(event)
  local request, response = event.request, event.response;
	local form = http.formdecode(request.body);
  local email, password, fingerprint = form.email, form.password, form.fingerprint;

  if email == nil or password == nil or fingerprint == nil then
    response.status_code = 400;
    response:send('incomplete');
    return false;
  end

  if lookup[email] then
    response.status_code = 403;
    response:send('email-taken');
    return false;
  end

  local token = uuid.generate();
  local url = 'https://'..request.headers.host..request.path..'/'..token

  pending_registrations[token] = form
  pending_ids[fingerprint] = true

  module:log("info", 'E-Mail: '..email)
  module:log("info", 'Fingerprint: '..fingerprint)
  module:log("info", 'Password: '..password)
  module:log("info", 'Verification URL: '..url)

  return 'ok';
end

function verify_token_and_register(event, token)
  local request, response = event.request, event.response;

  if pending_registrations[token] == nil then
    return 'invalid-token';
  end

  local form = pending_registrations[token];
  local email, fingerprint, password = form.email, form.fingerprint, form.password;
	local ok, err = usermanager.create_user(fingerprint, password, module.host);
  if not ok then
    return 'registration-failed';
  end

  pending_registrations[token] = nil;
  pending_ids[fingerprint] = nil;

  account = { id = fingerprint };
  lookup[email] = account;
  lookup[fingerprint] = account;
  accounts:set("lookup", lookup);

  return 'ok';
end


function lookup_user(event, s)
  local request, response = event.request, event.response;

  if s:len() >= 8 and lookup[s] ~= nil then
    return json.encode(lookup[s]);
  else
    response.status_code = 204;
    response:send();
  end
end


module:provides("http", {
  route = {
      ["POST /register"] = request_token;
      ["GET /register/*"] = verify_token_and_register;
      ["GET /lookup/*"] = lookup_user;
  }
});
