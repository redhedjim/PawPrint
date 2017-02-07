
exports.up = function(knex, Promise) {
    return Promise.all([
      knex('users').insert(
        /*Start of array of data*/
[{"id":1,"email":"pbennett0@senate.gov","first":"Leo","last":"Tucker","password":'132ea049c4',"admin":true},
{"id":2,"email":"arice1@smh.com.au","first":"Andrew","last":"Crawford","password":'132ea049c4',"admin":true},
{"id":3,"email":"lmedina2@amazon.com","first":"Julius","last":"Sobers","password":'132ea049c4',"admin":true},
{"id":4,"email":"andrew.crawford@vca.com","first":"Andrew","last":"Crawford","password":'132ea049c4',"admin":true}]
        /*End of insert array*/		
       )
   ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex('users').whereRaw('`id` <= ?', [3]).del()
  ]);
};