const React = require('react')

const TabHead = ({state, store}) => {
  var row = []
  state.conf.forEach((item, index) => {
    row.push(React.createElement("a", {key: index, className: index === state.selected ? 'menu selected': 'menu', 
    onClick: () => {store.dispatch({ type: 'CHANGE_PAGE', val: index})}}, item.name))
  })
  return React.createElement("div", null, row);
};

const TabContent = ({state}) => {
  const tab = state.conf[state.selected].name
  console.log('tab',tab)
  return React.createElement("span", null, JSON.stringify(state[tab]))
}

module.exports = { TabHead, TabContent }
