const React = require('react')

const TabHead = ({state, store}) => {
  var row = []
  state.conf.forEach((item, index) => {
    row.push(<a key={index} className={index === state.selected ? 'menu selected': 'menu'}
    onClick={() => {store.dispatch({ type: 'CHANGE_PAGE', val: index})}}>{item.name}</a>)
  })
  return <div>{row}</div>;
};

const TabContent = ({state}) => {
  const tab = state.conf[state.selected].name
  console.log('tab',tab)
  return <span>{JSON.stringify(state[tab])}</span>
}

module.exports = { TabHead, TabContent }
