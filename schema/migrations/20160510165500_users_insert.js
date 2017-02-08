
exports.up = function(knex, Promise) {
    return Promise.all([
      knex('users').insert(
        /*Start of array of data*/
[
{"id":4,"email":"andrew.crawford@vca.com","first":"Andrew","last":"Crawford","password_digest":'132ea049c4',"admin":true},
{"id":5,"email":"leo.tucker@vca.com","first":"Leo","last":"Tucker","password_digest":'132ea049c4',"admin":true}]
        /*End of insert array*/		
       )
   ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex('users').whereRaw('`id` <= ?', [3]).del()
  ]);
};