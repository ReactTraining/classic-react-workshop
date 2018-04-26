export const tabList = {};

export const tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

export const activeTab = {
  ...tab,
  borderBottomColor: "#000"
};

export const disabledTab = {
  ...tab,
  opacity: 0.25,
  cursor: "default"
};

export const tabPanels = {
  padding: 10
};
