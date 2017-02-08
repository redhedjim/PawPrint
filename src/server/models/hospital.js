import bookshelf from '../lib/bookshelf';
export default bookshelf.Model.extend({
    tableName: 'clinics',
    hasTimestamps: true
});
