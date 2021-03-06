/*
 * AccountSearchPage
 *
 */
import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Select, message, Tabs, Table, Tag, Button, AutoComplete } from 'antd'
import { Progress, Input } from 'utils/antdUtils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectNetwork } from '../../containers/LanguageProvider/selectors'
import styleComps from './styles'

// import { push } from 'react-router-redux';

import { getEos, symbolList, symbolListWorbli } from '../../utils/utils'
import { LayoutContentBox, FormComp } from '../../components/NodeComp'
import messages from './messages'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

export class AccountSearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info: '',
      formatMessage: this.props.intl.formatMessage,
      account: '',
      createTime: '',
      balance: 0,
      stake: 0,
      voteNode: [],
      voteNodeStatus: false,
      memoryContent: '',
      cpuContent: '',
      networkContent: '',
      cpuStake: '0',
      cpuMortgage: '0',
      networkStake: '0',
      networkMortgage: '0',
      memoryScale: 0,
      cpuScale: 0,
      networkScale: 0,
      symbolBlance: 0,
      symbolCode: 'EOS(eosio.token)',
      voteProxy: '',
      accountSearch: '',
      powerAddress: [],
      symbolNet: 'EOS'
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.account) {
      this.handleSearch(nextProps.match.params.account)
      this.setState({ account: nextProps.match.params.account })
    }
    if(nextProps.SelectedNetWork === 'test') {
      this.setState({
        symbolNet: 'WBI'
      })
    }else{
      this.setState({
        symbolNet: 'EOS'
      })
    }
  }
  componentDidMount () {
    console.log('account===', this.props.match.params.account)
    if (this.props.match.params.account) {
      this.handleSearch(this.props.match.params.account)
    }
    if(this.props.SelectedNetWork === 'test') {
      this.setState({
        symbolNet: 'WBI'
      })
    }
  }

  handleChange = key => {
    let firstSymbol = key.split('(')
    var newContract = firstSymbol[1].split(')')
    var newSymbol = key.split(' ')
    const eos = getEos(this.props.SelectedNetWork)
    eos
      .getCurrencyBalance({
        code: newContract[0],
        account: this.state.account.trim(),
        symbol: newSymbol[0]
      })
      .then(res => {
        this.setState({
          symbolBlance: res[0] || 0,
          symbolCode: newContract[0]
        })
      })
      .catch(() => {
        message.error(this.state.formatMessage(messages.FunctionSearchNoData))
        this.setState({
          balance: 0,
          symbolBlance: 0,
          symbolCode: ''
        })
      })
  };

  onChangeAccount = e => {
    this.setState({ accountSearch: e.target.value })
  };

  handleSearch = value => {
    // this.props.dispatch(push('/login'));
    this.setState({
      accountSearch: value,
      account: value
    })
    const eos = getEos(this.props.SelectedNetWork)
    let stake = 0
    let cpuBack
    let netWork
    let cpuScale
    let netScale
    eos
      .getAccount({ account_name: value })
      .then(info => {
        if (info.voter_info) {
          this.setState({ voteProxy: info.voter_info.proxy })
          if (info.voter_info.producers.length > 0) {
            this.setState({
              voteNodeStatus: true,
              voteNode: info.voter_info.producers
            })
          } else {
            this.setState({
              voteNodeStatus: false,
              voteNode: []
            })
          }
        } else {
          this.setState({
            voteNodeStatus: false,
            voteNode: []
          })
        }
        if (info.voter_info) {
          stake = `${info.voter_info.staked / 10000} ` + this.state.symbolNet
        }
        if (info.refund_request) {
          cpuBack = info.refund_request.cpu_amount
          netWork = info.refund_request.net_amount
        } else {
          cpuBack = '0 ' + this.state.symbolNet
          netWork = '0 ' + this.state.symbolNet
        }
        if (info.cpu_limit.used) {
          cpuScale = ((info.cpu_limit.used / info.cpu_limit.max) * 100).toFixed(
            2,
          )
        } else {
          cpuScale = 0
        }
        if (info.net_limit.used) {
          netScale = ((info.net_limit.used / info.net_limit.max) * 100).toFixed(
            2,
          )
        } else {
          netScale = 0
        }

        this.setState({
          info,
          createTime: info.created,
          stake,
          memoryContent: `${(info.ram_usage / 1024).toFixed(2)} Kib/${(
            info.ram_quota / 1024
          ).toFixed(2)} Kib`,
          cpuContent: `${info.cpu_limit.used / 1000} ms/${info.cpu_limit.max /
            1000} ms`,
          networkContent: `${info.net_limit.used} bytes/${(
            info.net_limit.max /
            1024 /
            1024
          ).toFixed(2)} Mib`,
          cpuMortgage: cpuBack,
          networkMortgage: netWork,
          memoryScale: Number(
            (
              (Math.round(info.ram_usage) / Math.round(info.ram_quota)) *
              100
            ).toFixed(2),
          ),
          cpuScale: Number(Number(cpuScale).toFixed(2)),
          networkScale: Number(Number(netScale).toFixed(2))
        })
        // 对CPU,内存，网络为0 / -1 时的操作
        if (info.ram_quota <= 0) {
          this.setState({
            memoryContent: `${(info.ram_usage / 1024).toFixed(
              2,
            )} Kib/unlimited`
          })
        }
        if (info.cpu_limit.max <= 0) {
          this.setState({
            cpuContent: 'unlimited/unlimited'
          })
        }
        if (info.net_limit.max <= 0) {
          this.setState({
            networkContent: 'unlimited/unlimited'
          })
        }
        if (info.total_resources) {
          this.setState({
            cpuStake: info.total_resources.cpu_weight,
            networkStake: info.total_resources.net_weight
          })
        }
        console.log('info.permissions===', info.permissions)
        try {
          this.state.powerAddress = []
          if (info.permissions.length > 0) {
            for (let i = 0; i < info.permissions.length; i++) {
              const object = {}
              object.key = i
              object.name = info.permissions[i].perm_name
              object.address = info.permissions[i].required_auth.keys[0].key
              this.state.powerAddress.push(object)
            }
            // console.log('powerAddress===', this.state.powerAddress);
          }
        } catch (err) {
          console.log('err==', err)
        }
        eos
          .getCurrencyBalance({
            code: 'eosio.token',
            account: value,
            symbol: this.state.symbolNet
          })
          .then(res => {
            this.setState({
              balance: res[0] || 0,
              symbolBlance: res[0] || 0,
              symbolCode: 'eosio.token'
            })
          })
          .catch(() => {
            message.error(
              this.state.formatMessage(messages.FunctionSearchNoData),
            )
          })
      })
      .catch(() => {
        message.error(this.state.formatMessage(messages.FunctionSearchNoData))
        this.setState({ info: '' })
      })
  };

  handleSendTransaction = value => {
    // console.log('value==', value);
    // const data = encodeURI(JSON.stringify(value));
    // const data = value;
    this.props.history.push({
      pathname: '/transfer',
      state: {
        name: value.name,
        address: value.address,
        account: this.state.account
      }
    })
  };
  render () {
    const FunctionSearchButton = this.state.formatMessage(
      messages.FunctionSearchButton,
    )
    const FunctionSearchAccount = this.state.formatMessage(
      messages.FunctionSearchAccount,
    )
    const FunctionSearchCreateTime = this.state.formatMessage(
      messages.FunctionSearchCreateTime,
    )
    const FunctionSearchEOSBalance = this.state.formatMessage(
      messages.FunctionSearchEOSBalance,
    )
    const FunctionSearchEOSStake = this.state.formatMessage(
      messages.FunctionSearchEOSStake,
    )
    const FunctionSearchEOSVoteProxy = this.state.formatMessage(
      messages.FunctionSearchEOSVoteProxy,
    )
    const FunctionSearchEOSVoteNode = this.state.formatMessage(
      messages.FunctionSearchEOSVoteNode,
    )
    const FunctionSearchMemory = this.state.formatMessage(
      messages.FunctionSearchMemory,
    )
    const FunctionSearchCPUStake = this.state.formatMessage(
      messages.FunctionSearchCPUStake,
    )
    const FunctionSearchNetStake = this.state.formatMessage(
      messages.FunctionSearchNetStake,
    )
    const FunctionSearchNet = this.state.formatMessage(
      messages.FunctionSearchNet,
    )
    const FunctionSearchCPURefund = this.state.formatMessage(
      messages.FunctionSearchCPURefund,
    )
    const FunctionSearchNetRefund = this.state.formatMessage(
      messages.FunctionSearchNetRefund,
    )
    const FunctionSearchAccountBalance = this.state.formatMessage(
      messages.FunctionSearchAccountBalance,
    )
    const FunctionSearchAccountPublic = this.state.formatMessage(
      messages.FunctionSearchAccountPublic,
    )
    const FunctionSearchAccountSyblom = this.state.formatMessage(
      messages.FunctionSearchAccountSyblom,
    )
    const FunctionSearchAccountTableBalance = this.state.formatMessage(
      messages.FunctionSearchAccountTableBalance,
    )
    const FunctionSearchAccountTableContact = this.state.formatMessage(
      messages.FunctionSearchAccountTableContact,
    )

    const FunctionSearchAccountTableGroup = this.state.formatMessage(
      messages.FunctionSearchAccountTableGroup,
    )
    const FunctionSearchAccountTableAddress = this.state.formatMessage(
      messages.FunctionSearchAccountTableAddress,
    )
    const FunctionSearchAccountPlaceHolder = this.state.formatMessage(
      messages.FunctionSearchAccountPlaceHolder,
    )
    const FunctionSearchAction = this.state.formatMessage(
      messages.FunctionSearchAction,
    )
    const FunctionSearchActionTransfer = this.state.formatMessage(
      messages.FunctionSearchActionTransfer,
    )
    const columnsBlance = [
      {
        title: FunctionSearchAccountTableBalance,
        dataIndex: 'name'
      },
      {
        title: FunctionSearchAccountTableContact,
        dataIndex: 'address'
      },
      {
        title: FunctionSearchAction,
        key: 'action',
        align: 'center',
        render: (text, record) => {
          const ButtonDisabled = !record.name
          return (
            <span>
              <Button
                disabled={ButtonDisabled}
                type="primary"
                size="small"
                onClick={() => this.handleSendTransaction(record)}
              >
                {FunctionSearchActionTransfer}
              </Button>
            </span>
          )
        }
      }
    ]

    const dataBlance = [
      {
        key: 1,
        name: this.state.symbolBlance,
        address: this.state.symbolCode
      }
    ]

    const columns = [
      {
        title: FunctionSearchAccountTableGroup,
        dataIndex: 'name'
      },
      {
        title: FunctionSearchAccountTableAddress,
        dataIndex: 'address'
      }
    ]

    const data = this.state.powerAddress
    const children = symbolList.map((item) => (
      <Option key={item.symbol + ' (' + item.contract + ')'} label={item.contract}>{item.symbol} ({item.contract})</Option>
    ))

    const childrenWorbli = symbolListWorbli.map((item) => (
      <Option key={item.symbol + ' (' + item.contract + ')'} label={item.contract}>{item.symbol} ({item.contract})</Option>
    ))
    return (
      <LayoutContentBox>
        <styleComps.ConBox>
          <FormComp style={{ width: '50%' }}>
            <Search
              placeholder={FunctionSearchAccountPlaceHolder}
              enterButton={FunctionSearchButton}
              size="large"
              onChange={this.onChangeAccount}
              value={this.state.accountSearch.trim()}
              onSearch={this.handleSearch}
            />
          </FormComp>
          {this.state.info ? (
            <div>
              <div className="content">
                <div className="firstContent">
                  <span>
                    {FunctionSearchAccount}：{this.state.account}
                  </span>
                  <span>
                    {FunctionSearchCreateTime}：{this.state.createTime}
                  </span>
                  <span>
                    {this.state.symbolNet}{FunctionSearchEOSBalance}：{this.state.balance}
                  </span>
                  <span>
                    {this.state.symbolNet}{FunctionSearchEOSStake}：{this.state.stake}
                  </span>
                  {this.state.voteProxy ? (
                    <span>
                      {FunctionSearchEOSVoteProxy}：<Link
                        to={`/accountSearch/${this.state.voteProxy}`}
                      >
                        {this.state.voteProxy}
                      </Link>
                    </span>
                  ) : null}
                  {this.state.voteNodeStatus ? (
                    <span>
                      {FunctionSearchEOSVoteNode}：<br />
                      {this.state.voteNode.map((item, i) => (
                        <Link to={`/accountSearch/${item}`} key={i}>
                          <Tag>{item}</Tag>
                        </Link>
                      ))}
                    </span>
                  ) : null}
                </div>
                <div className="secondContent">
                  <div className="contentDetail">
                    <Progress
                      type="dashboard"
                      percent={this.state.memoryScale}
                    />
                    <div className="contentDetailDesc">
                      <span>{this.state.memoryContent}</span>
                      <span className="contentDetailDescTitle">
                        {FunctionSearchMemory}
                      </span>
                    </div>
                  </div>
                  <div className="contentDetail">
                    <Progress type="dashboard" percent={this.state.cpuScale} />
                    <div className="contentDetailDesc">
                      <span>{this.state.cpuContent}</span>
                      <span className="contentDetailDescTitle">CPU</span>
                      <span>
                        {FunctionSearchCPUStake}：{this.state.cpuStake}
                      </span>
                      <span>
                        {FunctionSearchCPURefund}：{this.state.cpuMortgage}
                      </span>
                    </div>
                  </div>
                  <div className="contentDetail">
                    <Progress
                      type="dashboard"
                      percent={this.state.networkScale}
                    />
                    <div className="contentDetailDesc">
                      <span>{this.state.networkContent}</span>
                      <span className="contentDetailDescTitle">
                        {FunctionSearchNet}
                      </span>
                      <span>
                        {FunctionSearchNetStake}：{this.state.networkStake}
                      </span>
                      <span>
                        {FunctionSearchNetRefund}：{this.state.networkMortgage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '2rem 0' }}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={FunctionSearchAccountBalance} key="1">
                    {this.props.SelectedNetWork === 'test' ? (
                      <div style={{ padding: '1rem 0' }}>
                        <span>{FunctionSearchAccountSyblom}：</span>
                        <AutoComplete
                          dataSource={childrenWorbli}
                          placeholder={this.state.symbolNet  + ' (eosio.token)'}
                          optionLabelProp="value"
                          onSelect={this.handleChange}
                          filterOption={(inputValue, option) => option.props.children[0].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />

                      </div>
                    ) : (
                      <div style={{ padding: '1rem 0' }}>
                        <span>{FunctionSearchAccountSyblom}：</span>
                        <AutoComplete
                          dataSource={children}
                          placeholder={this.state.symbolNet  + ' (eosio.token)'}
                          optionLabelProp="value"
                          onSelect={this.handleChange}
                          filterOption={(inputValue, option) => option.props.children[0].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />

                      </div>
                    )}
                    <div>
                      <Table
                        columns={columnsBlance}
                        dataSource={dataBlance}
                        pagination={false}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={FunctionSearchAccountPublic} key="2">
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          ) : null}
        </styleComps.ConBox>
      </LayoutContentBox>
    )
  }
}

AccountSearchPage.propTypes = {
  intl: PropTypes.object,
  SelectedNetWork: PropTypes.string
}
// 在组件上挂载状态控制
export function mapDispatchToProps (dispatch) {
  return { dispatch }
}
const mapStateToProps = createStructuredSelector({
  SelectedNetWork: makeSelectNetwork()
})
const AccountSearchPageIntl = injectIntl(AccountSearchPage)
const AccountSearchPageForm = Form.create()(AccountSearchPageIntl)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSearchPageForm)
