const FirestoreReadNode = require('./ReadNode');

function validateNodeConfig(n) {
  if (!n.collection) {
    throw "No collection specified";
  }

  if (!n.admin) {
    throw "No admin specified";
  }
}

module.exports = function (RED) {
  class FirestoreRead {
    constructor(n) {
      validateNodeConfig(n)
  
      RED.nodes.createNode(this, n);

      this.collection = n.collection;
      this.document = n.document;
      this.realtime = n.realtime;
      this.query = n.query;
      this.admin = RED.nodes.getNode(n.admin);
  
      const firestoreReadNode = new FirestoreReadNode(this)
      this.on('input', msg => {
        firestoreReadNode.main(msg, this.send.bind(this), this.error.bind(this))
      })
  
      this.on('close', firestoreReadNode.onClose.bind(firestoreReadNode))
    }
  }

  RED.nodes.registerType("Firestore in", FirestoreRead);
}


