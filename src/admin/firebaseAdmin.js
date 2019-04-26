const FirebaseAdminNode = require('./firebaseAdminNode');
var RJSON = require('relaxed-json')

module.exports = function (RED) {
  class FirebaseAdminConfig {
    constructor(n) {
      RED.nodes.createNode(this, n);

      console.log(this.serviceAccountJson)

      try {
        this.serviceAccountJson = RJSON.parse(this.credentials.serviceAccountJson);
        console.log(this.serviceAccountJson)
      } catch (e) {
        throw "Bad service account json";
      }

      const firebaseAdminNode = new FirebaseAdminNode(this);
      this.core = firebaseAdminNode.core;
      this.database = firebaseAdminNode.database;
      this.firestore = firebaseAdminNode.firestore;
      this.on('close', firebaseAdminNode.onClose);
    }
  }

  RED.nodes.registerType("firebase admin", FirebaseAdminConfig, {
    credentials: {
      serviceAccountJson: {type: "text"}
    }
  });
}
