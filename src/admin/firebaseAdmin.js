const FirebaseAdminNode = require('./firebaseAdminNode');

module.exports = function (RED) {

  class FirebaseAdminConfig {
    constructor(n) {
      RED.nodes.createNode(this, n);

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
