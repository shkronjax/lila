var m = require('mithril');

function select(ctrl) {
  return function(dimension) {
    return m('select', {
      multiple: true,
      config: function(e, isUpdate) {
        if (isUpdate && ctrl.vm.filters[dimension.key]) return;
        $(e).multipleSelect({
          placeholder: dimension.name,
          width: '239px',
          selectAll: false,
          filter: dimension.key === 'opening',
          // single: dimension.key === 'color',
          minimumCountSelected: 10,
          onClick: function() {
            ctrl.setFilter(dimension.key, $(e).multipleSelect("getSelects"));
          }
        });
      }
    }, dimension.values.map(function(value) {
      var selected = ctrl.vm.filters[dimension.key];
      return m('option', {
        value: value.key,
        selected: selected && selected.indexOf(value.key) !== -1
      }, value.name);
    }));
  };
}

module.exports = function(ctrl) {
  return m('div.filters', [
    m('div.items',
      ctrl.ui.dimensionCategs.map(function(categ) {
        return m('div.categ.box', [
          m('div.top', categ.name),
          categ.items.map(select(ctrl))
        ]);
      })
    )
  ]);
};
