/*
 * HeaderComp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Select, Popover } from 'antd';
import styled from 'styled-components';

import { Menu, Icon } from '../../utils/antdUtils';
import utilsMsg from '../../utils/messages';
import FooterComp from '../../components/Footer';
import eosCannonLogo from '../../images/eosLogo.png';
import download from './offline_tool.png';

import {
  makeSelectLocale,
  makeSelectNetwork,
} from '../../containers/LanguageProvider/selectors';

// 自定义变量
const { Header, Sider, Content } = Layout;
const { Option } = Select;

class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LogoName: 'EOS Cannon',
      defaultSelectedKeys: '9',
      collapsed: false,
      openKeys: [],
      rootSubmenuKeys: ['1', '2', '3', '4', '5'],
    };
  }
  /**
   * 根据URL地址，重新设置默认菜单选项
   * */
  componentWillMount() {
    let defaultSelectedKeys = '9';
    switch (window.location.hash.substring(1)) {
      case '/accountSearch':
        defaultSelectedKeys = '9';
        break;
      case '/createAccount':
        defaultSelectedKeys = '10';
        break;
      case '/proxy':
        defaultSelectedKeys = '2';
        break;
      case '/transfer':
        defaultSelectedKeys = '3';
        break;
      case '/refund':
        defaultSelectedKeys = '4';
        break;
      case '/buyrambytes':
        defaultSelectedKeys = '5';
        break;
      case '/vote':
        defaultSelectedKeys = '6';
        break;
      case '/updateauth':
        defaultSelectedKeys = '7';
        break;
      case '/stake':
        defaultSelectedKeys = '1';
        break;
      case '/sendMessage':
        defaultSelectedKeys = '0';
        break;
      default:
        defaultSelectedKeys = '9';
    }
    this.setState({
      defaultSelectedKeys,
    });
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  changeLanguage = () => {
    const localeLanguage = this.props.locale === 'en' ? 'de' : 'en';
    this.props.onDispatchChangeLanguageReducer(localeLanguage);
  };

  handleChange = value => {
    this.props.onDispatchChangeNetworkReducer(value);
  };

  toggle = () => {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      },
      () => {
        if (this.state.collapsed) {
          this.setState({
            LogoName: '',
          });
        } else {
          setTimeout(() => {
            this.setState({
              LogoName: 'EOS Cannon',
            });
          }, 150);
        }
      },
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    const initInfo = formatMessage(utilsMsg.HeaderMenuInfoInit);
    const createAccount = formatMessage(utilsMsg.HeaderMenuCreateAccount);
    const tradeManage = formatMessage(utilsMsg.HeaderMenuTradeManage);
    const stake = formatMessage(utilsMsg.HeaderMenuStake);
    const sendMessage = formatMessage(utilsMsg.HeaderMenuSendMessage);
    const accountSearch = formatMessage(utilsMsg.HeaderMenuAccountSearch);
    const transfer = formatMessage(utilsMsg.HeaderMenuTransfer);
    const buyRamBytes = formatMessage(utilsMsg.HeaderMenuBuyRamBytes);
    const vote = formatMessage(utilsMsg.HeaderMenuVote);
    const proxy = formatMessage(utilsMsg.HeaderMenuProxy);
    const updateAuth = formatMessage(utilsMsg.HeaderMenuUpdateAuth);
    const refund = formatMessage(utilsMsg.HeaderMenuRefund);
    const mainNet = formatMessage(utilsMsg.HeaderMenuOffical);
    const testNet = formatMessage(utilsMsg.HeaderMenuTestNet);
    const OnlineAppDownLoad = formatMessage(utilsMsg.HeaderOnlineAppDownLoad);
    const AppDownLoad = formatMessage(utilsMsg.HeaderAppDownLoad);
    const OfflineAppDownLoad = formatMessage(utilsMsg.HeaderOfflineAppDownLoad);
    const sendTrade = formatMessage(utilsMsg.HeaderSendTrade);
    const content = (
      <div>
        <img src={download} alt="" style={{ width: 100 }} />
      </div>
    );
    return (
      <Layout>
        <Helmet
          titleTemplate={`%s -${formatMessage(utilsMsg.AppHelmetTitle)}`}
          defaultTitle={formatMessage(utilsMsg.AppHelmetTitle)}
        >
          <meta
            name="description"
            content={formatMessage(utilsMsg.AppHelmetTitle)}
          />
        </Helmet>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div
            className="logo"
            style={{
              height: '32px',
              color: '#f5cb48',
              margin: '1.5rem',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <span>
              <img src={eosCannonLogo} alt="" width="32" />
              {this.state.LogoName}
            </span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.defaultSelectedKeys]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <Menu.Item key="9">
              <Link href="/accountSearch" to="/accountSearch">
                <Icon type="user" />
                <span>{accountSearch}</span>
              </Link>
            </Menu.Item>

            <Menu.SubMenu
              key="1"
              title={
                <span>
                  <Icon type="area-chart" />
                  <span>{tradeManage}</span>
                </span>
              }
            >
              <Menu.Item key="10">
                <Link to="/createAccount" href="/createAccount">
                  {createAccount}
                </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/stake" href="/stake">
                  {stake}
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/transfer" href="/transfer">
                  {transfer}
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/buyrambytes" href="/buyRamBytes">
                  {buyRamBytes}
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/vote" href="/vote">
                  {vote}
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/proxy" href="/proxy">
                  {proxy}
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link href="/updateauth" to="/updateauth">
                  {updateAuth}
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link href="/refund" to="/refund">
                  {refund}
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="2"
              title={
                <span>
                  <Icon type="solution" />
                  <span> {sendTrade}</span>
                </span>
              }
            >
              <Menu.Item key="8">
                <Link to="/infoInit" href="/infoInit">
                  {initInfo}
                </Link>
              </Menu.Item>
              <Menu.Item key="0">
                <Link to="/sendMessage" href="/sendMessage">
                  {sendMessage}
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="5">
              <Popover placement="right" content={content}>
                <a
                  href="https://tool.eoscannon.io:444/offline.1.1.0.apk"
                  target="_blank"
                >
                  <Icon type="appstore-o" />
                  {OfflineAppDownLoad}
                </a>
              </Popover>
            </Menu.Item>

            {/*
             <Menu.SubMenu
             key="5"
             title={
             <span>
             <Icon type="appstore-o" />
             <span> {AppDownLoad}</span>
             </span>
             }
             >
             <Menu.Item key="setting:1">
             <a
             href="https://github.com/eoscannon/EosCannon-Offline-Tools-App/releases"
             target="_blank"
             >
             {OnlineAppDownLoad}
             </a>
             </Menu.Item>
             <Menu.Item key="setting:2">
             <a
             href="https://github.com/eoscannon/EosCannon-Online-Tools-App/releases"
             target="_blank"
             >
             {OfflineAppDownLoad}
             </a>
             </Menu.Item>
             </Menu.SubMenu>
             */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{
                fontSize: '18',
                padding: '0 24px',
                cursor: 'pointer',
                transition: 'color .3s',
              }}
            />
            <div
              className="userBox"
              style={{ float: 'right', display: 'flex', alignItems: 'center' }}
            >
              <Select
                className="netWork"
                defaultValue="main"
                style={{ width: 110 }}
                onChange={this.handleChange}
              >
                <Option value="main">{mainNet}</Option>
                <Option value="test">{testNet}</Option>
              </Select>
              <div
                className="en"
                aria-hidden="true"
                onClick={this.changeLanguage}
                style={{ padding: '0 1rem', color: 'blue' }}
              >
                {this.props.locale === 'en' ? '中文' : 'English'}
              </div>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Content>
          <FooterComp />
        </Layout>
      </Layout>
    );
  }
}
HeaderComp.propTypes = {
  intl: PropTypes.object,
  locale: PropTypes.string,
  children: PropTypes.node,
  onDispatchChangeLanguageReducer: PropTypes.func,
  onDispatchChangeNetworkReducer: PropTypes.func,
};

const HeaderCompIntl = injectIntl(HeaderComp);
// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onDispatchChangeLanguageReducer: locale =>
      dispatch({ type: 'app/LanguageToggle/CHANGE_LOCALE', locale }),
    onDispatchChangeNetworkReducer: locale =>
      dispatch({ type: 'app/Network/CHANGE_LOCALE', locale }),
  };
}

const mapStateToProps = createStructuredSelector({
  netWork: makeSelectNetwork(),
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderCompIntl);

const HeaderWrapper = styled(Header, Sider, Content)`

`;
