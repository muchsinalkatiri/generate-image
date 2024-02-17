var request = require("request");
var options = {
  method: "POST",
  url: "https://live.shopee.co.id/webapi/v1/session/57237203/live",
  headers: {
    Cookie:
      "SPC_F=ZveuRCyredXMPa1KVrJI6Agsw0tTvJrZ; REC_T_ID=6b5aaaef-ba5e-11ee-9448-2255ec082505; SPC_SI=mIqvZQAAAABJZDRkbTBiRKhKEAAAAAAAcDZaSkdDZmw=; SPC_CLIENTID=WnZldVJDeXJlZFhNuisfdgxbfuoqbuyb; SPC_ST=.aUhWUXF1aWw0Wm1mWEU4M6f2wJcHcsO9aAJpbQxMYW3PvljZI6/DnInlGCQRS42gow7cJ/imedfhIQGO0qamvFe/tAz8So0MCtAtuQQDZ4VZ23WIrmdIzpLBaC41Pjub8jEIWbDw/MzTT3HA9t2wW5zvfCPyQcdL7kOG8rt2E3uWOMd5JvtuwdFtTEgdZ7Otz9BDanAlf01thDOKb6Ui6Kjnyenuy2rJBq7JS5DIuQQ=; SPC_EC=.aUhWUXF1aWw0Wm1mWEU4M6f2wJcHcsO9aAJpbQxMYW3PvljZI6/DnInlGCQRS42gow7cJ/imedfhIQGO0qamvFe/tAz8So0MCtAtuQQDZ4VZ23WIrmdIzpLBaC41Pjub8jEIWbDw/MzTT3HA9t2wW5zvfCPyQcdL7kOG8rt2E3uWOMd5JvtuwdFtTEgdZ7Otz9BDanAlf01thDOKb6Ui6Kjnyenuy2rJBq7JS5DIuQQ=; SPC_U=1047977534; SPC_R_T_ID=F653sFLyLZQcTPgF9KV6JoBnjJpGO8R8B872n6Xs6hzZU4EckuM3g141Xf9Lk4dVlGuZ0kBlfgPaoI3bH+kz5l2ypAo3pIPlGhxsN0PSKffTo67JKWO0Ycz/NlVj3zkRIxq4mtv+a2ExV8gjAR1/XrNJz1/3qYSDjXlum12AegY=; SPC_R_T_IV=SEo1clF4T2NDUzZTdjZaYQ==; SPC_T_ID=F653sFLyLZQcTPgF9KV6JoBnjJpGO8R8B872n6Xs6hzZU4EckuM3g141Xf9Lk4dVlGuZ0kBlfgPaoI3bH+kz5l2ypAo3pIPlGhxsN0PSKffTo67JKWO0Ycz/NlVj3zkRIxq4mtv+a2ExV8gjAR1/XrNJz1/3qYSDjXlum12AegY=; SPC_T_IV=SEo1clF4T2NDUzZTdjZaYQ==; LIVE_STREAMING_UUID_KEY=pkuzvNO6pdX4yQOWraTQiYDloAQOUvAS; _QPWSDCXHZQA=f67af7dd-2591-4546-a247-7bd5e9fd579c; shopee_webUnique_ccd=GoJyCQJ6YGhWJ8SBBz+GJw==|JsDhZXEa8CbVhAx0Z/657vPY+DzedOkIOwJD6VbyCEf+gROCGJzPlwMOFFY6HlJJ64Rztpa0vnpEqX4=|5SRiGSm2OUA0byza|08|3; SPC_EC=.aUhWUXF1aWw0Wm1mWEU4M6f2wJcHcsO9aAJpbQxMYW3PvljZI6/DnInlGCQRS42gow7cJ/imedfhIQGO0qamvFe/tAz8So0MCtAtuQQDZ4VZ23WIrmdIzpLBaC41Pjub8jEIWbDw/MzTT3HA9t2wW5zvfCPyQcdL7kOG8rt2E3uWOMd5JvtuwdFtTEgdZ7Otz9BDanAlf01thDOKb6Ui6Kjnyenuy2rJBq7JS5DIuQQ=",
    "User-Agent":
      "Shopee/0.0.1 Android/4.4.2 Chrome/112.0.0.0 Mobile Safari/537.36",
    "Content-Type": "application/json",
    "X-Requested-With": "com.shopee.android",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
    Host: "live.shopee.co.id",
  },
  body: JSON.stringify({
    notify_followers: true,
  }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
