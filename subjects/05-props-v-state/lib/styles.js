const tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

const activeTab = {
  ...tab,
  borderBottomColor: '#000'
};

const tabPanels = {
  padding: 10
};

module.exports = {
  tab,
  activeTab,
  tabPanels
};
