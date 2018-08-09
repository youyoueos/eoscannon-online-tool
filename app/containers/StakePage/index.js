/*
 * StakePage
 *
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Switch } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  formItemLayout,
  getEos,
  openTransactionFailNotification,
} from '../../utils/utils';
import {
  LayoutContentBox,
  LayoutContent,
  FormComp,
} from '../../components/NodeComp';
import ScanQrcode from '../../components/ScanQrcode';
import DealGetQrcode from '../../components/DealGetQrcode';
import messages from './messages';
import utilsMsg from '../../utils/messages';

import { makeSelectNetwork } from '../LanguageProvider/selectors';

const FormItem = Form.Item;

export class StakePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelegatebw: true, // true：质押；false：解质押
      eos: null,
      formatMessage: this.props.intl.formatMessage,
      GetTransactionButtonState: false, // 获取报文按钮可点击状态
      QrCodeValue: this.props.intl.formatMessage(utilsMsg.QrCodeInitValue), // 二维码内容
      transaction: {},
      SelectedNetWork: 'main',
    };
  }
  /**
   * 输入框内容变化时，改变按钮状态
   * */
  componentWillReceiveProps(nextProps) {
    this.onValuesChange(nextProps);
    console.log('nextProps SelectedNetWork====', nextProps.SelectedNetWork);
    if (
      nextProps.SelectedNetWork &&
      nextProps.SelectedNetWork !== this.props.SelectedNetWork
    ) {
      this.setState({ SelectedNetWork: nextProps.SelectedNetWork });
    }
  }
  /**
   * 用户选择质押/解质押
   * */
  onSwitchChange = checked => {
    this.setState({
      isDelegatebw: checked,
    });
  };
  /**
   * 输入框内容变化时，改变按钮状态
   * */
  onValuesChange = nextProps => {
    const values = nextProps.form.getFieldsValue();
    const { FromAccountName, stakeNetQuantity, stakeCpuQuantity } = values;
    this.setState({
      GetTransactionButtonState:
        !!FromAccountName && !!stakeNetQuantity && !!stakeCpuQuantity,
    });
  };
  /**
   * 用户点击生成报文，根据用户输入参数、选择的质押/解质押，生成签名报文，并将其赋值到文本框和生成对应的二维码
   * */
  handleGetTransaction = () => {
    if (!this.state.GetTransactionButtonState) {
      return;
    }
    const values = this.props.form.getFieldsValue();
    const eos = getEos(this.props.SelectedNetWork);
    const {
      FromAccountName,
      ReceiverAccountName,
      stakeNetQuantity,
      stakeCpuQuantity,
    } = values;
    if (this.state.isDelegatebw) {
      eos
        .delegatebw(
          {
            from: FromAccountName,
            receiver: ReceiverAccountName || FromAccountName,
            stake_net_quantity: `${Number(stakeNetQuantity).toFixed(4)} EOS`,
            stake_cpu_quantity: `${Number(stakeCpuQuantity).toFixed(4)} EOS`,
            transfer: 0,
          },
          {
            sign: false,
            broadcast: false,
          },
        )
        .then(tr => {
          this.setState({
            eos,
            transaction: tr.transaction,
          });
        })
        .catch(err => {
          openTransactionFailNotification(this.state.formatMessage, err.name);
        });
    } else {
      eos
        .undelegatebw(
          {
            from: FromAccountName,
            receiver: ReceiverAccountName,
            unstake_net_quantity: `${Number(stakeNetQuantity).toFixed(4)} EOS`,
            unstake_cpu_quantity: `${Number(stakeCpuQuantity).toFixed(4)} EOS`,
          },
          {
            sign: false,
            broadcast: false,
          },
        )
        .then(tr => {
          this.setState({
            eos,
            transaction: tr.transaction,
          });
        })
        .catch(err => {
          openTransactionFailNotification(this.state.formatMessage, err.name);
        });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const DelegateSwitchCheckedName = this.state.formatMessage(
      messages.DelegateSwitchCheckedName,
    );
    const DelegateSwitchUnCheckedName = this.state.formatMessage(
      messages.DelegateSwitchUnCheckedName,
    );
    const FromAccountNamePlaceholder = this.state.isDelegatebw
      ? this.state.formatMessage(messages.DelegateFromAccountNamePlaceholder)
      : this.state.formatMessage(messages.UnDelegateFromAccountNamePlaceholder);
    const ReceiverAccountNamePlaceholder = this.state.isDelegatebw
      ? this.state.formatMessage(
          messages.DelegateReceiverAccountNamePlaceholder,
        )
      : this.state.formatMessage(
          messages.UnDelegateReceiverAccountNamePlaceholder,
        );
    const ReceiverAccountNameHelp = this.state.isDelegatebw
      ? this.state.formatMessage(messages.DelegateReceiverAccountNameHelp)
      : this.state.formatMessage(messages.UnDelegateReceiverAccountNameHelp);
    const StakeNetQuantityPlaceholder = this.state.isDelegatebw
      ? this.state.formatMessage(messages.DelegateStakeNetQuantityPlaceholder)
      : this.state.formatMessage(
          messages.UnDelegateStakeNetQuantityPlaceholder,
        );
    const StakeCpuQuantityPlaceholder = this.state.isDelegatebw
      ? this.state.formatMessage(messages.DelegateStakeCpuQuantityPlaceholder)
      : this.state.formatMessage(
          messages.UnDelegateStakeCpuQuantityPlaceholder,
        );
    const FromLabel = this.state.formatMessage(messages.FromLabel);
    const ReceiverLabel = this.state.formatMessage(messages.ReceiverLabel);
    const NetQuantityLabel = this.state.formatMessage(
      messages.NetQuantityLabel,
    );
    const CpuQuantityLabel = this.state.formatMessage(
      messages.CpuQuantityLabel,
    );
    return (
      <LayoutContent>
        <LayoutContentBox>
          <FormComp>
            <FormItem>
              <Switch
                checkedChildren={DelegateSwitchCheckedName}
                unCheckedChildren={DelegateSwitchUnCheckedName}
                defaultChecked={this.state.isDelegatebw}
                onChange={this.onSwitchChange}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={FromLabel} colon>
              {getFieldDecorator('FromAccountName', {
                rules: [
                  { required: true, message: FromAccountNamePlaceholder },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder={FromAccountNamePlaceholder}
                />,
              )}
            </FormItem>
            <FormItem
              help={ReceiverAccountNameHelp}
              {...formItemLayout}
              label={ReceiverLabel}
              colon
            >
              {getFieldDecorator('ReceiverAccountName', {
                rules: [
                  {
                    required: true,
                    message: ReceiverAccountNamePlaceholder,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder={ReceiverAccountNamePlaceholder}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={NetQuantityLabel} colon>
              {getFieldDecorator('stakeNetQuantity', {
                rules: [
                  {
                    required: true,
                    message: StakeNetQuantityPlaceholder,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon
                      type="pay-circle-o"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder={StakeNetQuantityPlaceholder}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={CpuQuantityLabel} colon>
              {getFieldDecorator('stakeCpuQuantity', {
                rules: [
                  {
                    required: true,
                    message: StakeCpuQuantityPlaceholder,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon
                      type="pay-circle-o"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder={StakeCpuQuantityPlaceholder}
                />,
              )}
            </FormItem>
            <DealGetQrcode
              eos={this.state.eos}
              form={this.props.form}
              formatMessage={this.state.formatMessage}
              GetTransactionButtonClick={this.handleGetTransaction}
              GetTransactionButtonState={this.state.GetTransactionButtonState}
              QrCodeValue={this.state.QrCodeValue}
              SelectedNetWork={this.state.SelectedNetWork}
              transaction={this.state.transaction}
            />
            <ScanQrcode
              eos={this.state.eos}
              form={this.props.form}
              formatMessage={this.state.formatMessage}
              SelectedNetWork={this.state.SelectedNetWork}
              transaction={this.state.transaction}
            />
          </FormComp>
        </LayoutContentBox>
      </LayoutContent>
    );
  }
}

StakePage.propTypes = {
  form: PropTypes.object,
  intl: PropTypes.object,
  SelectedNetWork: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  SelectedNetWork: makeSelectNetwork(),
});

const StakePageIntl = injectIntl(StakePage);
const StakePageForm = Form.create(mapStateToProps)(StakePageIntl);

export default connect(mapStateToProps)(StakePageForm);
