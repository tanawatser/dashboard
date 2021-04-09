export default class API {
  constructor(props) {
    this.domain = "http://172.18.0.135:5004";
    this.mis = new Headers();
    this.mis.append("Content-Type", "application/json");
    this.mis.append("mis-access-token", "6yS1OVrZguKewgVIyjGs7BmrFqHYO0");
  }
  GetBranch() {
    return fetch("http://27.131.138.143:9004/gateway/routeapinode", {
      method: "POST",
      headers: this.mis,
      body: JSON.stringify({
        Urlpass: this.domain + "/jib/getBranch",
        Datapass: [],
        Methodpass: "GET",
      }),
    }).then((res) => res.json());
  }

  getLogin() {
    return fetch("http://172.18.0.135:5005/getlogin").then((res) => res.json());
  }
  


  getBox() {
    return fetch("http://172.18.0.135:5005/getbox").then((res) => res.json());
  }

  getLogout() {
    return fetch("http://172.18.0.135:5005/getlogout").then((res) =>
      res.json()
    );
  }

  // new api

  getLoginBydate(start, stop) {
    return fetch("http://172.18.0.135:5005/getloginbydate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: start,
        stop: stop,
      }),
    }).then((res) => res.json());
  }

  getboxbydate(start, stop) {
    return fetch("http://172.18.0.135:5005/getboxbydate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: start,
        stop: stop,
      }),
    }).then((res) => res.json());
  }

  getlogoutbydate(start, stop) {
    return fetch("http://172.18.0.135:5005/getlogoutbydate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: start,
        stop: stop,
      }),
    }).then((res) => res.json());
  }

  //   add new v2
  lastestOrder() {
    return fetch("http://172.18.0.135:5005/lastestOrder").then((res) =>
      res.json()
    );
  }

  greaterthanbox() {
    return fetch("http://172.18.0.135:5005/greaterthanbox").then((res) =>
      res.json()
    );
  }
  summaryorder() {
    return fetch("http://172.18.0.135:5005/summaryorder").then((res) =>
      res.json()
    );
  }

  beforesevendays() {
    return fetch("http://172.18.0.135:5005/beforesevendays").then((res) =>
      res.json()
    );
  }

  timeperiodHr() {
    return fetch("http://172.18.0.135:5005/timeperiodHr").then((res) =>
      res.json()
    );
  }

  errcode(){
    return fetch("http://172.18.0.135:5005/errcode").then((res) =>
    res.json()
  );
  }
}
