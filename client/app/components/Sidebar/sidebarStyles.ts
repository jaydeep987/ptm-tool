
export interface ISidebarStyles {
  [name: string]: React.CSSProperties;
}

const sidebarStyles: ISidebarStyles = {
  mainDrawer: {
    width: 300,
    backgroundColor: '#EDF0F5',
  },

  secondDrawer: {
    width: 50,
    height: 50,
    top: 20,
  },

  showHideIcon: {
    float: 'right',
    padding: 10,
    paddingTop: 15,
  },

  smallIcon: {
    width: 24,
    height: 24,
    fill: '#48A7ED',
  },

  smallIconBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 3,
  },
};

export default sidebarStyles;
