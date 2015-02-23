import DS from 'ember-data';
import Persistable from '../mixins/persistable';

export default DS.ActiveModelSerializer.extend(Persistable, {
});
