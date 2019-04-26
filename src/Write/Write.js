const FirestoreWriteNode = require('./WriteNode');

function validateNodeConfig(n){
  if (!n.collection){
    throw "No collection ref specified";
  }

  if (!n.operation){
    throw "No operation specified";
  }

  if (!n.admin) {
    throw "No admin specified";
  }
}

module.exports = function(RED) {
  class FirestoreWrite {
    constructor(n) {
      validateNodeConfig(n)

      RED.nodes.createNode(this,n);

      this.collection = n.collection;
      this.document = n.document;
      this.operation = n.operation;
      this.options = n.options;
      this.admin = RED.nodes.getNode(n.admin);

      const firestoreWriteNode = new FirestoreWriteNode(this)

      this.on('input', msg => {
        firestoreWriteNode.onInput(msg, this.send.bind(this), this.error.bind(this), this)
      })
    }
  }

  RED.nodes.registerType("Firestore out", FirestoreWrite);
}


