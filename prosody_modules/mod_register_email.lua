local http = require "net.http";
local usermanager = require "core.usermanager";
local datamanager = require "util.datamanager"
local uuid = require "util.uuid";

module:depends("http");

pending_registrations = {}
users = {}


function request_token(event)
  local request, response = event.request, event.response;
	local user = http.formdecode(request.body);

  if user.email == nil or user.password == nil or user.pubkey == nil then
    return 'incomplete registration'
  end

  local token = uuid.generate();
  local url = 'https://'..request.headers.host..request.path..'/verify/'..token

  pending_registrations[token] = user
  users[user.pubkey] = 1

  module:log("info", 'E-Mail: '..user.email)
  module:log("info", 'PubKey: '..user.pubkey)
  module:log("info", 'Password: '..user.password)
  module:log("info", 'Verification URL: '..url)

  return 'token sent'
end

function check_user(event, pubkey)
  local request, response = event.request, event.response;

  if users[pubkey] == nil then
    response.status_code = 201;
    response:send('done');
    return true;
  end

  return 'waiting';
end

function verify_token_and_register(event, token)
  local request, response = event.request, event.response;

  if pending_registrations[token] == nil then
    return 'invalid token';
  end

  local user = pending_registrations[token]
	local ok, err = usermanager.create_user(user.pubkey, user.password, module.host);
  if not ok then
    return 'registration failed';
  end

  extra_data = { ["email"] = user.email };
	datamanager.store(user.pubkey, module.host, "account_details", extra_data);

  pending_registrations[token] = nil
  users[user.pubkey] = nil

  return 'user registered';
end


module:provides("http", {
  route = {
      ["POST"] = request_token;
      ["GET /check/*"] = check_user;
      ["GET /verify/*"] = verify_token_and_register;
  }
});
