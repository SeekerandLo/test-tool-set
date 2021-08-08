// 类组件写法
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

type CategoryProps = {
  route:
    | {
        name: string;
        link: string;
        children: null;
        key: string;
        icon: JSX.Element;
      }
    | {
        name: string;
        link: null;
        key: string;
        children: {
          name: string;
          link: string;
        }[];
        icon: JSX.Element;
      };
};

class Category extends React.Component {
  constructor(props: CategoryProps) {
    super(props);
    this.state = {
      route: {},
    };
  }

  componentDidMount() {
    const { route } = this.props;

    this.setState({
      route,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      route: nextProps.route,
    });
  }

  renderChildren = (children, key: string) => {
    if (children) {
      return (
        <div
          className={`tool-set-sider-category-${key}`}
          style={{ fontSize: 13 }}
        >
          {children.map((child) => {
            const { link, name } = child;
            return (
              <Link
                key={link}
                onClick={() => this.props.onClick(child)}
                to={link}
              >
                <div
                  className={`tool-set-sider-category-item ${
                    child.isSelected ? 'is-selected' : 'un-selected'
                  }`}
                >
                  {name}
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  renderIcon = (icon) => {
    if(!icon) {
      return (
        <div style={{ width: 8, height: 8, background: 'var(--color-subtle)', borderRadius: '50%' }}>

        </div>
      )
    }
  }

  render() {
    const { route } = this.state;

    const { name, link, children, icon, key } = route;

    return (
      <div className="tool-set-sider-category">
        <h5 className="tool-set-sider-category-title">
          {/* TODO 支持 svg */}
          {/* {icon} */}
          {this.renderIcon()}
          {link ? (
            <Link
              style={{ marginLeft: 8 }}
              to={link}
              onClick={() => this.props.onParentClick()}
            >
              {name}
            </Link>
          ) : (
            <div style={{ marginLeft: 8, cursor: 'pointer' }}>{name}</div>
          )}
        </h5>
        {this.renderChildren(children, key)}
      </div>
    );
  }
}

export default Category;
