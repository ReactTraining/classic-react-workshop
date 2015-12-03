export var tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

export var activeTab = {
  ...tab,
  borderBottomColor: '#000'
};

export var disabledTab = {
  ...tab,
  opacity: 0.25,
  cursor: 'default'
};

export var tabPanels = {
  padding: 10
};

