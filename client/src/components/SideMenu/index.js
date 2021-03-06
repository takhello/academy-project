import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getConstitution } from '../../actions/constitution';


const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  componentDidMount() {
    this.props.getConstitution();
  }


  render() {
    const { constitution } = this.props;
    return (
      <div className="side-menu">
        <Menu
          theme="dark"
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span className="nav-text">专家</span></span>}>
            <Menu.Item key="1">
              <Link to="/admin/expert">创建专家</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/expert/list">专家列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span className="nav-text">章程</span></span>}>
              {
                !constitution &&
                <Menu.Item key="3">
                     <Link to="/admin/constitution">创建章程</Link>
                </Menu.Item>
              }
              {
                constitution &&
                  <Menu.Item key="4">
                    <Link to="/admin/constitution/list">修改章程</Link>
                  </Menu.Item>
              }
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span className="nav-text">领导</span></span>}>
            <Menu.Item key="5">
              <Link to="/admin/leader">创建领导</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin/leader/list">领导列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="setting" /><span className="nav-text">轮播图</span></span>}>
            <Menu.Item key="7">
              <Link to="/admin/carousel">添加轮播图</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/admin/carousel/list">轮播图列表</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}


function mapStatesToProps(state) {
  return {
    constitution: state.constitution
  }
}


export default connect(mapStatesToProps, {getConstitution})(SideMenu);
