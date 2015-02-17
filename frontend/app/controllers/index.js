import Ember from 'ember';

export default Ember.ArrayController.extend({
  page: 1,
  perPage: 12,
  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages"
});
