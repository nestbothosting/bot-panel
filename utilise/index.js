import { config } from "@/config";

export function LogOut(setLogin, router) {
  localStorage.clear();
  fetch('/api/logout')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(er => console.log(er))
  setLogin(false);
  router.push('/')
}

export function showicon(e) {
  const resnav = document.getElementById("nav-items");
  resnav.style.display = "block";
}

export function RQ_Login(islogin) {
  if (!islogin) {
    // DiscordAUth();
  }
}

export function showcadmin() {
  const cadmin = document.getElementById("cadmin");
  cadmin.style.display = "block";
}

export function isAdmin(objuser, router) {
  let admin = false;
  if (!objuser) admin = false
  for (let x in config.Admin) {
    if (objuser?.uid == config.Admin[x]) {
      admin = true;
    }
  }

  if (!admin) {
    router.push("/");
  }
}
