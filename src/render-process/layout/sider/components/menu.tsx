import React from 'react';
import Category from './category';
import routes from '../router';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: '',
      stateRoute: [],
    };
  }

  componentDidMount() {
    routes.map((route) => {
      if (route.children) {
        route.children.map((child) => {
          child.isSelected = false;
        });
      }
    });

    this.setState({
      stateRoute: routes,
    });
  }

  handleClickParentMenu = () => {
    const { stateRoute } = this.state;
    const tempStateReoute = stateRoute;
    tempStateReoute.map((route) => {
      if (route.children) {
        route.children.map((child) => {
          child.isSelected = false;
        });
      }
    });

    this.setState({
      stateRoute: tempStateReoute,
    });
  };

  // 点击子菜单
  handleClickSubMenu = (selectedItem) => {
    console.log('点击了', selectedItem);

    const { stateRoute } = this.state;
    const tempStateReoute = stateRoute;
    tempStateReoute.map((route) => {
      if (route.children) {
        route.children.map((child) => {
          if (child.link === selectedItem.link) {
            child.isSelected = true;
          } else {
            child.isSelected = false;
          }
        });
      }
    });

    this.setState({
      stateRoute: tempStateReoute,
    });
  };

  renderRoutes = () => {
    const { stateRoute } = this.state;
    return stateRoute.map((route) => {
      return (
        <Category
          onClick={this.handleClickSubMenu}
          onParentClick={this.handleClickParentMenu}
          route={route}
          key={route.name}
        />
      );
    });
  };

  render() {
    return <div>{this.renderRoutes()}</div>;
  }
}

export default Menu;
