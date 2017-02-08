import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../../../schema/knexfile';

export default bookshelf(knex(knexConfig.development));