
exports.up = function(knex, Promise) {
    return Promise.all([
      knex('clinic_types').insert(
        /*Start of array of data*/
        [
    {
        "id": "1",
        "type": "General"
    },
    {
        "id": "2",
        "type": "Specialty"
    },
    {
        "id": "3",
        "type": "Hybrid"
    }
]
        
        /*End of insert array*/		
       )
   ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex('clinic_types').whereRaw('`id` <= ?', [1000]).del()
  ]);
};
