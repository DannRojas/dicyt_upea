var server = require('./server');
var ds = server.dataSources.mysql;
// var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'user', 'career_institute', 'investigation_project', 'idh-project'];
// var lbTables = ['auxiliar', 'investigator', 'responsable'];
var lbTables = ['idh-project'];
ds.automigrate(lbTables, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();
});